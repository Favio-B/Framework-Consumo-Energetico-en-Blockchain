"""Host-side PoS adapter. Implements the ConsensusModule contract.

Generates one Ed25519 keypair per validator, distributes equal stakes by
default (overridable via config["stakes"]), launches N containers on a
dedicated user-defined bridge, acts as the (single) client, and parses each
container's stdout for `committed` events to build the uniform schema
ScenarioRunner consumes.
"""
from __future__ import annotations

import base64
import json
import socket
import time
import uuid
from pathlib import Path
from typing import Any

import docker
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric.ed25519 import Ed25519PrivateKey

from consensus.base import ConsensusModule

POS_IMAGE_TAG = "bcf-pos:latest"
POS_CONTEXT = Path(__file__).parent
NODE_PORT = 5000


def gen_keypair(seed: str | None = None) -> tuple[str, str]:
    if seed is None:
        priv = Ed25519PrivateKey.generate()
    else:
        import hashlib
        priv = Ed25519PrivateKey.from_private_bytes(hashlib.sha256(seed.encode()).digest())
    priv_raw = priv.private_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PrivateFormat.Raw,
        encryption_algorithm=serialization.NoEncryption(),
    )
    pub_raw = priv.public_key().public_bytes(
        encoding=serialization.Encoding.Raw,
        format=serialization.PublicFormat.Raw,
    )
    return base64.b64encode(priv_raw).decode(), base64.b64encode(pub_raw).decode()


class POSModule(ConsensusModule):
    def __init__(self) -> None:
        # Lazy: defer to start() so the class is instantiable without a daemon.
        self.client: docker.DockerClient | None = None
        self.run_id = uuid.uuid4().hex[:8]
        self.network_name = f"bcf-pos-{self.run_id}"
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
            self.client.images.build(path=str(POS_CONTEXT), tag=POS_IMAGE_TAG, rm=True)
            image_ref = POS_IMAGE_TAG
        self.network = self.client.networks.create(self.network_name, driver="bridge")

        seed = config.get("seed")
        keys = {i: gen_keypair(f"{seed}:{i}" if seed is not None else None) for i in range(node_count)}
        public_keys = {str(i): kp[1] for i, kp in keys.items()}
        peers = {
            str(i): f"{self._container_name(i)}:{NODE_PORT}" for i in range(node_count)
        }
        # Equal stakes by default — overridable via config["stakes"]
        # (e.g. {"0": 50, "1": 30, "2": 20}).
        stakes_cfg = config.get("stakes")
        if stakes_cfg is None:
            stakes = {str(i): 1.0 for i in range(node_count)}
        else:
            stakes = {str(k): float(v) for k, v in stakes_cfg.items()}

        cpu_limit = float(config.get("cpu_limit", 2.0))
        mem_limit = str(config.get("mem_limit", "2g"))
        slot_seconds = float(config.get("slot_seconds", 0.5))
        block_size = int(config.get("block_size", 10))
        confirmations = int(config.get("confirmations", 1))

        for i in range(node_count):
            env = {
                "NODE_ID": str(i),
                "TCP_PORT": str(NODE_PORT),
                "PEERS": json.dumps(peers),
                "PUBLIC_KEYS": json.dumps(public_keys),
                "PRIVATE_KEY": keys[i][0],
                "STAKES": json.dumps(stakes),
                "SLOT_SECONDS": str(slot_seconds),
                "BLOCK_SIZE": str(block_size),
                "CONFIRMATIONS": str(confirmations),
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
                    "tx": {"id": tx_id, "submit_ts": submit_ts, "data": f"tx-{i}"},
                }
                sock.sendall(json.dumps(payload, separators=(",", ":")).encode() + b"\n")
                if interval:
                    time.sleep(interval)

    def get_metrics(self) -> dict:
        per_node: dict[int, dict[str, Any]] = {}
        commits_by_request: dict[str, list[tuple[int, float]]] = {}
        proposed_per_node: dict[int, int] = {}
        for container in self.containers:
            nid = int(container.name.rsplit("-n", 1)[-1])
            committed_count = 0
            proposed_count = 0
            for line in container.logs().decode("utf-8", errors="ignore").splitlines():
                try:
                    evt = json.loads(line)
                except json.JSONDecodeError:
                    continue
                ev = evt.get("event")
                if ev == "committed":
                    committed_count += 1
                    req_id = evt.get("request_id")
                    if req_id:
                        commits_by_request.setdefault(req_id, []).append(
                            (nid, float(evt["ts"]))
                        )
                elif ev == "block_proposed":
                    proposed_count += 1
            per_node[nid] = {
                "committed_count": committed_count,
                "blocks_proposed": proposed_count,
            }
            proposed_per_node[nid] = proposed_count
        return {
            "algorithm": "pos",
            "run_id": self.run_id,
            "node_count": self.node_count,
            "entry_node_id": self.entry_node_id,
            "per_node": per_node,
            "blocks_proposed_per_node": proposed_per_node,
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
        return f"bcf-pos-{self.run_id}-n{node_id}"

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
                f"pos: {len(pending)}/{len(self.containers)} validators did not become "
                f"ready within {timeout:.1f}s"
            )

    def _resolve_published_port(self, node_id: int) -> int:
        container = self.containers[node_id]
        container.reload()
        port_map = container.attrs["NetworkSettings"]["Ports"][f"{NODE_PORT}/tcp"]
        if not port_map:
            raise RuntimeError(f"entry validator {node_id} has no published port")
        return int(port_map[0]["HostPort"])
