"""Per-container CPU / memory / network sampler backed by docker stats streaming.

One background thread per container consumes `container.stats(stream=True, decode=True)`.
The Docker daemon emits approximately one stat dict per second; we store a typed
sample per arrival and expose aggregated summaries at the end of a run.

CPU percent matches the `docker stats` CLI: 100% = one full core, so values can
legitimately exceed 100% on multi-core hosts.

Limitations (documented for the paper):
    * Sampling rate is dictated by the Docker daemon (~1 Hz) — sub-second bursts
      of CPU activity alias into the surrounding samples.
    * memory_stats.usage is taken as-is; on cgroup v2 it excludes most page cache
      but can still include some slab / kernel memory.
"""
from __future__ import annotations

import threading
import time
from dataclasses import dataclass, field
from typing import Any


@dataclass
class ContainerSample:
    ts: float
    cpu_percent: float
    memory_mb: float
    rx_bytes: int
    tx_bytes: int


def compute_cpu_percent(stat: dict) -> float:
    """docker stats CPU% — matches what `docker stats` prints."""
    try:
        cpu_delta = (
            stat["cpu_stats"]["cpu_usage"]["total_usage"]
            - stat["precpu_stats"]["cpu_usage"]["total_usage"]
        )
        system_delta = (
            stat["cpu_stats"]["system_cpu_usage"]
            - stat["precpu_stats"]["system_cpu_usage"]
        )
    except (KeyError, TypeError):
        return 0.0
    if system_delta <= 0 or cpu_delta < 0:
        return 0.0
    online = stat["cpu_stats"].get("online_cpus")
    if not online:
        percpu = stat["cpu_stats"]["cpu_usage"].get("percpu_usage") or []
        online = len(percpu) or 1
    return (cpu_delta / system_delta) * online * 100.0


def memory_mb(stat: dict) -> float:
    try:
        return float(stat["memory_stats"]["usage"]) / (1024 * 1024)
    except (KeyError, TypeError):
        return 0.0


def net_bytes(stat: dict) -> tuple[int, int]:
    rx = tx = 0
    for iface_stats in (stat.get("networks") or {}).values():
        rx += int(iface_stats.get("rx_bytes", 0))
        tx += int(iface_stats.get("tx_bytes", 0))
    return rx, tx


def sample_from_stat(stat: dict, ts: float | None = None) -> ContainerSample:
    rx, tx = net_bytes(stat)
    return ContainerSample(
        ts=ts if ts is not None else time.time(),
        cpu_percent=compute_cpu_percent(stat),
        memory_mb=memory_mb(stat),
        rx_bytes=rx,
        tx_bytes=tx,
    )


@dataclass
class ResourceMonitor:
    containers: list  # list[docker.models.containers.Container]
    samples: dict[str, list[ContainerSample]] = field(default_factory=dict)
    _threads: list[threading.Thread] = field(default_factory=list)
    _streams: dict[str, Any] = field(default_factory=dict)
    _stop: threading.Event = field(default_factory=threading.Event)

    def start(self) -> None:
        for container in self.containers:
            self.samples.setdefault(container.name, [])
            t = threading.Thread(
                target=self._collect, args=(container,), daemon=True, name=f"rm-{container.name}"
            )
            self._threads.append(t)
            t.start()

    def _collect(self, container) -> None:
        try:
            stream = container.stats(stream=True, decode=True)
        except Exception:  # noqa: BLE001 - container may already be gone
            return
        self._streams[container.name] = stream
        try:
            for stat in stream:
                if self._stop.is_set():
                    break
                self.samples[container.name].append(sample_from_stat(stat))
        except Exception:  # noqa: BLE001 - stream closed from stop() or container removed
            return

    def stop(self) -> dict:
        self._stop.set()
        for stream in list(self._streams.values()):
            try:
                stream.close()
            except Exception:  # noqa: BLE001
                pass
        for t in self._threads:
            t.join(timeout=2.0)
        return self.summary()

    def summary(self) -> dict:
        out: dict[str, dict] = {}
        for name, samples in self.samples.items():
            if not samples:
                out[name] = _empty_summary()
                continue
            cpu = [s.cpu_percent for s in samples]
            mem = [s.memory_mb for s in samples]
            out[name] = {
                "cpu_percent_avg": sum(cpu) / len(cpu),
                "cpu_percent_peak": max(cpu),
                "memory_mb_avg": sum(mem) / len(mem),
                "memory_mb_peak": max(mem),
                "rx_bytes": max(samples[-1].rx_bytes - samples[0].rx_bytes, 0),
                "tx_bytes": max(samples[-1].tx_bytes - samples[0].tx_bytes, 0),
                "sample_count": len(samples),
                "duration_s": samples[-1].ts - samples[0].ts,
            }
        return out

    def cpu_series(self, container_name: str) -> list[tuple[float, float]]:
        """Return (cpu_percent, timestamp) tuples — ready to feed EnergyEstimator.integrate."""
        return [(s.cpu_percent, s.ts) for s in self.samples.get(container_name, [])]


def _empty_summary() -> dict:
    return {
        "cpu_percent_avg": 0.0,
        "cpu_percent_peak": 0.0,
        "memory_mb_avg": 0.0,
        "memory_mb_peak": 0.0,
        "rx_bytes": 0,
        "tx_bytes": 0,
        "sample_count": 0,
        "duration_s": 0.0,
    }
