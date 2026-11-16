"""Top-level experiment orchestration.

ScenarioRunner walks `experiment.yaml` and, for every (algorithm × repetition)
tuple, performs the full lifecycle of a single run:

    1. Instantiate the consensus module (lazy import so missing PoW/PoS modules
       don't break PBFT runs during step 6).
    2. module.start(node_count, config)    — containers come up.
    3. ResourceMonitor.start()             — sampling CPU / mem / net at ~1 Hz.
    4. NetworkController.apply(...)        — Pumba sidecars for latency / loss / rate.
    5. module.submit_transactions(...)     — client submits the workload.
    6. Sleep settle_seconds                — let late commits land.
    7. module.get_metrics()                — per-request events (submits, commits).
    8. ResourceMonitor.stop() + EnergyEstimator.integrate()
    9. Assemble the uniform summary dict, hand to ResultCollector.
   10. NetworkController.clear() + module.stop()  — unconditionally, in finally.

The uniform summary schema is the contract ScenarioRunner exposes to storage/
and analysis/ — see `_assemble_summary` below.
"""
from __future__ import annotations

import os
import json
from dataclasses import asdict
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Callable

from consensus.base import ConsensusModule
from monitoring.energy_estimator import EnergyEstimator
from monitoring.net_monitor import NetMonitor
from monitoring.resource_monitor import ResourceMonitor
from monitoring.tx_tracker import TxTracker
from orchestrator.docker_manager import DockerManager
from orchestrator.network_controller import NetworkController
from orchestrator.result_collector import ResultCollector
from storage.repository import Repository


def _load_pbft() -> Callable[[], ConsensusModule]:
    from consensus.pbft.module import PBFTModule
    return PBFTModule


def _load_pow() -> Callable[[], ConsensusModule]:
    from consensus.pow.module import POWModule  # noqa: F401 — step 8
    return POWModule


def _load_pos() -> Callable[[], ConsensusModule]:
    from consensus.pos.module import POSModule  # noqa: F401 — step 9
    return POSModule


# Lazy-loader registry: the import (and therefore the error) only happens when
# the user actually asks for that algorithm.
ALGORITHM_LOADERS: dict[str, Callable[[], type[ConsensusModule]]] = {
    "pbft": _load_pbft,
    "pow": _load_pow,
    "pos": _load_pos,
}


class ScenarioRunner:
    def __init__(
        self,
        docker_manager: DockerManager | None = None,
        results_dir: Path | str = "./results",
        repository: Repository | None = None,
    ) -> None:
        self.dm = docker_manager or DockerManager()
        self.collector = ResultCollector(results_dir)
        # Optional: None keeps the runner file-only (useful in tests / demos).
        # In real experiments the CLI wires a SqliteRepository (or a
        # CompositeRepository with a cloud mirror) from config.storage.
        self.repository = repository

    # ---- public API ------------------------------------------------------

    def run_experiment(self, config: dict) -> list[dict]:
        from orchestrator.experiment_lock import experiment_lock
        with experiment_lock():
            return self._run_experiment(config)

    def _run_experiment(self, config: dict) -> list[dict]:
        summaries: list[dict] = []
        algos = config["experiment"]["algorithms"]
        reps = int(config["experiment"]["repetitions"])
        for algorithm in algos:
            for repetition in range(reps):
                summaries.append(self.run_scenario(algorithm, repetition, config))
        return summaries

    def run_scenario(self, algorithm: str, repetition: int, config: dict) -> dict:
        run_id = uuid.uuid4().hex
        writer = self.collector.new_run(run_id)
        scenario_config = {
            **config,
            "_scenario": {
                "algorithm": algorithm,
                "repetition": repetition,
                "run_id": run_id,
            },
        }
        writer.write_config(scenario_config)
        writer.log(f"start algorithm={algorithm} rep={repetition}")
        started_at = datetime.now(timezone.utc).isoformat()

        module = _instantiate(algorithm)
        nc = NetworkController(self.dm, driver=config["network"]["driver"])
        rm: ResourceMonitor | None = None
        submit_start = submit_end = time.time()
        module_metrics: dict = {}
        resource_summary: dict = {}
        paper_mode = bool(config.get("runtime", {}).get("paper_instrumentation", False))
        provenance = {}
        samples = {}
        cutoff = None

        try:
            module.start(config["network"]["nodes"], _module_config(config, algorithm))
            containers = getattr(module, "containers", [])
            if containers and not paper_mode:
                rm = ResourceMonitor(containers=list(containers))
                rm.start()
            duration_budget = float(
                config.get("runtime", {}).get("run_timeout_seconds", 600)
            )
            apply_network = nc.apply_verified if paper_mode else nc.apply
            extra_network = {"tc_image": config["network"]["tc_image"], "pumba_image": config["network"].get("pumba_image")} if paper_mode else {}
            network_evidence = apply_network(
                [c.name for c in containers],
                latency_ms=int(config["network"].get("latency_ms", 0)),
                bandwidth_kbps=int(config["network"].get("bandwidth_kbps", 0)),
                packet_loss_pct=float(config["network"].get("packet_loss_pct", 0.0)),
                duration_s=duration_budget,
                **extra_network,
            )
            # Let Pumba actually engage netem inside the target namespaces.
            if not paper_mode and _has_network_conditions(config):
                time.sleep(3.0)
            if paper_mode:
                rm = ResourceMonitor(containers=list(containers))
                rm.start()
                ready_deadline = time.monotonic() + 15
                while not all(len(rm.samples.get(c.name, [])) >= 2 for c in containers):
                    if time.monotonic() >= ready_deadline:
                        raise RuntimeError("Resource sampling not ready on every node")
                    time.sleep(0.1)
                provenance = {"methodology": "fixed-post-submit-window-v3", "num_cpus_energy": os.cpu_count() or 1, "network_effective": network_evidence, "images": {c.name: c.image.id for c in containers}, "run_timeout_role": "network-rule lifetime; not a completion timeout", "sampling_start_unix": {name: series[0].ts for name, series in rm.samples.items() if series}}

            submit_start = time.time()
            module.submit_transactions(
                count=int(config["workload"]["tx_count"]),
                rate_tps=float(config["workload"]["tx_rate_tps"]),
            )
            settle = float(config.get("runtime", {}).get("settle_seconds", 5.0))
            time.sleep(settle)
            submit_end = time.time()

            cutoff = time.time() if paper_mode else None
            module_metrics = module.get_metrics()
            if cutoff is not None:
                module_metrics["commits_by_request"] = {req: [(nid, ts) for nid, ts in entries if ts <= cutoff] for req, entries in module_metrics.get("commits_by_request", {}).items()}
            if rm is not None:
                resource_summary = rm.stop()
                if paper_mode:
                    for name in rm.samples:
                        rm.samples[name] = [sample for sample in rm.samples[name] if sample.ts <= cutoff]
                    resource_summary = rm.summary()
                    samples = {name: [asdict(sample) for sample in series] for name, series in rm.samples.items()}
                    if any(len(series) < 2 for series in samples.values()):
                        raise RuntimeError("Insufficient resource samples for measured window")
                rm = None
        except BaseException as exc:
            writer.log(f"error {type(exc).__name__}: {exc}")
            raise
        finally:
            if paper_mode:
                for container in getattr(module, "containers", []):
                    try:
                        (writer.path / f"{container.name}.log").write_bytes(container.logs())
                    except Exception:
                        pass
            if rm is not None:
                try:
                    rm.stop()
                except Exception:  # noqa: BLE001
                    pass
            nc.clear()
            module.stop()

        summary = _assemble_summary(
            algorithm=algorithm,
            repetition=repetition,
            run_id=run_id,
            config=config,
            module_metrics=module_metrics,
            resource_summary=resource_summary,
            submit_window=(submit_start, submit_end),
            started_at=started_at,
            artefacts_dir=str(writer.path),
        )
        if paper_mode:
            provenance.update({"observation_start_unix": submit_start, "observation_end_unix": cutoff, "post_submit_settle_seconds": settle, "energy_estimator": "sum(cpu_avg/100/num_cpus*TDP*sample_duration)", "cpu_sampling": "Docker stats streaming, approximately 1 Hz"})
            summary["provenance"] = provenance
            summary["completion_fraction"] = summary["committed_by_quorum"] / max(summary["submitted"], 1)
            summary["completion_status"] = "zero" if summary["committed_by_quorum"] == 0 else ("full" if summary["committed_by_quorum"] == summary["submitted"] else "partial")
            summary["throughput_observation_tps"] = summary["committed_by_quorum"] / max(cutoff - submit_start, 1e-9)
            (writer.path / "resource_samples.json").write_text(json.dumps(samples, indent=2), encoding="utf-8")
        writer.write_metrics(summary)
        writer.write_raw_events(_raw_events(module_metrics))
        writer.log(
            f"done tps={summary['throughput_tps']:.2f} "
            f"latency_ms_p50={summary['latency_ms']['p50']:.1f} "
            f"energy_joules={summary['energy_joules']:.2f}"
        )
        if self.repository is not None:
            self.repository.save_run(summary)
        return summary


# --------------------------------------------------------------------------- #
# Helpers                                                                     #
# --------------------------------------------------------------------------- #


def _instantiate(algorithm: str) -> ConsensusModule:
    if algorithm not in ALGORITHM_LOADERS:
        raise ValueError(
            f"unknown algorithm {algorithm!r}; known: {sorted(ALGORITHM_LOADERS)}"
        )
    cls = ALGORITHM_LOADERS[algorithm]()
    return cls()


def _module_config(config: dict, algorithm: str | None = None) -> dict:
    """Build the dict ConsensusModule.start() receives.

    Merges global resource/runtime knobs with the optional algorithm-specific
    section at config[algorithm] (e.g. config["pow"]["difficulty_bits"]). Algo
    keys override global ones if names collide.
    """
    res = config.get("resources", {}) or {}
    rt = config.get("runtime", {}) or {}
    out = {
        "cpu_limit": res.get("cpu_limit", 2.0),
        "mem_limit": res.get("mem_limit", "2g"),
        "warmup_seconds": rt.get("warmup_seconds", 30),
    }
    if algorithm is not None:
        out.update(config.get(algorithm, {}) or {})
        if "seed" in config.get("experiment", {}):
            out["seed"] = f"{config["experiment"]["seed"]}:{algorithm}"
    return out


def _has_network_conditions(config: dict) -> bool:
    net = config.get("network", {})
    return any(
        float(net.get(k, 0) or 0) > 0
        for k in ("latency_ms", "bandwidth_kbps", "packet_loss_pct")
    )


def _assemble_summary(
    *,
    algorithm: str,
    repetition: int,
    run_id: str,
    config: dict,
    module_metrics: dict,
    resource_summary: dict,
    submit_window: tuple[float, float],
    started_at: str | None = None,
    artefacts_dir: str | None = None,
) -> dict:
    tracker = TxTracker()
    for req_id, ts in (module_metrics.get("submits") or {}).items():
        tracker.record_submit(req_id, float(ts))
    for req_id, commits in (module_metrics.get("commits_by_request") or {}).items():
        for node_id, ts in commits:
            tracker.record_commit(req_id, int(node_id), float(ts))

    node_count = int(module_metrics.get("node_count") or config["network"]["nodes"])
    fault_tolerance = (node_count - 1) // 3
    quorum = max(1, 2 * fault_tolerance + 1)
    tx_summary = tracker.summary(quorum=quorum)

    # Energy — trapezoidal integration over each container's CPU series.
    estimator = EnergyEstimator(
        tdp_watts=float(config["hardware"]["tdp_watts"]),
        num_cpus=os.cpu_count() or 1,
    )
    energy = 0.0
    for info in resource_summary.values():
        energy += estimator.joules(
            info.get("cpu_percent_avg", 0.0),
            info.get("duration_s", 0.0),
        )

    net = NetMonitor(resource_summary=resource_summary)
    net_totals = net.totals()
    bytes_per_tx = net.bytes_per_tx(tx_summary["committed_by_quorum"])

    submit_start, submit_end = submit_window
    network_cfg = config.get("network", {}) or {}
    workload_cfg = config.get("workload", {}) or {}
    hardware_cfg = config.get("hardware", {}) or {}
    experiment_cfg = config.get("experiment", {}) or {}
    return {
        "run_id": run_id,
        "algorithm": algorithm,
        "repetition": repetition,
        "node_count": node_count,
        "quorum": quorum,
        "submit_window_s": submit_end - submit_start,
        "throughput_tps": tx_summary["throughput_tps"],
        "latency_ms": tx_summary["latency_ms"],
        "finality_ms": tx_summary["finality_ms"],
        "committed_by_quorum": tx_summary["committed_by_quorum"],
        "submitted": tx_summary["submitted"],
        "energy_joules": energy,
        "resource_summary": resource_summary,
        "network_totals": net_totals,
        "bytes_per_tx": bytes_per_tx,
        "module_native": module_metrics,
        # Flat fields the storage layer indexes on (Repository._summary_to_run_row).
        "started_at": started_at,
        "artefacts_dir": artefacts_dir,
        "experiment_name": experiment_cfg.get("name"),
        "tdp_watts": hardware_cfg.get("tdp_watts"),
        "tx_count": workload_cfg.get("tx_count"),
        "tx_rate_tps": workload_cfg.get("tx_rate_tps"),
        "latency_ms_applied": network_cfg.get("latency_ms"),
        "bandwidth_kbps_applied": network_cfg.get("bandwidth_kbps"),
        "packet_loss_pct_applied": network_cfg.get("packet_loss_pct"),
    }


def _raw_events(module_metrics: dict) -> list[dict]:
    rows: list[dict] = []
    submits = module_metrics.get("submits") or {}
    commits = module_metrics.get("commits_by_request") or {}
    for req_id, submit_ts in submits.items():
        matches = commits.get(req_id, [])
        if not matches:
            rows.append({"request_id": req_id, "submit_ts": submit_ts, "node_id": "", "commit_ts": ""})
            continue
        for node_id, commit_ts in matches:
            rows.append({
                "request_id": req_id,
                "submit_ts": submit_ts,
                "node_id": node_id,
                "commit_ts": commit_ts,
                "latency_ms": (commit_ts - submit_ts) * 1000.0,
            })
    return rows
