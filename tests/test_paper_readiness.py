"""Regression coverage for scientific-reporting and isolation failures."""
import json
from unittest.mock import MagicMock
import pytest
from analysis import compute_failure_summary
from orchestrator.experiment_lock import experiment_lock
from orchestrator.network_controller import NetworkController
from consensus.pos.module import gen_keypair

def test_experiment_lock_rejects_concurrent_writer_and_releases(tmp_path):
    path=tmp_path/'lock'
    with experiment_lock(path):
        with pytest.raises(RuntimeError,match='concurrent'):
            with experiment_lock(path): pass
    with experiment_lock(path): pass

def test_partial_completion_and_energy_of_dropouts_are_preserved():
    rows=[dict(algorithm='pow',submitted=100,committed_by_quorum=k,energy_joules=10) for k in [0,20,100]]
    s=compute_failure_summary(rows)['pow']
    assert (s['failed_runs'],s['partial_runs'],s['complete_runs'])==(1,1,1)
    assert s['pooled_joules_per_tx']==pytest.approx(30/120)

def test_reproducible_test_keys_use_seed_and_do_not_alias_nodes():
    assert gen_keypair('batch:node0')==gen_keypair('batch:node0')
    assert gen_keypair('batch:node0')!=gen_keypair('batch:node1')

def test_verified_network_uses_one_owner_and_combines_rules():
    client=MagicMock(); dm=MagicMock(client=client); target=MagicMock(); target.id='targetid'
    client.containers.get.return_value=target
    qdisc=json.dumps([{'kind':'netem','options':{'delay':{'delay':.05,'jitter':0},'rate':{'rate':1250000}}}]).encode()
    client.containers.run.return_value=qdisc
    nc=NetworkController(dm); nc._spawn_sidecar=MagicMock()
    result=nc.apply_verified(['target'],latency_ms=50,bandwidth_kbps=10000,tc_image='tools@sha256:abc')
    assert 'target' in result
    nc._spawn_sidecar.assert_called_once()
    calls=client.containers.run.call_args_list
    changes=[call for call in calls if 'change' in call.kwargs['command']]
    assert len(changes)==1
    cmd=changes[0].kwargs['command']
    assert '50ms' in cmd and '10000kbit' in cmd
    assert changes[0].kwargs['network_mode']=='container:targetid'

def test_verified_network_rejects_a_missing_bandwidth_limit():
    client=MagicMock(); dm=MagicMock(client=client)
    client.containers.get.return_value.id='targetid'
    client.containers.run.return_value=json.dumps([{'kind':'netem','options':{'delay':{'delay':.05}}}]).encode()
    nc=NetworkController(dm); nc._spawn_sidecar=MagicMock()
    with pytest.raises(RuntimeError,match='Rate verification failed'):
        nc.apply_verified(['target'],latency_ms=50,bandwidth_kbps=10000,tc_image='tools')
