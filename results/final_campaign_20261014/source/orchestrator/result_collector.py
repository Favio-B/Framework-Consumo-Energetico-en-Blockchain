"""Per-run artifact persistence on the local filesystem.

Lays out one directory per run UUID:

    {results_dir}/{run_id}/
        config.json       — exact snapshot of the config used (incl. algorithm, rep)
        metrics.json      — aggregated metrics as produced by ScenarioRunner
        raw_events.csv    — optional per-request events for manual analysis
        run.log           — orchestrator-side timestamped log

SQLite aggregation lives in storage/ (step 7) and reads from here — these
files are the on-disk source of truth. JSON + CSV are chosen deliberately so
reviewers can audit raw results without running the framework.
"""
from __future__ import annotations

import csv
import json
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable


@dataclass
class RunWriter:
    run_id: str
    path: Path

    def __post_init__(self) -> None:
        self.path.mkdir(parents=True, exist_ok=True)
        # Open the log lazily — most runs log only a handful of lines.
        self._log_path = self.path / "run.log"

    def write_config(self, config: dict) -> None:
        (self.path / "config.json").write_text(
            json.dumps(config, indent=2, sort_keys=True, default=_json_default),
            encoding="utf-8",
        )

    def write_metrics(self, metrics: dict) -> None:
        (self.path / "metrics.json").write_text(
            json.dumps(metrics, indent=2, sort_keys=True, default=_json_default),
            encoding="utf-8",
        )

    def write_raw_events(self, rows: Iterable[dict]) -> None:
        rows = list(rows)
        if not rows:
            return
        fieldnames = sorted({k for row in rows for k in row.keys()})
        with (self.path / "raw_events.csv").open("w", newline="", encoding="utf-8") as fh:
            writer = csv.DictWriter(fh, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(rows)

    def log(self, message: str) -> None:
        line = f"{time.strftime('%Y-%m-%dT%H:%M:%S')} {self.run_id[:8]} {message}\n"
        with self._log_path.open("a", encoding="utf-8") as fh:
            fh.write(line)


class ResultCollector:
    def __init__(self, results_dir: Path | str) -> None:
        self.results_dir = Path(results_dir)
        self.results_dir.mkdir(parents=True, exist_ok=True)

    def new_run(self, run_id: str) -> RunWriter:
        return RunWriter(run_id=run_id, path=self.results_dir / run_id)

    def list_runs(self) -> list[str]:
        return sorted(p.name for p in self.results_dir.iterdir() if p.is_dir())

    def load_metrics(self, run_id: str) -> dict:
        path = self.results_dir / run_id / "metrics.json"
        return json.loads(path.read_text(encoding="utf-8"))


def _json_default(value: Any) -> Any:
    # Handle numpy-like scalars, Path, and anything else serialisable as str.
    try:
        return value.item()  # numpy scalars
    except AttributeError:
        pass
    if isinstance(value, Path):
        return str(value)
    return str(value)
