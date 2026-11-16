"""Unit + integration tests for the PoW module.

Unit tests (no Docker): difficulty math, canonical encoding, block hashing,
config loading, mempool dedup, chain extension, mined-block emit, commitment
threshold, ABC conformance.

Integration test (Docker required, auto-skipped otherwise): 3-node cluster with
low difficulty mines a few blocks and commits 5 transactions end to end.
"""
from __future__ import annotations

import json
import time

import pytest

from consensus.base import ConsensusModule
from consensus.pow import node
from consensus.pow.module import POWModule


# =========================================================================== #
# Difficulty math + canonical encoding                                        #
# =========================================================================== #


def test_difficulty_target_is_inverse_of_bits():
    assert node.difficulty_target(0) == 1 << 256
    assert node.difficulty_target(8) == 1 << 248
    assert node.difficulty_target(20) == 1 << 236


def test_meets_difficulty_for_known_zero_hash():
    # The all-zeros hash satisfies any difficulty up to 256.
    zero_hash = "0" * 64
    assert node.meets_difficulty(zero_hash, bits=20)
    assert node.meets_difficulty(zero_hash, bits=255)


def test_meets_difficulty_for_max_hash():
    # The max possible hash satisfies only difficulty=0.
    max_hash = "f" * 64
    assert node.meets_difficulty(max_hash, bits=0)
    assert not node.meets_difficulty(max_hash, bits=1)


def test_meets_difficulty_threshold_boundary():
    # Hash of value exactly target is NOT < target.
    bits = 4
    target_int = node.difficulty_target(bits)
    boundary_hash = format(target_int, "064x")
    assert not node.meets_difficulty(boundary_hash, bits)
    # One less is.
    just_below = format(target_int - 1, "064x")
    assert node.meets_difficulty(just_below, bits)


def test_canonical_is_deterministic():
    a = node.canonical({"x": 1, "y": [3, 2, 1]})
    b = node.canonical({"y": [3, 2, 1], "x": 1})
    assert a == b


def test_block_hash_excludes_hash_field_itself():
    # The hash field's own value must not influence the digest.
    block_a = {
        "index": 1, "prev_hash": "00", "txs": [], "timestamp": 1.0,
        "nonce": 42, "miner_id": 0, "hash": "ignore-me",
    }
    block_b = dict(block_a, hash="something-else")
    assert node.block_hash(block_a) == node.block_hash(block_b)


# =========================================================================== #
# Config loader                                                               #
# =========================================================================== #


def _fake_env(node_count: int = 3, **overrides) -> dict[str, str]:
    base = {
        "NODE_ID": "0",
        "TCP_PORT": "5000",
        "PEERS": json.dumps({str(i): f"n{i}:5000" for i in range(node_count)}),
    }
    base.update({k: str(v) for k, v in overrides.items()})
    return base


def test_load_config_uses_defaults_when_unset():
    cfg = node.load_config_from_env(_fake_env())
    assert cfg.difficulty_bits == 20
    assert cfg.block_size == 10
    assert cfg.confirmations == 1
    assert cfg.batch_hashes == 5000


def test_load_config_respects_overrides():
    cfg = node.load_config_from_env(
        _fake_env(DIFFICULTY_BITS=18, BLOCK_SIZE=5, CONFIRMATIONS=2, BATCH_HASHES=10000)
    )
    assert cfg.difficulty_bits == 18
    assert cfg.block_size == 5
    assert cfg.confirmations == 2
    assert cfg.batch_hashes == 10000


# =========================================================================== #
# In-process node behaviour (no TCP, no Docker)                               #
# =========================================================================== #


def _make_node(**overrides) -> node.PowNode:
    cfg = node.load_config_from_env(_fake_env(**overrides))
    return node.PowNode(cfg=cfg)


def test_genesis_block_is_consistent():
    g = node.genesis_block()
    assert g["index"] == 0
    assert g["prev_hash"] == "0" * 64
    assert g["txs"] == []
    # Hash field excluded from input → must equal the recomputed hash.
    assert g["hash"] == node.block_hash(g)


def test_handle_tx_adds_to_mempool_and_dedupes():
    n = _make_node()
    n.handle(json.dumps({"type": "TX", "tx": {"id": "t1"}}).encode())
    assert "t1" in n.mempool
    n.handle(json.dumps({"type": "TX", "tx": {"id": "t1"}}).encode())
    assert len(n.mempool) == 1
    n.handle(json.dumps({"type": "TX", "tx": {"id": "t2"}}).encode())
    assert set(n.mempool) == {"t1", "t2"}


def test_handle_tx_ignores_missing_id():
    n = _make_node()
    n.handle(json.dumps({"type": "TX", "tx": {}}).encode())
    assert n.mempool == {}


def test_search_nonces_finds_a_solution_at_low_difficulty():
    n = _make_node(DIFFICULTY_BITS=8, BATCH_HASHES=1000)
    n._on_tx({"id": "tx-A"}, gossip=False)
    candidate = n._build_candidate()
    assert candidate is not None
    n._search_nonces(candidate)
    # The chain must have grown by exactly one block.
    assert len(n.chain) == 2
    mined = n.chain[-1]
    assert mined["index"] == 1
    assert any(tx["id"] == "tx-A" for tx in mined["txs"])
    assert node.meets_difficulty(mined["hash"], bits=8)
    # Mempool should now exclude the included tx.
    assert "tx-A" not in n.mempool


def test_committed_event_emitted_only_after_confirmations():
    """One block deep is not enough when confirmations=1; mining a second
    block at index=2 makes index=1 confirmed, and the tx is emitted."""
    n = _make_node(DIFFICULTY_BITS=4, CONFIRMATIONS=1, BATCH_HASHES=1000)
    emissions: list[dict] = []
    n._emit = lambda evt: emissions.append(evt)  # type: ignore[assignment]

    n._on_tx({"id": "tx-1"}, gossip=False)
    n._search_nonces(n._build_candidate())
    # Only block_mined emitted so far — no confirmation yet.
    committed = [e for e in emissions if e["event"] == "committed"]
    assert committed == []

    n._on_tx({"id": "tx-2"}, gossip=False)
    n._search_nonces(n._build_candidate())
    committed = [e for e in emissions if e["event"] == "committed"]
    # Index=1 is now (head_index=2 - confirmations=1) → eligible.
    assert any(e["request_id"] == "tx-1" for e in committed)


def test_block_at_wrong_height_is_rejected():
    n = _make_node(DIFFICULTY_BITS=4, BATCH_HASHES=1000)
    fake = {
        "index": 5,  # nonsense — chain head is index 0
        "prev_hash": n.chain[-1]["hash"],
        "txs": [], "timestamp": 0.0, "nonce": 0, "miner_id": 99,
    }
    fake["hash"] = node.block_hash(fake)
    pre_len = len(n.chain)
    n._on_block(fake, source="peer")
    assert len(n.chain) == pre_len


def test_block_with_wrong_prev_hash_is_rejected():
    n = _make_node(DIFFICULTY_BITS=4, BATCH_HASHES=1000)
    fake = {
        "index": 1,
        "prev_hash": "deadbeef" * 8,
        "txs": [], "timestamp": 0.0, "nonce": 0, "miner_id": 99,
    }
    fake["hash"] = node.block_hash(fake)
    n._on_block(fake, source="peer")
    assert len(n.chain) == 1


def test_block_hash_must_meet_difficulty():
    # Construct a block whose hash does NOT meet the configured difficulty.
    n = _make_node(DIFFICULTY_BITS=24, BATCH_HASHES=10)
    candidate = {
        "index": 1, "prev_hash": n.chain[-1]["hash"], "txs": [],
        "timestamp": 0.0, "nonce": 0, "miner_id": 1,
    }
    candidate["hash"] = node.block_hash(candidate)
    assert not node.meets_difficulty(candidate["hash"], bits=24)
    n._on_block(candidate, source="peer")
    assert len(n.chain) == 1  # rejected


# =========================================================================== #
# Fork resolution (longest chain, confirmed-block protection)                 #
# =========================================================================== #


def _block(index: int, prev: dict, miner: int, txs: list[dict]) -> dict:
    """Build a valid block at DIFFICULTY_BITS=0, where every hash qualifies."""
    b = {
        "index": index, "prev_hash": prev["hash"], "txs": txs,
        "timestamp": 0.0, "nonce": 0, "miner_id": miner,
    }
    b["hash"] = node.block_hash(b)
    return b


def test_longer_fork_triggers_reorg_and_returns_orphaned_txs_to_mempool():
    n = _make_node(DIFFICULTY_BITS=0)
    genesis = n.chain[0]

    block1a = _block(1, genesis, miner=0, txs=[{"id": "a"}])
    n._on_block(block1a, source="peer")
    assert len(n.chain) == 2

    block1b = _block(1, genesis, miner=1, txs=[{"id": "b"}])
    n._on_block(block1b, source="peer")  # same-height fork — length still tied at 2

    block2b = _block(2, block1b, miner=1, txs=[{"id": "c"}])
    n._on_block(block2b, source="peer")  # b-branch now strictly longer — must win

    assert len(n.chain) == 3
    assert n.chain[1]["hash"] == block1b["hash"]
    assert n.chain[2]["hash"] == block2b["hash"]
    assert n.seen_txs == {"b", "c"}
    assert "a" in n.mempool          # orphaned by the reorg off the a-branch
    assert "b" not in n.mempool
    assert "c" not in n.mempool


def test_equal_length_forks_break_ties_on_lowest_tip_hash():
    n = _make_node(DIFFICULTY_BITS=0)
    genesis = n.chain[0]
    block_x = _block(1, genesis, miner=0, txs=[{"id": "x"}])
    block_y = _block(1, genesis, miner=1, txs=[{"id": "y"}])
    lower, higher = sorted([block_x, block_y], key=lambda b: b["hash"])

    n._on_block(higher, source="peer")
    assert n.chain[-1]["hash"] == higher["hash"]
    n._on_block(lower, source="peer")
    assert n.chain[-1]["hash"] == lower["hash"]  # lower tip hash wins the tie


def test_reorg_never_rewrites_a_confirmed_block():
    n = _make_node(DIFFICULTY_BITS=0, CONFIRMATIONS=1)
    genesis = n.chain[0]
    block1 = _block(1, genesis, miner=0, txs=[{"id": "keep"}])
    n._on_block(block1, source="peer")
    block2 = _block(2, block1, miner=0, txs=[])
    n._on_block(block2, source="peer")
    assert 1 in n.confirmed_blocks  # block1 is now finalized

    # A rival fork that also starts at genesis and grows past our head —
    # but diverges at index 1, which is already confirmed. Must be rejected
    # no matter how long it gets.
    fork1 = _block(1, genesis, miner=1, txs=[{"id": "evil"}])
    fork2 = _block(2, fork1, miner=1, txs=[])
    fork3 = _block(3, fork2, miner=1, txs=[])
    n._on_block(fork1, source="peer")
    n._on_block(fork2, source="peer")
    n._on_block(fork3, source="peer")

    assert len(n.chain) == 3
    assert n.chain[1]["hash"] == block1["hash"]
    assert n.chain[2]["hash"] == block2["hash"]


def test_handle_routes_unknown_type_safely():
    n = _make_node()
    n.handle(b"garbage not json")
    n.handle(json.dumps({"type": "WHATEVER"}).encode())
    assert n.mempool == {}


# =========================================================================== #
# POWModule contract                                                          #
# =========================================================================== #


def test_pow_module_is_a_consensus_module():
    assert issubclass(POWModule, ConsensusModule)
    assert ConsensusModule.__abstractmethods__.issubset(dir(POWModule))


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
def pow_module(docker_available):
    mod = POWModule()
    try:
        yield mod
    finally:
        mod.stop()


@pytest.mark.timeout(180)
def test_pow_three_node_cluster_commits_transactions(pow_module: POWModule):
    """3-node PoW cluster, all 5 txs commit on a quorum of nodes.

    Parameter rationale:
      * difficulty_bits=14 — pure-Python sha256 + JSON canonical encoding
        runs ~10 K hash/s, so ~2^14 ≈ 16 K nonces per block ≈ 1.5 s. Slow
        enough that propagation completes between simultaneous solves
        (forks rare), fast enough that the test finishes in <60 s.
      * block_size=10 fits the whole workload in one block — fewer mining
        rounds means fewer fork opportunities.
      * Empty-block mining is enabled in node.py, so the confirmation block
        will be produced even after the mempool drains.
    Quorum=2 of 3 nodes is the protocol's natural "majority view"; requiring
    *all* nodes to agree would be too strict given our deliberate omission of
    fork resolution (see consensus/pow/node.py docstring).
    """
    tx_count = 5
    pow_module.start(
        node_count=3,
        config={
            "cpu_limit": 1.0,
            "mem_limit": "512m",
            "warmup_seconds": 45,
            "difficulty_bits": 14,
            "block_size": 10,
            "confirmations": 1,
        },
    )
    pow_module.submit_transactions(count=tx_count, rate_tps=5.0)

    # Allow up to 60 s for the chain to extend deep enough to confirm everything.
    deadline = time.time() + 60
    metrics: dict = {}
    while time.time() < deadline:
        metrics = pow_module.get_metrics()
        committed_majority = sum(
            1
            for commits in metrics.get("commits_by_request", {}).values()
            if len(commits) >= 2  # at least 2 of 3 nodes saw it
        )
        if committed_majority >= tx_count:
            break
        time.sleep(0.5)

    assert metrics["algorithm"] == "pow"
    assert metrics["node_count"] == 3
    by_majority = {
        tx_id
        for tx_id, commits in metrics["commits_by_request"].items()
        if len(commits) >= 2
    }
    assert len(by_majority) >= tx_count, (
        f"only {len(by_majority)}/{tx_count} txs committed on quorum; metrics={metrics}"
    )
    assert sum(metrics["blocks_mined_per_node"].values()) >= 2, (
        f"expected ≥2 mined blocks across the cluster, got {metrics['blocks_mined_per_node']}"
    )
