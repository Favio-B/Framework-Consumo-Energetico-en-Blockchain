"""Unit + integration tests for ScenarioRunner and ResultCollector.

Unit tests (no Docker):
    * ResultCollector file layout (config.json, metrics.json, raw_events.csv, run.log)
    * Helpers inside scenario_runner: config flatten, summary assembly,
      raw event shaping, quorum math, network-conditions detector.
    * Algorithm registry rejects unknown names, defers imports for missing ones.

Integration test (Docker required, auto-skipped otherwise):
    * Runs a minimal 1-algo × 1-rep × 3-node PBFT experiment end to end and
      verifies ResultCollector wrote the expected artefacts and the uniform
      summary contains sensible values (committed > 0, energy > 0, latency > 0).
"""
from __future__ import annotations

import json
import uuid
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest

from orchestrator.result_collector import ResultCollector, RunWriter
from orchestrator.scenario_runner import (
    ALGORITHM_LOADERS,
    ScenarioRunner,
    _assemble_summary,
    _has_network_conditions,
    _instantiate,
    _module_config,
    _raw_events,
)


# =========================================================================== #
# ResultCollector                                                             #
# =========================================================================== #


def test_result_collector_creates_per_run_directory(tmp_path: Path):
    rc = ResultCollector(tmp_path)
    writer = rc.new_run("abcdef123456")
    assert writer.path == tmp_path / "abcdef123456"
    assert writer.path.is_dir()


def test_result_collector_writes_config_metrics_raw_and_log(tmp_path: Path):
    rc = ResultCollector(tmp_path)
    writer = rc.new_run("run-1")
    writer.write_config({"k": "v"})
    writer.write_metrics({"throughput_tps": 5.0})
    writer.write_raw_events([
        {"request_id": "r1", "submit_ts": 1.0, "node_id": 0, "commit_ts": 1.1},
        {"request_id": "r2", "submit_ts": 2.0, "node_id": 1, "commit_ts": 2.2},
    ])
    writer.log("hello")

    cfg = json.loads((writer.path / "config.json").read_text(encoding="utf-8"))
    assert cfg == {"k": "v"}
    mx = json.loads((writer.path / "metrics.json").read_text(encoding="utf-8"))
    assert mx == {"throughput_tps": 5.0}
    csv_text = (writer.path / "raw_events.csv").read_text(encoding="utf-8")
    assert "request_id" in csv_text.splitlines()[0]
    assert "r1" in csv_text and "r2" in csv_text
    log_text = (writer.path / "run.log").read_text(encoding="utf-8")
    assert "hello" in log_text


def test_result_collector_list_and_load(tmp_path: Path):
    rc = ResultCollector(tmp_path)
    w = rc.new_run("runA")
    w.write_metrics({"x": 1})
    rc.new_run("runB")
    assert rc.list_runs() == ["runA", "runB"]
    assert rc.load_metrics("runA") == {"x": 1}


def test_result_collector_skips_raw_events_when_empty(tmp_path: Path):
    rc = ResultCollector(tmp_path)
    w = rc.new_run("r")
    w.write_raw_events([])
    assert not (w.path / "raw_events.csv").exists()


# =========================================================================== #
# scenario_runner helpers                                                     #
# =========================================================================== #


def test_instantiate_rejects_unknown_algorithm():
    with pytest.raises(ValueError, match="unknown algorithm"):
        _instantiate("foo")


def test_instantiate_pbft_returns_consensus_module():
    from consensus.base import ConsensusModule
    mod = _instantiate("pbft")
    assert isinstance(mod, ConsensusModule)


def test_algorithm_loaders_registered_for_all_three():
    assert set(ALGORITHM_LOADERS) == {"pbft", "pow", "pos"}


def test_module_config_extraction_uses_safe_defaults():
    out = _module_config({})
    assert out["cpu_limit"] == 2.0
    assert out["mem_limit"] == "2g"
    assert out["warmup_seconds"] == 30


def test_module_config_extraction_respects_overrides():
    out = _module_config({
        "resources": {"cpu_limit": "1.5", "mem_limit": "1g"},
        "runtime": {"warmup_seconds": 60},
    })
    assert out == {"cpu_limit": "1.5", "mem_limit": "1g", "warmup_seconds": 60}


def test_module_config_merges_algorithm_specific_section():
    cfg = {
        "resources": {"cpu_limit": 1.0},
        "pow": {"difficulty_bits": 18, "block_size": 5},
    }
    out = _module_config(cfg, algorithm="pow")
    assert out["difficulty_bits"] == 18
    assert out["block_size"] == 5
    assert out["cpu_limit"] == 1.0  # global default still present


def test_module_config_ignores_algo_section_when_algorithm_is_none():
    cfg = {"pow": {"difficulty_bits": 18}}
    out = _module_config(cfg)
    assert "difficulty_bits" not in out


def test_module_config_algo_section_overrides_global_keys_on_collision():
    cfg = {
        "resources": {"cpu_limit": 2.0},
        "pos": {"cpu_limit": 0.5},  # algo-specific override
    }
    out = _module_config(cfg, algorithm="pos")
    assert out["cpu_limit"] == 0.5


@pytest.mark.parametrize(
    "net, expected",
    [
        ({}, False),
        ({"latency_ms": 0, "bandwidth_kbps": 0, "packet_loss_pct": 0}, False),
        ({"latency_ms": 50}, True),
        ({"bandwidth_kbps": 1000}, True),
        ({"packet_loss_pct": 0.5}, True),
    ],
)
def test_has_network_conditions(net, expected):
    assert _has_network_conditions({"network": net}) is expected


# =========================================================================== #
# summary assembly                                                            #
# =========================================================================== #


def _minimal_config(**overrides) -> dict:
    cfg = {
        "experiment": {"algorithms": ["pbft"], "repetitions": 1},
        "network": {"driver": "pumba", "nodes": 3, "latency_ms": 0, "bandwidth_kbps": 0, "packet_loss_pct": 0.0},
        "workload": {"tx_count": 3, "tx_rate_tps": 10.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {"warmup_seconds": 10, "settle_seconds": 1.0, "run_timeout_seconds": 60},
    }
    cfg.update(overrides)
    return cfg


def test_assemble_summary_with_synthetic_inputs():
    module_metrics = {
        "algorithm": "pbft",
        "run_id": "xyz",
        "node_count": 3,
        "submits": {"r0": 0.0, "r1": 0.1, "r2": 0.2},
        "commits_by_request": {
            "r0": [(0, 0.10), (1, 0.12), (2, 0.14)],
            "r1": [(0, 0.22), (1, 0.23), (2, 0.24)],
            "r2": [(0, 0.35), (1, 0.36), (2, 0.37)],
        },
    }
    resource_summary = {
        "n0": {"cpu_percent_avg": 50.0, "duration_s": 10.0, "rx_bytes": 1000, "tx_bytes": 2000},
        "n1": {"cpu_percent_avg": 30.0, "duration_s": 10.0, "rx_bytes": 500, "tx_bytes": 700},
        "n2": {"cpu_percent_avg": 40.0, "duration_s": 10.0, "rx_bytes": 800, "tx_bytes": 900},
    }
    summary = _assemble_summary(
        algorithm="pbft",
        repetition=0,
        run_id="rid",
        config=_minimal_config(),
        module_metrics=module_metrics,
        resource_summary=resource_summary,
        submit_window=(0.0, 0.5),
    )
    assert summary["algorithm"] == "pbft"
    assert summary["node_count"] == 3
    # 3 nodes → f=0 → quorum=1 (still matches the 2f+1 formula).
    assert summary["quorum"] == 1
    assert summary["submitted"] == 3
    assert summary["committed_by_quorum"] == 3
    assert summary["latency_ms"]["mean"] > 0
    assert summary["energy_joules"] > 0
    assert summary["network_totals"]["total_bytes"] == 1000 + 2000 + 500 + 700 + 800 + 900
    assert summary["bytes_per_tx"]["total_per_tx"] > 0


def test_assemble_summary_quorum_with_4_nodes():
    # 4-node PBFT tolerates f=1 Byzantine nodes → quorum = 2*1+1 = 3.
    cfg = _minimal_config()
    cfg["network"]["nodes"] = 4
    summary = _assemble_summary(
        algorithm="pbft",
        repetition=0,
        run_id="rid",
        config=cfg,
        module_metrics={"submits": {}, "commits_by_request": {}, "node_count": 4},
        resource_summary={},
        submit_window=(0.0, 0.1),
    )
    assert summary["quorum"] == 3


def test_raw_events_produces_row_per_commit_and_unfinished_rows_for_no_commit():
    rows = _raw_events({
        "submits": {"r1": 1.0, "r2": 2.0},
        "commits_by_request": {"r1": [(0, 1.1), (1, 1.2)]},
    })
    # r1 → 2 rows (two commits), r2 → 1 row (no commits, but still recorded).
    assert len(rows) == 3
    r1_rows = [r for r in rows if r["request_id"] == "r1"]
    assert len(r1_rows) == 2
    assert all("latency_ms" in r for r in r1_rows)
    r2_row = next(r for r in rows if r["request_id"] == "r2")
    assert r2_row["node_id"] == ""
    assert r2_row["commit_ts"] == ""


# =========================================================================== #
# ScenarioRunner with a fake consensus module (no Docker)                     #
# =========================================================================== #


class _FakeModule:
    """Stand-in for a ConsensusModule — exercises the orchestration loop
    without spawning any containers."""

    def __init__(self) -> None:
        self.node_count = 0
        self.containers: list = []
        self._submits: dict[str, float] = {}

    def start(self, node_count: int, config: dict) -> None:
        self.node_count = node_count

    def submit_transactions(self, count: int, rate_tps: float) -> None:
        for i in range(count):
            self._submits[f"r{i}"] = float(i) * 0.01

    def get_metrics(self) -> dict:
        return {
            "algorithm": "fake",
            "run_id": "rid",
            "node_count": self.node_count,
            "submits": dict(self._submits),
            "commits_by_request": {
                rid: [(0, ts + 0.05)] for rid, ts in self._submits.items()
            },
        }

    def stop(self) -> None:
        pass


def test_scenario_runner_runs_experiment_with_fake_module(tmp_path: Path, monkeypatch):
    runner = ScenarioRunner(docker_manager=MagicMock(), results_dir=tmp_path)
    monkeypatch.setitem(ALGORITHM_LOADERS, "pbft", lambda: _FakeModule)

    cfg = _minimal_config()
    cfg["experiment"]["repetitions"] = 2
    cfg["workload"]["tx_count"] = 4
    cfg["runtime"]["settle_seconds"] = 0.0

    with patch("orchestrator.scenario_runner.NetworkController") as nc_cls:
        nc_cls.return_value = MagicMock()
        summaries = runner.run_experiment(cfg)

    assert len(summaries) == 2
    for summary in summaries:
        assert summary["algorithm"] == "pbft"
        assert summary["submitted"] == 4
        assert summary["committed_by_quorum"] == 4
        assert summary["latency_ms"]["mean"] == pytest.approx(50.0, rel=0.1)
        assert Path(tmp_path / summary["run_id"] / "config.json").is_file()
        assert Path(tmp_path / summary["run_id"] / "metrics.json").is_file()


# =========================================================================== #
# Integration — full PBFT run via ScenarioRunner (Docker required)            #
# =========================================================================== #


pytest.importorskip("docker")


@pytest.fixture(scope="module")
def dm_live():
    from orchestrator.docker_manager import DockerManager
    try:
        dm = DockerManager()
        dm.ping()
    except Exception as exc:  # noqa: BLE001
        pytest.skip(f"Docker daemon not reachable: {exc}")
    return dm


@pytest.mark.timeout(180)
def test_scenario_runner_end_to_end_pbft(tmp_path: Path, dm_live):
    config = {
        "experiment": {"algorithms": ["pbft"], "repetitions": 1},
        "network": {"driver": "pumba", "nodes": 3, "latency_ms": 0,
                    "bandwidth_kbps": 0, "packet_loss_pct": 0.0},
        "workload": {"tx_count": 5, "tx_rate_tps": 5.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {"warmup_seconds": 45, "settle_seconds": 3.0, "run_timeout_seconds": 120},
    }
    runner = ScenarioRunner(docker_manager=dm_live, results_dir=tmp_path)
    summaries = runner.run_experiment(config)

    assert len(summaries) == 1
    s = summaries[0]
    assert s["algorithm"] == "pbft"
    assert s["node_count"] == 3
    assert s["submitted"] == 5
    assert s["committed_by_quorum"] >= 1
    assert s["energy_joules"] > 0
    assert s["latency_ms"]["mean"] > 0
    # Artefacts on disk.
    run_dir = tmp_path / s["run_id"]
    assert (run_dir / "config.json").is_file()
    assert (run_dir / "metrics.json").is_file()
    assert (run_dir / "run.log").is_file()
    assert (run_dir / "raw_events.csv").is_file()
