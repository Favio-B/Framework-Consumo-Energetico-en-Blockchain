"""PoS consensus — chain-based stake-weighted slot leader selection.

Exposed API: `POSModule` — concrete ConsensusModule for the orchestrator.
Inside the Docker container: `node.py` runs a single validator that wakes
at slot boundaries, proposes when chosen, and verifies signatures otherwise.
"""
