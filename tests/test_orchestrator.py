"""Unit + integration tests for DockerManager and NetworkController.

Unit tests (fast, no Docker): mock the docker-py client and assert the right
calls land with the right kwargs.

Integration tests (Docker required, auto-skipped otherwise):
    * DockerManager.run_container + wait_for_log_marker + cleanup_by_prefix,
      validated against the tiny `alpine` image.
    * NetworkController actually inflates ping RTT between two alpine
      containers when 100 ms of latency is applied by Pumba.
"""
from __future__ import annotations

import re
import time
import uuid
from unittest.mock import MagicMock

import pytest

from orchestrator.docker_manager import DockerManager
from orchestrator.network_controller import (
    DOCKER_SOCK,
    PUMBA_IMAGE,
    NetworkController,
)


# =========================================================================== #
# DockerManager — unit (mocked docker client)                                 #
# =========================================================================== #


def _mock_manager() -> tuple[DockerManager, MagicMock]:
    client = MagicMock()
    return DockerManager(client=client), client


def test_docker_manager_build_image_forwards_kwargs():
    dm, client = _mock_manager()
    dm.build_image("./ctx", tag="foo:latest")
    client.images.build.assert_called_once_with(path="./ctx", tag="foo:latest", rm=True)


def test_docker_manager_ensure_image_pulls_when_missing():
    import docker as _docker
    dm, client = _mock_manager()
    client.images.get.side_effect = _docker.errors.ImageNotFound("nope")
    dm.ensure_image("alpine:latest")
    client.images.pull.assert_called_once_with("alpine:latest")


def test_docker_manager_ensure_image_skips_pull_when_present():
    dm, client = _mock_manager()
    dm.ensure_image("alpine:latest")
    client.images.pull.assert_not_called()


def test_docker_manager_run_container_translates_cpu_and_mem_limits():
    dm, client = _mock_manager()
    dm.run_container(
        "alpine",
        name="x",
        cpu_limit=1.5,
        mem_limit="512m",
        environment={"K": "v"},
        network="netA",
    )
    args, kwargs = client.containers.run.call_args
    assert args == ("alpine",)
    assert kwargs["nano_cpus"] == 1_500_000_000
    assert kwargs["mem_limit"] == "512m"
    assert kwargs["environment"] == {"K": "v"}
    assert kwargs["network"] == "netA"
    assert kwargs["detach"] is True
    assert kwargs["hostname"] == "x"


def test_docker_manager_run_container_omits_optional_kwargs_when_none():
    dm, client = _mock_manager()
    dm.run_container("alpine", name="x")
    _, kwargs = client.containers.run.call_args
    assert "nano_cpus" not in kwargs
    assert "mem_limit" not in kwargs
    assert "network" not in kwargs
    assert "ports" not in kwargs


def test_docker_manager_wait_for_log_marker_returns_when_seen():
    dm, _ = _mock_manager()
    container = MagicMock()
    container.id = "abc"
    container.logs.return_value = b'something happened\n{"event":"ready"}\n'
    dm.wait_for_log_marker([container], marker='"event":"ready"', timeout_s=1.0)
    # Should not raise.


def test_docker_manager_wait_for_log_marker_timeout():
    dm, _ = _mock_manager()
    container = MagicMock()
    container.id = "abc"
    container.name = "late"
    container.logs.return_value = b"nothing useful"
    with pytest.raises(TimeoutError) as excinfo:
        dm.wait_for_log_marker([container], marker="NEVER", timeout_s=0.2)
    assert "NEVER" in str(excinfo.value)
    assert "late" in str(excinfo.value)


def test_docker_manager_published_port_parses_attrs():
    dm, _ = _mock_manager()
    container = MagicMock()
    container.name = "pri"
    container.attrs = {
        "NetworkSettings": {
            "Ports": {"5000/tcp": [{"HostIp": "0.0.0.0", "HostPort": "49153"}]}
        }
    }
    assert dm.published_port(container, 5000) == 49153


def test_docker_manager_published_port_raises_when_unmapped():
    dm, _ = _mock_manager()
    container = MagicMock()
    container.name = "pri"
    container.attrs = {"NetworkSettings": {"Ports": {"5000/tcp": None}}}
    with pytest.raises(RuntimeError):
        dm.published_port(container, 5000)


# =========================================================================== #
# NetworkController — unit (mocked)                                           #
# =========================================================================== #


def _nc_with_stub() -> tuple[NetworkController, MagicMock]:
    """NetworkController with a stand-in DockerManager.run_container."""
    dm = MagicMock()
    dm.run_container.return_value = MagicMock()
    nc = NetworkController(docker_manager=dm)
    return nc, dm


def test_netctl_noop_when_all_conditions_zero():
    nc, dm = _nc_with_stub()
    nc.apply(["n0", "n1"], latency_ms=0, bandwidth_kbps=0, packet_loss_pct=0.0)
    dm.ensure_image.assert_called_once()  # image still ensured
    dm.run_container.assert_not_called()


def test_netctl_noop_when_targets_empty():
    nc, dm = _nc_with_stub()
    nc.apply([], latency_ms=100)
    dm.run_container.assert_not_called()
    dm.ensure_image.assert_not_called()


def test_netctl_applies_latency_with_pumba_command():
    nc, dm = _nc_with_stub()
    nc.apply(["n0", "n1"], latency_ms=50, duration_s=30)
    assert dm.run_container.call_count == 1
    _, kwargs = dm.run_container.call_args
    cmd = kwargs["command"]
    assert cmd[:3] == ["netem", "--duration", "30s"]
    assert "delay" in cmd and "--time" in cmd and "50" in cmd
    assert cmd[-2:] == ["n0", "n1"]
    # Pumba needs the docker socket mounted.
    assert DOCKER_SOCK in kwargs["volumes"]


def test_netctl_applies_loss_and_rate_as_separate_sidecars():
    nc, dm = _nc_with_stub()
    nc.apply(
        ["n0"], latency_ms=0, bandwidth_kbps=1000, packet_loss_pct=2.5, duration_s=10
    )
    assert dm.run_container.call_count == 2
    commands = [c.kwargs["command"] for c in dm.run_container.call_args_list]
    loss_cmd = next(c for c in commands if "loss" in c)
    rate_cmd = next(c for c in commands if "rate" in c)
    assert "2.500" in loss_cmd
    assert "1000kbit" in rate_cmd


def test_netctl_all_three_conditions_launch_three_sidecars():
    nc, dm = _nc_with_stub()
    nc.apply(["n0"], latency_ms=25, bandwidth_kbps=500, packet_loss_pct=1.0)
    assert dm.run_container.call_count == 3


def test_netctl_rejects_unknown_driver():
    dm = MagicMock()
    nc = NetworkController(dm, driver="voodoo")
    with pytest.raises(ValueError, match="voodoo"):
        nc.apply(["n0"], latency_ms=50)


def test_netctl_tc_driver_raises_not_implemented_on_non_linux_local():
    dm = MagicMock()
    nc = NetworkController(dm, driver="tc")
    with pytest.raises(NotImplementedError, match="Linux bare-metal"):
        nc.apply(["n0"], latency_ms=50)


def test_netctl_clear_removes_all_sidecars():
    nc, dm = _nc_with_stub()
    nc.apply(["n0"], latency_ms=10)
    nc.apply(["n0"], packet_loss_pct=5.0)
    assert len(nc._sidecars) == 2
    nc.clear()
    assert nc._sidecars == []
    assert dm.remove_container.call_count == 2


# =========================================================================== #
# Integration — Docker required                                               #
# =========================================================================== #


docker_mod = pytest.importorskip("docker")


@pytest.fixture(scope="module")
def dm() -> DockerManager:
    try:
        manager = DockerManager()
        manager.ping()
    except Exception as exc:  # noqa: BLE001 — any failure means skip
        pytest.skip(f"Docker daemon not reachable: {exc}")
    manager.ensure_image("alpine:latest")
    return manager


@pytest.fixture()
def integration_prefix() -> str:
    return f"bcf-it-{uuid.uuid4().hex[:6]}"


@pytest.fixture()
def cleanup_after(dm: DockerManager, integration_prefix: str):
    yield
    dm.cleanup_by_prefix(integration_prefix)
    dm.cleanup_by_prefix("bcf-pumba-")


@pytest.mark.timeout(60)
def test_docker_manager_can_run_wait_and_cleanup(
    dm: DockerManager, integration_prefix: str, cleanup_after
):
    name = f"{integration_prefix}-hello"
    container = dm.run_container(
        "alpine:latest",
        name=name,
        command=["sh", "-c", "echo READY_MARKER && sleep 30"],
        detach=True,
    )
    dm.wait_for_log_marker([container], "READY_MARKER", timeout_s=10)
    removed = dm.cleanup_by_prefix(integration_prefix)
    assert removed["containers"] >= 1


@pytest.mark.timeout(90)
def test_network_controller_inflates_ping_rtt_with_pumba(
    dm: DockerManager, integration_prefix: str, cleanup_after
):
    net_name = f"{integration_prefix}-net"
    network = dm.create_network(net_name)
    try:
        n0 = f"{integration_prefix}-n0"
        n1 = f"{integration_prefix}-n1"
        c0 = dm.run_container(
            "alpine:latest",
            name=n0,
            command=["sleep", "300"],
            network=net_name,
            hostname=n0,
        )
        dm.run_container(
            "alpine:latest",
            name=n1,
            command=["sleep", "300"],
            network=net_name,
            hostname=n1,
        )

        # Baseline RTT — intra-bridge, usually well under 1 ms on Docker Desktop.
        baseline = _ping_avg_ms(c0, n1, count=3)
        assert baseline is not None and baseline < 50, f"baseline too high: {baseline}"

        nc = NetworkController(dm, driver="pumba")
        try:
            nc.apply([n0, n1], latency_ms=100, duration_s=60)
            # Give Pumba a moment to spawn its netem sidecars.
            time.sleep(4)
            delayed = _ping_avg_ms(c0, n1, count=5)
            assert delayed is not None, "ping failed under Pumba"
            # With 100 ms applied to both endpoints the *added* RTT is 200 ms.
            # Give a wide margin to absorb startup warmup & scheduler jitter.
            assert delayed - baseline > 120, (
                f"latency not applied: baseline={baseline:.1f}ms delayed={delayed:.1f}ms"
            )
        finally:
            nc.clear()
    finally:
        dm.remove_network(net_name)


_PING_AVG_RE = re.compile(r"min/avg/max(?:/[a-z]+)?\s*=\s*[\d.]+/([\d.]+)/")


def _ping_avg_ms(container, target: str, count: int) -> float | None:
    result = container.exec_run(f"ping -c {count} -W 2 {target}")
    output = result.output.decode("utf-8", errors="ignore")
    match = _PING_AVG_RE.search(output)
    return float(match.group(1)) if match else None
