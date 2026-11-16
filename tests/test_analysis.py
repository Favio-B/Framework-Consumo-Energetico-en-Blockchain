"""Tests for the analysis layer — pure Python (no Docker required).

Covers:
    * StatPipeline: ANOVA vs Kruskal-Wallis selection, normality detection,
      identical-groups → no significance, clearly-different → significance,
      edge cases (small n, single group, zero variance).
    * PlotGenerator: PNGs are produced and non-empty.
    * ReportBuilder: Markdown structure contains the expected sections.
    * analyse_experiment: end-to-end against a real SqliteRepository populated
      with synthetic 5-rep × 3-algo summaries.
"""
from __future__ import annotations

import random
from pathlib import Path

import numpy as np
import pytest
from scipy.stats import norm

from analysis import (
    analyse_experiment,
    compute_failure_summary,
    is_failed_run,
)
from analysis.plot_generator import PlotGenerator
from analysis.report_builder import ReportBuilder
from analysis.stat_pipeline import StatPipeline, StatResult, _descriptives
from storage.repository import SqliteRepository


# =========================================================================== #
# StatPipeline                                                                #
# =========================================================================== #


def test_stat_pipeline_rejects_bad_alpha():
    with pytest.raises(ValueError):
        StatPipeline(alpha=0)
    with pytest.raises(ValueError):
        StatPipeline(alpha=1.5)


def test_descriptives_match_numpy():
    vals = [1.0, 2.0, 3.0, 4.0, 5.0]
    g = _descriptives(vals)
    assert g.n == 5
    assert g.mean == pytest.approx(3.0)
    assert g.std == pytest.approx(np.std(vals, ddof=1))
    assert g.median == 3.0
    assert g.min == 1.0
    assert g.max == 5.0


def test_descriptives_handles_single_value():
    g = _descriptives([42.0])
    assert g.n == 1
    assert g.mean == 42.0
    assert g.std == 0.0  # ddof=1 undefined for n=1; we fall back to 0


def test_shapiro_returns_none_below_n3():
    pl = StatPipeline()
    assert pl.shapiro_wilk([1.0, 2.0]) is None


def test_shapiro_zero_variance_treated_as_normal():
    pl = StatPipeline()
    sw = pl.shapiro_wilk([7.0, 7.0, 7.0, 7.0])
    assert sw == (1.0, 1.0)


def _normal_samples(loc: float, scale: float, n: int = 20) -> list[float]:
    """Deterministic samples placed at evenly-spaced quantiles of N(loc, scale).

    Guaranteed to pass Shapiro-Wilk — useful for verifying the ANOVA branch
    deterministically without relying on RNG luck.
    """
    quantiles = np.linspace(1.0 / (n + 1), n / (n + 1), n)
    return list(norm.ppf(quantiles) * scale + loc)


def test_compare_groups_uses_anova_when_all_normal():
    groups = {
        "pbft": _normal_samples(1.0, 0.05),
        "pow":  _normal_samples(1.05, 0.05),
        "pos":  _normal_samples(0.95, 0.05),
    }
    result = StatPipeline().compare_groups("metric", groups)
    assert result.test_used == "ANOVA"
    assert result.p_value is not None and 0.0 <= result.p_value <= 1.0


def test_compare_groups_uses_kruskal_when_any_non_normal():
    rng = random.Random(7)
    # Group 'pow' is heavily skewed (exponential) → fails normality.
    groups = {
        "pbft": [rng.gauss(1.0, 0.1) for _ in range(20)],
        "pow":  [rng.expovariate(1.0) for _ in range(20)],
        "pos":  [rng.gauss(2.0, 0.1) for _ in range(20)],
    }
    result = StatPipeline().compare_groups("metric", groups)
    assert result.test_used == "Kruskal-Wallis"


def test_compare_groups_clearly_different_is_significant():
    groups = {
        "pbft": [0.1] * 10,  # zero variance → forced to "normal" → ANOVA path
        "pow":  [10.0] * 10,
        "pos":  [0.5] * 10,
    }
    # Add tiny noise so ANOVA does not divide by zero variance.
    rng = random.Random(0)
    groups = {k: [v + rng.gauss(0, 0.001) for v in vals] for k, vals in groups.items()}
    result = StatPipeline().compare_groups("metric", groups)
    assert result.significant is True
    assert result.p_value is not None and result.p_value < 0.05


def test_compare_groups_identical_is_not_significant():
    rng = random.Random(123)
    base = [rng.gauss(5.0, 0.5) for _ in range(20)]
    groups = {"pbft": base[:], "pow": base[:], "pos": base[:]}
    result = StatPipeline().compare_groups("metric", groups)
    # Identical inputs → ANOVA p ≈ 1.0
    assert result.significant is False


def test_compare_groups_skipped_with_only_one_group():
    result = StatPipeline().compare_groups("m", {"pbft": [1, 2, 3, 4, 5]})
    assert result.test_used == "skipped"
    assert "≥2" in result.note


def test_compare_groups_skipped_when_group_too_small():
    result = StatPipeline().compare_groups(
        "m", {"pbft": [1, 2, 3, 4], "pow": [5]}
    )
    assert result.test_used == "skipped"
    assert "<2" in result.note


def test_compare_groups_drops_empty_groups():
    result = StatPipeline().compare_groups(
        "m", {"pbft": [1, 2, 3], "pow": [], "pos": [10, 11, 12]}
    )
    assert "pow" not in result.groups
    assert {"pbft", "pos"}.issubset(result.groups.keys())


# =========================================================================== #
# PlotGenerator                                                               #
# =========================================================================== #


def test_bar_with_error_creates_non_empty_png(tmp_path: Path):
    plotter = PlotGenerator(tmp_path)
    out = plotter.bar_with_error(
        groups={"pbft": [1.0, 1.1, 0.9], "pow": [10, 11, 9], "pos": [0.5, 0.6, 0.4]},
        title="t", ylabel="y", filename="bar.png",
    )
    assert out.exists()
    assert out.stat().st_size > 1000  # PNG header + chart > 1 KB


def test_boxplot_creates_non_empty_png(tmp_path: Path):
    plotter = PlotGenerator(tmp_path)
    out = plotter.boxplot(
        groups={"pbft": [1, 2, 3, 4, 5], "pow": [10, 11, 12, 13, 14]},
        title="t", ylabel="y", filename="box.png",
    )
    assert out.exists()
    assert out.stat().st_size > 1000


def test_log_scale_does_not_crash(tmp_path: Path):
    plotter = PlotGenerator(tmp_path)
    plotter.bar_with_error(
        groups={"a": [0.001, 0.002], "b": [100, 200]},
        title="t", ylabel="y", filename="log.png", log_scale=True,
    )
    assert (tmp_path / "log.png").exists()


# =========================================================================== #
# ReportBuilder                                                               #
# =========================================================================== #


def test_report_builder_produces_markdown_with_expected_sections(tmp_path: Path):
    plotter = PlotGenerator(tmp_path / "plots")
    bar = plotter.bar_with_error(
        groups={"pbft": [1, 2, 3], "pow": [10, 20, 30]},
        title="Energy (J)", ylabel="Energy (J)", filename="energy_bar.png",
    )

    pipeline = StatPipeline()
    result = pipeline.compare_groups(
        "energy_joules",
        {"pbft": [1.0, 1.1, 0.9, 1.05, 0.95],
         "pow":  [10.0, 11.0, 9.0, 10.5, 9.5]},
    )
    result.metric = "Energy (J)"

    builder = ReportBuilder()
    out = builder.build(
        experiment_name="unit-test",
        results=[("Energy (J)", result)],
        plot_paths={"Energy (J)": {"bar": bar}},
        output_path=tmp_path / "report.md",
    )

    text = out.read_text(encoding="utf-8")
    assert "Experiment Report — unit-test" in text
    assert "## Summary" in text
    assert "## Energy (J)" in text
    assert "Threats to Validity" in text
    assert "Shapiro-Wilk" in text
    assert "energy_bar.png" in text  # plot embed


def test_report_builder_handles_skipped_results(tmp_path: Path):
    skipped = StatResult(metric="X", test_used="skipped", note="too few groups")
    builder = ReportBuilder()
    out = builder.build(
        experiment_name="empty",
        results=[("X", skipped)],
        plot_paths={},
        output_path=tmp_path / "report.md",
    )
    text = out.read_text(encoding="utf-8")
    assert "skipped" in text


# =========================================================================== #
# analyse_experiment — end-to-end against SqliteRepository                    #
# =========================================================================== #


def _synth_summary(algo: str, rep: int, energy_offset: float) -> dict:
    base_latency = {"pbft": 5, "pow": 1500, "pos": 50}[algo]
    return {
        "run_id": f"{algo}-{rep}",
        "algorithm": algo,
        "repetition": rep,
        "node_count": 3,
        "quorum": 1,
        "started_at": f"2026-04-25T10:00:{rep:02d}+00:00",
        "experiment_name": "synth",
        "tdp_watts": 45,
        "tx_count": 20,
        "tx_rate_tps": 10.0,
        "latency_ms_applied": 0,
        "bandwidth_kbps_applied": 0,
        "packet_loss_pct_applied": 0.0,
        "submitted": 20,
        "committed_by_quorum": 20,
        "submit_window_s": 2.0 + 0.05 * rep,
        "throughput_tps": 9.5 + 0.1 * rep,
        "latency_ms": {"p50": base_latency + rep, "p95": base_latency * 2 + rep,
                        "p99": base_latency * 3 + rep, "mean": base_latency + rep},
        "finality_ms": {"p50": base_latency + rep, "p95": base_latency * 2 + rep,
                         "p99": base_latency * 3 + rep, "mean": base_latency + rep},
        "energy_joules": energy_offset + 0.05 * rep,
        "network_totals": {"total_rx_bytes": 1000 * (rep + 1), "total_tx_bytes": 2000 * (rep + 1)},
        "bytes_per_tx": {"total_per_tx": 1500.0},
        "resource_summary": {},
        "artefacts_dir": f"/tmp/results/{algo}-{rep}",
    }


def test_analyse_experiment_end_to_end(tmp_path: Path):
    repo = SqliteRepository(tmp_path / "experiments.db")
    try:
        # 5 reps × 3 algorithms with energy chosen so PoW >> PBFT/PoS.
        for rep in range(5):
            repo.save_run(_synth_summary("pbft", rep, energy_offset=1.0))
            repo.save_run(_synth_summary("pow",  rep, energy_offset=150.0))
            repo.save_run(_synth_summary("pos",  rep, energy_offset=0.5))

        out = analyse_experiment(repo, "synth", output_dir=tmp_path / "report_dir")

        # Report file written.
        assert out["report_path"].is_file()
        text = out["report_path"].read_text(encoding="utf-8")
        assert "synth" in text
        assert "## Energy (J)" in text

        # Plots written, one bar + one box per metric that had data.
        plots_dir = tmp_path / "report_dir" / "plots"
        png_files = sorted(p.name for p in plots_dir.glob("*.png"))
        assert "energy_joules_bar.png" in png_files
        assert "energy_joules_box.png" in png_files

        # Energy comparison must be highly significant (PoW dwarfs the others).
        results = dict(out["results"])
        energy = results["Energy (J)"]
        assert energy.test_used in ("ANOVA", "Kruskal-Wallis")
        assert energy.significant is True
        assert energy.p_value is not None and energy.p_value < 0.01
        # And mean ordering matches design: pow > pbft > pos.
        means = {a: energy.groups[a].mean for a in energy.groups}
        assert means["pow"] > means["pbft"] > means["pos"]
    finally:
        repo.close()


def test_analyse_experiment_raises_when_no_runs(tmp_path: Path):
    repo = SqliteRepository(tmp_path / "experiments.db")
    try:
        with pytest.raises(ValueError, match="no runs"):
            analyse_experiment(repo, "missing", output_dir=tmp_path)
    finally:
        repo.close()


# =========================================================================== #
# Failure detection (consensus dropouts excluded from metric aggregates)      #
# =========================================================================== #


def test_is_failed_run_detects_zero_committed():
    assert is_failed_run({"committed_by_quorum": 0}) is True
    assert is_failed_run({"committed_by_quorum": 1}) is False
    assert is_failed_run({"committed_by_quorum": 100}) is False


def test_is_failed_run_treats_missing_field_as_not_failed():
    # A row with no committed_by_quorum field at all (legacy / partial data)
    # is conservatively treated as "not failed" — we only flag explicit zeros.
    assert is_failed_run({}) is False
    assert is_failed_run({"committed_by_quorum": None}) is False


def test_compute_failure_summary_groups_by_algorithm():
    rows = [
        {"algorithm": "pbft", "committed_by_quorum": 100},
        {"algorithm": "pbft", "committed_by_quorum": 100},
        {"algorithm": "pos",  "committed_by_quorum": 100},
        {"algorithm": "pos",  "committed_by_quorum": 0},   # failed
        {"algorithm": "pos",  "committed_by_quorum": 0},   # failed
        {"algorithm": "pow",  "committed_by_quorum": 100},
    ]
    out = compute_failure_summary(rows)
    assert out["pbft"]["total_runs"] == 2
    assert out["pbft"]["failed_runs"] == 0
    assert out["pbft"]["failure_rate"] == 0.0
    assert out["pos"]["total_runs"] == 3
    assert out["pos"]["failed_runs"] == 2
    assert out["pos"]["successful_runs"] == 1
    assert out["pos"]["failure_rate"] == pytest.approx(2 / 3)
    assert out["pow"]["total_runs"] == 1
    assert out["pow"]["failed_runs"] == 0


def test_compute_failure_summary_skips_rows_without_algorithm():
    rows = [{"committed_by_quorum": 0}, {"algorithm": "pbft", "committed_by_quorum": 100}]
    out = compute_failure_summary(rows)
    assert set(out) == {"pbft"}


def test_analyse_experiment_excludes_failed_runs_from_metric_groups(tmp_path: Path):
    """A PoS run with committed_by_quorum=0 must not contribute to the TPS
    aggregate, otherwise the algorithm's typical performance is misrepresented."""
    repo = SqliteRepository(tmp_path / "experiments.db")
    try:
        # 4 successful PoS runs + 2 failed (TPS=0, committed=0).
        for rep in range(4):
            repo.save_run(_synth_summary("pos", rep, energy_offset=0.5))
        for rep in range(4, 6):
            failed = _synth_summary("pos", rep, energy_offset=0.5)
            failed["committed_by_quorum"] = 0
            failed["throughput_tps"] = 0.0
            repo.save_run(failed)
        # Need ≥ 2 algorithms for the comparison test to even run.
        for rep in range(4):
            repo.save_run(_synth_summary("pbft", rep, energy_offset=1.0))

        out = analyse_experiment(repo, "synth", output_dir=tmp_path / "report")

        # The failure summary must report 2 of 6 PoS runs failed.
        fs = out["failure_summary"]
        assert fs["pos"]["total_runs"] == 6
        assert fs["pos"]["failed_runs"] == 2
        assert fs["pos"]["failure_rate"] == pytest.approx(1 / 3)
        assert fs["pbft"]["failed_runs"] == 0

        # And the throughput aggregate for PoS must be over the 4 successful
        # runs only (not 6) — otherwise zeros would tank the mean.
        results = dict(out["results"])
        tps = results["Throughput (TPS)"]
        assert tps.groups["pos"].n == 4
        assert tps.groups["pbft"].n == 4
        # Mean should be the average of the 4 non-zero throughputs (~9.65),
        # not (0 + 0 + 4 successful) / 6 ≈ 6.4.
        assert tps.groups["pos"].mean > 9.0

        # Report contains the Reliability section.
        text = out["report_path"].read_text(encoding="utf-8")
        assert "## Reliability" in text
        assert "Failure rate" in text
    finally:
        repo.close()


def test_analyse_experiment_clean_run_shows_zero_failure_rate(tmp_path: Path):
    repo = SqliteRepository(tmp_path / "experiments.db")
    try:
        for rep in range(5):
            repo.save_run(_synth_summary("pbft", rep, energy_offset=1.0))
            repo.save_run(_synth_summary("pos",  rep, energy_offset=0.5))
        out = analyse_experiment(repo, "synth", output_dir=tmp_path / "report")
        for algo in ("pbft", "pos"):
            assert out["failure_summary"][algo]["failure_rate"] == 0.0
        text = out["report_path"].read_text(encoding="utf-8")
        assert "All runs reached the quorum" in text
    finally:
        repo.close()


def test_report_builder_renders_reliability_section_when_failures_present(tmp_path: Path):
    summary = {
        "pbft": {"total_runs": 5, "failed_runs": 0, "successful_runs": 5, "failure_rate": 0.0},
        "pos":  {"total_runs": 5, "failed_runs": 2, "successful_runs": 3, "failure_rate": 0.4},
    }
    builder = ReportBuilder()
    out = builder.build(
        experiment_name="rel",
        results=[],
        plot_paths={},
        output_path=tmp_path / "report.md",
        failure_summary=summary,
    )
    text = out.read_text(encoding="utf-8")
    assert "## Reliability" in text
    assert "40.0%" in text                    # the pos failure rate
    assert "0.0%" in text                     # the pbft (clean) row
    assert "All runs reached the quorum" not in text   # we have failures, no clean banner
