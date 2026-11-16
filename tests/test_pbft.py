"""Unit tests for the PBFT module — pure Python, no Docker required.

Covers:
    * Canonical JSON encoding (deterministic across key order).
    * Ed25519 sign / verify round-trip + tamper detection.
    * NodeConfig loading from env + quorum math.
    * Message dispatch routing by type.
    * PBFTModule subclass conformance with the ConsensusModule ABC.
    * payload_digest / gen_keypair round-trip.
"""
from __future__ import annotations

import base64
import json

import pytest

from consensus.base import ConsensusModule
from consensus.pbft import node
from consensus.pbft.module import PBFTModule, gen_keypair, payload_digest


# --------------------------------------------------------------------------- #
# canonical                                                                   #
# --------------------------------------------------------------------------- #


def test_canonical_is_deterministic_across_key_order():
    a = node.canonical({"b": 1, "a": 2, "c": 3})
    b = node.canonical({"c": 3, "a": 2, "b": 1})
    assert a == b


def test_canonical_uses_compact_separators():
    out = node.canonical({"x": 1}).decode()
    assert out == '{"x":1}'


# --------------------------------------------------------------------------- #
# sign / verify                                                               #
# --------------------------------------------------------------------------- #


def test_sign_verify_roundtrip():
    priv_b64, pub_b64 = gen_keypair()
    priv = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_b64))
    pub = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b64))
    payload = b'{"hello":"world"}'
    sig = node.sign(priv, payload)
    assert node.verify(pub, payload, sig) is True


def test_verify_rejects_tampered_payload():
    priv_b64, pub_b64 = gen_keypair()
    priv = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_b64))
    pub = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b64))
    sig = node.sign(priv, b"original")
    assert node.verify(pub, b"tampered", sig) is False


def test_verify_rejects_wrong_key():
    priv_a = node.Ed25519PrivateKey.from_private_bytes(
        base64.b64decode(gen_keypair()[0])
    )
    _, pub_b_b64 = gen_keypair()
    pub_b = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b_b64))
    sig = node.sign(priv_a, b"data")
    assert node.verify(pub_b, b"data", sig) is False


def test_sign_message_attaches_sig_and_omits_it_from_body():
    priv_b64, _ = gen_keypair()
    priv = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_b64))
    signed = node.sign_message(priv, {"type": "PREPARE", "seq": 1, "node_id": 0})
    assert "sig" in signed
    # The signature must verify against the body *without* the sig field.
    body = {k: v for k, v in signed.items() if k != "sig"}
    pub = priv.public_key()
    assert node.verify(pub, node.canonical(body), signed["sig"]) is True


# --------------------------------------------------------------------------- #
# config                                                                      #
# --------------------------------------------------------------------------- #


def _fake_env(node_count: int, node_id: int = 0) -> dict[str, str]:
    keys = {i: gen_keypair() for i in range(node_count)}
    peers = {str(i): f"n{i}:5000" for i in range(node_count)}
    pubs = {str(i): kp[1] for i, kp in keys.items()}
    return {
        "NODE_ID": str(node_id),
        "TCP_PORT": "5000",
        "PEERS": json.dumps(peers),
        "PUBLIC_KEYS": json.dumps(pubs),
        "PRIVATE_KEY": keys[node_id][0],
        "PRIMARY_ID": "0",
    }


def test_load_config_parses_env():
    env = _fake_env(node_count=4, node_id=2)
    cfg = node.load_config_from_env(env)
    assert cfg.node_id == 2
    assert cfg.primary_id == 0
    assert cfg.n == 4
    assert set(cfg.peers.keys()) == {0, 1, 2, 3}
    assert set(cfg.public_keys.keys()) == {0, 1, 2, 3}


@pytest.mark.parametrize(
    "n, expected_f, expected_quorum",
    [(4, 1, 3), (7, 2, 5), (10, 3, 7), (1, 0, 1), (3, 0, 1)],
)
def test_quorum_and_fault_tolerance_math(n, expected_f, expected_quorum):
    env = _fake_env(node_count=n)
    cfg = node.load_config_from_env(env)
    assert cfg.fault_tolerance == expected_f
    assert cfg.quorum == expected_quorum


def test_fault_tolerance_override_via_env():
    env = _fake_env(node_count=4)
    env["FAULT_TOLERANCE"] = "0"
    cfg = node.load_config_from_env(env)
    assert cfg.fault_tolerance == 0
    assert cfg.quorum == 1


# --------------------------------------------------------------------------- #
# message dispatch                                                            #
# --------------------------------------------------------------------------- #


def test_handle_routes_by_message_type(monkeypatch):
    env = _fake_env(node_count=4, node_id=0)
    cfg = node.load_config_from_env(env)
    n = node.PBFTNode(cfg, metrics_path="/tmp/test_pbft_metrics.log")

    calls: list[str] = []
    monkeypatch.setattr(n, "_on_client_request", lambda m: calls.append("client"))
    monkeypatch.setattr(n, "_on_pre_prepare", lambda m: calls.append("pp"))
    monkeypatch.setattr(n, "_on_prepare", lambda m: calls.append("p"))
    monkeypatch.setattr(n, "_on_commit", lambda m: calls.append("c"))

    for mtype, tag in [
        ("CLIENT_REQUEST", "client"),
        ("PRE_PREPARE", "pp"),
        ("PREPARE", "p"),
        ("COMMIT", "c"),
    ]:
        n.handle(json.dumps({"type": mtype}).encode())
        assert calls[-1] == tag

    n.handle(b"not json at all")  # must not raise
    n.handle(json.dumps({"type": "UNKNOWN"}).encode())  # ignored
    assert len(calls) == 4


# --------------------------------------------------------------------------- #
# PBFTModule contract                                                         #
# --------------------------------------------------------------------------- #


def test_pbft_module_is_a_consensus_module():
    assert issubclass(PBFTModule, ConsensusModule)
    assert ConsensusModule.__abstractmethods__.issubset(dir(PBFTModule))


def test_payload_digest_is_stable_sha256():
    assert payload_digest(b"hello") == payload_digest(b"hello")
    # Known sha256("hello") prefix
    assert payload_digest(b"hello").startswith("2cf24dba5fb0a30e")


def test_gen_keypair_returns_base64_raw_ed25519():
    priv_b64, pub_b64 = gen_keypair()
    assert len(base64.b64decode(priv_b64)) == 32
    assert len(base64.b64decode(pub_b64)) == 32
