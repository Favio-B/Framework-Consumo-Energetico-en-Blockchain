"""Host-side PoW adapter. Implements the ConsensusModule contract.

Mirrors PBFTModule structurally so ScenarioRunner treats both algorithms
uniformly. Tracks client-side submit timestamps and parses each container's
stdout for `committed` events to build the (submits, commits_by_request)
schema TxTracker consumes.
"""
from __future__ import annotations

import json
import socket
import time
import uuid
from pathlib import Path
from typing import Any

import docker

from consensus.base import ConsensusModule

POW_IMAGE_TAG = "bcf-pow:latest"
POW_CONTEXT = Path(__file__).parent
NODE_PORT = 5000


class POWModule(ConsensusModule):
    def __init__(self) -> None:
        # Lazy: defer to start() so the class is instantiable without a daemon
        # (useful for unit tests and registry conformance checks).
        self.client: docker.DockerClient | None = None
        self.run_id = uuid.uuid4().hex[:8]
        self.network_name = f"bcf-pow-{self.run_id}"
        self.network = None
        self.containers: list = []
        self.node_count = 0
        self.entry_node_id = 0
        self.entry_host_port: int | None = None
        self._submits: dict[str, float] = {}

    # ---- lifecycle -------------------------------------------------------

    def start(self, node_count: int, config: dict) -> None:
        if node_count < 1:
            raise ValueError("node_count must be >= 1")
        self.node_count = node_count

        if self.client is None:
            self.client = docker.from_env()
        image_ref = config.get("image")
        if not image_ref:
            self.client.images.build(path=str(POW_CONTEXT), tag=POW_IMAGE_TAG, rm=True)
            image_ref = POW_IMAGE_TAG
        self.network = self.client.networks.create(self.network_name, driver="bridge")

        peers = {
            str(i): f"{self._container_name(i)}:{NODE_PORT}" for i in range(node_count)
        }
        cpu_limit = float(config.get("cpu_limit", 2.0))
        mem_limit = str(config.get("mem_limit", "2g"))
        difficulty_bits = int(config.get("difficulty_bits", 20))
        block_size = int(config.get("block_size", 10))
        confirmations = int(config.get("confirmations", 1))
        batch_hashes = int(config.get("batch_hashes", 5000))

        for i in range(node_count):
            env = {
                "NODE_ID": str(i),
                "TCP_PORT": str(NODE_PORT),
                "PEERS": json.dumps(peers),
                "DIFFICULTY_BITS": str(difficulty_bits),
                "BLOCK_SIZE": str(block_size),
                "CONFIRMATIONS": str(confirmations),
                "BATCH_HASHES": str(batch_hashes),
            }
            ports = {f"{NODE_PORT}/tcp": None} if i == self.entry_node_id else None
            container = self.client.containers.run(
                image_ref,
                name=self._container_name(i),
                hostname=self._container_name(i),
                environment=env,
                network=self.network_name,
                detach=True,
                ports=ports,
                nano_cpus=int(cpu_limit * 1_000_000_000),
                mem_limit=mem_limit,
            )
            self.containers.append(container)

        warmup = float(config.get("warmup_seconds", 30))
        self._wait_ready(warmup)
        self.entry_host_port = self._resolve_published_port(self.entry_node_id)

    def submit_transactions(self, count: int, rate_tps: float) -> None:
        if self.entry_host_port is None:
            raise RuntimeError("start() must be called before submit_transactions()")
        interval = 1.0 / rate_tps if rate_tps > 0 else 0.0
        with socket.create_connection(
            ("127.0.0.1", self.entry_host_port), timeout=5.0
        ) as sock:
            for i in range(count):
                tx_id = f"{self.run_id}-{i}"
                submit_ts = time.time()
                self._submits[tx_id] = submit_ts
                payload = {
                    "type": "TX",
                    "tx": {
                        "id": tx_id,
                        "submit_ts": submit_ts,
                        "data": f"tx-{i}",
                    },
                }
                sock.sendall(json.dumps(payload, separators=(",", ":")).encode() + b"\n")
                if interval:
                    time.sleep(interval)

    def get_metrics(self) -> dict:
        per_node: dict[int, dict[str, Any]] = {}
        commits_by_request: dict[str, list[tuple[int, float]]] = {}
        blocks_per_node: dict[int, int] = {}
        for container in self.containers:
            nid = int(container.name.rsplit("-n", 1)[-1])
            committed_count = 0
            mined_count = 0
            for line in container.logs().decode("utf-8", errors="ignore").splitlines():
                try:
                    evt = json.loads(line)
                except json.JSONDecodeError:
                    continue
                ev_type = evt.get("event")
                if ev_type == "committed":
                    committed_count += 1
                    req_id = evt.get("request_id")
                    if req_id:
                        commits_by_request.setdefault(req_id, []).append(
                            (nid, float(evt["ts"]))
                        )
                elif ev_type == "block_mined":
                    mined_count += 1
            per_node[nid] = {
                "committed_count": committed_count,
                "mined_blocks": mined_count,
            }
            blocks_per_node[nid] = mined_count
        return {
            "algorithm": "pow",
            "run_id": self.run_id,
            "node_count": self.node_count,
            "entry_node_id": self.entry_node_id,
            "per_node": per_node,
            "blocks_mined_per_node": blocks_per_node,
            "submits": dict(self._submits),
            "commits_by_request": {k: list(v) for k, v in commits_by_request.items()},
        }

    def stop(self) -> None:
        for container in self.containers:
            try:
                container.remove(force=True)
            except docker.errors.APIError:
                pass
        self.containers = []
        if self.network is not None:
            try:
                self.network.remove()
            except docker.errors.APIError:
                pass
            self.network = None
        self.entry_host_port = None

    # ---- helpers ---------------------------------------------------------

    def _container_name(self, node_id: int) -> str:
        return f"bcf-pow-{self.run_id}-n{node_id}"

    def _wait_ready(self, timeout: float) -> None:
        deadline = time.time() + timeout
        pending = {c.id for c in self.containers}
        while pending and time.time() < deadline:
            for container in self.containers:
                if container.id not in pending:
                    continue
                logs = container.logs().decode("utf-8", errors="ignore")
                if '"event":"ready"' in logs or '"event": "ready"' in logs:
                    pending.discard(container.id)
            if pending:
                time.sleep(0.25)
        if pending:
            raise RuntimeError(
                f"pow: {len(pending)}/{len(self.containers)} nodes did not become "
                f"ready within {timeout:.1f}s"
            )

    def _resolve_published_port(self, node_id: int) -> int:
        container = self.containers[node_id]
        container.reload()
        port_map = container.attrs["NetworkSettings"]["Ports"][f"{NODE_PORT}/tcp"]
        if not port_map:
            raise RuntimeError(f"entry node {node_id} has no published port")
        return int(port_map[0]["HostPort"])
