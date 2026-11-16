-- ============================================================================
-- SQLite schema for the blockchain consensus benchmarking framework.
-- One row per completed run in `runs`; per-container aggregates in
-- `resource_samples`. Per-request events stay on disk as raw_events.csv
-- under results/{run_id}/ — they would bloat the DB without helping the
-- aggregate analysis the paper relies on.
-- ============================================================================

CREATE TABLE IF NOT EXISTS runs (
    run_id              TEXT PRIMARY KEY,
    algorithm           TEXT NOT NULL,
    repetition          INTEGER NOT NULL,
    node_count          INTEGER NOT NULL,
    quorum              INTEGER NOT NULL,
    started_at          TEXT NOT NULL,            -- ISO-8601 UTC

    -- Experimental context (independent variables)
    experiment_name     TEXT,
    tdp_watts           REAL,
    tx_count            INTEGER,
    tx_rate_tps         REAL,
    latency_ms          INTEGER,
    bandwidth_kbps      INTEGER,
    packet_loss_pct     REAL,

    -- Dependent variables
    submitted           INTEGER,
    committed_by_quorum INTEGER,
    submit_window_s     REAL,
    throughput_tps      REAL,
    latency_ms_p50      REAL,
    latency_ms_p95      REAL,
    latency_ms_p99      REAL,
    latency_ms_mean     REAL,
    finality_ms_p50     REAL,
    finality_ms_p95     REAL,
    finality_ms_p99     REAL,
    finality_ms_mean    REAL,
    energy_joules       REAL,
    total_rx_bytes      INTEGER,
    total_tx_bytes      INTEGER,
    bytes_per_tx        REAL,

    -- Pointer back to raw artefacts (config.json, raw_events.csv, run.log)
    artefacts_dir       TEXT
);

CREATE TABLE IF NOT EXISTS resource_samples (
    run_id              TEXT NOT NULL,
    container_name      TEXT NOT NULL,
    cpu_percent_avg     REAL,
    cpu_percent_peak    REAL,
    memory_mb_avg       REAL,
    memory_mb_peak      REAL,
    rx_bytes            INTEGER,
    tx_bytes            INTEGER,
    sample_count        INTEGER,
    duration_s          REAL,
    PRIMARY KEY (run_id, container_name),
    FOREIGN KEY (run_id) REFERENCES runs(run_id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_runs_algorithm          ON runs(algorithm);
CREATE INDEX IF NOT EXISTS idx_runs_experiment_name    ON runs(experiment_name);
CREATE INDEX IF NOT EXISTS idx_runs_started_at         ON runs(started_at DESC);
CREATE INDEX IF NOT EXISTS idx_runs_algo_experiment    ON runs(algorithm, experiment_name);
