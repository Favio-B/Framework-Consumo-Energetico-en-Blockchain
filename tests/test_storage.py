"""Tests for storage.repository — schema, round-trip, composite, stub, and
integration with ScenarioRunner.

All tests run in-memory or against a tmp file — no Docker needed for this
layer (the runner-integration test uses the _FakeModule from test_scenario_runner).
"""
from __future__ import annotations

import sqlite3
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from storage.repository import (
    CompositeRepository,
    FirestoreRepository,
    Repository,
    SqliteRepository,
    _summary_to_run_row,
)


# =========================================================================== #
# Schema                                                                      #
# =========================================================================== #


def test_schema_creates_runs_and_resource_samples_tables():
    repo = SqliteRepository(":memory:")
    try:
        cur = repo._conn.execute(
            "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
        )
        tables = {row["name"] for row in cur}
        assert {"runs", "resource_samples"}.issubset(tables)
    finally:
        repo.close()


def test_schema_foreign_keys_enabled():
    repo = SqliteRepository(":memory:")
    try:
        (fk,) = repo._conn.execute("PRAGMA foreign_keys").fetchone()
        assert fk == 1
    finally:
        repo.close()


def test_schema_indexes_declared():
    repo = SqliteRepository(":memory:")
    try:
        cur = repo._conn.execute(
            "SELECT name FROM sqlite_master WHERE type='index'"
        )
        names = {row["name"] for row in cur}
        assert "idx_runs_algorithm" in names
        assert "idx_runs_experiment_name" in names
        assert "idx_runs_started_at" in names
    finally:
        repo.close()


# =========================================================================== #
# _summary_to_run_row                                                         #
# =========================================================================== #


def _good_summary(**overrides) -> dict:
    base = {
        "run_id": "run-abc",
        "algorithm": "pbft",
        "repetition": 0,
        "node_count": 3,
        "quorum": 1,
        "started_at": "2026-04-24T10:00:00+00:00",
        "experiment_name": "baseline",
        "tdp_watts": 45,
        "tx_count": 100,
        "tx_rate_tps": 10.0,
        "latency_ms_applied": 50,
        "bandwidth_kbps_applied": 0,
        "packet_loss_pct_applied": 0.0,
        "submitted": 100,
        "committed_by_quorum": 100,
        "submit_window_s": 10.0,
        "throughput_tps": 10.0,
        "latency_ms": {"p50": 3.0, "p95": 12.0, "p99": 18.0, "mean": 5.0},
        "finality_ms": {"p50": 3.0, "p95": 12.0, "p99": 18.0, "mean": 5.0},
        "energy_joules": 1.5,
        "network_totals": {"total_rx_bytes": 1000, "total_tx_bytes": 2000},
        "bytes_per_tx": {"total_per_tx": 30.0},
        "resource_summary": {
            "n0": {
                "cpu_percent_avg": 50.0,
                "cpu_percent_peak": 80.0,
                "memory_mb_avg": 150.0,
                "memory_mb_peak": 180.0,
                "rx_bytes": 500,
                "tx_bytes": 1000,
                "sample_count": 10,
                "duration_s": 10.0,
            }
        },
        "artefacts_dir": "/tmp/results/run-abc",
    }
    base.update(overrides)
    return base


def test_summary_to_run_row_tolerates_missing_fields():
    minimal = {"run_id": "just-the-id"}
    row = _summary_to_run_row(minimal)
    assert row["run_id"] == "just-the-id"
    # Every other field present but None-valued.
    assert set(row.keys()) >= {
        "algorithm", "repetition", "node_count", "quorum", "started_at",
        "experiment_name", "tdp_watts", "tx_count", "tx_rate_tps",
        "latency_ms", "bandwidth_kbps", "packet_loss_pct",
        "submitted", "committed_by_quorum", "submit_window_s",
        "throughput_tps", "latency_ms_p50", "latency_ms_p95", "latency_ms_p99",
        "latency_ms_mean", "finality_ms_p50", "finality_ms_p95",
        "finality_ms_p99", "finality_ms_mean", "energy_joules",
        "total_rx_bytes", "total_tx_bytes", "bytes_per_tx", "artefacts_dir",
    }
    # started_at must auto-fill to something ISO-ish when absent.
    assert "T" in row["started_at"]


def test_summary_to_run_row_maps_nested_percentiles():
    row = _summary_to_run_row(_good_summary())
    assert row["latency_ms_p95"] == 12.0
    assert row["latency_ms_mean"] == 5.0
    assert row["finality_ms_p99"] == 18.0
    assert row["bytes_per_tx"] == 30.0


# =========================================================================== #
# SqliteRepository round-trip                                                 #
# =========================================================================== #


def test_sqlite_save_and_load_run_roundtrip():
    repo = SqliteRepository(":memory:")
    try:
        repo.save_run(_good_summary())
        row = repo.load_run("run-abc")
        assert row is not None
        assert row["algorithm"] == "pbft"
        assert row["throughput_tps"] == 10.0
        assert row["latency_ms_p95"] == 12.0
        assert row["experiment_name"] == "baseline"
        samples = row["resource_samples"]
        assert len(samples) == 1
        assert samples[0]["container_name"] == "n0"
        assert samples[0]["cpu_percent_peak"] == 80.0
    finally:
        repo.close()


def test_sqlite_load_run_missing_returns_none():
    repo = SqliteRepository(":memory:")
    try:
        assert repo.load_run("does-not-exist") is None
    finally:
        repo.close()


def test_sqlite_save_is_idempotent_on_same_run_id():
    repo = SqliteRepository(":memory:")
    try:
        repo.save_run(_good_summary(throughput_tps=5.0))
        repo.save_run(_good_summary(throughput_tps=9.5))
        rows = repo.list_runs()
        assert len(rows) == 1
        assert rows[0]["throughput_tps"] == 9.5  # latest wins
        # Resource samples are replaced, not accumulated.
        loaded = repo.load_run("run-abc")
        assert len(loaded["resource_samples"]) == 1
    finally:
        repo.close()


def test_sqlite_list_runs_filters_by_algorithm():
    repo = SqliteRepository(":memory:")
    try:
        repo.save_run(_good_summary(run_id="r1", algorithm="pbft"))
        repo.save_run(_good_summary(run_id="r2", algorithm="pow"))
        repo.save_run(_good_summary(run_id="r3", algorithm="pbft"))
        pbft = repo.list_runs(algorithm="pbft")
        pow_ = repo.list_runs(algorithm="pow")
        assert {r["run_id"] for r in pbft} == {"r1", "r3"}
        assert {r["run_id"] for r in pow_} == {"r2"}
    finally:
        repo.close()


def test_sqlite_list_runs_filters_by_experiment_and_limit():
    repo = SqliteRepository(":memory:")
    try:
        for i in range(5):
            repo.save_run(
                _good_summary(
                    run_id=f"r{i}",
                    experiment_name=("exp-A" if i < 3 else "exp-B"),
                    started_at=f"2026-04-24T10:00:{i:02d}+00:00",
                )
            )
        a_runs = repo.list_runs(experiment_name="exp-A")
        assert {r["run_id"] for r in a_runs} == {"r0", "r1", "r2"}
        # DESC on started_at — r2 first.
        assert a_runs[0]["run_id"] == "r2"
        assert len(repo.list_runs(limit=2)) == 2
    finally:
        repo.close()


def test_sqlite_file_backed_creates_parent_directory(tmp_path: Path):
    db_path = tmp_path / "nested" / "subdir" / "experiments.db"
    repo = SqliteRepository(db_path)
    try:
        repo.save_run(_good_summary())
        assert db_path.exists()
    finally:
        repo.close()


def test_sqlite_cascade_delete_removes_resource_samples():
    repo = SqliteRepository(":memory:")
    try:
        repo.save_run(_good_summary())
        repo._conn.execute("DELETE FROM runs WHERE run_id = ?", ("run-abc",))
        remaining = repo._conn.execute(
            "SELECT COUNT(*) AS c FROM resource_samples"
        ).fetchone()["c"]
        assert remaining == 0
    finally:
        repo.close()


def test_sqlite_context_manager_closes_connection():
    with SqliteRepository(":memory:") as repo:
        repo.save_run(_good_summary())
        assert repo.list_runs()
    # After exit, a further query should raise because the connection is closed.
    with pytest.raises(sqlite3.ProgrammingError):
        repo._conn.execute("SELECT 1").fetchone()


# =========================================================================== #
# CompositeRepository                                                         #
# =========================================================================== #


def test_composite_requires_at_least_one_backend():
    with pytest.raises(ValueError):
        CompositeRepository()


def test_composite_fans_save_out_to_all_backends():
    a = MagicMock(spec=Repository)
    b = MagicMock(spec=Repository)
    composite = CompositeRepository(a, b)
    summary = _good_summary()
    composite.save_run(summary)
    a.save_run.assert_called_once_with(summary)
    b.save_run.assert_called_once_with(summary)


def test_composite_reads_come_from_first_backend():
    first = MagicMock(spec=Repository)
    first.list_runs.return_value = [{"run_id": "x"}]
    first.load_run.return_value = {"run_id": "x"}
    second = MagicMock(spec=Repository)
    composite = CompositeRepository(first, second)
    assert composite.list_runs(algorithm="pbft") == [{"run_id": "x"}]
    assert composite.load_run("x") == {"run_id": "x"}
    second.list_runs.assert_not_called()
    second.load_run.assert_not_called()


def test_composite_close_propagates_to_all():
    a = MagicMock(spec=Repository)
    b = MagicMock(spec=Repository)
    CompositeRepository(a, b).close()
    a.close.assert_called_once()
    b.close.assert_called_once()


def test_composite_sqlite_plus_mock_roundtrip():
    sql = SqliteRepository(":memory:")
    try:
        mirror = MagicMock(spec=Repository)
        composite = CompositeRepository(sql, mirror)
        composite.save_run(_good_summary())
        mirror.save_run.assert_called_once()
        assert composite.load_run("run-abc")["algorithm"] == "pbft"
    finally:
        sql.close()


# =========================================================================== #
# FirestoreRepository stub                                                    #
# =========================================================================== #


def test_firestore_repository_is_an_intentional_stub():
    with pytest.raises(NotImplementedError, match="stub"):
        FirestoreRepository(project_id="demo")


# =========================================================================== #
# ScenarioRunner integration                                                  #
# =========================================================================== #


from orchestrator.scenario_runner import ALGORITHM_LOADERS, ScenarioRunner


class _FakeModule:
    def __init__(self) -> None:
        self.node_count = 0
        self.containers: list = []
        self._submits: dict[str, float] = {}

    def start(self, node_count, config):
        self.node_count = node_count

    def submit_transactions(self, count, rate_tps):
        for i in range(count):
            self._submits[f"r{i}"] = i * 0.01

    def get_metrics(self):
        return {
            "algorithm": "fake",
            "run_id": "rid",
            "node_count": self.node_count,
            "submits": dict(self._submits),
            "commits_by_request": {
                rid: [(0, ts + 0.05)] for rid, ts in self._submits.items()
            },
        }

    def stop(self):
        pass


def test_scenario_runner_persists_through_repository(tmp_path: Path, monkeypatch):
    repo = SqliteRepository(tmp_path / "experiments.db")
    monkeypatch.setitem(ALGORITHM_LOADERS, "pbft", lambda: _FakeModule)
    runner = ScenarioRunner(
        docker_manager=MagicMock(), results_dir=tmp_path, repository=repo
    )
    config = {
        "experiment": {"algorithms": ["pbft"], "repetitions": 2, "name": "unit-test"},
        "network": {"driver": "pumba", "nodes": 3, "latency_ms": 0,
                    "bandwidth_kbps": 0, "packet_loss_pct": 0.0},
        "workload": {"tx_count": 5, "tx_rate_tps": 5.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {"warmup_seconds": 10, "settle_seconds": 0.0, "run_timeout_seconds": 60},
    }
    with patch("orchestrator.scenario_runner.NetworkController") as nc_cls:
        nc_cls.return_value = MagicMock()
        summaries = runner.run_experiment(config)

    # Both summaries reached the DB with full metadata.
    rows = repo.list_runs()
    assert len(rows) == 2
    assert all(r["experiment_name"] == "unit-test" for r in rows)
    assert all(r["algorithm"] == "pbft" for r in rows)
    assert all(r["tx_count"] == 5 for r in rows)
    assert all(r["tdp_watts"] == 45 for r in rows)
    run_ids = {r["run_id"] for r in rows}
    assert run_ids == {s["run_id"] for s in summaries}
    # Artefact directory path survived the round-trip.
    for row in rows:
        assert row["artefacts_dir"].endswith(row["run_id"])
    repo.close()


def test_scenario_runner_without_repository_is_backwards_compatible(
    tmp_path: Path, monkeypatch
):
    monkeypatch.setitem(ALGORITHM_LOADERS, "pbft", lambda: _FakeModule)
    runner = ScenarioRunner(docker_manager=MagicMock(), results_dir=tmp_path)
    config = {
        "experiment": {"algorithms": ["pbft"], "repetitions": 1},
        "network": {"driver": "pumba", "nodes": 3, "latency_ms": 0,
                    "bandwidth_kbps": 0, "packet_loss_pct": 0.0},
        "workload": {"tx_count": 3, "tx_rate_tps": 5.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {"warmup_seconds": 10, "settle_seconds": 0.0, "run_timeout_seconds": 60},
    }
    with patch("orchestrator.scenario_runner.NetworkController") as nc_cls:
        nc_cls.return_value = MagicMock()
        summaries = runner.run_experiment(config)
    # No repository → only file artefacts, no DB to inspect. Sanity check on disk.
    assert (tmp_path / summaries[0]["run_id"] / "metrics.json").is_file()
