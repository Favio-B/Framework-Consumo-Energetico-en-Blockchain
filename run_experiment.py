"""Command-line entry point — wires every layer together for end users.

Subcommands:
    run         load experiment.yaml, run the full sweep, persist to SQLite
    analyze     run StatPipeline + plots + Markdown report on an existing experiment
    dashboard   launch the Flask dashboard
    list        show every experiment + run count in the DB
    cleanup     force-remove orphaned bcf-* containers and networks

Examples:
    python run_experiment.py run --config experiment.yaml
    python run_experiment.py run --config experiment.yaml --algorithms pbft,pos --repetitions 3
    python run_experiment.py run --config experiment.yaml --dry-run
    python run_experiment.py run --config experiment.yaml --analyze-after
    python run_experiment.py analyze baseline_3nodes
    python run_experiment.py dashboard --port 8000
"""
from __future__ import annotations

from pathlib import Path

import click
import yaml


@click.group()
@click.option(
    "--db",
    "db_path",
    default="results/experiments.db",
    show_default=True,
    help="SQLite database path. Created on first write.",
)
@click.pass_context
def cli(ctx: click.Context, db_path: str) -> None:
    """Blockchain Consensus Benchmarking Framework."""
    ctx.ensure_object(dict)
    ctx.obj["db_path"] = db_path


# --------------------------------------------------------------------------- #
# run                                                                         #
# --------------------------------------------------------------------------- #


@cli.command()
@click.option(
    "--config", "config_path",
    default="experiment.yaml",
    show_default=True,
    type=click.Path(exists=True, dir_okay=False, path_type=Path),
)
@click.option("--algorithms", default=None,
              help="Comma-separated override (e.g. 'pbft,pow').")
@click.option("--repetitions", type=int, default=None,
              help="Override the YAML's experiment.repetitions.")
@click.option("--results-dir", default="results", show_default=True,
              type=click.Path(file_okay=False, path_type=Path))
@click.option("--no-db", is_flag=True,
              help="Skip SQLite persistence (only writes per-run files).")
@click.option("--dry-run", is_flag=True,
              help="Print the plan and exit without launching containers.")
@click.option("--analyze-after", is_flag=True,
              help="Run StatPipeline + plots + report immediately after the sweep.")
@click.pass_context
def run(
    ctx: click.Context,
    config_path: Path,
    algorithms: str | None,
    repetitions: int | None,
    results_dir: Path,
    no_db: bool,
    dry_run: bool,
    analyze_after: bool,
) -> None:
    """Run an experiment from a YAML config."""
    config = _load_yaml(config_path)
    if algorithms:
        config["experiment"]["algorithms"] = [a.strip() for a in algorithms.split(",")]
    if repetitions is not None:
        config["experiment"]["repetitions"] = repetitions

    algos = config["experiment"]["algorithms"]
    reps = int(config["experiment"]["repetitions"])
    name = config["experiment"].get("name", "(unnamed)")

    click.echo(f"Experiment:   {name}")
    click.echo(f"Algorithms:   {', '.join(algos)}")
    click.echo(f"Repetitions:  {reps}")
    click.echo(f"Total runs:   {len(algos) * reps}")
    click.echo(f"Network:      driver={config['network']['driver']} "
               f"latency={config['network'].get('latency_ms', 0)}ms "
               f"loss={config['network'].get('packet_loss_pct', 0.0)}%")
    click.echo(f"Workload:     tx={config['workload']['tx_count']} "
               f"rate={config['workload']['tx_rate_tps']} tps")

    if dry_run:
        click.secho("\n[dry-run] not executing", fg="yellow")
        return

    # Defer heavy imports until after dry-run / arg validation succeeds.
    from orchestrator.scenario_runner import ScenarioRunner
    from storage.repository import SqliteRepository

    repo = None
    if not no_db:
        repo = SqliteRepository(ctx.obj["db_path"])

    try:
        runner = ScenarioRunner(results_dir=results_dir, repository=repo)
        summaries = runner.run_experiment(config)
    finally:
        if repo is not None:
            repo.close()

    click.secho(f"\n✓ {len(summaries)} runs completed", fg="green")
    click.echo(f"  {'algo':<6} {'rep':>3}  {'tps':>7}  {'lat_p50':>8}  "
               f"{'lat_p95':>8}  {'energy_J':>9}  {'bytes/tx':>9}")
    for s in summaries:
        click.echo(
            f"  {s['algorithm']:<6} {s['repetition']:>3}  "
            f"{s['throughput_tps']:>7.2f}  "
            f"{s['latency_ms']['p50']:>7.1f}m  "
            f"{s['latency_ms']['p95']:>7.1f}m  "
            f"{s['energy_joules']:>9.2f}  "
            f"{int(s['bytes_per_tx']['total_per_tx']):>9}"
        )

    if analyze_after:
        if no_db:
            click.secho("--analyze-after needs the DB; rerun without --no-db.", fg="red")
            ctx.exit(1)
        ctx.invoke(analyze, experiment_name=name, output_dir=None)


# --------------------------------------------------------------------------- #
# analyze                                                                     #
# --------------------------------------------------------------------------- #


@cli.command()
@click.argument("experiment_name")
@click.option("--output-dir", default=None,
              type=click.Path(file_okay=False, path_type=Path),
              help="Where the report + plots land. Default: results/analysis/<name>.")
@click.pass_context
def analyze(
    ctx: click.Context, experiment_name: str, output_dir: Path | None
) -> None:
    """Run statistical analysis + plots + Markdown report."""
    from analysis import analyse_experiment
    from storage.repository import SqliteRepository

    if output_dir is None:
        output_dir = Path("results/analysis") / experiment_name

    repo = SqliteRepository(ctx.obj["db_path"])
    try:
        out = analyse_experiment(repo, experiment_name, output_dir)
    except ValueError as exc:
        click.secho(f"error: {exc}", fg="red")
        ctx.exit(1)
    finally:
        repo.close()

    click.secho(f"✓ Report: {out['report_path']}", fg="green")
    click.echo(f"  Plots:  {out['report_path'].parent / 'plots'}")

    failures = out.get("failure_summary") or {}
    if failures and any(d["failed_runs"] > 0 for d in failures.values()):
        click.echo("\nReliability (consensus dropouts, excluded from metrics):")
        for algo in sorted(failures):
            d = failures[algo]
            color = "red" if d["failure_rate"] > 0 else "green"
            line = (
                f"  {algo:<6} {d['successful_runs']}/{d['total_runs']} "
                f"successful  ({d['failure_rate']:.1%} failed)"
            )
            click.secho(line, fg=color)

    click.echo("\nPer-metric verdict:")
    for label, result in out["results"]:
        if result.test_used == "skipped":
            verdict = click.style(f"skipped ({result.note})", fg="yellow")
        elif result.significant:
            p = f"p={result.p_value:.6g}" if result.p_value is not None else "p=—"
            verdict = click.style(f"differ ({p})", fg="green")
        else:
            p = f"p={result.p_value:.6g}" if result.p_value is not None else "p=—"
            verdict = click.style(f"no difference ({p})", fg="white", dim=True)
        click.echo(f"  {label:<22} {result.test_used:<14} {verdict}")


# --------------------------------------------------------------------------- #
# dashboard                                                                   #
# --------------------------------------------------------------------------- #


@cli.command()
@click.option("--host", default="127.0.0.1", show_default=True)
@click.option("--port", default=5000, type=int, show_default=True)
@click.option("--results-dir", default="results/dashboard_analysis", show_default=True,
              type=click.Path(file_okay=False, path_type=Path))
@click.pass_context
def dashboard(ctx: click.Context, host: str, port: int, results_dir: Path) -> None:
    """Launch the Flask dashboard."""
    from dashboard.app import create_app

    app = create_app(db_path=ctx.obj["db_path"], results_dir=results_dir)
    click.echo(f"Serving on http://{host}:{port}  (Ctrl-C to stop)")
    app.run(host=host, port=port, debug=False, use_reloader=False)


# --------------------------------------------------------------------------- #
# list                                                                        #
# --------------------------------------------------------------------------- #


@cli.command(name="list")
@click.pass_context
def list_runs(ctx: click.Context) -> None:
    """List experiments + run counts in the DB."""
    from storage.repository import SqliteRepository

    repo = SqliteRepository(ctx.obj["db_path"])
    try:
        rows = repo.list_runs()
    finally:
        repo.close()

    if not rows:
        click.echo("No runs in DB.")
        return

    by_experiment: dict[str, list[dict]] = {}
    for r in rows:
        by_experiment.setdefault(r["experiment_name"] or "(unnamed)", []).append(r)

    click.echo(f"  {'experiment':<28}  {'runs':>4}  algorithms")
    click.echo(f"  {'-' * 28}  {'-' * 4}  {'-' * 30}")
    for name in sorted(by_experiment):
        runs = by_experiment[name]
        algos = sorted({r["algorithm"] for r in runs if r["algorithm"]})
        click.echo(f"  {name:<28}  {len(runs):>4}  {', '.join(algos)}")


# --------------------------------------------------------------------------- #
# cleanup                                                                     #
# --------------------------------------------------------------------------- #


@cli.command()
def cleanup() -> None:
    """Force-remove every bcf-* container and network (after a crash, etc.)."""
    from orchestrator.docker_manager import DockerManager

    try:
        dm = DockerManager()
        dm.ping()
    except Exception as exc:  # noqa: BLE001 — Docker may be down
        click.secho(f"Docker unreachable: {exc}", fg="red")
        raise SystemExit(1)

    summary = dm.cleanup_by_prefix("bcf-")
    click.secho(
        f"✓ Removed {summary['containers']} container(s) "
        f"and {summary['networks']} network(s).",
        fg="green",
    )


# --------------------------------------------------------------------------- #
# helpers                                                                     #
# --------------------------------------------------------------------------- #


def _load_yaml(path: Path) -> dict:
    with open(path, "r", encoding="utf-8") as fh:
        return yaml.safe_load(fh)


if __name__ == "__main__":
    cli(obj={})
