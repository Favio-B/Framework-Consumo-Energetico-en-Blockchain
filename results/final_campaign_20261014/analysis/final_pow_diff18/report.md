# Experiment Report — final_pow_diff18

- **Generated:** 2026-10-15T02:09:24Z
- **Algorithms compared:** pow
- **Repetitions per algorithm:** up to 5
- **Significance threshold (α):** 0.05

## Reliability

Runs where `committed_by_quorum == 0` — i.e. the consensus protocol
made no forward progress and no transaction reached the quorum. These
are **excluded** from the per-metric tables below; they belong to the
reliability metric itself, not to the TPS / latency / energy aggregates.

| Algorithm | Total runs | Failed | Successful | Failure rate |
|---|---|---|---|---|
| pow | 10 | 5 | 5 | 50.0% |

_Algorithms with non-zero failure rates have their dropouts removed
from the metric aggregates below; the totals reflect only runs where
consensus actually progressed._

Nonzero progress can be partial; it does not imply all submitted transactions finished.

| Algorithm | Partial | Complete | Committed total | Energy all runs (J) | Pooled J/committed tx |
|---|---:|---:|---:|---:|---:|
| pow | 5 | 0 | 129 | 475.361 | 3.68497 |

Pooled J/tx includes energy from zero-progress runs. Metric tables below condition on >0 progress, including partial runs. Latency samples exclude unconfirmed requests; interpret them with completion counts.

## Summary

| Metric | Test | Statistic | p-value | α=0.05 verdict |
|---|---|---|---|---|
| Throughput (TPS) | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |
| Latency p50 (ms) | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |
| Latency p95 (ms) | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |
| Finality p95 (ms) | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |
| Energy (J) | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |
| Bytes per Tx | skipped | — | — | skipped (need ≥2 algorithm groups, found 1 (['pow'])) |

## Throughput (TPS)

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 5.984 | 3.415 | 4.707 | 2.266 | 10.949 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.946 | 0.710811 | yes |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Throughput (TPS) — bar](plots/throughput_tps_bar.png)
![Throughput (TPS) — box](plots/throughput_tps_box.png)

## Latency p50 (ms)

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 3506.746 | 2181.015 | 3589.273 | 1165.333 | 6705.489 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.954 | 0.763805 | yes |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Latency p50 (ms) — bar](plots/latency_ms_p50_bar.png)
![Latency p50 (ms) — box](plots/latency_ms_p50_box.png)

## Latency p95 (ms)

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 4319.204 | 1941.803 | 4398.488 | 1516.174 | 6828.323 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.985 | 0.959889 | yes |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Latency p95 (ms) — bar](plots/latency_ms_p95_bar.png)
![Latency p95 (ms) — box](plots/latency_ms_p95_box.png)

## Finality p95 (ms)

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 4319.204 | 1941.803 | 4398.488 | 1516.174 | 6828.323 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.985 | 0.959889 | yes |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Finality p95 (ms) — bar](plots/finality_ms_p95_bar.png)
![Finality p95 (ms) — box](plots/finality_ms_p95_box.png)

## Energy (J)

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 47.709 | 1.015 | 47.207 | 47.131 | 49.502 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.672 | 0.0047246 | no |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Energy (J) — bar](plots/energy_joules_bar.png)
![Energy (J) — box](plots/energy_joules_box.png)

## Bytes per Tx

### Descriptives
| Algorithm | n | mean | stdev | median | min | max |
|---|---|---|---|---|---|---|
| pow | 5 | 37097.616 | 12521.277 | 42178.900 | 19957.159 | 51704.250 |

### Normality (Shapiro-Wilk)
| Algorithm | Shapiro W | p-value | normal at α |
|---|---|---|---|
| pow | 0.946 | 0.707478 | yes |

**Test:** skipped — need ≥2 algorithm groups, found 1 (['pow'])

![Bytes per Tx — bar](plots/bytes_per_tx_bar.png)
![Bytes per Tx — box](plots/bytes_per_tx_box.png)

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

