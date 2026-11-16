"""Static checks for the deployment artefacts (docker-compose.yml + Dockerfile
+ env-var entry point). No Docker required — these tests guard against typos
and config drift, not against build failures.
"""
from __future__ import annotations

from pathlib import Path
from unittest.mock import MagicMock, patch

import yaml

from dashboard.app import _run_from_env

REPO_ROOT = Path(__file__).resolve().parent.parent


# --------------------------------------------------------------------------- #
# docker-compose.yml                                                          #
# --------------------------------------------------------------------------- #


def test_compose_yaml_parses_and_declares_dashboard_service():
    config = yaml.safe_load((REPO_ROOT / "docker-compose.yml").read_text(encoding="utf-8"))
    assert "services" in config
    services = config["services"]
    assert "dashboard" in services
    dashboard = services["dashboard"]
    assert dashboard["image"] == "bcf-dashboard:latest"
    assert dashboard["build"]["dockerfile"] == "Dockerfile.dashboard"
    # Env vars line up with what dashboard/app.py actually reads.
    env = dashboard["environment"]
    for key in (
        "BCF_DASHBOARD_HOST",
        "BCF_DASHBOARD_PORT",
        "BCF_DB_PATH",
        "BCF_DASHBOARD_RESULTS_DIR",
    ):
        assert key in env, f"compose is missing {key}"
    # Port 5000 is published.
    assert "5000:5000" in dashboard["ports"]


def test_compose_does_not_declare_consensus_services():
    """Consensus containers are launched dynamically by ScenarioRunner per run.
    They must NOT be in the compose file (would shadow the orchestrator)."""
    config = yaml.safe_load((REPO_ROOT / "docker-compose.yml").read_text(encoding="utf-8"))
    services = set(config["services"])
    for forbidden in ("pbft", "pow", "pos", "pumba"):
        assert forbidden not in services


def test_dockerfile_dashboard_exists_and_uses_python_3_13():
    text = (REPO_ROOT / "Dockerfile.dashboard").read_text(encoding="utf-8")
    assert "python:3.13" in text
    # The image must copy the three packages the dashboard depends on.
    for needed in ("storage/", "analysis/", "dashboard/"):
        assert needed in text, f"Dockerfile.dashboard missing COPY for {needed}"
    # And honour the same env-var contract as the host entry point.
    assert "BCF_DASHBOARD_HOST" in text
    assert "BCF_DB_PATH" in text


# --------------------------------------------------------------------------- #
# dashboard/app.py env-var entry point                                        #
# --------------------------------------------------------------------------- #


def test_run_from_env_uses_defaults_when_unset(monkeypatch):
    for key in ("BCF_DASHBOARD_HOST", "BCF_DASHBOARD_PORT",
                "BCF_DB_PATH", "BCF_DASHBOARD_RESULTS_DIR"):
        monkeypatch.delenv(key, raising=False)

    fake_app = MagicMock()
    with patch("dashboard.app.create_app", return_value=fake_app) as create_app:
        _run_from_env()

    create_app.assert_called_once_with(
        db_path="results/experiments.db",
        results_dir="results/dashboard_analysis",
    )
    _, kwargs = fake_app.run.call_args
    assert kwargs["host"] == "127.0.0.1"
    assert kwargs["port"] == 5000
    assert kwargs["debug"] is False
    assert kwargs["use_reloader"] is False


def test_run_from_env_honours_overrides(monkeypatch, tmp_path):
    monkeypatch.setenv("BCF_DASHBOARD_HOST", "0.0.0.0")
    monkeypatch.setenv("BCF_DASHBOARD_PORT", "8080")
    monkeypatch.setenv("BCF_DB_PATH", str(tmp_path / "custom.db"))
    monkeypatch.setenv("BCF_DASHBOARD_RESULTS_DIR", str(tmp_path / "viz"))

    fake_app = MagicMock()
    with patch("dashboard.app.create_app", return_value=fake_app) as create_app:
        _run_from_env()

    create_app.assert_called_once_with(
        db_path=str(tmp_path / "custom.db"),
        results_dir=str(tmp_path / "viz"),
    )
    _, kwargs = fake_app.run.call_args
    assert kwargs["host"] == "0.0.0.0"
    assert kwargs["port"] == 8080
