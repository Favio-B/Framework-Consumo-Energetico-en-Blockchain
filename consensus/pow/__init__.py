"""PoW consensus — minimal Bitcoin-style SHA-256 nonce search.

Exposed API: `POWModule` — concrete ConsensusModule for the orchestrator.
Inside the Docker container: `node.py` runs a single miner with mempool +
in-memory chain and competes with peers under a configurable difficulty.
"""
