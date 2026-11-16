"""Throughput / latency / finality tracker — algorithm-agnostic.

The caller feeds two streams of events:
    record_submit(request_id, ts)                  — client-side submit time
    record_commit(request_id, node_id, ts)         — per-node commit time

All three supported algorithms (PoW / PoS / PBFT) eventually produce these
events; the framework is therefore uniform in how it measures them, making the
cross-algorithm comparison fair.

Metrics:
    submitted                 — count of unique request_ids submitted
    committed_by_quorum       — count that reached `quorum` node commits
    throughput_tps            — committed_by_quorum / elapsed_s
    latency_ms                — submit → FIRST node commit (per tx, summarised)
    finality_ms               — submit → QUORUM-th commit (per tx, summarised)
    elapsed_s                 — first submit to last commit observed

`quorum` is configurable — for PBFT pass (2f+1), for PoW pass 1 (single block),
for PoS pass the user's choice of confirmations.
"""
from __future__ import annotations

import statistics
from dataclasses import dataclass, field


@dataclass
class TxTracker:
    submits: dict[str, float] = field(default_factory=dict)
    commits: dict[str, list[tuple[int, float]]] = field(default_factory=dict)

    def record_submit(self, request_id: str, ts: float) -> None:
        self.submits[request_id] = ts

    def record_commit(self, request_id: str, node_id: int, ts: float) -> None:
        self.commits.setdefault(request_id, []).append((node_id, ts))

    def summary(self, quorum: int = 1) -> dict:
        if quorum < 1:
            raise ValueError("quorum must be >= 1")
        submitted = len(self.submits)
        if submitted == 0:
            return _empty_summary(quorum)

        latencies_ms: list[float] = []
        finalities_ms: list[float] = []
        committed_by_quorum = 0
        first_submit = min(self.submits.values())
        last_event = first_submit

        for req_id, submit_ts in self.submits.items():
            times = sorted(ts for _, ts in self.commits.get(req_id, []))
            if not times:
                continue
            latencies_ms.append((times[0] - submit_ts) * 1000.0)
            last_event = max(last_event, times[-1])
            if len(times) >= quorum:
                committed_by_quorum += 1
                finalities_ms.append((times[quorum - 1] - submit_ts) * 1000.0)

        elapsed = max(last_event - first_submit, 1e-9)
        tps = committed_by_quorum / elapsed if elapsed > 0 else 0.0

        return {
            "submitted": submitted,
            "committed_by_quorum": committed_by_quorum,
            "throughput_tps": tps,
            "quorum": quorum,
            "elapsed_s": elapsed,
            "latency_ms": _percentiles(latencies_ms),
            "finality_ms": _percentiles(finalities_ms),
        }


def _empty_summary(quorum: int) -> dict:
    return {
        "submitted": 0,
        "committed_by_quorum": 0,
        "throughput_tps": 0.0,
        "quorum": quorum,
        "elapsed_s": 0.0,
        "latency_ms": _percentiles([]),
        "finality_ms": _percentiles([]),
    }


def _percentiles(values: list[float]) -> dict:
    if not values:
        return {"n": 0, "mean": 0.0, "p50": 0.0, "p95": 0.0, "p99": 0.0, "max": 0.0}
    sv = sorted(values)

    def pct(p: float) -> float:
        # Nearest-rank percentile; fine for the 5..50-rep regime of this study.
        idx = min(len(sv) - 1, int(round((p / 100.0) * (len(sv) - 1))))
        return sv[idx]

    return {
        "n": len(values),
        "mean": statistics.fmean(values),
        "p50": pct(50),
        "p95": pct(95),
        "p99": pct(99),
        "max": sv[-1],
    }
