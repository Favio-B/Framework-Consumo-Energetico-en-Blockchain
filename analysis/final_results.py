"""Final results from the frozen campaign; all planned trials count."""
from __future__ import annotations
import collections, csv, hashlib, itertools, json, math, os, sqlite3, statistics, sys
from pathlib import Path
import numpy as np
from scipy import stats
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from orchestrator.scenario_runner import _assemble_summary
from analysis import analyse_experiment, DEFAULT_METRICS
from storage.repository import SqliteRepository
BASE=ROOT/'results/final_campaign_20261014'; OUT=BASE/'final_results'
B=10000; SEED=20261014

def clean(obj):
    if isinstance(obj,dict): return {k:clean(v) for k,v in obj.items()}
    if isinstance(obj,(list,tuple)): return [clean(v) for v in obj]
    if isinstance(obj,np.generic): obj=obj.item()
    if isinstance(obj,float) and not math.isfinite(obj): return None
    return obj

def dump(name,data): (OUT/name).write_text(json.dumps(clean(data),indent=2,ensure_ascii=False,allow_nan=False),encoding='utf-8')
def csvout(name,rows):
    if not rows: return
    with (OUT/name).open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=list(dict.fromkeys(k for r in rows for k in r))); w.writeheader(); w.writerows(clean(rows))
def fmt(v,places=3): return 'NA' if v is None or not math.isfinite(v) else f'{v:.{places}f}'
def descriptives(values,seed):
    a=np.array(values,dtype=float); n=len(a)
    if n==0: return {'n':0,'mean':None,'sd':None,'median':None,'min':None,'max':None,'ci95_low':None,'ci95_high':None}
    ci=[None,None]
    if n>=2:
        rng=np.random.default_rng(seed); means=a[rng.integers(n,size=(B,n))].mean(axis=1); ci=np.quantile(means,[.025,.975])
    return dict(n=n,mean=float(a.mean()),sd=float(a.std(ddof=1)) if n>1 else None,median=float(np.median(a)),min=float(a.min()),max=float(a.max()),ci95_low=ci[0],ci95_high=ci[1])
def wilson(k,n):
    z=1.95996398454; p=k/n; d=1+z*z/n; center=(p+z*z/(2*n))/d; half=z*math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d
    return [center-half,center+half]
def pooled(rr,seed):
    energy=np.array([r['energy_joules'] for r in rr]); commits=np.array([r['committed_by_quorum'] for r in rr]); total=int(commits.sum())
    if not total: return {'estimate':None,'ci95_low':None,'ci95_high':None,'zero_denominator_bootstrap_fraction':1.0}
    rng=np.random.default_rng(seed); ix=rng.integers(len(rr),size=(B,len(rr))); denominators=commits[ix].sum(axis=1)
    vals=np.divide(energy[ix].sum(axis=1),denominators,out=np.full(B,np.inf),where=denominators>0)
    low,high=np.quantile(vals,[.025,.975],method='inverted_cdf')
    return {'estimate':float(energy.sum()/total),'ci95_low':float(low),'ci95_high':float(high),'zero_denominator_bootstrap_fraction':float(np.mean(denominators==0)),'ci95_upper_unbounded':not np.isfinite(high)}
def holm(tests):
    ranked=sorted([t for t in tests if t.get('p_raw') is not None],key=lambda t:t['p_raw']); last=0; n=len(ranked)
    for i,t in enumerate(ranked):
        last=max(last,min(1,(n-i)*t['p_raw'])); t['p_holm']=last; t['reject_at_0_05']=last<.05

def main():
    if not (BASE/'campaign_complete.json').exists(): raise RuntimeError('Final campaign not complete')
    OUT.mkdir(exist_ok=True); (OUT/'figures').mkdir(exist_ok=True)
    manifest=json.loads((BASE/'manifest.json').read_text(encoding='utf-8'))
    conn=sqlite3.connect((BASE/'experiments.db').resolve().as_uri()+'?mode=ro',uri=True); conn.row_factory=sqlite3.Row
    stored=[dict(r) for r in conn.execute('SELECT * FROM runs ORDER BY experiment_name, algorithm, repetition')]
    resource_rows=[dict(r) for r in conn.execute('SELECT * FROM resource_samples')]
    resource_index={(r['run_id'],r['container_name']):r for r in resource_rows}
    integrity=conn.execute('PRAGMA integrity_check').fetchone()[0]; fk=[tuple(r) for r in conn.execute('PRAGMA foreign_key_check')]; conn.close()
    expected={(j['experiment'],j['algorithm'],j['repetition']) for j in manifest['jobs']}
    actual={(r['experiment_name'],r['algorithm'],r['repetition']) for r in stored}
    if len(stored)!=90 or actual!=expected or integrity!='ok' or fk: raise RuntimeError('Invalid final coverage or DB integrity')
    groups=collections.defaultdict(list); runs=[]; issues=[]; file_manifest=[]
    from monitoring.energy_estimator import EnergyEstimator
    for row in stored:
        rid=row['run_id']; directory=BASE/rid
        m=json.loads((directory/'metrics.json').read_text(encoding='utf-8')); cfg=json.loads((directory/'config.json').read_text(encoding='utf-8')); samples=json.loads((directory/'resource_samples.json').read_text(encoding='utf-8'))
        native=m['module_native']; provenance=m['provenance']; rr=m['resource_summary']
        recalc=_assemble_summary(algorithm=row['algorithm'],repetition=row['repetition'],run_id=rid,config=cfg,module_metrics=native,resource_summary=rr,submit_window=(provenance['observation_start_unix'],provenance['observation_end_unix']),started_at=row['started_at'],artefacts_dir=row['artefacts_dir'])
        for key in ['submitted','committed_by_quorum','energy_joules','throughput_tps']:
            if not math.isclose(row[key],recalc[key],rel_tol=1e-9,abs_tol=1e-7): issues.append([rid,'db_event_recompute',key])
        if len(samples)!=row['node_count']: issues.append([rid,'sample_node_count'])
        if any(image!=manifest['images'][row['algorithm']] for image in provenance['images'].values()): issues.append([rid,'runtime_image_mismatch'])
        for key,value in {'node_count':recalc['node_count'],'quorum':recalc['quorum'],'bytes_per_tx':recalc['bytes_per_tx']['total_per_tx'],'total_rx_bytes':recalc['network_totals']['total_rx_bytes'],'total_tx_bytes':recalc['network_totals']['total_tx_bytes']}.items():
            if not math.isclose(row[key],value,rel_tol=1e-9,abs_tol=1e-7): issues.append([rid,'db_json_scalar',key])
        for name,rs in rr.items():
            dbresource=resource_index.get((rid,name))
            if dbresource is None: issues.append([rid,'missing_resource_row',name]); continue
            for key,value in rs.items():
                if key in dbresource and not math.isclose(dbresource[key],value,rel_tol=1e-9,abs_tol=1e-7): issues.append([rid,'resource_sqlite_json',name,key])
        for name,events in samples.items():
            if len(events)<2: issues.append([rid,'resource_sample_count',name]); continue
            if not math.isclose(statistics.fmean(e['cpu_percent'] for e in events),rr[name]['cpu_percent_avg'],rel_tol=1e-9,abs_tol=1e-7): issues.append([rid,'resource_cpu',name])
            if not math.isclose(events[-1]['ts']-events[0]['ts'],rr[name]['duration_s'],abs_tol=1e-7): issues.append([rid,'resource_duration',name])
            if events[-1]['ts']>provenance['observation_end_unix']: issues.append([rid,'resource_after_cutoff',name])
        est=EnergyEstimator(m['tdp_watts'],num_cpus=provenance['num_cpus_energy'])
        energy=sum(est.joules(r['cpu_percent_avg'],r['duration_s']) for r in rr.values())
        if not math.isclose(energy,m['energy_joules'],rel_tol=1e-9): issues.append([rid,'energy_recompute'])
        if len(provenance['network_effective'])!=row['node_count']: issues.append([rid,'network_node_count'])
        for name,rules in provenance['network_effective'].items():
            opts=next(r['options'] for r in rules if r.get('kind')=='netem')
            if opts.get('delay',{}).get('delay')!=.05 or opts.get('delay',{}).get('jitter')!=0 or opts.get('rate',{}).get('rate')!=1250000: issues.append([rid,'effective_network',name])
        for metric in ['latency_ms','finality_ms']:
            for q in ['p50','p95','p99','mean']:
                if not math.isclose(row[metric+'_'+q],recalc[metric][q],rel_tol=1e-9,abs_tol=1e-7): issues.append([rid,'percentile_recompute',metric,q])
        with (directory/'raw_events.csv').open(encoding='utf-8',newline='') as f: raw=list(csv.DictReader(f))
        expected_commits=collections.Counter((req,int(n),float(t)) for req,events in native['commits_by_request'].items() if req in native['submits'] for n,t in events)
        raw_commits=collections.Counter((e['request_id'],int(e['node_id']),float(e['commit_ts'])) for e in raw if e['commit_ts'])
        if expected_commits!=raw_commits: issues.append([rid,'raw_csv_events'])
        if {e['request_id'] for e in raw}!=set(native['submits']): issues.append([rid,'raw_csv_submitted_coverage'])
        for e in raw:
            if e['request_id'] not in native['submits'] or float(e['submit_ts'])!=native['submits'].get(e['request_id']): issues.append([rid,'raw_csv_submit_time'])
        for req,events in native['commits_by_request'].items():
            if len({n for n,t in events})!=len(events): issues.append([rid,'duplicate_node_commit',req])
            if any(t>provenance['observation_end_unix'] for n,t in events): issues.append([rid,'event_after_cutoff',req])

        for f in directory.iterdir():
            if f.is_file(): file_manifest.append({'path':str(f.relative_to(ROOT)),'bytes':f.stat().st_size,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
        out={**row,'completion_fraction':m['completion_fraction'],'completion_status':m['completion_status'],'throughput_observation_tps':m['throughput_observation_tps'],'observation_seconds':provenance['observation_end_unix']-provenance['observation_start_unix'],'energy_num_cpus':provenance['num_cpus_energy'],'resource_sample_seconds_mean':statistics.fmean(r['duration_s'] for r in rr.values())}
        out.update(cpu_percent_sum_node_means=sum(v['cpu_percent_avg'] for v in rr.values()), cpu_percent_node_mean=statistics.fmean(v['cpu_percent_avg'] for v in rr.values()), cpu_percent_max_node_peak=max(v['cpu_percent_peak'] for v in rr.values()), memory_mb_sum_node_means=sum(v['memory_mb_avg'] for v in rr.values()), memory_mb_node_mean=statistics.fmean(v['memory_mb_avg'] for v in rr.values()), memory_mb_max_node_peak=max(v['memory_mb_peak'] for v in rr.values()))
        groups[(row['experiment_name'],row['algorithm'])].append(out); runs.append(out)
    # Every final group has exactly ten trials, irrespective of outcome.
    if any(len(v)!=10 for v in groups.values()): issues.append(['unequal_group_sizes'])
    for name,h in manifest['source_sha256'].items():
        if hashlib.sha256((ROOT/name).read_bytes()).hexdigest()!=h: issues.append(['source_changed',name])
    # The pre-campaign DB is not distributed with the repository; its frozen copy
    # (historical_snapshot.sqlite) is. Verify the original only when present.
    historical_db=ROOT/'results/experiments.db'
    historical_unchanged=(hashlib.sha256(historical_db.read_bytes()).hexdigest()==manifest['historical_db_sha256']) if historical_db.exists() else None
    if historical_unchanged is False: issues.append(['historical_db_changed'])
    checks={'registered_trials':len(runs),'expected_trials':90,'groups':len(groups),'sqlite_integrity':integrity,'foreign_key_violations':fk,'issues':issues,'historical_db_unchanged':historical_unchanged,'all_expected_identities_present':actual==expected}
    dump('validation.json',checks)
    if issues: raise RuntimeError(f'{len(issues)} evidence discrepancies; inspect validation.json')
    summaries=[]
    for idx,((name,algo),rr) in enumerate(sorted(groups.items())):
        nz=[r for r in rr if r['committed_by_quorum']>0]; zero=len(rr)-len(nz); full=sum(r['completion_status']=='full' for r in rr)
        s={'experiment':name,'algorithm':algo,'nodes':rr[0]['node_count'],'n':len(rr),'zero':zero,'partial':len(nz)-full,'full':full,'committed_total':sum(r['committed_by_quorum'] for r in rr),'submitted_total':sum(r['submitted'] for r in rr),'failure_rate':zero/len(rr),'failure_wilson95':wilson(zero,len(rr)),'energy_pooled_J_tx':pooled(rr,SEED+idx),'metrics':{}}
        s['network_total_bytes_all_trials']=sum(r['total_rx_bytes']+r['total_tx_bytes'] for r in rr)
        s['network_pooled_bytes_per_committed_tx']=s['network_total_bytes_all_trials']/s['committed_total'] if s['committed_total'] else None
        all_metrics=['energy_joules','throughput_observation_tps','completion_fraction','cpu_percent_sum_node_means','cpu_percent_node_mean','cpu_percent_max_node_peak','memory_mb_sum_node_means','memory_mb_node_mean','memory_mb_max_node_peak','total_rx_bytes','total_tx_bytes','observation_seconds','resource_sample_seconds_mean']
        conditional_metrics=['throughput_tps','latency_ms_p50','latency_ms_p95','latency_ms_p99','latency_ms_mean','finality_ms_p50','finality_ms_p95','finality_ms_p99','finality_ms_mean','bytes_per_tx']
        for metric in all_metrics+conditional_metrics:
            population=rr if metric in all_metrics else nz
            s['metrics'][metric]=descriptives([r[metric] for r in population],SEED+idx)
            s['metrics'][metric]['population']='all trials' if population is rr else 'nonzero progress, including partial'
        summaries.append(s)
    primary=[]; pairwise=[]
    for nodes in [3,4]:
        name=f'final_n{nodes}_baseline'
        for metric in ['energy_joules','throughput_observation_tps','completion_fraction']:
            gg={a:[r[metric] for r in groups[(name,a)]] for a in ['pow','pbft','pos']}
            try: result=stats.kruskal(*gg.values()); H=float(result.statistic); pv=float(result.pvalue)
            except ValueError: H=0.0; pv=1.0
            primary.append({'experiment':name,'metric':metric,'test':'Kruskal-Wallis','statistic':H,'p_raw':pv,'n_each':10,'population':'all planned trials','shapiro':{a:list(map(float,stats.shapiro(v))) if len(set(v))>1 else None for a,v in gg.items()}})
            for a,b in itertools.combinations(gg,2):
                result=stats.mannwhitneyu(gg[a],gg[b],alternative='two-sided',method='asymptotic')
                delta=sum((x>y)-(x<y) for x in gg[a] for y in gg[b])/100
                pairwise.append({'experiment':name,'metric':metric,'a':a,'b':b,'test':'Mann-Whitney U, two-sided asymptotic, tie correction','U':float(result.statistic),'p_raw':float(result.pvalue),'cliffs_delta_a_minus_b':delta})
    holm(primary); holm(pairwise)
    sweep={diff:groups[(f'final_pow_diff{diff}' if diff!=16 else 'final_n3_baseline','pow')] for diff in [14,16,18,20]}
    sweep_tests=[]
    for metric in ['energy_joules','throughput_observation_tps','completion_fraction']:
        vv=[[r[metric] for r in rr] for rr in sweep.values()]
        try: result=stats.kruskal(*vv); H=float(result.statistic); pv=float(result.pvalue)
        except ValueError: H=0.; pv=1.
        sweep_tests.append({'metric':metric,'test':'Kruskal-Wallis across 4 difficulty groups','statistic':H,'p_raw':pv,'n_each':10,'population':'all trials'})
    holm(sweep_tests)
    eligibility=[{'experiment':s['experiment'],'algorithm':s['algorithm'],'trials_all':s['n'],'conditional_latency_n':s['n']-s['zero'],'conditional_inference_min5_met':s['n']-s['zero']>=5} for s in summaries]
    dump('conditional_sample_eligibility.json',eligibility)
    dump('summary.json',summaries); dump('primary_statistics.json',primary); dump('pairwise_statistics.json',pairwise); dump('difficulty_statistics.json',sweep_tests)
    csvout('runs.csv',runs); csvout('container_resources.csv',resource_rows); csvout('evidence_sha256.csv',file_manifest)
    flat=[]
    for s in summaries:
        row={k:v for k,v in s.items() if k not in ['metrics','energy_pooled_J_tx','failure_wilson95']}
        row.update({'failure_ci95_low':s['failure_wilson95'][0],'failure_ci95_high':s['failure_wilson95'][1]})
        row.update({'pooled_J_tx_'+k:v for k,v in s['energy_pooled_J_tx'].items()})
        for metric,d in s['metrics'].items(): row.update({metric+'_'+k:v for k,v in d.items()})
        flat.append(row)
    csvout('summary.csv',flat); csvout('primary_statistics.csv',primary); csvout('pairwise_statistics.csv',pairwise)
    # Existing per-experiment pipeline is secondary: preserves the project's required normality -> ANOVA/Kruskal workflow.
    repo=SqliteRepository(BASE/'experiments.db')
    try:
        secondary=[]
        for name in sorted({r['experiment_name'] for r in runs}):
            out=analyse_experiment(repo,name,BASE/'analysis'/name)
            for label,result in out['results']:
                column=next(col for col,lbl,log in DEFAULT_METRICS if lbl==label)
                values=[[r[column] for r in runs if r['experiment_name']==name and r['algorithm']==a and r['committed_by_quorum']>0] for a in result.groups]
                levene_p=None
                if len(values)>=2 and all(len(v)>=2 for v in values):
                    lv=float(stats.levene(*values,center='median').pvalue)
                    if math.isfinite(lv): levene_p=lv
                n_ok=all(g.n>=5 for g in result.groups.values())
                variance_ok=result.test_used!='ANOVA' or (levene_p is not None and levene_p>=.05)
                secondary.append({'experiment':name,'metric':column,'test':result.test_used,'n_by_algorithm':{a:g.n for a,g in result.groups.items()},'minimum_5_per_group':n_ok,'levene_median_p':levene_p,'anova_variance_check_passed':variance_ok if result.test_used=='ANOVA' else None,'eligible_secondary_inference':n_ok and variance_ok and result.test_used!='skipped','note':'Conditional on nonzero progress; use primary all-trial analysis for main claims. Levene is a diagnostic, not proof of equal variances.'})
        dump('secondary_statistical_diagnostics.json',secondary)
    finally: repo.close()
    colors={'pow':'#dc8238','pbft':'#4274a9','pos':'#43865c'}
    bykey={(s['experiment'],s['algorithm']):s for s in summaries}
    fig,ax=plt.subplots(figsize=(7.5,4.5))
    for i,a in enumerate(['pow','pbft','pos']):
        ss=[bykey[(f'final_n{n}_baseline',a)]['metrics']['energy_joules'] for n in [3,4]]; yy=np.array([d['mean'] for d in ss]); lo=np.array([d['ci95_low'] for d in ss]); hi=np.array([d['ci95_high'] for d in ss]); xx=np.arange(2)+(i-1)*.24
        ax.bar(xx,yy,.23,label=a.upper(),color=colors[a],yerr=np.vstack([yy-lo,hi-yy]),capsize=3)
    ax.set(xticks=[0,1],xticklabels=['3 nodes','4 nodes'],ylabel='CPU energy proxy per trial (J)',yscale='log'); ax.legend(); ax.set_title('All 10 planned trials per group; bootstrap 95% CI'); fig.tight_layout()
    for ext in ['png','svg']: fig.savefig(OUT/'figures'/f'energy_all_trials.{ext}',dpi=200)
    plt.close(fig)
    fig,axes=plt.subplots(1,2,figsize=(9,4))
    for ax,metric,label in zip(axes,['latency_ms_p50','finality_ms_p95'],['First-node latency p50 (ms)','Quorum finality p95 (ms)']):
        for n in [3,4]:
            rr=groups[(f'final_n{n}_baseline','pbft')]; yy=[r[metric] for r in rr if r['committed_by_quorum']>0]
            if yy: ax.scatter([n]*len(yy),yy,alpha=.65,color=colors['pbft']); ax.plot(n,np.mean(yy),'k_',markersize=18)
        ax.set(xticks=[3,4],xlabel='Node count',ylabel=label)
    fig.suptitle('PBFT: per-trial percentiles; conditional on nonzero progress; n=3 has f=0'); fig.tight_layout()
    for ext in ['png','svg']: fig.savefig(OUT/'figures'/f'pbft_latency.{ext}',dpi=200)
    plt.close(fig)
    fig,axes=plt.subplots(1,2,figsize=(10,4)); diffs=[14,16,18,20]
    ests=[pooled(sweep[d],SEED+d)['estimate'] for d in diffs]
    for difficulty,estimate in zip(diffs,ests):
        if estimate is None: axes[0].annotate('No committed tx; J/tx undefined',xy=(difficulty,.5),xycoords=('data','axes fraction'),rotation=90,ha='center',va='center',fontsize=8)
    axes[0].plot(diffs,[v if v is not None else np.nan for v in ests],'o-',color=colors['pow']); axes[0].set(yscale='log',xlabel='Difficulty bits',ylabel='Total CPU proxy J / total committed tx')
    axes[1].plot(diffs,[sum(r['committed_by_quorum']==0 for r in sweep[d])/10 for d in diffs],'o-',label='Zero-progress trial rate')
    axes[1].plot(diffs,[sum(r['committed_by_quorum'] for r in sweep[d])/1000 for d in diffs],'s-',label='Transaction completion fraction')
    axes[1].set(xlabel='Difficulty bits',ylabel='Fraction',ylim=(-.05,1.05)); axes[1].legend(fontsize=8)
    for ax in axes: ax.set_xticks(diffs)
    fig.suptitle('PoW difficulty sweep: all trials count; fixed post-submit observation'); fig.tight_layout()
    for ext in ['png','svg']: fig.savefig(OUT/'figures'/f'pow_difficulty.{ext}',dpi=200)
    plt.close(fig)
    oldconn=sqlite3.connect((BASE/'historical_snapshot.sqlite').resolve().as_uri()+'?mode=ro',uri=True); oldconn.row_factory=sqlite3.Row
    oldrows=[dict(r) for r in oldconn.execute('SELECT * FROM runs')]; oldconn.close()
    historical_compare=[]
    for dataset in ['baseline_3nodes','n4_baseline','n4_baseline_v2','final_n3_baseline','final_n4_baseline']:
        source=runs if dataset.startswith('final_') else oldrows
        for algorithm in ['pow','pbft','pos']:
            selected=[r for r in source if r['experiment_name']==dataset and r['algorithm']==algorithm]
            n=len(selected); committed=sum(r['committed_by_quorum'] for r in selected); energy=sum(r['energy_joules'] for r in selected)
            historical_compare.append({'dataset':dataset,'algorithm':algorithm,'n':n,'zero':sum(r['committed_by_quorum']==0 for r in selected),'partial':sum(0<r['committed_by_quorum']<r['submitted'] for r in selected),'full':sum(r['committed_by_quorum']==r['submitted'] for r in selected),'committed_total':committed,'energy_mean_all_J':energy/n if n else None,'pooled_J_tx':energy/committed if committed else None,'network':'verified 50 ms, jitter0, 10 Mbps' if dataset.startswith('final_') else 'historical effective rules not recorded','causal_before_after':False})
    csvout('historical_comparison.csv',historical_compare)
    lines=['# Resultados finales de los experimentos','', '**Campana completa: 90/90 corridas planificadas, diez por grupo, sin reemplazar fallos.** Esta entrega consolida resultados; no es el paper.','', '## Protocolo y alcance','', '- Tres implementaciones Python concretas: PoW SHA-256, PoS por slots y PBFT simplificado. Comparacion n=3/n=4; barrido PoW 14/16/18/20 bits en n=3. La dificultad 16 reutiliza el grupo PoW del baseline n=3; no se cuenta dos veces en la base.','- Carga: 100 tx a 50 TPS solicitadas; bloques de 20 tx en PoW/PoS; confirmations=1; slots PoS=0.5 s; 2 CPU y 2 GiB por nodo. No es una medicion de capacidad maxima ni una prueba de ataques bizantinos.','- Red: 50 ms de retraso de salida, jitter=0 y limite de 10 Mbps simultaneos; reglas efectivas verificadas y guardadas por nodo. Pumba administra el qdisc; su imagen nettools permite componer y verificar una unica regla en el namespace del contenedor.','- Horizonte: duracion del envio mas 5 s; eventos posteriores al corte registrado quedan censurados. No se espera 600 s a que terminen las transacciones. Ese parametro fija la vida de las reglas de red.','- Energia primaria: promedio de uso de CPU por contenedor * duracion de sus muestras * 45 W / CPU logicas del host. Incluye el intervalo de preparacion del muestreo, anterior al envio. Es un proxy CPU; no energia fisica total ni calibrada con wattimetro. Se conservan todas las muestras y sus duraciones reales.','- Se fijaron imagenes por identificador/digest, snapshots por UUID, copia del codigo con SHA-256, versiones de dependencias, hardware y orden aleatorizado por bloques con seed=20261014. Las claves de prueba derivan del seed; los tiempos y el scheduling siguen siendo no deterministas.','- Servicios ajenos ya activos se registraron en manifest.json y no se detuvieron. Se registro CPU del host antes de cada corrida; no se garantiza aislamiento fisico ni ausencia total de carga externa.','', '## Resultados principales','', 'Cero = ninguna tx confirmada por quorum; parcial = alguna pero no todas; completa = todas. Energia y TPS de observacion incluyen TODAS las corridas. J/tx global incluye tambien energia de los fallos y usa las confirmaciones realmente observadas.','', '| Conjunto | Algoritmo | N | Cero/parcial/completa | Tx confirmadas/1000 | Energia J media +/- SD | TPS observacion media | J/tx global |','|---|---|---:|---|---:|---:|---:|---:|']
    for s in summaries:
        en=s['metrics']['energy_joules']; tp=s['metrics']['throughput_observation_tps']
        lines.append(f"| {s['experiment']} | {s['algorithm']} | {s['n']} | {s['zero']}/{s['partial']}/{s['full']} | {s['committed_total']} | {fmt(en['mean'])} +/- {fmt(en['sd'])} | {fmt(tp['mean'])} | {fmt(s['energy_pooled_J_tx']['estimate'],6)} |")
    lines += ['', 'summary.csv/summary.json incluyen intervalos bootstrap 95% (10000 remuestreos de corridas), medianas, rangos y poblaciones. Los intervalos de tasa de fallo usan Wilson. Para J/tx se remuestrean pares energia/confirmaciones por corrida: si aparecen denominadores cero se registra su fraccion; un limite superior no acotado se marca explicitamente y se guarda como null en JSON. No se ocultan esos remuestreos. Los intervalos cuantifican variacion entre corridas; no incluyen incertidumbre ni error sistematico del modelo energetico.','', '## Contrastes estadisticos','', 'Analisis primario robusto: Kruskal-Wallis sobre todas las corridas para energia, TPS de observacion y fraccion completada; Holm sobre los seis contrastes n=3/n=4. Comparaciones por pares: Mann-Whitney bilateral con correccion de empates, Holm sobre los 18 pares y delta de Cliff. El barrido usa tres contrastes globales adicionales con su propia correccion Holm. Las familias se separan por pregunta de investigacion y quedan explicitas. Los p-values no se redondean a cero.','', '| Escenario | Metrica | H | p crudo | p Holm | Diferencia a 0.05 |','|---|---|---:|---:|---:|---|']
    for t in primary:
        lines.append(f"| {t['experiment']} | {t['metric']} | {t['statistic']:.5g} | {t['p_raw']:.6g} | {t['p_holm']:.6g} | {'si' if t['reject_at_0_05'] else 'no detectada'} |")
    lines += ['', 'Los tests globales no prueban por si solos cada diferencia por pares. secondary_statistical_diagnostics.json identifica grupos con n insuficiente o varianzas incompatibles con ANOVA; esos contrastes secundarios no deben citarse como inferencia. Los contrastes son exploratorios de estos prototipos/host; no establecen causalidad ni equivalencia de seguridad. El pipeline tradicional del proyecto (Shapiro -> ANOVA/Kruskal) tambien se genero bajo ../analysis/, condicionado a progreso >0, como analisis secundario. No mezclar sus poblaciones con las primarias. conditional_sample_eligibility.json marca grupos con menos de cinco observaciones condicionales: sus latencias son solo descriptivas, y ningun contraste secundario de esos grupos debe citarse como inferencia del paper.','', '## Figuras exportables','', '![Energia de todas las corridas](figures/energy_all_trials.png)','', '![Latencia PBFT](figures/pbft_latency.png)','', '![Barrido de dificultad PoW](figures/pow_difficulty.png)','', 'Cada figura tambien esta disponible en SVG. El eje de energia es logaritmico. Los valores de latencia son medias/distribuciones de percentiles por corrida; no percentiles agrupados de todas las transacciones. Latencia usa el primer nodo y puede incluir tx que no alcanzaron quorum; finalidad usa solo las que alcanzaron quorum. Las peticiones sin esas confirmaciones no entran en esos percentiles.','', '## Cierre de pendientes y limites','', '- La campana incompleta n4_baseline_v2 queda archivada y sustituida para la entrega final por final_n4_baseline, con 10 corridas por algoritmo en una misma version. No se completaron los huecos mezclando ejecuciones separadas por meses.','- Se distingue confirmacion parcial de completa; fallo total y completitud se reportan junto a latencia. No se borraron ni reemplazaron fallos. Un lote completo no implica que el protocolo completo todas las transacciones.','- Se corrigieron los denominadores historicos del barrido: diff14=1000, diff16=794, diff18=207, diff20=3 tx confirmadas; J/tx global historico=0.566293, 0.693428, 2.705970 y 184.082256. Estas cifras pertenecen a la campana anterior, no a la tabla nueva.','- La inspeccion encontro que sidecars Pumba independientes pueden sobrescribir la regla raiz; en una reproduccion con la configuracion antigua quedaron delay=50 ms y jitter=10 ms sin rate. No se puede probar retrospectivamente la regla de cada corrida historica porque no se guardaba. Por ello no se atribuye a 10 Mbps verificados la evidencia antigua.','- La comparacion antes/despues de PoW es contextual: cambiaron fecha, entorno y aplicacion de red. No permite atribuir causalmente diferencias al arreglo de forks. El codigo conserva una proteccion local del prefijo confirmado; no implementa toda la finalidad probabilistica de Nakamoto ni recuperacion de particiones.','- PBFT n=3 tiene f=0 y quorum=1: su latencia no prueba tolerancia bizantina bajo red. El runner aplica quorum=2*floor((n-1)/3)+1 a todos los algoritmos; para n=4 es 3. Es una convencion de observacion, no equivalencia de seguridad entre protocolos.','- PBFT no implementa cambios de vista/checkpoints/batching; PoS no implementa slashing/finality gadget ni recuperacion robusta de bloques perdidos. Los fallos observados no deben generalizarse a todo PoS/PoW/PBFT.','- n=5/n=7, saturacion, ataques bizantinos, calibracion fisica y VPS no forman parte de la campana realizada; se delimitan como trabajo futuro, sin presentarlos como resultados existentes.','', '## Evidencia y reproducibilidad','', f'- Integridad SQLite: {integrity}; discrepancias de auditoria: {len(issues)}; datos historicos intactos: {historical_unchanged}.','- runs.csv: valores por UUID, parametros y poblacion; container_resources.csv: CPU/memoria/red por contenedor.','- summary.csv/json: agregados, incertidumbre y denominadores. primary_statistics.*, pairwise_statistics.* y difficulty_statistics.json: pruebas completas.','- validation.json y evidence_sha256.csv: verificaciones y hashes de todos los archivos de corrida.','- ../manifest.json, ../source/, ../configs/, ../requirements-audit.lock.txt: protocolo, imagenes, codigo y versiones congeladas. ../progress.jsonl y ../status.json: progreso de la ejecucion.','- ../<UUID>/: config.json, metrics.json, raw_events.csv, resource_samples.json y logs de cada nodo. ../historical_snapshot.sqlite conserva el estado previo a la campana.','', 'Para regenerar esta entrega desde el proyecto: `python analysis/final_results.py`. Para consultar la campana en CLI: `python run_experiment.py --db results/final_campaign_20261014/experiments.db list`.']
    progress=[json.loads(line) for line in (BASE/'progress.jsonl').read_text(encoding='utf-8').splitlines() if line.strip()]
    host_cpu=[r['host_cpu_before'] for r in progress]
    host_load={'n':len(host_cpu),'min':min(host_cpu),'median':statistics.median(host_cpu),'max':max(host_cpu),'note':'0.2 s sample before each trial; not a continuous host-load trace or evidence of isolation'}
    dump('host_load_summary.json',host_load)
    lines += ['', '## CPU, memoria, red y duraciones', '', 'summary.csv/json incluyen media/SD/mediana/rango/IC95 de CPU, memoria, RX/TX, duracion de observacion y muestras, ademas de p50/p95/p99/media de latencia y finalidad. Los recursos incluyen TODAS las corridas. CPU 100% equivale a un nucleo; la suma de promedios por nodo puede superar 100%. Memoria agregada es suma de promedios por nodo, no un pico simultaneo. Los picos exportados son maximos por nodo, sin afirmar simultaneidad. network_pooled_bytes_per_committed_tx usa trafico de todas las corridas / confirmaciones reales. RX+TX cuenta ambos sentidos y puede contabilizar el mismo paquete en dos extremos.', '', '| Conjunto | Algoritmo | CPU suma medias % | Memoria suma medias MiB | RX medio bytes | TX medio bytes | Observacion media s |', '|---|---|---:|---:|---:|---:|---:|']
    for summary in summaries:
        mm=summary['metrics']
        lines.append(f"| {summary['experiment']} | {summary['algorithm']} | {fmt(mm['cpu_percent_sum_node_means']['mean'])} | {fmt(mm['memory_mb_sum_node_means']['mean'])} | {fmt(mm['total_rx_bytes']['mean'],0)} | {fmt(mm['total_tx_bytes']['mean'],0)} | {fmt(mm['observation_seconds']['mean'])} |")
    lines += ['', f"CPU del host muestreada antes de cada intento: minimo {min(host_cpu):.1f}%, mediana {statistics.median(host_cpu):.1f}%, maximo {max(host_cpu):.1f}%. Son muestras breves de 0.2 s; no certifican aislamiento ni carga sostenida y no se usaron para excluir corridas.", '', 'El modelo de CPU esta en ../hardware_cpu.json y la asignacion de Docker/WSL2 en ../manifest.json. Las duraciones de los recursos corresponden a las primeras/ultimas muestras por nodo y pueden diferir de la ventana de eventos.']
    lines += ['', '## Comparacion contextual con los lotes anteriores', '', 'La tabla conserva todos los intentos de cada lote. Hay diferencias de fecha, entorno y aplicacion de red; no es un experimento controlado que aisle el efecto del arreglo de PoW.', '', '| Lote n=4 | Algoritmo | N | Cero/parcial/completa | Tx confirmadas | Energia media todos J | J/tx global |', '|---|---|---:|---|---:|---:|---:|']
    for row in historical_compare:
        if row['dataset'] not in ['n4_baseline','n4_baseline_v2','final_n4_baseline']: continue
        lines.append(f"| {row['dataset']} | {row['algorithm']} | {row['n']} | {row['zero']}/{row['partial']}/{row['full']} | {row['committed_total']} | {fmt(row['energy_mean_all_J'])} | {fmt(row['pooled_J_tx'],6)} |")
    lines += ['', 'historical_comparison.csv incluye tambien n=3. N=0 significa datos ausentes, no cero fallos. La campana final se considera completa por cobertura de sus 90 escenarios, con sus fallos y limitaciones visibles.']
    (OUT/'README.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print(json.dumps(checks,indent=2)); print('FINAL_RESULTS',OUT)
if __name__=='__main__': main()
