"""Analysis: Shapiro-Wilk + ANOVA/Kruskal-Wallis stats, matplotlib/seaborn plots, MD/PDF reports.

Public entry point: `analyse_experiment(repository, experiment_name, output_dir)`.

Failed runs (where consensus stalled and no transactions reached the quorum)
are tracked separately via `failure_summary`. They are excluded from the
per-metric aggregates because they are protocol-level failure events, not
random noise — including them would bias TPS / latency / energy means and
inflate stdevs in a way that misrepresents the algorithm's typical behaviour.
The failure rate itself is reported as a first-class reliability metric.
"""
from __future__ import annotations

from pathlib import Path

from analysis.plot_generator import PlotGenerator
from analysis.report_builder import ReportBuilder
from analysis.stat_pipeline import StatPipeline, StatResult

# (column_name_in_runs_table, human-readable label, log_scale_for_plots)
DEFAULT_METRICS: list[tuple[str, str, bool]] = [
    ("throughput_tps",   "Throughput (TPS)",       False),
    ("latency_ms_p50",   "Latency p50 (ms)",       False),
    ("latency_ms_p95",   "Latency p95 (ms)",       False),
    ("finality_ms_p95",  "Finality p95 (ms)",      False),
    ("energy_joules",    "Energy (J)",             True),   # log scale: PoW vs PBFT differ by 10–100×
    ("bytes_per_tx",     "Bytes per Tx",           False),
]


def is_failed_run(row: dict) -> bool:
    """A run "failed" if no transaction reached the configured quorum.

    Captures both total dropouts (PoS validators that miss every slot) and any
    other path that ends with `committed_by_quorum == 0`. Slow-but-successful
    runs (e.g., a PBFT scenario where everything committed but at degraded
    throughput) are NOT considered failures — they are valid measurements of
    the algorithm under stress and stay in the per-metric aggregates.
    """
    committed = row.get("committed_by_quorum")
    if committed is None:
        return False
    return int(committed) == 0


def compute_failure_summary(rows: list[dict]) -> dict[str, dict]:
    """Per-algorithm reliability counts.

    Returns a dict keyed by algorithm with `total_runs`, `failed_runs`,
    `successful_runs`, and `failure_rate` (0.0–1.0). Algorithms absent from
    `rows` simply do not appear; the report builder handles the empty case.
    """
    out: dict[str, dict] = {}
    for row in rows:
        algo = row.get("algorithm")
        if not algo:
            continue
        bucket = out.setdefault(
            algo, {"total_runs": 0, "failed_runs": 0, "successful_runs": 0, "failure_rate": 0.0}
        )
        bucket.setdefault("partial_runs", 0)
        bucket.setdefault("complete_runs", 0)
        bucket.setdefault("energy_all_joules", 0.0)
        bucket.setdefault("committed_total", 0)
        committed = row.get("committed_by_quorum") or 0
        submitted = row.get("submitted") or row.get("tx_count") or 0
        bucket["partial_runs"] += int(0 < committed < submitted)
        bucket["complete_runs"] += int(submitted > 0 and committed == submitted)
        bucket["energy_all_joules"] += row.get("energy_joules") or 0.0
        bucket["committed_total"] += committed
        bucket["total_runs"] += 1
        if is_failed_run(row):
            bucket["failed_runs"] += 1
        else:
            bucket["successful_runs"] += 1
    for bucket in out.values():
        if bucket["total_runs"]:
            bucket["failure_rate"] = bucket["failed_runs"] / bucket["total_runs"]
        bucket["pooled_joules_per_tx"] = bucket["energy_all_joules"] / bucket["committed_total"] if bucket["committed_total"] else None
    return out


def analyse_experiment(
    repository,
    experiment_name: str,
    output_dir: Path | str,
    metrics: list[tuple[str, str, bool]] = DEFAULT_METRICS,
    alpha: float = 0.05,
) -> dict:
    """Run the full analysis pipeline against a SqliteRepository.

    Reads every row matching `experiment_name`, separates failed from
    successful runs, groups the **successful** ones by algorithm, applies the
    stat pipeline + plot generator + report builder. Writes plots under
    `<output_dir>/plots/` and the report at `<output_dir>/report.md`.

    Returns a dict with:
        report_path     : Path to the rendered Markdown report.
        results         : list of (label, StatResult) tuples (over successful runs).
        plot_paths      : dict {label: {"bar": Path, "box": Path}}.
        failure_summary : dict {algorithm: {total/failed/successful/failure_rate}}.
    """
    output_dir = Path(output_dir)
    plots_dir = output_dir / "plots"
    plots_dir.mkdir(parents=True, exist_ok=True)

    rows = repository.list_runs(experiment_name=experiment_name)
    if not rows:
        raise ValueError(f"no runs found for experiment {experiment_name!r}")

    failure_summary = compute_failure_summary(rows)
    successful_rows = [r for r in rows if not is_failed_run(r)]

    pipeline = StatPipeline(alpha=alpha)
    plotter = PlotGenerator(plots_dir)
    builder = ReportBuilder()

    results: list[tuple[str, StatResult]] = []
    plot_paths: dict[str, dict[str, Path]] = {}

    for column, label, log_scale in metrics:
        groups: dict[str, list[float]] = {}
        for row in successful_rows:
            value = row.get(column)
            if value is None:
                continue
            groups.setdefault(row["algorithm"], []).append(float(value))
        if not groups:
            continue
        stat_result = pipeline.compare_groups(column, groups)
        # Carry the human-readable label along with the metric column name.
        stat_result.metric = label
        results.append((label, stat_result))
        bar = plotter.bar_with_error(
            groups, title=label, ylabel=label,
            filename=f"{column}_bar.png", log_scale=log_scale,
        )
        box = plotter.boxplot(
            groups, title=label, ylabel=label,
            filename=f"{column}_box.png", log_scale=log_scale,
        )
        plot_paths[label] = {"bar": bar, "box": box}

    report_path = builder.build(
        experiment_name, results, plot_paths,
        output_dir / "report.md", failure_summary=failure_summary,
    )
    return {
        "report_path": report_path,
        "results": results,
        "plot_paths": plot_paths,
        "failure_summary": failure_summary,
    }


__all__ = [
    "DEFAULT_METRICS",
    "PlotGenerator",
    "ReportBuilder",
    "StatPipeline",
    "StatResult",
    "analyse_experiment",
    "compute_failure_summary",
    "is_failed_run",
]
