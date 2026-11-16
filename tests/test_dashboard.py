"""Tests for the Flask dashboard — uses test_client(), no live server.

Covers:
    * Empty database: index renders the placeholder message.
    * Populated database: index lists each experiment + its algorithms.
    * Experiment detail: renders metric tables + the statistical verdict and
      embeds the right plot URLs.
    * Plot endpoint: serves real PNG bytes (verified by file signature).
    * 404 on unknown experiment.
    * 400 / refusal on path traversal in URL segments.
"""
from __future__ import annotations

from pathlib import Path

import pytest

from dashboard.app import create_app
from storage.repository import SqliteRepository


# --------------------------------------------------------------------------- #
# Synthetic data shared across tests                                          #
# --------------------------------------------------------------------------- #


def _summary(algorithm: str, repetition: int, experiment: str = "synth-A",
             energy_offset: float = 1.0) -> dict:
    base_latency = {"pbft": 5.0, "pow": 1500.0, "pos": 50.0}[algorithm]
    return {
        "run_id": f"{experiment}-{algorithm}-{repetition}",
        "algorithm": algorithm,
        "repetition": repetition,
        "node_count": 3,
        "quorum": 1,
        "started_at": f"2026-04-25T10:00:{repetition:02d}+00:00",
        "experiment_name": experiment,
        "tdp_watts": 45,
        "tx_count": 20,
        "tx_rate_tps": 10.0,
        "latency_ms_applied": 0,
        "bandwidth_kbps_applied": 0,
        "packet_loss_pct_applied": 0.0,
        "submitted": 20,
        "committed_by_quorum": 20,
        "submit_window_s": 2.0,
        "throughput_tps": 9.5 + 0.1 * repetition,
        "latency_ms": {
            "p50": base_latency + repetition,
            "p95": base_latency * 2 + repetition,
            "p99": base_latency * 3 + repetition,
            "mean": base_latency + repetition,
        },
        "finality_ms": {
            "p50": base_latency + repetition,
            "p95": base_latency * 2 + repetition,
            "p99": base_latency * 3 + repetition,
            "mean": base_latency + repetition,
        },
        "energy_joules": energy_offset + 0.05 * repetition,
        "network_totals": {"total_rx_bytes": 1000, "total_tx_bytes": 2000},
        "bytes_per_tx": {"total_per_tx": 1500.0},
        "resource_summary": {},
        "artefacts_dir": f"/tmp/{experiment}-{algorithm}-{repetition}",
    }


@pytest.fixture()
def app(tmp_path: Path):
    db_path = tmp_path / "experiments.db"
    results_dir = tmp_path / "dashboard_analysis"
    flask_app = create_app(db_path=str(db_path), results_dir=str(results_dir))
    flask_app.config["TESTING"] = True
    flask_app.config["DB_PATH_TMP"] = db_path  # convenience for the populate fixture
    return flask_app


@pytest.fixture()
def populated_app(app):
    """Loads two experiments × 5 reps × 3 algorithms into the test DB."""
    repo = SqliteRepository(app.config["DB_PATH_TMP"])
    try:
        for rep in range(5):
            repo.save_run(_summary("pbft", rep, experiment="synth-A", energy_offset=1.0))
            repo.save_run(_summary("pow",  rep, experiment="synth-A", energy_offset=150.0))
            repo.save_run(_summary("pos",  rep, experiment="synth-A", energy_offset=0.5))
        for rep in range(3):
            repo.save_run(_summary("pbft", rep, experiment="synth-B", energy_offset=2.0))
    finally:
        repo.close()
    return app


# --------------------------------------------------------------------------- #
# Index                                                                       #
# --------------------------------------------------------------------------- #


def test_index_shows_empty_state_when_no_experiments(app):
    client = app.test_client()
    resp = client.get("/")
    assert resp.status_code == 200
    body = resp.data.decode()
    assert "No experiments yet" in body


def test_index_lists_each_experiment_with_algorithms(populated_app):
    client = populated_app.test_client()
    resp = client.get("/")
    assert resp.status_code == 200
    body = resp.data.decode()
    # Both experiment names appear.
    assert "synth-A" in body
    assert "synth-B" in body
    # Algorithms shown for synth-A (joined with ", ").
    assert "pbft" in body and "pow" in body and "pos" in body
    # Run counts.
    assert ">15<" in body  # synth-A: 3 algos × 5 reps
    assert ">3<" in body   # synth-B: 1 algo × 3 reps


# --------------------------------------------------------------------------- #
# Experiment detail                                                           #
# --------------------------------------------------------------------------- #


def test_experiment_detail_returns_404_when_missing(populated_app):
    resp = populated_app.test_client().get("/experiments/does-not-exist")
    assert resp.status_code == 404


def test_experiment_detail_renders_metric_tables_and_test_verdict(populated_app):
    resp = populated_app.test_client().get("/experiments/synth-A")
    assert resp.status_code == 200
    body = resp.data.decode()
    # Header
    assert "synth-A" in body
    # Per-metric section headings
    assert "Energy (J)" in body
    assert "Throughput (TPS)" in body
    # Each algorithm appears in the descriptives table
    for algo in ("pbft", "pow", "pos"):
        assert f">{algo}<" in body
    # Statistical test should detect a difference for energy (PoW dwarfs others).
    assert "algorithms differ" in body
    # Plot embed for energy bar.
    assert 'src="/experiments/synth-A/plots/energy_joules_bar.png"' in body


def test_experiment_detail_with_few_reps_marks_test_as_skipped(populated_app):
    """synth-B has 3 reps but only one algorithm → comparison cannot run."""
    resp = populated_app.test_client().get("/experiments/synth-B")
    assert resp.status_code == 200
    body = resp.data.decode()
    # Single-group experiments fall through stat_pipeline as 'skipped'.
    assert "Test skipped" in body or "skipped" in body


def test_experiment_detail_renders_reliability_table_when_failures_exist(app):
    """A run with committed_by_quorum=0 must surface in the dashboard's
    Reliability section, with a non-zero failure rate."""
    repo = SqliteRepository(app.config["DB_PATH_TMP"])
    try:
        # 3 successful pos + 2 failed pos.
        for rep in range(3):
            repo.save_run(_summary("pos", rep, experiment="rel-test", energy_offset=2.0))
        for rep in range(3, 5):
            failed = _summary("pos", rep, experiment="rel-test", energy_offset=2.0)
            failed["committed_by_quorum"] = 0
            failed["throughput_tps"] = 0.0
            repo.save_run(failed)
        # Need ≥ 2 algorithms for compare_groups not to be skipped.
        for rep in range(3):
            repo.save_run(_summary("pbft", rep, experiment="rel-test", energy_offset=1.0))
    finally:
        repo.close()

    resp = app.test_client().get("/experiments/rel-test")
    assert resp.status_code == 200
    body = resp.data.decode()
    assert "Reliability" in body
    # PoS row shows 2 failed of 5, i.e. 40%.
    assert "40.0%" in body
    # PBFT row shows 0% (clean).
    assert "0.0%" in body


# --------------------------------------------------------------------------- #
# Plot file endpoint                                                          #
# --------------------------------------------------------------------------- #


def test_plot_endpoint_serves_png_bytes(populated_app):
    client = populated_app.test_client()
    # Hit detail first to make sure analyse_experiment generated the plots.
    client.get("/experiments/synth-A")
    resp = client.get("/experiments/synth-A/plots/energy_joules_bar.png")
    assert resp.status_code == 200
    assert resp.mimetype == "image/png"
    # PNG magic number — guarantees we got an actual image, not an HTML page.
    assert resp.data.startswith(b"\x89PNG\r\n\x1a\n")


def test_plot_endpoint_404s_for_unknown_file(populated_app):
    client = populated_app.test_client()
    client.get("/experiments/synth-A")
    resp = client.get("/experiments/synth-A/plots/nope.png")
    assert resp.status_code == 404


# --------------------------------------------------------------------------- #
# Path traversal / safety                                                     #
# --------------------------------------------------------------------------- #


def test_plot_endpoint_rejects_path_traversal(populated_app):
    client = populated_app.test_client()
    # Note: "/" inside the segment is auto-decoded by Flask routing, but ".."
    # in the filename slot must be rejected by _safe_segment.
    resp = client.get("/experiments/synth-A/plots/..")
    assert resp.status_code == 400
