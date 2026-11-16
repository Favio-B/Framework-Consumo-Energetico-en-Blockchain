"""Proxy energy estimator.

Model (documented as an explicit limitation in the final report):

    E[joules] = (cpu_percent_total / 100) / num_cpus * tdp_watts * duration_s

`cpu_percent_total` matches docker stats semantics: 100% = one full core, so a
container using 200% on an 8-core host has been pinning 2 cores. Dividing by
num_cpus yields the utilization fraction of the whole CPU package (0..1), which
is then multiplied by TDP to get an instantaneous power estimate, then by
duration to get energy.

Known threats to validity (cite in the paper, do NOT hide):
    * Real CPU power is not linear in utilization — idle draw, DVFS, turbo.
    * TDP is a thermal cap, not instantaneous power.
    * Ignores RAM, disk, and NIC power; in practice CPU dominates for consensus
      workloads, but the numbers should be treated as *comparative*, not absolute.

The estimator is CPU-only, by design. Real-wattmeter calibration is a natural
follow-up when the framework graduates to the Hetzner VPS phase.
"""
from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Iterable


@dataclass
class EnergyEstimator:
    tdp_watts: float
    num_cpus: int = field(default_factory=lambda: os.cpu_count() or 1)

    def __post_init__(self) -> None:
        if self.tdp_watts <= 0:
            raise ValueError("tdp_watts must be positive")
        if self.num_cpus < 1:
            raise ValueError("num_cpus must be >= 1")

    def joules(self, cpu_percent_total: float, duration_s: float) -> float:
        """Energy for a single averaged window."""
        if duration_s < 0:
            raise ValueError("duration_s must be non-negative")
        cpu_percent_total = max(0.0, cpu_percent_total)
        fraction = (cpu_percent_total / 100.0) / self.num_cpus
        fraction = min(fraction, 1.0)  # physical cap: container cannot exceed host
        return fraction * self.tdp_watts * duration_s

    def integrate(self, cpu_ts_pairs: Iterable[tuple[float, float]]) -> float:
        """Trapezoidal integration over a (cpu_percent, timestamp) series.

        More accurate than rectangular stepping when CPU% changes between samples.
        Returns 0 if fewer than 2 samples are supplied.
        """
        pairs = list(cpu_ts_pairs)
        if len(pairs) < 2:
            return 0.0
        total = 0.0
        for (cpu1, t1), (cpu2, t2) in zip(pairs, pairs[1:]):
            dt = t2 - t1
            if dt <= 0:
                continue
            avg_cpu = (cpu1 + cpu2) / 2.0
            total += self.joules(avg_cpu, dt)
        return total
