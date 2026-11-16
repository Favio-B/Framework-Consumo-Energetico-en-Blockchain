// Acceso tipado a site/data/results.json (generado por scripts/build_site_data.py).

export const ALGOS = ["pow", "pos", "pbft"];
export const LABEL = { pow: "PoW", pos: "PoS", pbft: "PBFT" };
export const COLOR = { pow: "#f59e0b", pos: "#10b981", pbft: "#38bdf8" };
export const OUTCOME_COLOR = { zero: "#fb7185", partial: "#fbbf24", full: "#34d399" };
export const BASELINE = { 3: "final_n3_baseline", 4: "final_n4_baseline" };

export async function loadData(url = "data/results.json") {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`No se pudo cargar ${url}: HTTP ${res.status}`);
  return new Dataset(await res.json());
}

export class Dataset {
  constructor(raw) {
    this.raw = raw;
    this.groups = raw.groups;
    this.runs = raw.runs;
  }

  group(experiment, algorithm) {
    return this.groups.find((g) => g.experiment === experiment && g.algorithm === algorithm);
  }

  baseline(nodes, algorithm) {
    return this.group(BASELINE[nodes], algorithm);
  }

  /** Grupos PoW del barrido de dificultad (16 bits = PoW del baseline de 3 nodos). */
  sweep() {
    return this.groups
      .filter((g) => g.algorithm === "pow" && g.nodes === 3 && g.difficulty_bits != null)
      .sort((a, b) => a.difficulty_bits - b.difficulty_bits);
  }

  baselineRuns() {
    return this.runs.filter((r) => Object.values(BASELINE).includes(r.experiment_name));
  }

  /** Razón de J/tx de PoW frente a otro algoritmo con n nodos. */
  ratio(nodes, other) {
    return this.baseline(nodes, "pow").j_per_tx.estimate / this.baseline(nodes, other).j_per_tx.estimate;
  }
}

export const fmt = {
  num: (v, d = 2) => (v == null || Number.isNaN(v) ? "—" : Number(v).toFixed(d)),
  p: (v) => {
    if (v == null) return "—";
    if (v >= 0.001) return v.toFixed(v >= 0.01 ? 3 : 4);
    const [m, e] = v.toExponential(2).split("e");
    return `${m}×10<sup>${Number(e)}</sup>`;
  },
};
