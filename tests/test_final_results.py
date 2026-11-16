"""Scientific regression checks for the standalone final-results exporter."""
import math
import pytest
from analysis.final_results import pooled, holm, wilson, descriptives

def test_pooled_energy_counts_energy_from_failed_trials():
    result=pooled([{'energy_joules':10,'committed_by_quorum':0},{'energy_joules':10,'committed_by_quorum':2}],seed=1)
    assert result['estimate']==10
    assert result['zero_denominator_bootstrap_fraction']>0
    assert result['ci95_upper_unbounded'] is True
    assert math.isinf(result['ci95_high'])

def test_zero_confirmations_do_not_turn_into_zero_energy_per_tx():
    result=pooled([{'energy_joules':10,'committed_by_quorum':0}]*10,seed=1)
    assert result['estimate'] is None

def test_holm_adjustment_is_monotonic_and_never_below_raw():
    rows=[{'p_raw':p} for p in [.04,.001,.02]]
    holm(rows)
    assert sorted(r['p_holm'] for r in rows)==pytest.approx([.003,.04,.04])
    assert all(r['p_holm']>=r['p_raw'] for r in rows)

def test_zero_failures_in_ten_trials_does_not_imply_certainty():
    low,high=wilson(0,10)
    assert low==pytest.approx(0,abs=1e-12)
    assert .27<high<.29

def test_one_observation_does_not_have_zero_estimated_variability():
    result=descriptives([5],1)
    assert result['sd'] is None
    assert result['ci95_low'] is None
