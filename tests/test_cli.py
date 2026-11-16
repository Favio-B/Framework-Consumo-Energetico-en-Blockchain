"""Tests for run_experiment.py — Click's CliRunner; no Docker required.

Covers:
    * Top-level help lists every subcommand.
    * `run --dry-run` prints the plan and does not invoke ScenarioRunner.
    * `run` overrides --algorithms and --repetitions take effect.
    * `run` invokes ScenarioRunner.run_experiment with the merged config.
    * `analyze` prints per-metric verdicts and a report path.
    * `analyze` 1-exits on unknown experiment.
    * `list` shows experiments grouped by name.
    * `list` shows the empty-DB message.
    * `cleanup` reports a count when Docker is reachable; non-zero exit otherwise.
"""
from __future__ import annotations

import yaml
from pathlib import Path
from unittest.mock import MagicMock, patch

import pytest
from click.testing import CliRunner

from run_experiment import cli
from storage.repository import SqliteRepository


# --------------------------------------------------------------------------- #
# Fixtures                                                                    #
# --------------------------------------------------------------------------- #


@pytest.fixture()
def runner() -> CliRunner:
    return CliRunner()


@pytest.fixture()
def yaml_config(tmp_path: Path) -> Path:
    cfg = {
        "experiment": {"name": "cli-test", "algorithms": ["pbft"], "repetitions": 1},
        "network": {"driver": "pumba", "nodes": 3, "latency_ms": 0,
                    "bandwidth_kbps": 0, "packet_loss_pct": 0.0},
        "workload": {"tx_count": 5, "tx_rate_tps": 5.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {"warmup_seconds": 10, "settle_seconds": 1.0},
    }
    path = tmp_path / "experiment.yaml"
    path.write_text(yaml.safe_dump(cfg), encoding="utf-8")
    return path


def _summary(algo: str, rep: int, experiment: str = "cli-test") -> dict:
    return {
        "run_id": f"{experiment}-{algo}-{rep}",
        "algorithm": algo,
        "repetition": rep,
        "node_count": 3,
        "quorum": 1,
        "started_at": f"2026-04-25T10:00:{rep:02d}+00:00",
        "experiment_name": experiment,
        "tdp_watts": 45,
        "tx_count": 5,
        "tx_rate_tps": 5.0,
        "submitted": 5,
        "committed_by_quorum": 5,
        "submit_window_s": 1.0,
        "throughput_tps": 4.5 + 0.1 * rep,
        "latency_ms": {"p50": 5.0 + rep, "p95": 12.0, "p99": 18.0, "mean": 6.0},
        "finality_ms": {"p50": 5.0 + rep, "p95": 12.0, "p99": 18.0, "mean": 6.0},
        "energy_joules": 1.5 + 0.05 * rep,
        "network_totals": {"total_rx_bytes": 1000, "total_tx_bytes": 2000},
        "bytes_per_tx": {"total_per_tx": 1500.0},
        "resource_summary": {},
        "artefacts_dir": f"/tmp/{experiment}-{algo}-{rep}",
    }


# --------------------------------------------------------------------------- #
# help / discovery                                                            #
# --------------------------------------------------------------------------- #


def test_top_level_help_lists_every_subcommand(runner: CliRunner):
    result = runner.invoke(cli, ["--help"])
    assert result.exit_code == 0
    for command in ("run", "analyze", "dashboard", "list", "cleanup"):
        assert command in result.output


# --------------------------------------------------------------------------- #
# run                                                                         #
# --------------------------------------------------------------------------- #


def test_run_dry_run_does_not_touch_runner(runner: CliRunner, yaml_config: Path):
    with patch("orchestrator.scenario_runner.ScenarioRunner") as ScenarioRunner:
        result = runner.invoke(
            cli, ["run", "--config", str(yaml_config), "--dry-run"]
        )
    assert result.exit_code == 0
    assert "dry-run" in result.output
    ScenarioRunner.assert_not_called()


def test_run_overrides_take_effect(runner: CliRunner, yaml_config: Path, tmp_path: Path):
    fake_runner = MagicMock()
    fake_runner.run_experiment.return_value = [_summary("pbft", 0), _summary("pos", 0)]
    with patch("orchestrator.scenario_runner.ScenarioRunner", return_value=fake_runner):
        result = runner.invoke(cli, [
            "--db", str(tmp_path / "experiments.db"),
            "run", "--config", str(yaml_config),
            "--algorithms", "pbft,pos",
            "--repetitions", "2",
            "--results-dir", str(tmp_path / "results"),
        ])
    assert result.exit_code == 0, result.output
    # Verify the overrides flowed into the runner.
    call_args = fake_runner.run_experiment.call_args
    cfg_passed = call_args.args[0]
    assert cfg_passed["experiment"]["algorithms"] == ["pbft", "pos"]
    assert cfg_passed["experiment"]["repetitions"] == 2
    # Output table contains the algorithms.
    assert "pbft" in result.output
    assert "pos" in result.output


def test_run_no_db_skips_repository(runner: CliRunner, yaml_config: Path, tmp_path: Path):
    fake_runner = MagicMock()
    fake_runner.run_experiment.return_value = [_summary("pbft", 0)]
    with patch("orchestrator.scenario_runner.ScenarioRunner", return_value=fake_runner) as ScenarioRunner, \
         patch("storage.repository.SqliteRepository") as Repo:
        result = runner.invoke(cli, [
            "run", "--config", str(yaml_config), "--no-db",
            "--results-dir", str(tmp_path / "results"),
        ])
    assert result.exit_code == 0, result.output
    # SqliteRepository must not be instantiated when --no-db.
    Repo.assert_not_called()
    # ScenarioRunner must have been built with repository=None.
    _, kwargs = ScenarioRunner.call_args
    assert kwargs.get("repository") is None


# --------------------------------------------------------------------------- #
# analyze                                                                     #
# --------------------------------------------------------------------------- #


def test_analyze_runs_pipeline_and_prints_verdicts(runner: CliRunner, tmp_path: Path):
    db_path = tmp_path / "experiments.db"
    repo = SqliteRepository(db_path)
    try:
        for rep in range(5):
            repo.save_run({**_summary("pbft", rep), "energy_joules": 1.0 + 0.05 * rep})
            repo.save_run({**_summary("pow",  rep), "energy_joules": 100.0 + 0.05 * rep})
            repo.save_run({**_summary("pos",  rep), "energy_joules": 0.5 + 0.05 * rep})
    finally:
        repo.close()

    result = runner.invoke(cli, [
        "--db", str(db_path),
        "analyze", "cli-test",
        "--output-dir", str(tmp_path / "out"),
    ])
    assert result.exit_code == 0, result.output
    assert "Report:" in result.output
    assert "Energy (J)" in result.output
    # PoW dwarfs PBFT/PoS → at least one metric prints "differ".
    assert "differ" in result.output
    # Files actually landed on disk.
    assert (tmp_path / "out" / "report.md").is_file()


def test_analyze_unknown_experiment_exits_nonzero(runner: CliRunner, tmp_path: Path):
    db_path = tmp_path / "experiments.db"
    SqliteRepository(db_path).close()  # create empty DB
    result = runner.invoke(cli, [
        "--db", str(db_path), "analyze", "missing",
        "--output-dir", str(tmp_path / "out"),
    ])
    assert result.exit_code == 1
    assert "no runs" in result.output


# --------------------------------------------------------------------------- #
# list                                                                        #
# --------------------------------------------------------------------------- #


def test_list_empty_db(runner: CliRunner, tmp_path: Path):
    db_path = tmp_path / "experiments.db"
    SqliteRepository(db_path).close()
    result = runner.invoke(cli, ["--db", str(db_path), "list"])
    assert result.exit_code == 0
    assert "No runs in DB" in result.output


def test_list_groups_runs_by_experiment(runner: CliRunner, tmp_path: Path):
    db_path = tmp_path / "experiments.db"
    repo = SqliteRepository(db_path)
    try:
        repo.save_run({**_summary("pbft", 0, "exp-A")})
        repo.save_run({**_summary("pow", 0, "exp-A")})
        repo.save_run({**_summary("pbft", 0, "exp-B")})
    finally:
        repo.close()

    result = runner.invoke(cli, ["--db", str(db_path), "list"])
    assert result.exit_code == 0
    assert "exp-A" in result.output
    assert "exp-B" in result.output


# --------------------------------------------------------------------------- #
# cleanup                                                                     #
# --------------------------------------------------------------------------- #


def test_cleanup_reports_count_when_docker_reachable(runner: CliRunner):
    fake_dm = MagicMock()
    fake_dm.ping.return_value = True
    fake_dm.cleanup_by_prefix.return_value = {"containers": 3, "networks": 1}
    with patch("orchestrator.docker_manager.DockerManager", return_value=fake_dm):
        result = runner.invoke(cli, ["cleanup"])
    assert result.exit_code == 0
    assert "Removed 3 container" in result.output
    assert "1 network" in result.output


def test_cleanup_exits_nonzero_when_docker_unreachable(runner: CliRunner):
    with patch("orchestrator.docker_manager.DockerManager",
               side_effect=RuntimeError("daemon down")):
        result = runner.invoke(cli, ["cleanup"])
    assert result.exit_code == 1
    assert "Docker unreachable" in result.output
