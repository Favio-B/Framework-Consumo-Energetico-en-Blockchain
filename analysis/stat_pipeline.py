"""Statistical comparison pipeline.

For every metric × algorithm group, follow the workflow demanded by the IEEE
methodology section:

    1. Shapiro-Wilk normality test on each group (requires n ≥ 3).
    2. If every group is normal at α → one-way ANOVA (parametric).
    3. Otherwise → Kruskal-Wallis (non-parametric).
    4. Report test used, statistic, p-value, and significance flag at α.

Edge cases (returned as `test_used="skipped"` with an explanatory `note`):
    * < 2 algorithm groups available
    * any group with < 2 samples (cannot run group test)
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterable

import numpy as np
import scipy.stats


@dataclass
class GroupStats:
    n: int
    mean: float
    std: float
    median: float
    min: float
    max: float


@dataclass
class StatResult:
    metric: str
    groups: dict[str, GroupStats] = field(default_factory=dict)
    normality: dict[str, tuple[float, float] | None] = field(default_factory=dict)
    test_used: str = "skipped"        # "ANOVA" | "Kruskal-Wallis" | "skipped"
    statistic: float | None = None
    p_value: float | None = None
    significant: bool = False
    alpha: float = 0.05
    note: str = ""


def _descriptives(values: Iterable[float]) -> GroupStats:
    arr = np.asarray(list(values), dtype=float)
    n = int(arr.size)
    if n == 0:
        return GroupStats(n=0, mean=0.0, std=0.0, median=0.0, min=0.0, max=0.0)
    return GroupStats(
        n=n,
        mean=float(arr.mean()),
        std=float(arr.std(ddof=1)) if n > 1 else 0.0,
        median=float(np.median(arr)),
        min=float(arr.min()),
        max=float(arr.max()),
    )


class StatPipeline:
    def __init__(self, alpha: float = 0.05) -> None:
        if not 0.0 < alpha < 1.0:
            raise ValueError("alpha must be in (0, 1)")
        self.alpha = alpha

    def shapiro_wilk(self, values: list[float]) -> tuple[float, float] | None:
        """Returns (W, p) or None if Shapiro-Wilk cannot be computed (n < 3)."""
        if len(values) < 3:
            return None
        # All-equal samples make Shapiro raise — treat as "non-normal" upstream.
        arr = np.asarray(values, dtype=float)
        if arr.std(ddof=0) == 0.0:
            return (1.0, 1.0)  # zero variance → trivially "normal" by convention
        try:
            res = scipy.stats.shapiro(arr)
        except Exception:  # noqa: BLE001 — scipy can raise on degenerate input
            return None
        return float(res.statistic), float(res.pvalue)

    def compare_groups(
        self, metric: str, groups: dict[str, list[float]]
    ) -> StatResult:
        # Drop empty groups so the caller can pass partial datasets safely.
        groups = {k: list(v) for k, v in groups.items() if v}
        result = StatResult(
            metric=metric,
            groups={k: _descriptives(v) for k, v in groups.items()},
            alpha=self.alpha,
        )

        if len(groups) < 2:
            result.test_used = "skipped"
            result.note = (
                f"need ≥2 algorithm groups, found {len(groups)} "
                f"({sorted(groups)})"
            )
            for k in groups:
                result.normality[k] = self.shapiro_wilk(groups[k])
            return result

        # Normality test on each group.
        all_normal = True
        for k, vals in groups.items():
            sw = self.shapiro_wilk(vals)
            result.normality[k] = sw
            if sw is None:
                all_normal = False
                continue
            _, p = sw
            if p < self.alpha:
                all_normal = False

        # ANOVA / Kruskal both need ≥ 2 samples per group.
        too_small = [k for k, v in groups.items() if len(v) < 2]
        if too_small:
            result.test_used = "skipped"
            result.note = f"groups with <2 samples: {too_small}"
            return result

        values_list = [groups[k] for k in sorted(groups)]
        try:
            if all_normal:
                F, p = scipy.stats.f_oneway(*values_list)
                result.test_used = "ANOVA"
                result.statistic = float(F)
            else:
                H, p = scipy.stats.kruskal(*values_list)
                result.test_used = "Kruskal-Wallis"
                result.statistic = float(H)
            if np.isnan(p):
                result.p_value = None
                result.note = "p-value is NaN — likely identical groups"
            else:
                result.p_value = float(p)
                result.significant = result.p_value < self.alpha
        except Exception as exc:  # noqa: BLE001 — defensive, keep going on failure
            result.test_used = "skipped"
            result.note = f"{type(exc).__name__}: {exc}"
        return result
