"""PoW node — minimal Bitcoin-style SHA-256 nonce search.

One container per miner. In-memory chain and mempool. Mining thread searches
nonces in batches (`BATCH_HASHES`) so a peer block arrival can preempt within
~milliseconds. Every well-formed, sufficiently-hard block the node ever sees
(own or peer) is kept in `blocks_by_hash`; on each new block the node
recomputes the longest valid chain reachable from any known block and
reorgs onto it if it beats the current head (ties broken by lowest tip
hash, so all nodes converge on the same branch independently). Transactions
orphaned by a reorg go back to the mempool for re-mining.

Reorgs never rewrite a block at or below the deepest already-confirmed
index — finality is defined by confirmation depth, not by "currently
longest chain", so a `committed` event once emitted is never invalidated.

Wire protocol (newline-delimited JSON over TCP):
    {"type": "TX",    "tx": {...}}                — client or peer submits a tx
    {"type": "BLOCK", "block": {...}}             — peer broadcasts a new block

Block layout (all fields participate in the hash except `hash` itself):
    index, prev_hash, txs, timestamp, nonce, miner_id, hash

A block is valid iff
    int(sha256(canonical(body)), 16) < 2**(256 - difficulty_bits)

A transaction is "committed" once it sits in a block whose index is at least
`confirmations` deep below the current chain head.

Environment variables:
    NODE_ID            int, 0..N-1
    TCP_PORT           int, default 5000
    PEERS              JSON dict {"node_id": "host:port"}, includes own entry
    DIFFICULTY_BITS    int, target leading zero bits in block hash (default 20)
    BLOCK_SIZE         int, max txs per block (default 10)
    CONFIRMATIONS      int, depth required for a tx to be considered committed (default 1)
    BATCH_HASHES       int, nonces tried per preemption check (default 5000)
"""
from __future__ import annotations

import hashlib
import json
import os
import socket
import socketserver
import sys
import threading
import time
from dataclasses import dataclass, field


# --------------------------------------------------------------------------- #
# Config                                                                      #
# --------------------------------------------------------------------------- #


@dataclass
class NodeConfig:
    node_id: int
    tcp_port: int
    peers: dict[int, str]
    difficulty_bits: int
    block_size: int
    confirmations: int
    batch_hashes: int


def load_config_from_env(env: dict[str, str] | None = None) -> NodeConfig:
    env = env if env is not None else dict(os.environ)
    return NodeConfig(
        node_id=int(env["NODE_ID"]),
        tcp_port=int(env.get("TCP_PORT", "5000")),
        peers={int(k): v for k, v in json.loads(env["PEERS"]).items()},
        difficulty_bits=int(env.get("DIFFICULTY_BITS", "20")),
        block_size=int(env.get("BLOCK_SIZE", "10")),
        confirmations=int(env.get("CONFIRMATIONS", "1")),
        batch_hashes=int(env.get("BATCH_HASHES", "5000")),
    )


# --------------------------------------------------------------------------- #
# Chain primitives                                                            #
# --------------------------------------------------------------------------- #


def canonical(obj: dict) -> bytes:
    return json.dumps(obj, sort_keys=True, separators=(",", ":")).encode()


def block_hash(block: dict) -> str:
    body = {k: block[k] for k in ("index", "prev_hash", "txs", "timestamp", "nonce", "miner_id")}
    return hashlib.sha256(canonical(body)).hexdigest()


def difficulty_target(bits: int) -> int:
    """Maximum allowed numeric value of a block hash for the given bits."""
    return 1 << (256 - bits)


def meets_difficulty(hex_hash: str, bits: int) -> bool:
    return int(hex_hash, 16) < difficulty_target(bits)


def chain_from_tip(blocks_by_hash: dict[str, dict], tip_hash: str) -> list[dict] | None:
    """Walk prev_hash pointers from `tip_hash` back to genesis.

    Returns the chain root-first, or None if any link is missing or its
    index isn't exactly one more than its parent's (a malformed or
    not-yet-fully-received branch).
    """
    chain: list[dict] = []
    h = tip_hash
    while True:
        block = blocks_by_hash.get(h)
        if block is None:
            return None
        chain.append(block)
        if block["index"] == 0:
            chain.reverse()
            return chain
        parent = blocks_by_hash.get(block["prev_hash"])
        if parent is None or parent["index"] != block["index"] - 1:
            return None
        h = block["prev_hash"]


def longest_chain(blocks_by_hash: dict[str, dict]) -> list[dict]:
    """The longest valid chain reachable from any known block.

    Ties broken by lowest tip hash so every node resolves the same fork the
    same way without needing to coordinate. Always returns at least genesis.
    """
    best: list[dict] | None = None
    for tip_hash in blocks_by_hash:
        candidate = chain_from_tip(blocks_by_hash, tip_hash)
        if candidate is None:
            continue
        if (
            best is None
            or len(candidate) > len(best)
            or (len(candidate) == len(best) and candidate[-1]["hash"] < best[-1]["hash"])
        ):
            best = candidate
    assert best is not None  # genesis alone is always a valid candidate
    return best


def genesis_block() -> dict:
    """Hard-coded genesis — same on every node so they share a starting point."""
    block = {
        "index": 0,
        "prev_hash": "0" * 64,
        "txs": [],
        "timestamp": 0.0,
        "nonce": 0,
        "miner_id": -1,
    }
    block["hash"] = block_hash(block)
    return block


# --------------------------------------------------------------------------- #
# Node state                                                                  #
# --------------------------------------------------------------------------- #


@dataclass
class PowNode:
    cfg: NodeConfig
    chain: list[dict] = field(default_factory=lambda: [genesis_block()])
    mempool: dict[str, dict] = field(default_factory=dict)        # tx_id -> tx
    seen_txs: set[str] = field(default_factory=set)               # ever included in chain
    confirmed_blocks: set[int] = field(default_factory=set)       # indices already emitted
    blocks_by_hash: dict[str, dict] = field(default_factory=dict) # every valid block ever seen
    state_lock: threading.Lock = field(default_factory=threading.Lock)
    head_changed: threading.Event = field(default_factory=threading.Event)
    stop: threading.Event = field(default_factory=threading.Event)
    metrics_path: str = "/tmp/metrics.log"
    _io_lock: threading.Lock = field(default_factory=threading.Lock)

    def __post_init__(self) -> None:
        genesis = self.chain[0]
        self.blocks_by_hash[genesis["hash"]] = genesis

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
        if not _block_is_well_formed(block):
            return
        if not meets_difficulty(block["hash"], self.cfg.difficulty_bits):
            return
        if block_hash(block) != block["hash"]:
            return
        with self.state_lock:
            if block["hash"] in self.blocks_by_hash:
                return  # already known, whether on our chain or a losing fork
            self.blocks_by_hash[block["hash"]] = block
            old_head = self.chain[-1]
            best = longest_chain(self.blocks_by_hash)
            reorged = False
            if best[-1]["hash"] != old_head["hash"]:
                divergence = _divergence_index(self.chain, best)
                # Never rewrite an already-confirmed block: finality is by
                # confirmation depth, not by "currently longest chain".
                if not self.confirmed_blocks or divergence > max(self.confirmed_blocks):
                    self._apply_reorg(best)
                    reorged = True
            # Only signal preemption when a PEER block actually changed our
            # head — our own mining loop already restarts on its own solves,
            # and a losing fork block shouldn't interrupt current mining.
            if reorged and source == "peer":
                self.head_changed.set()
        if reorged:
            self._emit({
                "event": "block_received" if source == "peer" else "block_mined",
                "index": block["index"],
                "miner_id": block["miner_id"],
                "tx_count": len(block["txs"]),
            })
            self._maybe_emit_committed()
        if source != "peer":
            # Peer blocks aren't re-broadcast (the sender already did); a
            # block we produced ourselves is broadcast even if it lost the
            # race to become our head — peers may still extend it.
            self._broadcast({"type": "BLOCK", "block": block})

    def _apply_reorg(self, new_chain: list[dict]) -> None:
        old_txs = {tx["id"]: tx for b in self.chain for tx in b["txs"] if "id" in tx}
        new_ids = {tx["id"] for b in new_chain for tx in b["txs"] if "id" in tx}
        for tx_id, tx in old_txs.items():
            if tx_id not in new_ids:
                self.mempool[tx_id] = tx  # orphaned by the reorg — eligible for re-mining
        for tx_id in new_ids:
            self.mempool.pop(tx_id, None)
        self.chain = new_chain
        self.seen_txs = new_ids

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

    # ---- mining ----------------------------------------------------------

    def mine(self) -> None:
        while not self.stop.is_set():
            candidate = self._build_candidate()
            self._search_nonces(candidate)

    def _build_candidate(self) -> dict:
        """Always returns a candidate — empty blocks are mined too.

        Real PoW chains burn CPU on empty blocks for the reward + chain
        progress, and confirmation depth requires *some* block on top of the
        last txn-bearing block. Without empty mining, the final block's txs
        would never reach the confirmation threshold once the mempool drains.
        """
        with self.state_lock:
            head = self.chain[-1]
            picked = list(self.mempool.values())[: self.cfg.block_size]
        return {
            "index": head["index"] + 1,
            "prev_hash": head["hash"],
            "txs": picked,
            "timestamp": time.time(),
            "nonce": 0,
            "miner_id": self.cfg.node_id,
        }

    def _search_nonces(self, candidate: dict) -> None:
        nonce = 0
        batch = self.cfg.batch_hashes
        target = difficulty_target(self.cfg.difficulty_bits)
        while not self.stop.is_set():
            if self.head_changed.is_set():
                self.head_changed.clear()
                return
            for n in range(nonce, nonce + batch):
                candidate["nonce"] = n
                h = block_hash(candidate)
                if int(h, 16) < target:
                    candidate["hash"] = h
                    self._on_block(candidate, source="self")
                    return
            nonce += batch


def _divergence_index(old_chain: list[dict], new_chain: list[dict]) -> int:
    """Index of the first block where two chains differ (== the shared
    prefix length). Both chains are contiguous from genesis, so this index
    equals the `index` field of the first differing block."""
    i = 0
    limit = min(len(old_chain), len(new_chain))
    while i < limit and old_chain[i]["hash"] == new_chain[i]["hash"]:
        i += 1
    return i


def _block_is_well_formed(block: dict) -> bool:
    required = {"index", "prev_hash", "txs", "timestamp", "nonce", "miner_id", "hash"}
    if not required.issubset(block):
        return False
    if not isinstance(block["txs"], list):
        return False
    return True


# --------------------------------------------------------------------------- #
# TCP server                                                                  #
# --------------------------------------------------------------------------- #


def _make_server(node: PowNode) -> socketserver.ThreadingTCPServer:
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
    node = PowNode(cfg=cfg)
    server = _make_server(node)
    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()
    miner_thread = threading.Thread(target=node.mine, daemon=True, name="miner")
    miner_thread.start()
    print(
        json.dumps({
            "event": "ready",
            "node_id": cfg.node_id,
            "port": cfg.tcp_port,
            "difficulty_bits": cfg.difficulty_bits,
        }),
        flush=True,
    )
    server_thread.join()


if __name__ == "__main__":
    main()
