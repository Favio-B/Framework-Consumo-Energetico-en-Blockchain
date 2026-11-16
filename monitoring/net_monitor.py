"""Inter-container network traffic summariser.

Operates on the `summary()` output of ResourceMonitor so we don't run a second
sampling thread for data we already have. Within a user-defined bridge network
all inter-node traffic flows through each container's eth0, so rx/tx totals are
a valid lower bound on the consensus protocol's network footprint.

Limitation (for the paper): we cannot isolate traffic *between specific peers*
from the Docker stats API — that would require eBPF or tcpdump at the host.
Reported numbers are per-container totals.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class NetMonitor:
    resource_summary: dict  # output of ResourceMonitor.summary()

    def totals(self) -> dict:
        per_container = {
            name: {
                "rx_bytes": int(stats.get("rx_bytes", 0)),
                "tx_bytes": int(stats.get("tx_bytes", 0)),
            }
            for name, stats in self.resource_summary.items()
        }
        total_rx = sum(v["rx_bytes"] for v in per_container.values())
        total_tx = sum(v["tx_bytes"] for v in per_container.values())
        return {
            "total_rx_bytes": total_rx,
            "total_tx_bytes": total_tx,
            "total_bytes": total_rx + total_tx,
            "per_container": per_container,
        }

    def bytes_per_tx(self, tx_count: int) -> dict:
        if tx_count <= 0:
            return {"rx_per_tx": 0.0, "tx_per_tx": 0.0, "total_per_tx": 0.0}
        totals = self.totals()
        return {
            "rx_per_tx": totals["total_rx_bytes"] / tx_count,
            "tx_per_tx": totals["total_tx_bytes"] / tx_count,
            "total_per_tx": totals["total_bytes"] / tx_count,
        }
