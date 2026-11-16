"""Frozen, serial and resumable final campaign; no selection of successful runs."""
from __future__ import annotations
import argparse, copy, hashlib, importlib.metadata, json, os, platform, random, shutil, sqlite3, subprocess, sys, time
from datetime import datetime, timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
import docker
import psutil
import yaml
from orchestrator.scenario_runner import ScenarioRunner
from orchestrator.experiment_lock import experiment_lock
from storage.repository import SqliteRepository
BASE=ROOT/'results/final_campaign_20261014'
SEED=20261014

def source_files():
    names=['run_experiment.py','requirements.txt']
    for directory in ['consensus','monitoring','orchestrator','storage','analysis']:
        names += [str(p.relative_to(ROOT)).replace('\\','/') for p in (ROOT/directory).rglob('*') if p.is_file() and (p.suffix in ['.py','.sql'] or p.name=='Dockerfile') and p.name!='final_results.py']
    names += ['scripts/final_campaign.py']
    return sorted(names)
def fingerprints():
    return {name:hashlib.sha256((ROOT/name).read_bytes()).hexdigest() for name in source_files()}
def dump(path,data): path.write_text(json.dumps(data,indent=2,ensure_ascii=False),encoding='utf-8')
def prepare():
    BASE.mkdir(parents=True,exist_ok=True)
    if (BASE/'manifest.json').exists():
        manifest=json.loads((BASE/'manifest.json').read_text(encoding='utf-8'))
        if manifest['source_sha256']!=fingerprints(): raise RuntimeError('Frozen source changed; do not mix versions')
        return manifest
    client=docker.from_env(); info=client.info()
    if any(c.name.startswith('bcf-') for c in client.containers.list()): raise RuntimeError('Other framework containers running')
    images={}
    for algo in ['pow','pos','pbft']:
        print('BUILD',algo,flush=True)
        image,_=client.images.build(path=str(ROOT/'consensus'/algo),tag=f'bcf-{algo}:final-20261014',rm=True,pull=False)
        images[algo]=image.id
    for name,key in [('gaiaadm/pumba:latest','pumba'),('ghcr.io/alexei-led/pumba-alpine-nettools:latest','nettools')]:
        image=client.images.get(name)
        images[key]=image.attrs['RepoDigests'][0]
    base=yaml.safe_load((ROOT/'experiment_n4_v2.yaml').read_text(encoding='utf-8'))
    base['experiment'].update(repetitions=10,seed=SEED)
    base['runtime'].update(paper_instrumentation=True,settle_seconds=5,run_timeout_seconds=600)
    base['network'].update(tc_image=images['nettools'],pumba_image=images['pumba'])
    for algo in ['pow','pos','pbft']: base.setdefault(algo,{})['image']=images[algo]
    configs={}
    for nodes in [3,4]:
        cfg=copy.deepcopy(base); cfg['network']['nodes']=nodes; cfg['experiment']['name']=f'final_n{nodes}_baseline'; cfg['experiment']['algorithms']=['pow','pos','pbft']; configs[cfg['experiment']['name']]=cfg
    for diff in [14,18,20]:
        cfg=copy.deepcopy(base); cfg['network']['nodes']=3; cfg['pow']['difficulty_bits']=diff; cfg['experiment']['name']=f'final_pow_diff{diff}'; cfg['experiment']['algorithms']=['pow']; configs[cfg['experiment']['name']]=cfg
    for cfg in configs.values(): cfg['storage']={'results_dir':str(BASE),'sqlite_path':str(BASE/'experiments.db')}
    jobs=[]; rng=random.Random(SEED)
    for rep in range(10):
        block=[{'experiment':name,'algorithm':a,'repetition':rep} for name,cfg in configs.items() for a in cfg['experiment']['algorithms']]
        rng.shuffle(block); jobs.extend(block)
    # Preserve historical evidence independently, using SQLite's consistent backup API.
    old=ROOT/'results/experiments.db'
    with sqlite3.connect(old.resolve().as_uri()+'?mode=ro',uri=True) as src, sqlite3.connect(BASE/'historical_snapshot.sqlite') as dest: src.backup(dest)
    freeze=subprocess.check_output([sys.executable,'-m','pip','freeze'],text=True)
    (BASE/'requirements-audit.lock.txt').write_text(freeze,encoding='utf-8')
    packages={a:client.containers.run(images[a],entrypoint='python',command=['-m','pip','freeze'],remove=True).decode() for a in ['pow','pos','pbft']}
    source=fingerprints()
    for name in source:
        target=BASE/'source'/name; target.parent.mkdir(parents=True,exist_ok=True); shutil.copy2(ROOT/name,target)
    manifest={'created_UTC':datetime.now(timezone.utc).isoformat(),'local_date':'2026-10-14','seed':SEED,'source_sha256':source,'historical_db_sha256':hashlib.sha256(old.read_bytes()).hexdigest(),'images':images,'configs':configs,'jobs':jobs,'planned_runs':len(jobs),'host':{'platform':platform.platform(),'python':sys.version,'cpu_logical':os.cpu_count(),'cpu_physical':psutil.cpu_count(logical=False),'memory_bytes':psutil.virtual_memory().total,'docker':{k:info.get(k) for k in ['NCPU','MemTotal','KernelVersion','OperatingSystem','ServerVersion','CgroupVersion']}},'packages_host':{d.metadata['Name']:d.version for d in importlib.metadata.distributions()},'packages_images':packages,'other_active_containers':[{'name':c.name,'image':c.image.id} for c in client.containers.list()],'methodology':{'load':'100 requested tx at 50 TPS; not a saturation experiment','window':'submit duration plus 5 seconds; events censored at a recorded wall-clock cutoff','energy':'CPU proxy averaged over recorded sample durations, host logical CPU denominator; includes sampling readiness interval','network':'50 ms deterministic egress delay plus 10 Mbps; verified qdisc per node before observation','quorum':'2*floor((n-1)/3)+1 on all algorithms, n3=1 and n4=3; not security-equivalent','failures':'all 10 planned repetitions retained, no replacement or adaptive stopping','sweep_diff16':'reuse final_n3_baseline/PoW (same configuration) instead of duplicating observations','historical':'older datasets and incomplete n4_baseline_v2 remain frozen and are superseded, not completed by mixing dates','seeds':'job order and deterministic test signing keys; timestamps, scheduling and nonce-search trajectories remain nondeterministic'}}
    dump(BASE/'manifest.json',manifest)
    (BASE/'configs').mkdir(exist_ok=True)
    for name,cfg in configs.items(): (BASE/'configs'/f'{name}.yaml').write_text(yaml.safe_dump(cfg,sort_keys=False),encoding='utf-8')
    print('PREPARED',len(jobs),'runs',flush=True)
    return manifest

def execute(pilot=False):
    with experiment_lock():
        manifest=prepare(); client=docker.from_env()
        destination=BASE/'pilot' if pilot else BASE; destination.mkdir(exist_ok=True)
        repo=SqliteRepository(destination/'experiments.db'); runner=ScenarioRunner(results_dir=destination,repository=repo)
        rows=repo.list_runs(); existing={(r['experiment_name'],r['algorithm'],r['repetition']) for r in rows}
        if len(existing)!=len(rows): raise RuntimeError('Duplicate scenario identities in final dataset')
        jobs=[{'experiment':'final_n4_baseline','algorithm':a,'repetition':0} for a in ['pow','pos','pbft']] if pilot else manifest['jobs']
        if not pilot and not (BASE/'pilot_passed.json').exists(): raise RuntimeError('Pilot must pass before final runs')
        try:
            for job in jobs:
                name=job['experiment']; cfg=copy.deepcopy(manifest['configs'][name])
                if pilot: cfg['experiment']['name']='pilot_'+name
                identity=(cfg['experiment']['name'],job['algorithm'],job['repetition'])
                if identity in existing: continue
                if fingerprints()!=manifest['source_sha256']: raise RuntimeError('Frozen experimental source changed')
                if any(c.name.startswith('bcf-') for c in client.containers.list()): raise RuntimeError('Concurrent framework containers detected')
                cpu_before=psutil.cpu_percent(interval=.2)
                print('START',identity,'completed',len(existing),'/',len(jobs),flush=True)
                summary=runner.run_scenario(job['algorithm'],job['repetition'],cfg)
                samples=json.loads((destination/summary['run_id']/'resource_samples.json').read_text())
                if summary['submitted']!=100 or len(samples)!=4 if pilot else summary['submitted']!=100:
                    raise RuntimeError('Incomplete submissions or pilot resource evidence')
                if summary['energy_joules']<=0: raise RuntimeError('Invalid energy instrumentation')
                progress={'job':job,'run_id':summary['run_id'],'status':summary['completion_status'],'committed':summary['committed_by_quorum'],'submitted':summary['submitted'],'energy_J':summary['energy_joules'],'host_cpu_before':cpu_before,'finished_UTC':datetime.now(timezone.utc).isoformat()}
                with (destination/'progress.jsonl').open('a',encoding='utf-8') as f: f.write(json.dumps(progress)+'\n')
                existing.add(identity)
                dump(destination/'status.json',{'completed':len(existing),'planned':len(jobs),'last':progress})
                print('DONE',len(existing),'/',len(jobs),job['algorithm'],summary['committed_by_quorum'],'/100',summary['completion_status'],round(summary['energy_joules'],3),'J',flush=True)
            if len(repo.list_runs())!=len(jobs): raise RuntimeError('Campaign size mismatch')
            if pilot: dump(BASE/'pilot_passed.json',{'runs':3,'completed_UTC':datetime.now(timezone.utc).isoformat(),'note':'Pass refers to valid instrumentation and persistence; protocol dropouts remain outcomes.'})
            else:
                if hashlib.sha256((ROOT/'results/experiments.db').read_bytes()).hexdigest()!=manifest['historical_db_sha256']: raise RuntimeError('Historical DB unexpectedly changed')
                dump(BASE/'campaign_complete.json',{'completed_runs':len(jobs),'completed_UTC':datetime.now(timezone.utc).isoformat(),'source_unchanged':fingerprints()==manifest['source_sha256'],'historical_unchanged':True})
        finally: repo.close()

if __name__=='__main__':
    parser=argparse.ArgumentParser(); parser.add_argument('--prepare',action='store_true'); parser.add_argument('--pilot',action='store_true'); args=parser.parse_args()
    if args.prepare:
        with experiment_lock(): prepare()
    else: execute(pilot=args.pilot)
