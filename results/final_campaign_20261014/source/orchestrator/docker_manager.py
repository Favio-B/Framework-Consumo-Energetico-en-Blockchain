"""Thin wrapper around the Docker SDK with the lifecycle operations the rest
of the orchestrator needs.

Consensus modules (consensus/<algo>/module.py) *may* use this class or talk to
docker-py directly — PBFTModule currently does the latter, which is fine. The
main consumer is ScenarioRunner (step 6) and NetworkController, plus future
PoW / PoS modules that would otherwise reinvent the same helpers.

Nothing here is Windows- or Linux-specific: every call goes through the
Docker API, so behaviour on Windows Docker Desktop and on the Hetzner VPS is
identical.
"""
from __future__ import annotations

import time
from pathlib import Path
from typing import Any, Iterable

import docker
from docker.errors import APIError, NotFound


class DockerManager:
    def __init__(self, client: docker.DockerClient | None = None) -> None:
        self.client = client or docker.from_env()

    # ---- health ----------------------------------------------------------

    def ping(self) -> bool:
        return bool(self.client.ping())

    # ---- images ----------------------------------------------------------

    def build_image(self, context_path: Path | str, tag: str) -> None:
        """Idempotent build — Docker's layer cache makes repeat calls cheap."""
        self.client.images.build(path=str(context_path), tag=tag, rm=True)

    def ensure_image(self, reference: str) -> None:
        """Pull if not present locally. Used for Pumba / base images."""
        try:
            self.client.images.get(reference)
        except docker.errors.ImageNotFound:
            self.client.images.pull(reference)

    # ---- networks --------------------------------------------------------

    def create_network(self, name: str, driver: str = "bridge"):
        return self.client.networks.create(name, driver=driver)

    def remove_network(self, name: str) -> None:
        try:
            self.client.networks.get(name).remove()
        except (NotFound, APIError):
            pass

    # ---- containers ------------------------------------------------------

    def run_container(
        self,
        image: str,
        *,
        name: str,
        command: list[str] | str | None = None,
        hostname: str | None = None,
        environment: dict[str, str] | None = None,
        network: str | None = None,
        ports: dict | None = None,
        cpu_limit: float | None = None,
        mem_limit: str | None = None,
        volumes: dict | None = None,
        detach: bool = True,
        auto_remove: bool = False,
    ):
        kwargs: dict[str, Any] = {
            "name": name,
            "hostname": hostname or name,
            "environment": environment or {},
            "detach": detach,
            "auto_remove": auto_remove,
        }
        if command is not None:
            kwargs["command"] = command
        if network:
            kwargs["network"] = network
        if ports:
            kwargs["ports"] = ports
        if cpu_limit is not None:
            kwargs["nano_cpus"] = int(cpu_limit * 1_000_000_000)
        if mem_limit is not None:
            kwargs["mem_limit"] = mem_limit
        if volumes:
            kwargs["volumes"] = volumes
        return self.client.containers.run(image, **kwargs)

    def remove_container(self, container_or_name, force: bool = True) -> None:
        try:
            if isinstance(container_or_name, str):
                self.client.containers.get(container_or_name).remove(force=force)
            else:
                container_or_name.remove(force=force)
        except (NotFound, APIError):
            pass

    # ---- introspection ---------------------------------------------------

    def wait_for_log_marker(
        self,
        containers: Iterable,
        marker: str,
        timeout_s: float = 30.0,
        poll_interval_s: float = 0.25,
    ) -> None:
        """Block until every container's log stream contains `marker`.

        Raises TimeoutError listing the stragglers.
        """
        containers = list(containers)
        deadline = time.time() + timeout_s
        pending = {c.id: c for c in containers}
        while pending and time.time() < deadline:
            for cid in list(pending):
                container = pending[cid]
                try:
                    logs = container.logs().decode("utf-8", errors="ignore")
                except (NotFound, APIError):
                    pending.pop(cid, None)
                    continue
                if marker in logs:
                    pending.pop(cid, None)
            if pending:
                time.sleep(poll_interval_s)
        if pending:
            names = [c.name for c in pending.values()]
            raise TimeoutError(
                f"log marker {marker!r} not seen on {len(names)} container(s) "
                f"within {timeout_s:.1f}s: {names}"
            )

    def published_port(self, container, internal_port: int) -> int:
        container.reload()
        mappings = container.attrs["NetworkSettings"]["Ports"].get(
            f"{internal_port}/tcp"
        )
        if not mappings:
            raise RuntimeError(
                f"no published host port for {internal_port}/tcp on {container.name}"
            )
        return int(mappings[0]["HostPort"])

    # ---- cleanup ---------------------------------------------------------

    def cleanup_by_prefix(self, prefix: str) -> dict[str, int]:
        """Best-effort sweep of orphaned containers + networks by name prefix.

        Useful between runs and after crashes. Never raises — reports counts.
        """
        removed = {"containers": 0, "networks": 0}
        for c in self.client.containers.list(all=True):
            if c.name.startswith(prefix):
                try:
                    c.remove(force=True)
                    removed["containers"] += 1
                except (NotFound, APIError):
                    pass
        for n in self.client.networks.list():
            if n.name.startswith(prefix):
                try:
                    n.remove()
                    removed["networks"] += 1
                except (NotFound, APIError):
                    pass
        return removed
