"""Genera site/data/results.json a partir de los resultados finales de la campaña.

El sitio estático (GitHub Pages) no contiene cifras escritas a mano: todo se
deriva de results/final_campaign_20261014/final_results/. Ejecutar desde la
raíz del repositorio:

    python scripts/build_site_data.py
"""
from __future__ import annotations

import csv
import json
import math
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CAMPAIGN = ROOT / "results" / "final_campaign_20261014"
FINAL = CAMPAIGN / "final_results"
OUT = ROOT / "site" / "data" / "results.json"

ALGOS = ("pow", "pos", "pbft")
SUMMARY_METRICS = (
    "energy_joules", "throughput_observation_tps", "completion_fraction",
    "cpu_percent_sum_node_means", "memory_mb_sum_node_means", "total_rx_bytes",
    "total_tx_bytes", "finality_ms_p50", "observation_seconds",
)
RUN_FIELDS = (
    "run_id", "experiment_name", "algorithm", "node_count", "repetition",
    "committed_by_quorum", "submitted", "completion_status", "energy_joules",
    "throughput_observation_tps", "finality_ms_p50", "cpu_percent_sum_node_means",
    "memory_mb_sum_node_means", "total_rx_bytes",
)


def num(value: str):
    """CSV -> número JSON-seguro (NaN/Inf y vacíos pasan a None)."""
    if value in ("", "None", "nan", None):
        return None
    if value in ("True", "False"):
        return value == "True"
    try:
        x = float(value)
    except ValueError:
        return value
    if not math.isfinite(x):
        return None
    return int(x) if x.is_integer() and "." not in value and "e" not in value.lower() else x


def read_csv(name: str) -> list[dict]:
    with (FINAL / name).open(encoding="utf-8-sig", newline="") as fh:
        return list(csv.DictReader(fh))


def difficulty_of(experiment: str) -> int | None:
    if experiment.startswith("final_pow_diff"):
        return int(experiment.removeprefix("final_pow_diff"))
    return 16 if experiment == "final_n3_baseline" else None


def build() -> dict:
    groups = []
    for row in read_csv("summary.csv"):
        group = {
            "experiment": row["experiment"],
            "algorithm": row["algorithm"],
            "nodes": num(row["nodes"]),
            "difficulty_bits": difficulty_of(row["experiment"]) if row["algorithm"] == "pow" else None,
            "n": num(row["n"]),
            "zero": num(row["zero"]), "partial": num(row["partial"]), "full": num(row["full"]),
            "committed_total": num(row["committed_total"]),
            "submitted_total": num(row["submitted_total"]),
            "failure_rate": num(row["failure_rate"]),
            "failure_ci95": [num(row["failure_ci95_low"]), num(row["failure_ci95_high"])],
            "j_per_tx": {
                "estimate": num(row["pooled_J_tx_estimate"]),
                "ci95": [num(row["pooled_J_tx_ci95_low"]), num(row["pooled_J_tx_ci95_high"])],
                "upper_unbounded": num(row["pooled_J_tx_ci95_upper_unbounded"]),
            },
            "metrics": {},
        }
        for m in SUMMARY_METRICS:
            group["metrics"][m] = {
                k: num(row[f"{m}_{k}"])
                for k in ("n", "mean", "sd", "median", "min", "max", "ci95_low", "ci95_high")
            }
        groups.append(group)

    runs = [{k: num(r[k]) if k not in ("run_id", "experiment_name", "algorithm", "completion_status") else r[k]
             for k in RUN_FIELDS} for r in read_csv("runs.csv")]

    def stats_rows(name: str) -> list[dict]:
        rows = read_csv(name)
        for r in rows:
            r.pop("shapiro", None)
            for k, v in list(r.items()):
                if k not in ("experiment", "metric", "test", "a", "b", "population"):
                    r[k] = num(v)
        return rows

    validation = json.loads((FINAL / "validation.json").read_text(encoding="utf-8-sig"))
    hardware = json.loads((CAMPAIGN / "hardware_cpu.json").read_text(encoding="utf-8-sig"))
    return {
        "campaign": "final_campaign_20261014",
        "seed": 20261014,
        "planned_runs": validation.get("expected_trials"),
        "registered_runs": validation.get("registered_trials"),
        "audit_issues": len(validation.get("issues", [])),
        "hardware": hardware,
        "groups": groups,
        "runs": runs,
        "primary_tests": stats_rows("primary_statistics.csv"),
        "pairwise_tests": stats_rows("pairwise_statistics.csv"),
        "difficulty_tests": json.loads((FINAL / "difficulty_statistics.json").read_text(encoding="utf-8-sig")),
    }


if __name__ == "__main__":
    data = build()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, ensure_ascii=False, separators=(",", ":"), allow_nan=False), encoding="utf-8")
    print(f"{OUT.relative_to(ROOT)}: {len(data['groups'])} grupos, {len(data['runs'])} corridas")
