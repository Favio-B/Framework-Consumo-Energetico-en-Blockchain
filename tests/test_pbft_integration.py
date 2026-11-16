"""End-to-end smoke test for the PBFT cluster.

Spins up 3 nodes in real Docker containers, submits 5 transactions, and
verifies that every node reaches the COMMIT phase for every one. Automatically
skipped on hosts where Docker is not reachable — keeps the default `pytest`
run fast and deterministic, but proves the protocol works when it matters.

Runs in roughly 20-40 s on a warm image cache.
"""
from __future__ import annotations

import time

import pytest

docker = pytest.importorskip("docker")

from consensus.pbft.module import PBFTModule


@pytest.fixture(scope="module")
def docker_available() -> None:
    try:
        client = docker.from_env()
        client.ping()
    except Exception as exc:  # noqa: BLE001 - any error means "no docker"
        pytest.skip(f"Docker daemon not reachable: {exc}")


@pytest.fixture()
def pbft(docker_available):
    mod = PBFTModule()
    try:
        yield mod
    finally:
        mod.stop()


@pytest.mark.timeout(120)
def test_three_node_cluster_commits_five_transactions(pbft: PBFTModule):
    tx_count = 5
    pbft.start(node_count=3, config={"cpu_limit": 1.0, "mem_limit": "512m", "warmup_seconds": 45})
    pbft.submit_transactions(count=tx_count, rate_tps=5.0)

    # Give the three-phase protocol time to settle across all replicas.
    deadline = time.time() + 30
    metrics: dict = {}
    while time.time() < deadline:
        metrics = pbft.get_metrics()
        per_node = metrics["per_node"]
        if per_node and all(n["committed_count"] >= tx_count for n in per_node.values()):
            break
        time.sleep(0.5)

    assert metrics["algorithm"] == "pbft"
    assert metrics["node_count"] == 3
    assert len(metrics["per_node"]) == 3, metrics
    for node_id, stats in metrics["per_node"].items():
        assert stats["committed_count"] >= tx_count, (
            f"node {node_id} only committed {stats['committed_count']}/{tx_count}"
        )
    assert metrics["finality_window_s"] >= 0.0
