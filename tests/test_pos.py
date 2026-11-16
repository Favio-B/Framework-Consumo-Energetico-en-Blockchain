"""Unit + integration tests for the PoS module.

Unit tests (no Docker): proposer selection determinism + stake weighting,
canonical encoding, signature roundtrip, block validation rules, mempool
dedup, confirmation emission, ABC conformance.

Integration test (Docker required, auto-skipped otherwise): 3-validator
cluster with equal stakes commits 5 transactions on a quorum.
"""
from __future__ import annotations

import base64
import json
import time

import pytest

from consensus.base import ConsensusModule
from consensus.pos import node
from consensus.pos.module import POSModule, gen_keypair


# =========================================================================== #
# Crypto + canonical                                                          #
# =========================================================================== #


def test_canonical_is_deterministic():
    a = node.canonical({"x": 1, "y": [3, 2, 1]})
    b = node.canonical({"y": [3, 2, 1], "x": 1})
    assert a == b


def test_sign_verify_roundtrip():
    priv_b64, pub_b64 = gen_keypair()
    priv = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_b64))
    pub = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b64))
    block = {
        "index": 1, "prev_hash": "00", "txs": [{"id": "t1"}],
        "timestamp": 1.0, "proposer_id": 0,
    }
    block["signature"] = node.sign_block(priv, block)
    block["hash"] = node.block_hash(block)
    assert node.verify_block_signature(pub, block) is True


def test_verify_rejects_tampered_body():
    priv_b64, pub_b64 = gen_keypair()
    priv = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_b64))
    pub = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b64))
    block = {
        "index": 1, "prev_hash": "00", "txs": [], "timestamp": 1.0, "proposer_id": 0,
    }
    block["signature"] = node.sign_block(priv, block)
    # Mutate index after signing.
    block["index"] = 99
    assert node.verify_block_signature(pub, block) is False


def test_verify_rejects_wrong_key():
    priv_a_b64, _ = gen_keypair()
    _, pub_b_b64 = gen_keypair()
    priv_a = node.Ed25519PrivateKey.from_private_bytes(base64.b64decode(priv_a_b64))
    pub_b = node.Ed25519PublicKey.from_public_bytes(base64.b64decode(pub_b_b64))
    block = {
        "index": 1, "prev_hash": "00", "txs": [], "timestamp": 1.0, "proposer_id": 0,
    }
    block["signature"] = node.sign_block(priv_a, block)
    assert node.verify_block_signature(pub_b, block) is False


# =========================================================================== #
# Proposer selection                                                          #
# =========================================================================== #


def test_select_proposer_is_deterministic():
    stakes = {0: 1.0, 1: 1.0, 2: 1.0}
    a = node.select_proposer(stakes, prev_hash="abc", height=1)
    b = node.select_proposer(stakes, prev_hash="abc", height=1)
    assert a == b


def test_select_proposer_changes_with_height():
    stakes = {0: 1.0, 1: 1.0, 2: 1.0}
    seen = {node.select_proposer(stakes, "x", h) for h in range(50)}
    # Over 50 heights with equal stakes we should see all 3 validators.
    assert seen == {0, 1, 2}


def test_select_proposer_respects_stake_weighting():
    stakes = {0: 99.0, 1: 0.5, 2: 0.5}
    counts = {0: 0, 1: 0, 2: 0}
    for h in range(2000):
        counts[node.select_proposer(stakes, "x", h)] += 1
    # Validator 0 has 99% of stake → should win an overwhelming majority.
    # Loose bound to keep the test deterministic-but-tolerant.
    assert counts[0] > 1900
    assert counts[1] + counts[2] < 100


def test_select_proposer_rejects_empty_stakes():
    with pytest.raises(ValueError):
        node.select_proposer({}, "x", 0)


# =========================================================================== #
# Config loader                                                               #
# =========================================================================== #


def _fake_env(node_count: int = 3, **overrides) -> dict[str, str]:
    keys = {i: gen_keypair() for i in range(node_count)}
    peers = {str(i): f"n{i}:5000" for i in range(node_count)}
    pubs = {str(i): kp[1] for i, kp in keys.items()}
    base = {
        "NODE_ID": "0",
        "TCP_PORT": "5000",
        "PEERS": json.dumps(peers),
        "PUBLIC_KEYS": json.dumps(pubs),
        "PRIVATE_KEY": keys[0][0],
    }
    base.update({k: str(v) for k, v in overrides.items()})
    return base


def test_load_config_uses_defaults_when_unset():
    cfg = node.load_config_from_env(_fake_env())
    assert cfg.slot_seconds == 0.5
    assert cfg.block_size == 10
    assert cfg.confirmations == 1
    # Default stakes: equal across all peers.
    assert set(cfg.stakes) == {0, 1, 2}
    assert all(v == 1.0 for v in cfg.stakes.values())


def test_load_config_respects_overrides():
    env = _fake_env(SLOT_SECONDS=1.5, BLOCK_SIZE=20, CONFIRMATIONS=2)
    env["STAKES"] = json.dumps({"0": 50, "1": 30, "2": 20})
    cfg = node.load_config_from_env(env)
    assert cfg.slot_seconds == 1.5
    assert cfg.block_size == 20
    assert cfg.confirmations == 2
    assert cfg.stakes == {0: 50.0, 1: 30.0, 2: 20.0}


# =========================================================================== #
# In-process node behaviour                                                   #
# =========================================================================== #


def _make_node(**overrides) -> node.PoSNode:
    cfg = node.load_config_from_env(_fake_env(**overrides))
    return node.PoSNode(cfg=cfg)


def test_genesis_block_is_consistent():
    g = node.genesis_block()
    assert g["index"] == 0
    assert g["prev_hash"] == "0" * 64
    assert g["txs"] == []
    assert g["proposer_id"] == -1
    # Hash binds body + (empty) signature.
    assert g["hash"] == node.block_hash(g)


def test_handle_tx_adds_to_mempool_and_dedupes():
    n = _make_node()
    n.handle(json.dumps({"type": "TX", "tx": {"id": "t1"}}).encode())
    assert "t1" in n.mempool
    n.handle(json.dumps({"type": "TX", "tx": {"id": "t1"}}).encode())
    assert len(n.mempool) == 1


def test_propose_block_when_my_turn(monkeypatch):
    """Force the proposer to be node 0 and verify the block lands in chain."""
    n = _make_node(NODE_ID=0)
    monkeypatch.setattr(node, "select_proposer", lambda stakes, prev_hash, height: 0)
    n._on_tx({"id": "tx-A"}, gossip=False)
    n._propose_block()
    assert len(n.chain) == 2
    block = n.chain[-1]
    assert block["proposer_id"] == 0
    assert any(tx["id"] == "tx-A" for tx in block["txs"])
    assert "tx-A" not in n.mempool  # included → removed from mempool


def test_block_from_wrong_proposer_is_rejected(monkeypatch):
    """A block whose proposer_id mismatches the slot leader gets dropped."""
    n = _make_node(NODE_ID=0)
    # Slot leader is determined by select_proposer; force it to be 1.
    monkeypatch.setattr(node, "select_proposer", lambda stakes, prev_hash, height: 1)
    # But we craft a block claiming proposer_id=2 (not the slot leader).
    impostor_priv = node.Ed25519PrivateKey.from_private_bytes(
        base64.b64decode(gen_keypair()[0])
    )
    block = {
        "index": 1, "prev_hash": n.chain[-1]["hash"], "txs": [],
        "timestamp": 1.0, "proposer_id": 2,
    }
    block["signature"] = node.sign_block(impostor_priv, block)
    block["hash"] = node.block_hash(block)
    n._on_block(block, source="peer")
    assert len(n.chain) == 1


def test_block_with_invalid_signature_is_rejected(monkeypatch):
    n = _make_node(NODE_ID=0)
    monkeypatch.setattr(node, "select_proposer", lambda stakes, prev_hash, height: 1)
    block = {
        "index": 1, "prev_hash": n.chain[-1]["hash"], "txs": [],
        "timestamp": 1.0, "proposer_id": 1,
        "signature": base64.b64encode(b"\x00" * 64).decode(),  # garbage
    }
    block["hash"] = node.block_hash(block)
    n._on_block(block, source="peer")
    assert len(n.chain) == 1


def test_block_at_wrong_height_is_rejected():
    n = _make_node()
    block = {
        "index": 5, "prev_hash": n.chain[-1]["hash"], "txs": [],
        "timestamp": 1.0, "proposer_id": 0, "signature": "", "hash": "00",
    }
    n._on_block(block, source="peer")
    assert len(n.chain) == 1


def test_committed_event_emitted_only_after_confirmations(monkeypatch):
    n = _make_node(NODE_ID=0, CONFIRMATIONS=1)
    monkeypatch.setattr(node, "select_proposer", lambda stakes, prev_hash, height: 0)
    emissions: list[dict] = []
    n._emit = lambda evt: emissions.append(evt)  # type: ignore[assignment]

    n._on_tx({"id": "tx-1"}, gossip=False)
    n._propose_block()  # block at index 1 with tx-1
    assert all(e["event"] != "committed" for e in emissions)

    n._on_tx({"id": "tx-2"}, gossip=False)
    n._propose_block()  # block at index 2; block 1 now confirmed
    committed = [e for e in emissions if e["event"] == "committed"]
    assert any(e["request_id"] == "tx-1" for e in committed)


def test_handle_routes_unknown_type_safely():
    n = _make_node()
    n.handle(b"not json")
    n.handle(json.dumps({"type": "WHATEVER"}).encode())
    assert n.mempool == {}


# =========================================================================== #
# POSModule contract                                                          #
# =========================================================================== #


def test_pos_module_is_a_consensus_module():
    assert issubclass(POSModule, ConsensusModule)
    assert ConsensusModule.__abstractmethods__.issubset(dir(POSModule))


# =========================================================================== #
# Integration — Docker required                                               #
# =========================================================================== #


pytest.importorskip("docker")


@pytest.fixture(scope="module")
def docker_available():
    import docker as _docker
    try:
        client = _docker.from_env()
        client.ping()
    except Exception as exc:  # noqa: BLE001
        pytest.skip(f"Docker daemon not reachable: {exc}")


@pytest.fixture()
def pos_module(docker_available):
    mod = POSModule()
    try:
        yield mod
    finally:
        mod.stop()


@pytest.mark.timeout(180)
def test_pos_three_validator_cluster_commits_transactions(pos_module: POSModule):
    """3-validator PoS cluster, equal stakes, all 5 txs commit on a quorum.

    With slot_seconds=0.5, two slots fire within ~1 s — first slot proposes a
    block carrying the 5 txs (mempool has them by then), second slot acts as
    the confirmation block. Quorum=2 of 3 keeps the test robust to a single
    slot being dropped under container scheduling jitter.
    """
    tx_count = 5
    pos_module.start(
        node_count=3,
        config={
            "cpu_limit": 1.0,
            "mem_limit": "512m",
            "warmup_seconds": 45,
            "slot_seconds": 0.5,
            "block_size": 10,
            "confirmations": 1,
        },
    )
    pos_module.submit_transactions(count=tx_count, rate_tps=10.0)

    deadline = time.time() + 30
    metrics: dict = {}
    while time.time() < deadline:
        metrics = pos_module.get_metrics()
        committed_majority = sum(
            1
            for commits in metrics.get("commits_by_request", {}).values()
            if len(commits) >= 2
        )
        if committed_majority >= tx_count:
            break
        time.sleep(0.5)

    assert metrics["algorithm"] == "pos"
    assert metrics["node_count"] == 3
    by_majority = {
        tx_id
        for tx_id, commits in metrics["commits_by_request"].items()
        if len(commits) >= 2
    }
    assert len(by_majority) >= tx_count, (
        f"only {len(by_majority)}/{tx_count} txs committed on quorum; metrics={metrics}"
    )
    assert sum(metrics["blocks_proposed_per_node"].values()) >= 2, (
        f"expected ≥2 proposed blocks, got {metrics['blocks_proposed_per_node']}"
    )
