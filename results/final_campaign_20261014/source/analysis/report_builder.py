"""Markdown report builder.

Sections (in order):
    1. Header — experiment name, run count, algorithm summary.
    2. Per-metric blocks — descriptives table + statistical test verdict +
       embedded bar and box plots.
    3. Threats to validity — manual placeholder the researcher fills in
       before submitting the paper.

PDF output is intentionally not implemented in this phase. The Markdown is
self-contained (relative image paths) so any standard converter (pandoc,
typst, VS Code Markdown PDF) produces a paper-ready PDF if needed.
"""
from __future__ import annotations

from datetime import datetime, timezone
from pathlib import Path

from analysis.stat_pipeline import StatResult


class ReportBuilder:
    def build(
        self,
        experiment_name: str,
        results: list[tuple[str, StatResult]],
        plot_paths: dict[str, dict[str, Path]],
        output_path: Path | str,
        failure_summary: dict[str, dict] | None = None,
    ) -> Path:
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        sections: list[str] = []
        sections.append(self._header(experiment_name, results))
        if failure_summary:
            sections.append(self._reliability_section(failure_summary))
        sections.append(self._summary_table(results))
        for label, stat_result in results:
            sections.append(self._metric_block(label, stat_result, plot_paths.get(label, {}), output_path.parent))
        sections.append(_THREATS_TO_VALIDITY)
        output_path.write_text("\n\n".join(sections) + "\n", encoding="utf-8")
        return output_path

    # ---- helpers ---------------------------------------------------------

    def _header(self, experiment_name: str, results: list[tuple[str, StatResult]]) -> str:
        algos = sorted({a for _, r in results for a in r.groups})
        n_runs = max((r.groups[a].n for _, r in results for a in r.groups), default=0)
        ts = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        return (
            f"# Experiment Report — {experiment_name}\n\n"
            f"- **Generated:** {ts}\n"
            f"- **Algorithms compared:** {', '.join(algos) if algos else '—'}\n"
            f"- **Repetitions per algorithm:** up to {n_runs}\n"
            f"- **Significance threshold (α):** {results[0][1].alpha if results else 0.05}"
        )

    def _reliability_section(self, failure_summary: dict[str, dict]) -> str:
        any_failures = any(d.get("failed_runs", 0) > 0 for d in failure_summary.values())
        lines = [
            "## Reliability",
            "",
            "Runs where `committed_by_quorum == 0` — i.e. the consensus protocol",
            "made no forward progress and no transaction reached the quorum. These",
            "are **excluded** from the per-metric tables below; they belong to the",
            "reliability metric itself, not to the TPS / latency / energy aggregates.",
            "",
            "| Algorithm | Total runs | Failed | Successful | Failure rate |",
            "|---|---|---|---|---|",
        ]
        for algo in sorted(failure_summary):
            d = failure_summary[algo]
            lines.append(
                f"| {algo} | {d['total_runs']} | {d['failed_runs']} | "
                f"{d['successful_runs']} | {d['failure_rate']:.1%} |"
            )
        if not any_failures:
            lines += ["", "_All runs reached the quorum — no protocol-level failures._"]
        else:
            lines += [
                "",
                "_Algorithms with non-zero failure rates have their dropouts removed",
                "from the metric aggregates below; the totals reflect only runs where",
                "consensus actually progressed._",
            ]
        lines += ["", "Nonzero progress can be partial; it does not imply all submitted transactions finished.", "", "| Algorithm | Partial | Complete | Committed total | Energy all runs (J) | Pooled J/committed tx |", "|---|---:|---:|---:|---:|---:|"]
        for algo, d in sorted(failure_summary.items()):
            pooled = d.get("pooled_joules_per_tx")
            pooled_text = f"{pooled:.6g}" if pooled is not None else "NA"
            lines.append(f"| {algo} | {d.get('partial_runs', 'NA')} | {d.get('complete_runs', 'NA')} | {d.get('committed_total', 'NA')} | {d.get('energy_all_joules', 0):.6g} | {pooled_text} |")
        lines += ["", "Pooled J/tx includes energy from zero-progress runs. Metric tables below condition on >0 progress, including partial runs. Latency samples exclude unconfirmed requests; interpret them with completion counts."]
        return "\n".join(lines)

    def _summary_table(self, results: list[tuple[str, StatResult]]) -> str:
        if not results:
            return "## Summary\n\n_No metrics analysed._"
        lines = ["## Summary",
                 "",
                 "| Metric | Test | Statistic | p-value | α=0.05 verdict |",
                 "|---|---|---|---|---|"]
        for label, r in results:
            stat = f"{r.statistic:.3f}" if r.statistic is not None else "—"
            p = f"{r.p_value:.6g}" if r.p_value is not None else "—"
            verdict = "✓ different" if r.significant else (
                "✗ no difference" if r.test_used != "skipped" else f"skipped ({r.note})"
            )
            lines.append(f"| {label} | {r.test_used} | {stat} | {p} | {verdict} |")
        return "\n".join(lines)

    def _metric_block(
        self,
        label: str,
        result: StatResult,
        plots: dict[str, Path],
        report_dir: Path,
    ) -> str:
        # Descriptives table
        algos = sorted(result.groups)
        head = "| Algorithm | n | mean | stdev | median | min | max |"
        sep = "|---|---|---|---|---|---|---|"
        rows = []
        for a in algos:
            g = result.groups[a]
            rows.append(
                f"| {a} | {g.n} | {g.mean:.3f} | {g.std:.3f} | "
                f"{g.median:.3f} | {g.min:.3f} | {g.max:.3f} |"
            )

        # Normality table
        norm_rows = ["| Algorithm | Shapiro W | p-value | normal at α |",
                     "|---|---|---|---|"]
        for a in algos:
            sw = result.normality.get(a)
            if sw is None:
                norm_rows.append(f"| {a} | — | — | (n<3) |")
            else:
                W, p = sw
                verdict = "yes" if p >= result.alpha else "no"
                norm_rows.append(f"| {a} | {W:.3f} | {p:.6g} | {verdict} |")

        # Verdict line
        if result.test_used == "skipped":
            verdict_line = f"**Test:** skipped — {result.note}"
        else:
            verdict_line = (
                f"**Test:** {result.test_used} → "
                f"statistic = {result.statistic:.3f}, "
                f"p = {result.p_value:.6g}"
                if result.p_value is not None
                else f"**Test:** {result.test_used} → {result.note}"
            )
            if result.p_value is not None:
                verdict_line += (
                    f"  →  algorithms **{'differ' if result.significant else 'do not differ'}** "
                    f"at α = {result.alpha}"
                )

        # Embed plots (relative to report directory)
        plot_lines = []
        for kind, path in plots.items():
            rel = Path(path).resolve().relative_to(report_dir.resolve())
            plot_lines.append(f"![{label} — {kind}]({rel.as_posix()})")

        return "\n".join([
            f"## {label}",
            "",
            "### Descriptives",
            head,
            sep,
            *rows,
            "",
            "### Normality (Shapiro-Wilk)",
            *norm_rows,
            "",
            verdict_line,
            "",
            *plot_lines,
        ])


_THREATS_TO_VALIDITY = """## Threats to Validity

- **Energy proxy.** The reported joules use the model
  `E = (cpu_percent_total / 100) / num_cpus * tdp_watts * duration_s`. Real CPU
  power is non-linear in utilisation (DVFS, idle draw, turbo), so absolute
  numbers are indicative; the *relative* ranking between algorithms is
  what carries weight. See `monitoring/energy_estimator.py` for caveats.
- **PoW reference implementation.** SHA-256 nonce-search at configurable
  difficulty and longest-chain fork handling with a local confirmed-prefix lock.
  This simplified lock differs from probabilistic Nakamoto finality; partitions
  and conflicting confirmed prefixes are not resolved by this prototype. Captures the
  always-on CPU cost of PoW, which is the dimension we measure.
- **PBFT simplifications.** No view changes, no checkpoints, no batching.
  Captures the three-phase agreement cost faithfully but does not stress
  recovery paths.
- **PoS simplifications.** No slashing, no nothing-at-stake protection,
  no finality gadget. Captures the single-proposer-per-slot cost.
- **Network emulation.** Pumba on local Docker Desktop applies netem via
  per-target sidecars; effective rules engage ~3 s after the call. The VPS
  Linux tc driver is an unimplemented stub. Paper-mode runs additionally compose
  delay/rate in the Pumba nettools container namespace and save effective qdiscs.
- **Sample size.** Each scenario must have ≥5 repetitions for ANOVA /
  Kruskal-Wallis to be meaningful; entries marked `skipped` indicate
  insufficient data. Statistical significance alone does not establish
  practical importance, pairwise differences, or generality to production chains.

_Edit this section for the IEEE submission with experiment-specific notes._
"""
