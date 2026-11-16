"""Flask dashboard for the consensus benchmarking framework.

Three routes:
    GET  /                                  — list experiments + run counts
    GET  /experiments/<name>                — per-metric tables, stats, plots
    GET  /experiments/<name>/plots/<file>   — static PNG file

The dashboard is a *read-only* view onto the SqliteRepository. Re-running
analyse_experiment on every request is intentional — it costs ~1-3 s for a
typical experiment and avoids stale-cache surprises while we're iterating.
Switch to mtime-based caching if a single experiment grows past ~50 metrics.

Run locally with the venv activated, from the repo root:
    python -m dashboard.app
Then browse to http://127.0.0.1:5000.
"""
from __future__ import annotations

from pathlib import Path

from flask import Flask, abort, render_template, send_from_directory

from analysis import analyse_experiment
from storage.repository import SqliteRepository


def create_app(
    db_path: str | Path = "results/experiments.db",
    results_dir: str | Path = "results/dashboard_analysis",
) -> Flask:
    app = Flask(__name__)
    app.config["DB_PATH"] = str(db_path)
    app.config["RESULTS_DIR"] = Path(results_dir).resolve()

    @app.route("/")
    def index():
        with SqliteRepository(app.config["DB_PATH"]) as repo:
            rows = repo.list_runs()

        experiments: dict[str, list[dict]] = {}
        for row in rows:
            key = row.get("experiment_name") or "(unnamed)"
            experiments.setdefault(key, []).append(row)

        summaries = []
        for name in sorted(experiments):
            runs = experiments[name]
            algos = sorted({r["algorithm"] for r in runs if r.get("algorithm")})
            last = max(r.get("started_at") or "" for r in runs)
            summaries.append({
                "name": name,
                "n_runs": len(runs),
                "algorithms": algos,
                "last_run_at": last,
            })
        return render_template("index.html", experiments=summaries)

    @app.route("/experiments/<name>")
    def experiment_detail(name: str):
        out_dir = app.config["RESULTS_DIR"] / _safe_segment(name)
        with SqliteRepository(app.config["DB_PATH"]) as repo:
            try:
                analysis = analyse_experiment(repo, name, out_dir)
            except ValueError:
                abort(404)
        return render_template(
            "experiment.html",
            name=name,
            results=analysis["results"],
            plot_paths=analysis["plot_paths"],
            failure_summary=analysis.get("failure_summary") or {},
        )

    @app.route("/experiments/<name>/plots/<filename>")
    def plot_file(name: str, filename: str):
        plots_dir = app.config["RESULTS_DIR"] / _safe_segment(name) / "plots"
        return send_from_directory(plots_dir, _safe_segment(filename))

    return app


def _safe_segment(seg: str) -> str:
    """Refuse path traversal in user-supplied URL segments."""
    if "/" in seg or "\\" in seg or seg in {"", ".", ".."}:
        abort(400)
    return seg


def _run_from_env() -> None:
    """Entry point for `python -m dashboard.app` and the Docker image.

    Honoured environment variables (with safe defaults for local use):
        BCF_DASHBOARD_HOST           bind address          (default 127.0.0.1)
        BCF_DASHBOARD_PORT           port                  (default 5000)
        BCF_DB_PATH                  SQLite path           (default results/experiments.db)
        BCF_DASHBOARD_RESULTS_DIR    analysis output dir   (default results/dashboard_analysis)
    """
    import os

    host = os.environ.get("BCF_DASHBOARD_HOST", "127.0.0.1")
    port = int(os.environ.get("BCF_DASHBOARD_PORT", "5000"))
    db_path = os.environ.get("BCF_DB_PATH", "results/experiments.db")
    results_dir = os.environ.get("BCF_DASHBOARD_RESULTS_DIR", "results/dashboard_analysis")
    create_app(db_path=db_path, results_dir=results_dir).run(
        host=host, port=port, debug=False, use_reloader=False,
    )


if __name__ == "__main__":
    _run_from_env()
