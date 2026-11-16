"""Pytest rootdir marker.

The mere presence of this file tells pytest that `blockchain-framework/` is
the project root, so the top-level packages (`consensus`, `orchestrator`, ...)
are importable from every test without extra sys.path hacks.
"""
