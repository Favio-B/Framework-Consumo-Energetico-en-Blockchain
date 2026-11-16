"""Host-side PBFT adapter. Implements the ConsensusModule contract.

Responsibilities:
    * Build the PBFT Docker image from the sibling Dockerfile.
    * Generate Ed25519 keypairs for every replica and wire peer addressing.
    * Launch one container per node on a dedicated user-defined bridge network.
    * Act as the (single) client: stream CLIENT_REQUESTs to the primary.
    * Parse each container's stdout to extract commit events for TxTracker.
    * Idempotently tear down every container and the bridge network on stop().
"""
from __future__ import annotations

import base64
import hashlib
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

PBFT_IMAGE_TAG = "bcf-pbft:latest"
PBFT_CONTEXT = Path(__file__).parent
NODE_PORT = 5000


def gen_keypair(seed: str | None = None) -> tuple[str, str]:
    """Ed25519 keypair, base64-encoded raw bytes (private, public)."""
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


def payload_digest(payload: bytes) -> str:
    return hashlib.sha256(payload).hexdigest()


class PBFTModule(ConsensusModule):
    def __init__(self) -> None:
        # Lazy: defer to start() so the class is instantiable without a daemon
        # (useful for unit tests and registry conformance checks).
        self.client: docker.DockerClient | None = None
        self.run_id = uuid.uuid4().hex[:8]
        self.network_name = f"bcf-pbft-{self.run_id}"
        self.network = None
        self.containers: list = []
        self.node_count = 0
        self.primary_id = 0
        self.primary_host_port: int | None = None
        # Client-side submission log — populated by submit_transactions() and
        # exposed in get_metrics() so ScenarioRunner can correlate with commits.
        self._submits: dict[str, float] = {}

    # ---- lifecycle -------------------------------------------------------

    def start(self, node_count: int, config: dict) -> None:
        if node_count < 1:
            raise ValueError("node_count must be >= 1")
        self.node_count = node_count
        self.primary_id = 0

        if self.client is None:
            self.client = docker.from_env()
        image_ref = config.get("image")
        if not image_ref:
            self.client.images.build(path=str(PBFT_CONTEXT), tag=PBFT_IMAGE_TAG, rm=True)
            image_ref = PBFT_IMAGE_TAG
        self.network = self.client.networks.create(self.network_name, driver="bridge")

        seed = config.get("seed")
        keys = {i: gen_keypair(f"{seed}:{i}" if seed is not None else None) for i in range(node_count)}
        public_keys = {str(i): kp[1] for i, kp in keys.items()}
        peers = {
            str(i): f"{self._container_name(i)}:{NODE_PORT}" for i in range(node_count)
        }

        cpu_limit = float(config.get("cpu_limit", 2.0))
        mem_limit = str(config.get("mem_limit", "2g"))

        for i in range(node_count):
            env = {
                "NODE_ID": str(i),
                "TCP_PORT": str(NODE_PORT),
                "PEERS": json.dumps(peers),
                "PUBLIC_KEYS": json.dumps(public_keys),
                "PRIVATE_KEY": keys[i][0],
                "PRIMARY_ID": str(self.primary_id),
            }
            ports = {f"{NODE_PORT}/tcp": None} if i == self.primary_id else None
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
        self.primary_host_port = self._resolve_published_port(self.primary_id)

    def submit_transactions(self, count: int, rate_tps: float) -> None:
        if self.primary_host_port is None:
            raise RuntimeError("start() must be called before submit_transactions()")
        interval = 1.0 / rate_tps if rate_tps > 0 else 0.0
        with socket.create_connection(("127.0.0.1", self.primary_host_port), timeout=5.0) as sock:
            for i in range(count):
                payload = f"{self.run_id}-tx-{i}".encode()
                request_id = f"{self.run_id}-{i}"
                submit_ts = time.time()
                self._submits[request_id] = submit_ts
                msg = {
                    "type": "CLIENT_REQUEST",
                    "request_id": request_id,
                    "payload": base64.b64encode(payload).decode(),
                    "digest": payload_digest(payload),
                    "submit_ts": submit_ts,
                }
                sock.sendall(json.dumps(msg, separators=(",", ":")).encode() + b"\n")
                if interval:
                    time.sleep(interval)

    def get_metrics(self) -> dict:
        per_node: dict[int, dict[str, Any]] = {}
        commits_by_request: dict[str, list[tuple[int, float]]] = {}
        for container in self.containers:
            nid = int(container.name.rsplit("-n", 1)[-1])
            commit_times: list[float] = []
            for line in container.logs().decode("utf-8", errors="ignore").splitlines():
                try:
                    evt = json.loads(line)
                except json.JSONDecodeError:
                    continue
                if evt.get("event") != "committed":
                    continue
                ts = float(evt["ts"])
                commit_times.append(ts)
                req_id = evt.get("request_id")
                if req_id:
                    commits_by_request.setdefault(req_id, []).append((nid, ts))
            per_node[nid] = {
                "committed_count": len(commit_times),
                "first_commit_ts": commit_times[0] if commit_times else None,
                "last_commit_ts": commit_times[-1] if commit_times else None,
            }
        primary = per_node.get(self.primary_id, {})
        first, last = primary.get("first_commit_ts"), primary.get("last_commit_ts")
        window = (last - first) if (first is not None and last is not None) else 0.0
        return {
            "algorithm": "pbft",
            "run_id": self.run_id,
            "node_count": self.node_count,
            "primary_id": self.primary_id,
            "per_node": per_node,
            "committed_count": primary.get("committed_count", 0),
            "finality_window_s": window,
            # Raw per-request events — the uniform schema ScenarioRunner feeds
            # into TxTracker to compute TPS / latency / finality across algos.
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
        self.primary_host_port = None

    # ---- helpers ---------------------------------------------------------

    def _container_name(self, node_id: int) -> str:
        return f"bcf-pbft-{self.run_id}-n{node_id}"

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
                f"pbft: {len(pending)}/{len(self.containers)} nodes did not become "
                f"ready within {timeout:.1f}s"
            )

    def _resolve_published_port(self, node_id: int) -> int:
        container = self.containers[node_id]
        container.reload()
        port_map = container.attrs["NetworkSettings"]["Ports"][f"{NODE_PORT}/tcp"]
        if not port_map:
            raise RuntimeError(f"primary node {node_id} has no published port")
        return int(port_map[0]["HostPort"])
