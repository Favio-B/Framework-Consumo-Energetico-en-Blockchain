"""Network condition emulation.

Two drivers, single contract — the code never changes between environments, only
the `driver` field of experiment.yaml:

    driver: pumba   # local Windows + Docker Desktop (this file, today)
    driver: tc      # Linux VPS bare-metal (stubbed — Hetzner deploy phase)

Pumba runs as a sidecar container with the host's Docker socket mounted; it
spawns short-lived helper containers in the target's network namespace and runs
tc + netem there, so target containers themselves never need NET_ADMIN. Each
netem primitive (delay / loss / rate) is applied by a separate Pumba container
because the Pumba CLI accepts only one primitive per invocation.

Target selection: we pass the exact container names rather than Pumba's regex
matchers. It's explicit, auditable, and matches how ScenarioRunner tracks its
own containers.
"""
from __future__ import annotations

import uuid
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from orchestrator.docker_manager import DockerManager

PUMBA_IMAGE = "gaiaadm/pumba:latest"
DOCKER_SOCK = "/var/run/docker.sock"


class NetworkController:
    def __init__(self, docker_manager: "DockerManager", driver: str = "pumba") -> None:
        self.dm = docker_manager
        self.driver = driver
        self._sidecars: list = []

    # ---- public API ------------------------------------------------------

    def apply(
        self,
        targets: list[str],
        *,
        latency_ms: int = 0,
        jitter_ms: int = 0,
        bandwidth_kbps: int = 0,
        packet_loss_pct: float = 0.0,
        duration_s: float = 600.0,
    ) -> None:
        """Apply network conditions to `targets` (container names) for duration_s.

        A no-op if every condition is zero — ScenarioRunner still calls this so
        the code path is exercised uniformly.
        """
        if not targets:
            return
        if self.driver == "pumba":
            self._apply_pumba(
                targets,
                latency_ms=latency_ms,
                jitter_ms=jitter_ms,
                bandwidth_kbps=bandwidth_kbps,
                packet_loss_pct=packet_loss_pct,
                duration_s=duration_s,
            )
        elif self.driver == "tc":
            raise NotImplementedError(
                "tc driver is only available on Linux bare-metal (Hetzner VPS phase); "
                "switch driver to 'pumba' on Windows + Docker Desktop"
            )
        else:
            raise ValueError(f"unknown network driver: {self.driver!r}")

    def apply_verified(self, targets: list[str], *, latency_ms: int = 0,
                       bandwidth_kbps: int = 0, packet_loss_pct: float = 0,
                       duration_s: float = 600, tc_image: str, pumba_image: str | None = None) -> dict:
        """Pumba creates the qdisc; its nettools image composes and reads it.

        Independent Pumba primitives race to replace the root qdisc. Use a
        single Pumba owner and one combined netem rule per target namespace.
        No host tc, host interface, or other container network is modified.
        """
        import json
        import time
        if self.driver != 'pumba':
            raise ValueError('verified network requires the pumba driver')
        if not (latency_ms or bandwidth_kbps or packet_loss_pct): return {}
        pumba_image = pumba_image or PUMBA_IMAGE
        self.dm.ensure_image(pumba_image)
        prefix=['netem','--duration',f'{int(max(duration_s,1))}s','--tc-image',tc_image]
        if latency_ms:
            primitive=['delay','--time',str(latency_ms),'--jitter','0','--correlation','0']
        elif bandwidth_kbps: primitive=['rate','--rate',f'{bandwidth_kbps}kbit']
        else: primitive=['loss','--percent',str(packet_loss_pct)]
        self._spawn_sidecar(prefix+primitive+targets, image=pumba_image)
        client=self.dm.client
        def tc(target, args, write=False):
            return client.containers.run(tc_image,entrypoint='tc',command=args,
                network_mode='container:'+target.id,cap_add=['NET_ADMIN'] if write else [],
                remove=True).decode('utf-8')
        evidence={}
        for name in targets:
            target=client.containers.get(name)
            deadline=time.monotonic()+30
            while True:
                rules=json.loads(tc(target,['-j','qdisc','show','dev','eth0']))
                if any(r.get('kind')=='netem' for r in rules): break
                if time.monotonic()>=deadline:
                    logs='\n'.join(x.logs().decode(errors='replace') for x in self._sidecars)
                    raise RuntimeError(f'Pumba netem not active on {name}: {logs}')
                time.sleep(.25)
            cmd=['qdisc','change','dev','eth0','root','netem','limit','1000']
            if latency_ms: cmd += ['delay',f'{latency_ms}ms']
            if packet_loss_pct: cmd += ['loss',f'{packet_loss_pct}%']
            if bandwidth_kbps: cmd += ['rate',f'{bandwidth_kbps}kbit']
            tc(target,cmd,write=True)
            rules=json.loads(tc(target,['-j','qdisc','show','dev','eth0']))
            options=next(r['options'] for r in rules if r.get('kind')=='netem')
            if latency_ms and abs(options.get('delay',{}).get('delay',0)-latency_ms/1000)>1e-6:
                raise RuntimeError(f'Delay verification failed: {rules}')
            if options.get('delay',{}).get('jitter',0)!=0:
                raise RuntimeError(f'Unexpected jitter: {rules}')
            rate=options.get('rate',{})
            rate=rate.get('rate',0) if isinstance(rate,dict) else rate
            if bandwidth_kbps and abs(float(rate)-bandwidth_kbps*1000/8)>1:
                raise RuntimeError(f'Rate verification failed: {rules}')
            evidence[name]=rules
        return evidence

    def clear(self) -> None:
        """Force-stop every Pumba sidecar, reverting netem rules as Pumba exits."""
        for container in self._sidecars:
            self.dm.remove_container(container, force=True)
        self._sidecars = []

    # ---- Pumba backend ---------------------------------------------------

    def _apply_pumba(
        self,
        targets: list[str],
        *,
        latency_ms: int,
        jitter_ms: int,
        bandwidth_kbps: int,
        packet_loss_pct: float,
        duration_s: float,
    ) -> None:
        self.dm.ensure_image(PUMBA_IMAGE)
        duration_arg = f"{int(max(duration_s, 1))}s"

        if latency_ms > 0:
            cmd = ["netem", "--duration", duration_arg, "delay", "--time", str(latency_ms)]
            if jitter_ms > 0:
                cmd += ["--jitter", str(jitter_ms)]
            cmd += targets
            self._spawn_sidecar(cmd)

        if packet_loss_pct > 0:
            cmd = [
                "netem",
                "--duration",
                duration_arg,
                "loss",
                "--percent",
                f"{packet_loss_pct:.3f}",
                *targets,
            ]
            self._spawn_sidecar(cmd)

        if bandwidth_kbps > 0:
            cmd = [
                "netem",
                "--duration",
                duration_arg,
                "rate",
                "--rate",
                f"{bandwidth_kbps}kbit",
                *targets,
            ]
            self._spawn_sidecar(cmd)

    def _spawn_sidecar(self, command: list[str], image: str | None = None):
        container = self.dm.run_container(
            image or PUMBA_IMAGE,
            name=f"bcf-pumba-{uuid.uuid4().hex[:8]}",
            command=command,
            volumes={DOCKER_SOCK: {"bind": DOCKER_SOCK, "mode": "rw"}},
            detach=True,
            auto_remove=False,
        )
        self._sidecars.append(container)
        return container
