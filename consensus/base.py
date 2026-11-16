"""ConsensusModule — abstract base class shared by PoW, PoS, and PBFT adapters.

Every consensus implementation lives in its own Docker container and exposes
its lifecycle to the orchestrator through this contract. Keeping the interface
small (4 methods) is deliberate: the orchestrator must remain algorithm-agnostic.
"""
from __future__ import annotations

from abc import ABC, abstractmethod


class ConsensusModule(ABC):
    @abstractmethod
    def start(self, node_count: int, config: dict) -> None:
        """Boot `node_count` nodes with the given configuration.

        Must return only after every node is ready to accept transactions.
        """

    @abstractmethod
    def submit_transactions(self, count: int, rate_tps: float) -> None:
        """Push `count` transactions into the network at `rate_tps`.

        Blocks until the submission phase finishes; measurement of real
        throughput happens separately in monitoring.TxTracker.
        """

    @abstractmethod
    def get_metrics(self) -> dict:
        """Return algorithm-specific metrics collected so far.

        Orchestrator merges this dict with ResourceMonitor and EnergyEstimator
        output before persisting the run.
        """

    @abstractmethod
    def stop(self) -> None:
        """Tear down all nodes and release every associated resource.

        Must be idempotent — the orchestrator may call it during cleanup even
        if `start` raised mid-way.
        """
