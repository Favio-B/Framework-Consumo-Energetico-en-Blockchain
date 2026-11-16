"""Aggregated-results persistence.

Three concrete backends are exposed, all behind the same `Repository` ABC:

    SqliteRepository       — default, reproducibility-grade, the source of truth.
                             Stores one row per run in runs + per-container
                             aggregates in resource_samples.

    CompositeRepository    — fan-out writer: save_run() delegates to every wrapped
                             repo; reads always come from the first one. This is
                             the hook that lets us add a cloud mirror (Firestore)
                             without touching ScenarioRunner.

    FirestoreRepository    — optional cloud export for the dashboard. Stubbed
                             intentionally: Firebase credentials break the
                             "clone-and-run" reviewer workflow that IEEE
                             supplementary material requires, so we keep SQLite
                             as load-bearing and treat Firestore as a secondary
                             sink to enable later.

The summary dict consumed by save_run() is the exact output of
ScenarioRunner._assemble_summary — no re-shaping needed at the call site.
"""
from __future__ import annotations

import json
import sqlite3
from abc import ABC, abstractmethod
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SCHEMA_PATH = Path(__file__).parent / "schema.sql"


# --------------------------------------------------------------------------- #
# Interface                                                                   #
# --------------------------------------------------------------------------- #


class Repository(ABC):
    @abstractmethod
    def save_run(self, summary: dict) -> None: ...

    @abstractmethod
    def list_runs(
        self,
        algorithm: str | None = None,
        experiment_name: str | None = None,
        limit: int | None = None,
    ) -> list[dict]: ...

    @abstractmethod
    def load_run(self, run_id: str) -> dict | None: ...

    @abstractmethod
    def close(self) -> None: ...

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc, tb):
        self.close()


# --------------------------------------------------------------------------- #
# SQLite backend                                                              #
# --------------------------------------------------------------------------- #


class SqliteRepository(Repository):
    def __init__(self, path: str | Path = ":memory:") -> None:
        self.path = str(path)
        # Create parent directory for file-backed DBs.
        if self.path != ":memory:":
            Path(self.path).parent.mkdir(parents=True, exist_ok=True)
        # isolation_level=None → autocommit, simpler for append-only workloads.
        self._conn = sqlite3.connect(self.path, isolation_level=None)
        self._conn.row_factory = sqlite3.Row
        self._conn.execute("PRAGMA foreign_keys = ON")
        self._init_schema()

    def _init_schema(self) -> None:
        schema = SCHEMA_PATH.read_text(encoding="utf-8")
        self._conn.executescript(schema)

    # ---- writes ---------------------------------------------------------

    def save_run(self, summary: dict) -> None:
        row = _summary_to_run_row(summary)
        columns = list(row.keys())
        placeholders = ",".join("?" for _ in columns)
        self._conn.execute(
            f"INSERT OR REPLACE INTO runs ({','.join(columns)}) VALUES ({placeholders})",
            [row[c] for c in columns],
        )
        resource_summary = summary.get("resource_summary") or {}
        self._conn.execute(
            "DELETE FROM resource_samples WHERE run_id = ?", (row["run_id"],)
        )
        for name, stats in resource_summary.items():
            self._conn.execute(
                """
                INSERT INTO resource_samples
                (run_id, container_name, cpu_percent_avg, cpu_percent_peak,
                 memory_mb_avg, memory_mb_peak, rx_bytes, tx_bytes,
                 sample_count, duration_s)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    row["run_id"],
                    name,
                    stats.get("cpu_percent_avg"),
                    stats.get("cpu_percent_peak"),
                    stats.get("memory_mb_avg"),
                    stats.get("memory_mb_peak"),
                    stats.get("rx_bytes"),
                    stats.get("tx_bytes"),
                    stats.get("sample_count"),
                    stats.get("duration_s"),
                ),
            )

    # ---- reads ----------------------------------------------------------

    def list_runs(
        self,
        algorithm: str | None = None,
        experiment_name: str | None = None,
        limit: int | None = None,
    ) -> list[dict]:
        clauses: list[str] = []
        params: list[Any] = []
        if algorithm is not None:
            clauses.append("algorithm = ?")
            params.append(algorithm)
        if experiment_name is not None:
            clauses.append("experiment_name = ?")
            params.append(experiment_name)
        where = ("WHERE " + " AND ".join(clauses)) if clauses else ""
        tail = f"LIMIT {int(limit)}" if limit else ""
        query = f"SELECT * FROM runs {where} ORDER BY started_at DESC {tail}"
        return [dict(r) for r in self._conn.execute(query, params)]

    def load_run(self, run_id: str) -> dict | None:
        row = self._conn.execute(
            "SELECT * FROM runs WHERE run_id = ?", (run_id,)
        ).fetchone()
        if not row:
            return None
        out = dict(row)
        out["resource_samples"] = [
            dict(r)
            for r in self._conn.execute(
                "SELECT * FROM resource_samples WHERE run_id = ?", (run_id,)
            )
        ]
        return out

    def close(self) -> None:
        self._conn.close()


# --------------------------------------------------------------------------- #
# Composite (fan-out)                                                         #
# --------------------------------------------------------------------------- #


class CompositeRepository(Repository):
    """Writes go to every backend; reads come from the first.

    Enables the (A) pattern: SqliteRepository is the reproducible source of
    truth; a second FirestoreRepository (or similar) mirrors to the cloud so
    the dashboard or colleagues can consume live data without touching the
    machine that ran the experiment.
    """

    def __init__(self, *repos: Repository) -> None:
        if not repos:
            raise ValueError("CompositeRepository needs at least one backend")
        self.repos = list(repos)

    def save_run(self, summary: dict) -> None:
        for repo in self.repos:
            repo.save_run(summary)

    def list_runs(self, **kwargs) -> list[dict]:
        return self.repos[0].list_runs(**kwargs)

    def load_run(self, run_id: str) -> dict | None:
        return self.repos[0].load_run(run_id)

    def close(self) -> None:
        for repo in self.repos:
            repo.close()


# --------------------------------------------------------------------------- #
# Firestore stub                                                              #
# --------------------------------------------------------------------------- #


class FirestoreRepository(Repository):
    """Intentional stub — see module docstring for the reasoning.

    To enable:
        pip install firebase-admin
        export GOOGLE_APPLICATION_CREDENTIALS=/abs/path/to/service-account.json
        # then replace this class body with an actual firebase_admin.firestore
        # client (collection = "runs", document = run_id, merge=True).

    CompositeRepository already supports a dual-backend rollout:

        repo = CompositeRepository(SqliteRepository("results/experiments.db"),
                                   FirestoreRepository(project_id="..."))
        runner = ScenarioRunner(repository=repo, ...)
    """

    def __init__(self, project_id: str | None = None, collection: str = "runs") -> None:
        self.project_id = project_id
        self.collection = collection
        raise NotImplementedError(
            "FirestoreRepository is a stub reserved for the dashboard-mirror phase. "
            "SQLite is the source of truth for reproducibility. See the class "
            "docstring for the enablement recipe."
        )

    def save_run(self, summary: dict) -> None:  # pragma: no cover
        raise NotImplementedError

    def list_runs(self, **kwargs) -> list[dict]:  # pragma: no cover
        raise NotImplementedError

    def load_run(self, run_id: str) -> dict | None:  # pragma: no cover
        raise NotImplementedError

    def close(self) -> None:  # pragma: no cover
        pass


# --------------------------------------------------------------------------- #
# Helpers                                                                     #
# --------------------------------------------------------------------------- #


def _summary_to_run_row(summary: dict) -> dict:
    """Map the in-memory summary dict to the runs-table schema.

    Tolerant of missing keys — every field defaults to None so partial or
    legacy summaries still insert cleanly.
    """
    latency = summary.get("latency_ms") or {}
    finality = summary.get("finality_ms") or {}
    network = summary.get("network_totals") or {}
    bytes_per_tx = summary.get("bytes_per_tx") or {}
    started_at = summary.get("started_at") or datetime.now(timezone.utc).isoformat()
    return {
        "run_id": summary["run_id"],
        "algorithm": summary.get("algorithm"),
        "repetition": summary.get("repetition"),
        "node_count": summary.get("node_count"),
        "quorum": summary.get("quorum"),
        "started_at": started_at,
        "experiment_name": summary.get("experiment_name"),
        "tdp_watts": summary.get("tdp_watts"),
        "tx_count": summary.get("tx_count"),
        "tx_rate_tps": summary.get("tx_rate_tps"),
        "latency_ms": summary.get("latency_ms_applied"),
        "bandwidth_kbps": summary.get("bandwidth_kbps_applied"),
        "packet_loss_pct": summary.get("packet_loss_pct_applied"),
        "submitted": summary.get("submitted"),
        "committed_by_quorum": summary.get("committed_by_quorum"),
        "submit_window_s": summary.get("submit_window_s"),
        "throughput_tps": summary.get("throughput_tps"),
        "latency_ms_p50": latency.get("p50"),
        "latency_ms_p95": latency.get("p95"),
        "latency_ms_p99": latency.get("p99"),
        "latency_ms_mean": latency.get("mean"),
        "finality_ms_p50": finality.get("p50"),
        "finality_ms_p95": finality.get("p95"),
        "finality_ms_p99": finality.get("p99"),
        "finality_ms_mean": finality.get("mean"),
        "energy_joules": summary.get("energy_joules"),
        "total_rx_bytes": network.get("total_rx_bytes"),
        "total_tx_bytes": network.get("total_tx_bytes"),
        "bytes_per_tx": bytes_per_tx.get("total_per_tx"),
        "artefacts_dir": summary.get("artefacts_dir"),
    }


def summary_to_json(summary: dict) -> str:
    """Handy for debugging / logging — deterministic JSON dump of a summary."""
    return json.dumps(summary, indent=2, sort_keys=True, default=str)
