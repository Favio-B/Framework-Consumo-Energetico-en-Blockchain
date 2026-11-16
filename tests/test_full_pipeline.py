"""End-to-end integration test — the entire framework as the paper will use it.

Pipeline exercised in one shot:
    config dict
        → ScenarioRunner.run_experiment      (3 algos × 2 reps = 6 runs)
            → consensus modules launch real Docker containers
            → ResourceMonitor samples CPU / memory / network
            → ResultCollector persists per-run artefacts on disk
            → SqliteRepository inserts aggregated rows
        → analyse_experiment                  (Shapiro / ANOVA / Kruskal)
            → PlotGenerator emits PNGs
            → ReportBuilder emits Markdown
        → dashboard                           (Flask test_client renders the result)

Slow (~2-3 min). Requires Docker. Auto-skipped without a daemon.
This is the test that fails if any cross-layer contract regresses.
"""
from __future__ import annotations

import time
from pathlib import Path

import pytest

pytest.importorskip("docker")


@pytest.fixture(scope="module")
def docker_available():
    import docker
    try:
        client = docker.from_env()
        client.ping()
    except Exception as exc:  # noqa: BLE001 — any failure means skip
        pytest.skip(f"Docker daemon not reachable: {exc}")
    return True


@pytest.mark.timeout(360)
def test_full_pipeline_three_algorithms_end_to_end(
    docker_available, tmp_path: Path
):
    """The full vertical slice: YAML → orchestrator → analysis → dashboard."""
    from analysis import analyse_experiment
    from dashboard.app import create_app
    from orchestrator.scenario_runner import ScenarioRunner
    from storage.repository import SqliteRepository

    config = {
        "experiment": {
            "name": "e2e",
            "algorithms": ["pbft", "pos", "pow"],
            "repetitions": 2,
        },
        "network": {
            "driver": "pumba",
            "nodes": 3,
            "latency_ms": 0,
            "bandwidth_kbps": 0,
            "packet_loss_pct": 0.0,
        },
        "workload": {"tx_count": 5, "tx_rate_tps": 5.0},
        "hardware": {"tdp_watts": 45},
        "resources": {"cpu_limit": 1.0, "mem_limit": "512m"},
        "runtime": {
            "warmup_seconds": 60,
            "settle_seconds": 3.0,
            "run_timeout_seconds": 90,
        },
        # Algorithm-specific sub-sections — picked up by _module_config.
        "pow": {"difficulty_bits": 14, "block_size": 10, "confirmations": 1},
        "pos": {"slot_seconds": 0.5, "block_size": 10, "confirmations": 1},
    }

    db_path = tmp_path / "experiments.db"
    repo = SqliteRepository(db_path)
    started = time.time()

    try:
        runner = ScenarioRunner(
            results_dir=tmp_path / "results", repository=repo
        )
        summaries = runner.run_experiment(config)

        # ---- 1. Every run completed and was persisted -------------------
        assert len(summaries) == 6, f"expected 6 summaries, got {len(summaries)}"
        algos_seen = {s["algorithm"] for s in summaries}
        assert algos_seen == {"pbft", "pos", "pow"}

        rows = repo.list_runs(experiment_name="e2e")
        assert len(rows) == 6, f"DB has {len(rows)} rows for e2e, expected 6"
        # All rows carry the experimental context the analysis layer relies on.
        for row in rows:
            assert row["tdp_watts"] == 45
            assert row["tx_count"] == 5
            assert row["tx_rate_tps"] == 5.0
            assert row["artefacts_dir"]

        # ---- 2. analyse_experiment runs the full stat + plot pipeline ---
        analysis = analyse_experiment(
            repo, "e2e", output_dir=tmp_path / "report"
        )
        report_path = analysis["report_path"]
        assert report_path.is_file(), "report.md was not written"
        report_text = report_path.read_text(encoding="utf-8")
        for algo in ("pbft", "pos", "pow"):
            assert algo in report_text, f"report missing algorithm {algo!r}"

        plots_dir = tmp_path / "report" / "plots"
        # At least the energy bar and box plot must exist.
        assert (plots_dir / "energy_joules_bar.png").is_file()
        assert (plots_dir / "energy_joules_box.png").is_file()

        # ---- 3. Energy ranking matches the central paper hypothesis -----
        # PoW always-on mining must consume more than PBFT/PoS at the same
        # workload — this is the result the paper exists to quantify, so it
        # is also the first thing a regression in the pipeline would break.
        results = dict(analysis["results"])
        energy = results["Energy (J)"]
        assert {"pbft", "pos", "pow"}.issubset(energy.groups.keys())
        pow_mean = energy.groups["pow"].mean
        pbft_mean = energy.groups["pbft"].mean
        pos_mean = energy.groups["pos"].mean
        assert pow_mean > pbft_mean, (
            f"PoW should outburn PBFT — got pow={pow_mean:.3f} J, pbft={pbft_mean:.3f} J"
        )
        assert pow_mean > pos_mean, (
            f"PoW should outburn PoS — got pow={pow_mean:.3f} J, pos={pos_mean:.3f} J"
        )

        # ---- 4. Dashboard renders this experiment cleanly ---------------
        app = create_app(
            db_path=str(db_path),
            results_dir=str(tmp_path / "dashboard_analysis"),
        )
        client = app.test_client()

        index_resp = client.get("/")
        assert index_resp.status_code == 200
        assert b"e2e" in index_resp.data

        detail_resp = client.get("/experiments/e2e")
        assert detail_resp.status_code == 200
        body = detail_resp.data.decode()
        for algo in ("pbft", "pos", "pow"):
            assert algo in body
        # Dashboard built its own copy of the plots — verify the bar PNG
        # really comes back as image bytes (not a 404 HTML page).
        plot_resp = client.get("/experiments/e2e/plots/energy_joules_bar.png")
        assert plot_resp.status_code == 200
        assert plot_resp.mimetype == "image/png"
        assert plot_resp.data.startswith(b"\x89PNG\r\n\x1a\n")
    finally:
        repo.close()

    # ---- 5. Sanity: total wall-clock budget held -----------------------
    elapsed = time.time() - started
    # Soft ceiling so a regression that 10x's the runtime trips a clear failure.
    assert elapsed < 300, f"end-to-end pipeline took {elapsed:.1f}s (>300s)"
