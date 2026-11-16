"""PBFT node — Castro & Liskov 1999, simplified for benchmarking.

Runs inside a Docker container. One instance per replica. Uses Ed25519
signatures for inter-node authentication (realistic CPU cost), a single
listening TCP port for both peer and client traffic, and line-delimited JSON
for the wire format.

Deliberately out of scope (documented as limitations in the final report):
    * View changes (if the primary is Byzantine, the protocol halts).
    * Checkpointing / log garbage collection.
    * Request batching (one request = one three-phase agreement).
    * Client reply aggregation (we measure from server-side commit events).

Environment variables (all read at startup):
    NODE_ID         int, 0..N-1
    TCP_PORT        int, default 5000
    PEERS           JSON dict {"node_id": "host:port"}, includes own entry
    PRIMARY_ID      int, default 0
    PRIVATE_KEY     base64 of 32-byte Ed25519 private key
    PUBLIC_KEYS     JSON dict {"node_id": base64 public key}
    FAULT_TOLERANCE int, optional; defaults to (N-1)//3
"""
from __future__ import annotations

import base64
import json
import os
import socket
import socketserver
import sys
import threading
import time
from collections import defaultdict
from dataclasses import dataclass, field

from cryptography.exceptions import InvalidSignature
from cryptography.hazmat.primitives.asymmetric.ed25519 import (
    Ed25519PrivateKey,
    Ed25519PublicKey,
)


# --------------------------------------------------------------------------- #
# Config                                                                      #
# --------------------------------------------------------------------------- #


@dataclass
class NodeConfig:
    node_id: int
    tcp_port: int
    peers: dict[int, str]
    primary_id: int
    private_key: Ed25519PrivateKey
    public_keys: dict[int, Ed25519PublicKey]
    fault_tolerance: int

    @property
    def n(self) -> int:
        return len(self.peers)

    @property
    def quorum(self) -> int:
        return 2 * self.fault_tolerance + 1


def load_config_from_env(env: dict[str, str] | None = None) -> NodeConfig:
    env = env if env is not None else dict(os.environ)
    peers = {int(k): v for k, v in json.loads(env["PEERS"]).items()}
    f = int(env.get("FAULT_TOLERANCE", str((len(peers) - 1) // 3)))
    return NodeConfig(
        node_id=int(env["NODE_ID"]),
        tcp_port=int(env.get("TCP_PORT", "5000")),
        peers=peers,
        primary_id=int(env.get("PRIMARY_ID", "0")),
        private_key=Ed25519PrivateKey.from_private_bytes(
            base64.b64decode(env["PRIVATE_KEY"])
        ),
        public_keys={
            int(k): Ed25519PublicKey.from_public_bytes(base64.b64decode(v))
            for k, v in json.loads(env["PUBLIC_KEYS"]).items()
        },
        fault_tolerance=f,
    )


# --------------------------------------------------------------------------- #
# Crypto + wire format                                                        #
# --------------------------------------------------------------------------- #


def canonical(msg: dict) -> bytes:
    """Stable JSON encoding used both for signing and hashing."""
    return json.dumps(msg, sort_keys=True, separators=(",", ":")).encode()


def sign(priv: Ed25519PrivateKey, payload: bytes) -> str:
    return base64.b64encode(priv.sign(payload)).decode()


def verify(pub: Ed25519PublicKey, payload: bytes, sig_b64: str) -> bool:
    try:
        pub.verify(base64.b64decode(sig_b64), payload)
        return True
    except (InvalidSignature, ValueError):
        return False


def sign_message(priv: Ed25519PrivateKey, msg: dict) -> dict:
    body = {k: v for k, v in msg.items() if k != "sig"}
    return {**msg, "sig": sign(priv, canonical(body))}


# --------------------------------------------------------------------------- #
# PBFT state                                                                  #
# --------------------------------------------------------------------------- #


@dataclass
class Slot:
    """Per (view, seq) agreement state."""

    pre_prepare: dict | None = None
    prepares: set[int] = field(default_factory=set)
    commits: set[int] = field(default_factory=set)
    prepared: bool = False
    committed: bool = False


class PBFTNode:
    def __init__(self, cfg: NodeConfig, metrics_path: str = "/tmp/metrics.log") -> None:
        self.cfg = cfg
        self.view = 0
        self.next_seq = 0
        self.log: dict[tuple[int, int], Slot] = defaultdict(Slot)
        self.lock = threading.Lock()
        self.metrics_path = metrics_path
        self._io_lock = threading.Lock()

    # ---- I/O -------------------------------------------------------------

    def _send(self, peer_id: int, msg: dict) -> None:
        if peer_id == self.cfg.node_id:
            return
        host, port = self.cfg.peers[peer_id].split(":")
        try:
            with socket.create_connection((host, int(port)), timeout=3.0) as s:
                s.sendall(canonical(msg) + b"\n")
        except OSError as e:
            self._stderr(f"send_fail peer={peer_id} err={e!r}")

    def _broadcast(self, msg: dict) -> None:
        for pid in self.cfg.peers:
            if pid == self.cfg.node_id:
                continue
            threading.Thread(target=self._send, args=(pid, msg), daemon=True).start()

    def _emit(self, event: dict) -> None:
        event["ts"] = time.time()
        event["node_id"] = self.cfg.node_id
        line = json.dumps(event, separators=(",", ":"))
        with self._io_lock:
            try:
                with open(self.metrics_path, "a") as fh:
                    fh.write(line + "\n")
            except OSError:
                pass
            print(line, flush=True)

    def _stderr(self, text: str) -> None:
        sys.stderr.write(f"[n{self.cfg.node_id}] {text}\n")
        sys.stderr.flush()

    # ---- message dispatch ------------------------------------------------

    def handle(self, raw: bytes) -> None:
        try:
            msg = json.loads(raw.decode())
        except (UnicodeDecodeError, json.JSONDecodeError):
            return
        mtype = msg.get("type")
        if mtype == "CLIENT_REQUEST":
            self._on_client_request(msg)
        elif mtype == "PRE_PREPARE":
            self._on_pre_prepare(msg)
        elif mtype == "PREPARE":
            self._on_prepare(msg)
        elif mtype == "COMMIT":
            self._on_commit(msg)

    # ---- phase 1: client → primary → PRE_PREPARE -------------------------

    def _on_client_request(self, req: dict) -> None:
        # Client requests are not signed (client is external to the replica set).
        if self.cfg.node_id != self.cfg.primary_id:
            return
        with self.lock:
            self.next_seq += 1
            view, seq = self.view, self.next_seq
        pp = sign_message(
            self.cfg.private_key,
            {
                "type": "PRE_PREPARE",
                "view": view,
                "seq": seq,
                "digest": req["digest"],
                "request_id": req["request_id"],
                "node_id": self.cfg.node_id,
            },
        )
        self._emit({"event": "pre_prepare_sent", "seq": seq, "request_id": req["request_id"]})
        self._apply_pre_prepare(pp)
        self._broadcast(pp)

    def _on_pre_prepare(self, msg: dict) -> None:
        if msg.get("node_id") != self.cfg.primary_id:
            return  # only the primary may issue PRE_PREPARE
        if not self._verify_sig(msg):
            return
        self._apply_pre_prepare(msg)

    def _apply_pre_prepare(self, msg: dict) -> None:
        view, seq = msg["view"], msg["seq"]
        with self.lock:
            slot = self.log[(view, seq)]
            if slot.pre_prepare is not None:
                return
            slot.pre_prepare = msg
        # Every replica (primary included) issues a PREPARE so quorum math is uniform.
        prep = sign_message(
            self.cfg.private_key,
            {
                "type": "PREPARE",
                "view": view,
                "seq": seq,
                "digest": msg["digest"],
                "node_id": self.cfg.node_id,
            },
        )
        self._on_prepare(prep)
        self._broadcast(prep)

    # ---- phase 2: PREPARE ------------------------------------------------

    def _on_prepare(self, msg: dict) -> None:
        if not self._verify_sig(msg):
            return
        view, seq = msg["view"], msg["seq"]
        digest_of_msg = msg["digest"]
        with self.lock:
            slot = self.log[(view, seq)]
            if slot.pre_prepare is not None and slot.pre_prepare["digest"] != digest_of_msg:
                return
            slot.prepares.add(msg["node_id"])
            if (
                slot.prepared
                or slot.pre_prepare is None
                or len(slot.prepares) < self.cfg.quorum
            ):
                return
            slot.prepared = True
            digest = slot.pre_prepare["digest"]
        self._emit({"event": "prepared", "seq": seq})
        com = sign_message(
            self.cfg.private_key,
            {
                "type": "COMMIT",
                "view": view,
                "seq": seq,
                "digest": digest,
                "node_id": self.cfg.node_id,
            },
        )
        self._on_commit(com)
        self._broadcast(com)

    # ---- phase 3: COMMIT -------------------------------------------------

    def _on_commit(self, msg: dict) -> None:
        if not self._verify_sig(msg):
            return
        view, seq = msg["view"], msg["seq"]
        with self.lock:
            slot = self.log[(view, seq)]
            if slot.pre_prepare is not None and slot.pre_prepare["digest"] != msg["digest"]:
                return
            slot.commits.add(msg["node_id"])
            if (
                slot.committed
                or not slot.prepared
                or len(slot.commits) < self.cfg.quorum
            ):
                return
            slot.committed = True
            req_id = slot.pre_prepare["request_id"] if slot.pre_prepare else None
        self._emit({"event": "committed", "seq": seq, "request_id": req_id})

    # ---- signature check -------------------------------------------------

    def _verify_sig(self, msg: dict) -> bool:
        sender = msg.get("node_id")
        sig_b64 = msg.get("sig")
        if sender is None or sig_b64 is None or sender not in self.cfg.public_keys:
            return False
        body = {k: v for k, v in msg.items() if k != "sig"}
        return verify(self.cfg.public_keys[sender], canonical(body), sig_b64)


# --------------------------------------------------------------------------- #
# TCP server                                                                  #
# --------------------------------------------------------------------------- #


def _make_server(node: PBFTNode) -> socketserver.ThreadingTCPServer:
    class Handler(socketserver.StreamRequestHandler):
        def handle(self) -> None:
            for line in self.rfile:
                node.handle(line.strip())

    class Server(socketserver.ThreadingTCPServer):
        allow_reuse_address = True
        daemon_threads = True

    return Server(("0.0.0.0", node.cfg.tcp_port), Handler)


# --------------------------------------------------------------------------- #
# Entry point                                                                 #
# --------------------------------------------------------------------------- #


def main() -> None:
    cfg = load_config_from_env()
    node = PBFTNode(cfg)
    server = _make_server(node)
    t = threading.Thread(target=server.serve_forever, daemon=True)
    t.start()
    # The orchestrator scans container logs for this line to declare readiness.
    print(
        json.dumps({"event": "ready", "node_id": cfg.node_id, "port": cfg.tcp_port}),
        flush=True,
    )
    t.join()


if __name__ == "__main__":
    main()
