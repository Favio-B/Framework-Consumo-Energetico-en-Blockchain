"""Matplotlib plot generation for the analysis report.

Two plot kinds per metric:
    bar_with_error  — mean ± stdev across reps, one bar per algorithm
    boxplot         — distribution of each algorithm's reps

Output is always PNG at 150 DPI (legible inline in Markdown and acceptable for
IEEE figure inclusion). The Agg backend is forced before pyplot import so the
generator is safe to use in headless environments (CI, the dashboard server).
"""
from __future__ import annotations

from pathlib import Path

import matplotlib

matplotlib.use("Agg")  # headless — must precede pyplot import

import matplotlib.pyplot as plt  # noqa: E402
import numpy as np  # noqa: E402


_BAR_COLORS = {
    "pbft": "#3a7bd5",
    "pow":  "#d96d3a",
    "pos":  "#2ca06f",
}


class PlotGenerator:
    def __init__(self, output_dir: Path | str) -> None:
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)

    def bar_with_error(
        self,
        groups: dict[str, list[float]],
        title: str,
        ylabel: str,
        filename: str,
        log_scale: bool = False,
    ) -> Path:
        labels = sorted(groups.keys())
        means = [float(np.mean(groups[l])) for l in labels]
        stds = [float(np.std(groups[l], ddof=1)) if len(groups[l]) > 1 else 0.0
                for l in labels]
        colors = [_BAR_COLORS.get(l, "#888888") for l in labels]

        fig, ax = plt.subplots(figsize=(7, 4.5))
        ax.bar(labels, means, yerr=stds, capsize=6, color=colors,
               edgecolor="#222", linewidth=0.8)
        ax.set_title(title, fontsize=12)
        ax.set_ylabel(ylabel)
        ax.set_xlabel("algorithm")
        if log_scale:
            ax.set_yscale("log")
        ax.grid(True, axis="y", alpha=0.3)
        for label, m, s in zip(labels, means, stds):
            ax.text(label, m + (s if s else m * 0.02), f"{m:.2f}",
                    ha="center", va="bottom", fontsize=9)
        fig.tight_layout()
        out_path = self.output_dir / filename
        fig.savefig(out_path, dpi=150)
        plt.close(fig)
        return out_path

    def boxplot(
        self,
        groups: dict[str, list[float]],
        title: str,
        ylabel: str,
        filename: str,
        log_scale: bool = False,
    ) -> Path:
        labels = sorted(groups.keys())
        data = [groups[l] for l in labels]
        colors = [_BAR_COLORS.get(l, "#888888") for l in labels]

        fig, ax = plt.subplots(figsize=(7, 4.5))
        bp = ax.boxplot(data, tick_labels=labels, showmeans=True, patch_artist=True)
        for patch, color in zip(bp["boxes"], colors):
            patch.set_facecolor(color)
            patch.set_alpha(0.55)
        ax.set_title(title, fontsize=12)
        ax.set_ylabel(ylabel)
        ax.set_xlabel("algorithm")
        if log_scale:
            ax.set_yscale("log")
        ax.grid(True, axis="y", alpha=0.3)
        fig.tight_layout()
        out_path = self.output_dir / filename
        fig.savefig(out_path, dpi=150)
        plt.close(fig)
        return out_path
