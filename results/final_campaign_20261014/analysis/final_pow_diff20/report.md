# Experiment Report — final_pow_diff20

- **Generated:** 2026-10-15T02:09:24Z
- **Algorithms compared:** —
- **Repetitions per algorithm:** up to 0
- **Significance threshold (α):** 0.05

## Reliability

Runs where `committed_by_quorum == 0` — i.e. the consensus protocol
made no forward progress and no transaction reached the quorum. These
are **excluded** from the per-metric tables below; they belong to the
reliability metric itself, not to the TPS / latency / energy aggregates.

| Algorithm | Total runs | Failed | Successful | Failure rate |
|---|---|---|---|---|
| pow | 10 | 10 | 0 | 100.0% |

_Algorithms with non-zero failure rates have their dropouts removed
from the metric aggregates below; the totals reflect only runs where
consensus actually progressed._

Nonzero progress can be partial; it does not imply all submitted transactions finished.

| Algorithm | Partial | Complete | Committed total | Energy all runs (J) | Pooled J/committed tx |
|---|---:|---:|---:|---:|---:|
| pow | 0 | 0 | 0 | 464.289 | NA |

Pooled J/tx includes energy from zero-progress runs. Metric tables below condition on >0 progress, including partial runs. Latency samples exclude unconfirmed requests; interpret them with completion counts.

## Summary

_No metrics analysed._

## Threats to Validity

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

