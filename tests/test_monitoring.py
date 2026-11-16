"""Unit tests for the monitoring layer — pure Python, no Docker.

Covers EnergyEstimator, ResourceMonitor (parsing + summary, not the live
stream), TxTracker, and NetMonitor.
"""
from __future__ import annotations

import pytest

from monitoring.energy_estimator import EnergyEstimator
from monitoring.net_monitor import NetMonitor
from monitoring.resource_monitor import (
    ContainerSample,
    ResourceMonitor,
    compute_cpu_percent,
    memory_mb,
    net_bytes,
    sample_from_stat,
)
from monitoring.tx_tracker import TxTracker


# =========================================================================== #
# EnergyEstimator                                                             #
# =========================================================================== #


def test_energy_estimator_rejects_bad_config():
    with pytest.raises(ValueError):
        EnergyEstimator(tdp_watts=0, num_cpus=4)
    with pytest.raises(ValueError):
        EnergyEstimator(tdp_watts=45, num_cpus=0)


def test_energy_zero_cpu_yields_zero_joules():
    e = EnergyEstimator(tdp_watts=45, num_cpus=4)
    assert e.joules(cpu_percent_total=0.0, duration_s=10.0) == 0.0


def test_energy_full_package_utilisation():
    # 400% on a 4-core host = 100% of the CPU = TDP * duration.
    e = EnergyEstimator(tdp_watts=10.0, num_cpus=4)
    assert e.joules(cpu_percent_total=400.0, duration_s=2.0) == pytest.approx(20.0)


def test_energy_partial_utilisation_single_core_busy():
    # 100% (one core) on 4-core host = 0.25 * TDP.
    e = EnergyEstimator(tdp_watts=40.0, num_cpus=4)
    assert e.joules(cpu_percent_total=100.0, duration_s=1.0) == pytest.approx(10.0)


def test_energy_clamps_above_100_percent_package():
    # Overshoot (e.g. measurement artifact): clamp at 1.0 fraction.
    e = EnergyEstimator(tdp_watts=10.0, num_cpus=2)
    # 500% on 2-core host would imply 2.5x package — clamp to 1.0.
    assert e.joules(cpu_percent_total=500.0, duration_s=1.0) == 10.0


def test_energy_rejects_negative_duration():
    e = EnergyEstimator(tdp_watts=45, num_cpus=4)
    with pytest.raises(ValueError):
        e.joules(100.0, -1.0)


def test_energy_integrate_trapezoidal():
    e = EnergyEstimator(tdp_watts=100.0, num_cpus=1)
    # Constant 50% for 10 seconds = 0.5 * 100 * 10 = 500 J.
    series = [(50.0, 0.0), (50.0, 5.0), (50.0, 10.0)]
    assert e.integrate(series) == pytest.approx(500.0)


def test_energy_integrate_ramp():
    # Linear ramp from 0% to 100% on 1-core, TDP 10W, over 10s.
    # Area under triangle = 0.5 * 10 * (10W) = 50 J.
    e = EnergyEstimator(tdp_watts=10.0, num_cpus=1)
    series = [(0.0, 0.0), (100.0, 10.0)]
    assert e.integrate(series) == pytest.approx(50.0)


def test_energy_integrate_empty_or_single_sample():
    e = EnergyEstimator(tdp_watts=45, num_cpus=1)
    assert e.integrate([]) == 0.0
    assert e.integrate([(50.0, 0.0)]) == 0.0


# =========================================================================== #
# ResourceMonitor parsing                                                     #
# =========================================================================== #


def _stat(
    cpu_total: int,
    cpu_total_prev: int,
    sys_cur: int,
    sys_prev: int,
    online: int = 4,
    mem_usage: int = 100 * 1024 * 1024,
    net_rx: int = 1000,
    net_tx: int = 2000,
) -> dict:
    return {
        "cpu_stats": {
            "cpu_usage": {"total_usage": cpu_total},
            "system_cpu_usage": sys_cur,
            "online_cpus": online,
        },
        "precpu_stats": {
            "cpu_usage": {"total_usage": cpu_total_prev},
            "system_cpu_usage": sys_prev,
        },
        "memory_stats": {"usage": mem_usage},
        "networks": {"eth0": {"rx_bytes": net_rx, "tx_bytes": net_tx}},
    }


def test_compute_cpu_percent_typical():
    # cpu_delta / sys_delta * online * 100 = 100 / 400 * 4 * 100 = 100.0
    stat = _stat(cpu_total=500, cpu_total_prev=400, sys_cur=1400, sys_prev=1000, online=4)
    assert compute_cpu_percent(stat) == pytest.approx(100.0)


def test_compute_cpu_percent_uses_percpu_fallback_when_online_missing():
    stat = _stat(cpu_total=200, cpu_total_prev=100, sys_cur=500, sys_prev=100, online=0)
    stat["cpu_stats"]["cpu_usage"]["percpu_usage"] = [0, 0, 0, 0]
    # (100/400)*4*100 = 100
    assert compute_cpu_percent(stat) == pytest.approx(100.0)


def test_compute_cpu_percent_missing_fields_returns_zero():
    assert compute_cpu_percent({}) == 0.0
    assert compute_cpu_percent({"cpu_stats": {}}) == 0.0


def test_compute_cpu_percent_zero_system_delta():
    stat = _stat(cpu_total=500, cpu_total_prev=400, sys_cur=1000, sys_prev=1000)
    assert compute_cpu_percent(stat) == 0.0


def test_memory_mb_and_net_bytes():
    stat = _stat(0, 0, 0, 0, mem_usage=200 * 1024 * 1024, net_rx=1024, net_tx=4096)
    assert memory_mb(stat) == pytest.approx(200.0)
    assert net_bytes(stat) == (1024, 4096)


def test_net_bytes_sums_multiple_interfaces():
    stat = {
        "networks": {
            "eth0": {"rx_bytes": 10, "tx_bytes": 20},
            "eth1": {"rx_bytes": 5, "tx_bytes": 7},
        }
    }
    assert net_bytes(stat) == (15, 27)


def test_sample_from_stat_wraps_all_fields():
    stat = _stat(200, 100, 400, 0, online=2, mem_usage=50 * 1024 * 1024)
    s = sample_from_stat(stat, ts=42.0)
    assert isinstance(s, ContainerSample)
    assert s.ts == 42.0
    assert s.memory_mb == pytest.approx(50.0)
    assert (s.rx_bytes, s.tx_bytes) == (1000, 2000)
    assert s.cpu_percent == pytest.approx(50.0)  # (100/400)*2*100


# =========================================================================== #
# ResourceMonitor summary                                                     #
# =========================================================================== #


def test_resource_monitor_summary_empty_when_no_samples():
    rm = ResourceMonitor(containers=[])
    rm.samples["ghost"] = []
    out = rm.summary()
    assert out["ghost"]["sample_count"] == 0
    assert out["ghost"]["cpu_percent_avg"] == 0.0


def test_resource_monitor_summary_aggregates_samples():
    rm = ResourceMonitor(containers=[])
    rm.samples["n0"] = [
        ContainerSample(ts=0.0, cpu_percent=20.0, memory_mb=100.0, rx_bytes=1000, tx_bytes=2000),
        ContainerSample(ts=1.0, cpu_percent=60.0, memory_mb=150.0, rx_bytes=1500, tx_bytes=3000),
        ContainerSample(ts=2.0, cpu_percent=40.0, memory_mb=120.0, rx_bytes=3000, tx_bytes=5000),
    ]
    s = rm.summary()["n0"]
    assert s["sample_count"] == 3
    assert s["cpu_percent_avg"] == pytest.approx(40.0)
    assert s["cpu_percent_peak"] == 60.0
    assert s["memory_mb_peak"] == 150.0
    assert s["rx_bytes"] == 2000  # 3000 - 1000
    assert s["tx_bytes"] == 3000  # 5000 - 2000
    assert s["duration_s"] == pytest.approx(2.0)


def test_resource_monitor_cpu_series_shape():
    rm = ResourceMonitor(containers=[])
    rm.samples["n0"] = [
        ContainerSample(ts=0.0, cpu_percent=10.0, memory_mb=0, rx_bytes=0, tx_bytes=0),
        ContainerSample(ts=1.5, cpu_percent=80.0, memory_mb=0, rx_bytes=0, tx_bytes=0),
    ]
    series = rm.cpu_series("n0")
    assert series == [(10.0, 0.0), (80.0, 1.5)]


# =========================================================================== #
# TxTracker                                                                   #
# =========================================================================== #


def test_txtracker_empty_returns_zeros():
    t = TxTracker()
    s = t.summary(quorum=1)
    assert s["submitted"] == 0
    assert s["throughput_tps"] == 0.0
    assert s["latency_ms"]["n"] == 0


def test_txtracker_rejects_invalid_quorum():
    t = TxTracker()
    t.record_submit("r1", 0.0)
    with pytest.raises(ValueError):
        t.summary(quorum=0)


def test_txtracker_single_tx_single_node():
    t = TxTracker()
    t.record_submit("r1", 0.0)
    t.record_commit("r1", 0, 0.100)  # 100 ms
    s = t.summary(quorum=1)
    assert s["submitted"] == 1
    assert s["committed_by_quorum"] == 1
    assert s["latency_ms"]["mean"] == pytest.approx(100.0)
    assert s["finality_ms"]["mean"] == pytest.approx(100.0)
    assert s["throughput_tps"] == pytest.approx(10.0)  # 1 tx / 0.1 s


def test_txtracker_quorum_gt_1():
    t = TxTracker()
    t.record_submit("r1", 0.0)
    t.record_commit("r1", 0, 0.050)
    t.record_commit("r1", 1, 0.080)
    t.record_commit("r1", 2, 0.120)
    s2 = t.summary(quorum=2)
    assert s2["committed_by_quorum"] == 1
    # Latency is submit → first commit; finality is submit → 2nd commit.
    assert s2["latency_ms"]["mean"] == pytest.approx(50.0)
    assert s2["finality_ms"]["mean"] == pytest.approx(80.0)


def test_txtracker_partial_commits_dont_inflate_throughput():
    t = TxTracker()
    for i in range(10):
        t.record_submit(f"r{i}", 0.0 + i * 0.01)
    # Only 3 txs reached quorum=2.
    for i in range(3):
        t.record_commit(f"r{i}", 0, 0.5)
        t.record_commit(f"r{i}", 1, 0.6)
    s = t.summary(quorum=2)
    assert s["submitted"] == 10
    assert s["committed_by_quorum"] == 3


def test_txtracker_percentile_ordering():
    t = TxTracker()
    for i, lat in enumerate([10, 20, 30, 40, 50, 60, 70, 80, 90, 100]):
        t.record_submit(f"r{i}", 0.0)
        t.record_commit(f"r{i}", 0, lat / 1000.0)
    s = t.summary(quorum=1)
    assert s["latency_ms"]["p50"] <= s["latency_ms"]["p95"] <= s["latency_ms"]["p99"] <= s["latency_ms"]["max"]
    assert s["latency_ms"]["max"] == 100.0


# =========================================================================== #
# NetMonitor                                                                  #
# =========================================================================== #


def test_netmonitor_totals():
    rs = {
        "n0": {"rx_bytes": 100, "tx_bytes": 200, "cpu_percent_avg": 10},
        "n1": {"rx_bytes": 50, "tx_bytes": 75, "cpu_percent_avg": 10},
    }
    nm = NetMonitor(resource_summary=rs)
    t = nm.totals()
    assert t["total_rx_bytes"] == 150
    assert t["total_tx_bytes"] == 275
    assert t["total_bytes"] == 425
    assert set(t["per_container"]) == {"n0", "n1"}


def test_netmonitor_bytes_per_tx():
    rs = {"n0": {"rx_bytes": 1000, "tx_bytes": 2000}}
    nm = NetMonitor(resource_summary=rs)
    assert nm.bytes_per_tx(tx_count=10) == {
        "rx_per_tx": 100.0,
        "tx_per_tx": 200.0,
        "total_per_tx": 300.0,
    }


def test_netmonitor_bytes_per_tx_zero_count():
    nm = NetMonitor(resource_summary={"n0": {"rx_bytes": 5, "tx_bytes": 5}})
    assert nm.bytes_per_tx(tx_count=0) == {"rx_per_tx": 0.0, "tx_per_tx": 0.0, "total_per_tx": 0.0}
