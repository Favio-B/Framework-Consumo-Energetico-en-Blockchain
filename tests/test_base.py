"""Unit tests for consensus.base.ConsensusModule.

These verify the ABC contract itself — not any concrete consensus algorithm.
The ABC is the one piece every module (PoW/PoS/PBFT) must conform to, so a
regression here would silently break all three backends.
"""
from __future__ import annotations

import pytest

from consensus.base import ConsensusModule


def test_cannot_instantiate_abstract_directly():
    with pytest.raises(TypeError):
        ConsensusModule()  # type: ignore[abstract]


def test_cannot_instantiate_incomplete_subclass():
    class OnlyStart(ConsensusModule):
        def start(self, node_count: int, config: dict) -> None:
            pass

    with pytest.raises(TypeError):
        OnlyStart()  # type: ignore[abstract]


def test_can_instantiate_complete_subclass():
    class Fake(ConsensusModule):
        def __init__(self) -> None:
            self.started = False
            self.txs_submitted = 0

        def start(self, node_count: int, config: dict) -> None:
            self.started = True

        def submit_transactions(self, count: int, rate_tps: float) -> None:
            self.txs_submitted += count

        def get_metrics(self) -> dict:
            return {"started": self.started, "txs": self.txs_submitted}

        def stop(self) -> None:
            self.started = False

    fake = Fake()
    assert isinstance(fake, ConsensusModule)
    fake.start(3, {})
    fake.submit_transactions(10, 5.0)
    assert fake.get_metrics() == {"started": True, "txs": 10}
    fake.stop()
    assert fake.get_metrics()["started"] is False


def test_abstract_methods_set_is_exactly_the_contract():
    expected = {"start", "submit_transactions", "get_metrics", "stop"}
    assert ConsensusModule.__abstractmethods__ == expected


def test_stop_is_idempotent_by_contract():
    """The ABC docstring promises stop() is idempotent; verify a subclass
    can honor that without raising on a second call."""

    class Counter(ConsensusModule):
        def __init__(self) -> None:
            self.stop_calls = 0

        def start(self, node_count: int, config: dict) -> None: ...
        def submit_transactions(self, count: int, rate_tps: float) -> None: ...
        def get_metrics(self) -> dict:
            return {"stops": self.stop_calls}

        def stop(self) -> None:
            self.stop_calls += 1

    c = Counter()
    c.stop()
    c.stop()
    assert c.get_metrics()["stops"] == 2
