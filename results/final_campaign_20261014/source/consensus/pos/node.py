"""PoS node — chain-based stake-weighted slot leader selection.

Single validator per container. Each slot (default 0.5 s) one validator is
chosen as proposer based on a deterministic stake-weighted lottery seeded
from `(prev_hash, height)`. The proposer signs and broadcasts a block; every
other validator verifies the signature and accepts.

This is the **lowest-energy** PoS variant — no nonce search, no multi-phase
voting, just one signature per block + N-1 verifications. Energy contrast
vs PoW (always-on hashing) and PBFT (3-phase agreement) is the central
result the paper aims to quantify.

Deliberate simplifications (document as limitations in the paper):
    * No slashing, no nothing-at-stake protection — a Byzantine validator
      could double-sign without consequence.
    * No long-range attack defence (would need finality gadget).
    * No view changes / leader rotation on missed slots — slot just expires
      and the next slot fires.
    * No persistent stake accounting — stakes are static for the run.

Wire protocol (newline-delimited JSON over TCP):
    {"type": "TX",    "tx": {...}}                — client or peer submits a tx
    {"type": "BLOCK", "block": {...}}             — proposer broadcasts a block

Block layout (signature is over canonical(body); hash is over canonical(body)+sig):
    index, prev_hash, txs, timestamp, proposer_id, signature, hash

Environment variables:
    NODE_ID            int, 0..N-1
    TCP_PORT           int, default 5000
    PEERS              JSON dict {"node_id": "host:port"}, includes own entry
    PRIVATE_KEY        base64 of 32-byte Ed25519 private key
    PUBLIC_KEYS        JSON dict {"node_id": base64 public key}
    STAKES             JSON dict {"node_id": float}; defaults to equal stakes
    SLOT_SECONDS       float, slot duration (default 0.5)
    BLOCK_SIZE         int, max txs per block (default 10)
    CONFIRMATIONS      int, depth required for "committed" (default 1)
"""
from __future__ import annotations

import base64
import hashlib
import json
import os
import random
import socket
import socketserver
import sys
import threading
import time
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
    private_key: Ed25519PrivateKey
    public_keys: dict[int, Ed25519PublicKey]
    stakes: dict[int, float]
    slot_seconds: float
    block_size: int
    confirmations: int


def load_config_from_env(env: dict[str, str] | None = None) -> NodeConfig:
    env = env if env is not None else dict(os.environ)
    peers = {int(k): v for k, v in json.loads(env["PEERS"]).items()}
    pubs_raw = json.loads(env["PUBLIC_KEYS"])
    public_keys = {
        int(k): Ed25519PublicKey.from_public_bytes(base64.b64decode(v))
        for k, v in pubs_raw.items()
    }
    if "STAKES" in env:
        stakes = {int(k): float(v) for k, v in json.loads(env["STAKES"]).items()}
    else:
        stakes = {nid: 1.0 for nid in peers}
    return NodeConfig(
        node_id=int(env["NODE_ID"]),
        tcp_port=int(env.get("TCP_PORT", "5000")),
        peers=peers,
        private_key=Ed25519PrivateKey.from_private_bytes(
            base64.b64decode(env["PRIVATE_KEY"])
        ),
        public_keys=public_keys,
        stakes=stakes,
        slot_seconds=float(env.get("SLOT_SECONDS", "0.5")),
        block_size=int(env.get("BLOCK_SIZE", "10")),
        confirmations=int(env.get("CONFIRMATIONS", "1")),
    )


# --------------------------------------------------------------------------- #
# Crypto + chain primitives                                                   #
# --------------------------------------------------------------------------- #


def canonical(obj: dict) -> bytes:
    return json.dumps(obj, sort_keys=True, separators=(",", ":")).encode()


def block_body(block: dict) -> dict:
    """Fields covered by the proposer's signature."""
    return {k: block[k] for k in ("index", "prev_hash", "txs", "timestamp", "proposer_id")}


def block_hash(block: dict) -> str:
    """Hash binds body + signature, so two valid signatures over the same body
    still produce different block IDs (avoids accidental dedup confusion)."""
    payload = canonical(block_body(block)) + block["signature"].encode()
    return hashlib.sha256(payload).hexdigest()


def sign_block(priv: Ed25519PrivateKey, block: dict) -> str:
    return base64.b64encode(priv.sign(canonical(block_body(block)))).decode()


def verify_block_signature(pub: Ed25519PublicKey, block: dict) -> bool:
    try:
        pub.verify(base64.b64decode(block["signature"]), canonical(block_body(block)))
        return True
    except (InvalidSignature, ValueError, KeyError):
        return False


def select_proposer(stakes: dict[int, float], prev_hash: str, height: int) -> int:
    """Deterministic stake-weighted lottery. Same inputs → same proposer on
    every node, so consensus on "who is the next proposer" is implicit.
    """
    if not stakes:
        raise ValueError("stakes cannot be empty")
    seed = hashlib.sha256(f"{prev_hash}:{height}".encode()).digest()
    rng = random.Random(seed)
    total = float(sum(stakes.values()))
    pick = rng.uniform(0.0, total)
    cumulative = 0.0
    for nid in sorted(stakes):
        cumulative += stakes[nid]
        if pick <= cumulative:
            return nid
    return sorted(stakes)[-1]  # numerical edge


def genesis_block() -> dict:
    block = {
        "index": 0,
        "prev_hash": "0" * 64,
        "txs": [],
        "timestamp": 0.0,
        "proposer_id": -1,
        "signature": "",
    }
    block["hash"] = block_hash(block)
    return block


# --------------------------------------------------------------------------- #
# Node state                                                                  #
# --------------------------------------------------------------------------- #


@dataclass
class PoSNode:
    cfg: NodeConfig
    chain: list[dict] = field(default_factory=lambda: [genesis_block()])
    mempool: dict[str, dict] = field(default_factory=dict)
    seen_txs: set[str] = field(default_factory=set)
    confirmed_blocks: set[int] = field(default_factory=set)
    state_lock: threading.Lock = field(default_factory=threading.Lock)
    stop: threading.Event = field(default_factory=threading.Event)
    metrics_path: str = "/tmp/metrics.log"
    _io_lock: threading.Lock = field(default_factory=threading.Lock)

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

    # ---- message dispatch -----------------------------------------------

    def handle(self, raw: bytes) -> None:
        try:
            msg = json.loads(raw.decode())
        except (UnicodeDecodeError, json.JSONDecodeError):
            return
        mtype = msg.get("type")
        if mtype == "TX":
            self._on_tx(msg.get("tx") or {}, gossip=True)
        elif mtype == "BLOCK":
            self._on_block(msg.get("block") or {}, source="peer")

    def _on_tx(self, tx: dict, *, gossip: bool) -> None:
        tx_id = tx.get("id")
        if not tx_id:
            return
        with self.state_lock:
            if tx_id in self.seen_txs or tx_id in self.mempool:
                return
            self.mempool[tx_id] = tx
        if gossip:
            self._broadcast({"type": "TX", "tx": tx})

    def _on_block(self, block: dict, *, source: str) -> None:
        if not _block_well_formed(block):
            return
        with self.state_lock:
            head = self.chain[-1]
            if block["index"] != head["index"] + 1:
                return  # only accept the next height — no fork resolution
            if block["prev_hash"] != head["hash"]:
                return
            expected = select_proposer(self.cfg.stakes, head["hash"], block["index"])
            if block["proposer_id"] != expected:
                return  # not the slot leader
            if block_hash(block) != block["hash"]:
                return  # tampered
            pub = self.cfg.public_keys.get(block["proposer_id"])
            if pub is None or not verify_block_signature(pub, block):
                return  # invalid signature
            self.chain.append(block)
            included = {tx["id"] for tx in block["txs"] if "id" in tx}
            for tx_id in included:
                self.mempool.pop(tx_id, None)
                self.seen_txs.add(tx_id)
        self._emit({
            "event": "block_proposed" if source == "self" else "block_received",
            "index": block["index"],
            "proposer_id": block["proposer_id"],
            "tx_count": len(block["txs"]),
        })
        if source == "self":
            self._broadcast({"type": "BLOCK", "block": block})
        self._maybe_emit_committed()

    def _maybe_emit_committed(self) -> None:
        with self.state_lock:
            head_index = self.chain[-1]["index"]
            confirm_threshold = head_index - self.cfg.confirmations
            ready_blocks = [
                b for b in self.chain
                if b["index"] <= confirm_threshold and b["index"] not in self.confirmed_blocks
            ]
            for b in ready_blocks:
                self.confirmed_blocks.add(b["index"])
        for b in ready_blocks:
            for tx in b["txs"]:
                tx_id = tx.get("id")
                if not tx_id:
                    continue
                self._emit({
                    "event": "committed",
                    "request_id": tx_id,
                    "index": b["index"],
                })

    # ---- proposer / slot loop -------------------------------------------

    def run_slot_loop(self) -> None:
        next_slot_time = time.time() + self.cfg.slot_seconds
        while not self.stop.is_set():
            sleep_for = max(0.001, next_slot_time - time.time())
            if self.stop.wait(sleep_for):
                return
            with self.state_lock:
                head = self.chain[-1]
                next_height = head["index"] + 1
                proposer = select_proposer(self.cfg.stakes, head["hash"], next_height)
            if proposer == self.cfg.node_id:
                self._propose_block()
            next_slot_time += self.cfg.slot_seconds

    def _propose_block(self) -> None:
        with self.state_lock:
            head = self.chain[-1]
            picked = list(self.mempool.values())[: self.cfg.block_size]
        candidate = {
            "index": head["index"] + 1,
            "prev_hash": head["hash"],
            "txs": picked,
            "timestamp": time.time(),
            "proposer_id": self.cfg.node_id,
        }
        candidate["signature"] = sign_block(self.cfg.private_key, candidate)
        candidate["hash"] = block_hash(candidate)
        self._on_block(candidate, source="self")


def _block_well_formed(block: dict) -> bool:
    required = {"index", "prev_hash", "txs", "timestamp", "proposer_id", "signature", "hash"}
    if not required.issubset(block):
        return False
    return isinstance(block["txs"], list)


# --------------------------------------------------------------------------- #
# TCP server                                                                  #
# --------------------------------------------------------------------------- #


def _make_server(node: PoSNode) -> socketserver.ThreadingTCPServer:
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
    node = PoSNode(cfg=cfg)
    server = _make_server(node)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    threading.Thread(target=node.run_slot_loop, daemon=True, name="slot-loop").start()
    print(
        json.dumps({
            "event": "ready",
            "node_id": cfg.node_id,
            "port": cfg.tcp_port,
            "slot_seconds": cfg.slot_seconds,
        }),
        flush=True,
    )
    threading.Event().wait()  # block forever (server thread keeps running)


if __name__ == "__main__":
    main()
