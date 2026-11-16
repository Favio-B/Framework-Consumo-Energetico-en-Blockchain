// Gráficos ECharts (2D + echarts-gl). Usa el build UMD cargado en index.html
// (window.echarts). Cada gráfico se inicializa al entrar en pantalla.
import { ALGOS, BASELINE, COLOR, LABEL, OUTCOME_COLOR, fmt } from "./data.js";

const ec = () => window.echarts;
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const AXIS = {
  axisLine: { lineStyle: { color: "rgba(148,163,184,.35)" } },
  axisLabel: { color: "#94a3b8" },
  splitLine: { lineStyle: { color: "rgba(148,163,184,.12)" } },
  nameTextStyle: { color: "#94a3b8" },
};
const TOOLTIP = {
  backgroundColor: "rgba(2,6,23,.92)",
  borderColor: "rgba(255,255,255,.12)",
  textStyle: { color: "#e2e8f0", fontSize: 12 },
  extraCssText: "backdrop-filter: blur(6px); border-radius: 10px;",
};
const BASE = {
  backgroundColor: "transparent",
  textStyle: { fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" },
  animationDuration: 1100,
  animationEasing: "cubicOut",
};

const charts = new Map();

// En pantallas angostas la leyenda baja al pie y se amplían márgenes.
function responsive(option, el) {
  if (el.clientWidth >= 520 || !option.grid) return option;
  const grid = { ...option.grid, right: Math.max(option.grid.right ?? 0, 48) };
  if (option.legend) {
    option.legend = { ...option.legend, top: "auto", bottom: 0 };
    grid.bottom = (grid.bottom ?? 30) + 34;
    grid.top = Math.max((grid.top ?? 20) - 14, 30);
  }
  return { ...option, grid };
}

function mount(id, build) {
  const el = document.getElementById(id);
  if (!el) return;
  const io = new IntersectionObserver(([entry], obs) => {
    if (!entry.isIntersecting) return;
    obs.disconnect();
    const chart = ec().init(el, null, { renderer: "canvas" });
    chart.setOption({ ...BASE, animation: !reduced(), ...responsive(build(), el) });
    charts.set(id, { chart, build });
  }, { rootMargin: "120px" });
  io.observe(el);
}

/** Vuelve a construir un gráfico ya montado (p. ej. tras cambiar un filtro). */
function refresh(id) {
  const entry = charts.get(id);
  if (entry) entry.chart.setOption({ ...BASE, ...responsive(entry.build(), entry.chart.getDom()) }, { notMerge: true });
}

window.addEventListener("resize", () => charts.forEach(({ chart }) => chart.resize()));

// Barras de error verticales (también sobre eje logarítmico). value = [x, low, high, unbounded]
function errorBars(data, color = "#e2e8f0") {
  return {
    type: "custom",
    name: "IC 95 %",
    data,
    z: 10,
    tooltip: { show: false },
    renderItem(params, api) {
      if (Number.isNaN(api.value(1)) || Number.isNaN(api.value(2))) return null; // sin IC (0 confirmadas)
      const x = api.value(0);
      const lo = api.coord([x, api.value(1)]);
      const unbounded = api.value(3) === 1;
      const hi = unbounded ? [lo[0], params.coordSys.y] : api.coord([x, api.value(2)]);
      const w = 7;
      const style = { stroke: color, lineWidth: 1.5, lineDash: unbounded ? [4, 3] : null };
      const children = [
        { type: "line", shape: { x1: lo[0], y1: lo[1], x2: hi[0], y2: hi[1] }, style },
        { type: "line", shape: { x1: lo[0] - w, y1: lo[1], x2: lo[0] + w, y2: lo[1] }, style },
      ];
      children.push(unbounded
        ? { type: "polygon", shape: { points: [[hi[0] - 5, hi[1] + 8], [hi[0] + 5, hi[1] + 8], [hi[0], hi[1]]] }, style: { fill: color } }
        : { type: "line", shape: { x1: hi[0] - w, y1: hi[1], x2: hi[0] + w, y2: hi[1] }, style });
      return { type: "group", children };
    },
  };
}

// Barras sobre eje logarítmico: ECharts las ancla en 1, así que se dibujan a mano
// desde el mínimo del eje. items = [{x, value, color}]
function logBars(items, axisMin) {
  return {
    type: "custom",
    data: items.map((it) => ({ value: [it.x, it.value], color: it.color })),
    encode: { x: 0, y: 1 },
    renderItem(params, api) {
      const item = items[params.dataIndex];
      const top = api.coord([item.x, item.value]);
      const base = api.coord([item.x, axisMin]);
      const w = api.size([1, 0])[0] * 0.46;
      const g = ec().graphic;
      return {
        type: "group",
        children: [
          {
            type: "rect",
            shape: { x: top[0] - w / 2, y: top[1], width: w, height: base[1] - top[1], r: [8, 8, 0, 0] },
            style: { fill: new g.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: item.color }, { offset: 1, color: `${item.color}22` }]) },
            emphasis: { style: { shadowBlur: 24, shadowColor: item.color } },
          },
          {
            type: "text",
            x: top[0] + w / 2 + 8, y: top[1] - 7,
            style: { text: fmt.num(item.value, 3), fill: "#fff", font: "600 13px Inter, sans-serif", align: "left" },
          },
        ],
      };
    },
  };
}

export function initCharts(ds) {
  // ---------- J/tx por algoritmo (log) con IC 95 % ----------
  const state = { jtxNodes: 3, res: "cpu" };
  const jtxNote = document.getElementById("jtx-note");

  const buildJtx = () => {
    const n = state.jtxNodes;
    const gs = ALGOS.map((a) => ds.baseline(n, a));
    const pow = gs[0];
    jtxNote.textContent = pow.j_per_tx.upper_unbounded
      ? `PoW con ${n} nodos: solo ${pow.committed_total} tx confirmadas en 10 ejecuciones; el IC no tiene límite superior acotado (flecha).`
      : `Basado en ${gs.map((g) => `${LABEL[g.algorithm]} ${g.committed_total}`).join(", ")} tx confirmadas de 1000 por grupo.`;
    return {
      grid: { left: 64, right: 24, top: 24, bottom: 40 },
      tooltip: {
        ...TOOLTIP, trigger: "item",
        formatter: (p) => {
          const g = gs[p.dataIndex];
          const [lo, hi] = g.j_per_tx.ci95;
          return `<b>${LABEL[g.algorithm]} · ${n} nodos</b><br>J/tx: <b>${fmt.num(g.j_per_tx.estimate, 3)}</b><br>IC 95 %: ${fmt.num(lo, 3)} – ${hi == null ? "no acotado" : fmt.num(hi, 3)}<br>Tx confirmadas: ${g.committed_total}/1000`;
        },
      },
      xAxis: { type: "category", data: gs.map((g) => LABEL[g.algorithm]), ...AXIS, axisLabel: { color: "#e2e8f0", fontSize: 13, fontWeight: 600 } },
      yAxis: { type: "log", name: "J / tx confirmada", min: 0.01, max: 100, ...AXIS },
      series: [
        logBars(gs.map((g, i) => ({ x: i, value: g.j_per_tx.estimate, color: COLOR[g.algorithm] })), 0.01),
        errorBars(gs.map((g, i) => [i, g.j_per_tx.ci95[0], g.j_per_tx.ci95[1] ?? 100, g.j_per_tx.upper_unbounded ? 1 : 0])),
      ],
    };
  };
  mount("chart-jtx", buildJtx);

  const setRatios = () => {
    document.getElementById("ratio-pos").textContent = Math.round(ds.ratio(state.jtxNodes, "pos"));
    document.getElementById("ratio-pbft").textContent = Math.round(ds.ratio(state.jtxNodes, "pbft"));
  };
  setRatios();
  bindSegment("[data-jtx-nodes]", (btn) => {
    state.jtxNodes = Number(btn.dataset.jtxNodes);
    setRatios();
    refresh("chart-jtx");
  });

  // ---------- Barras 3D: energía media por ejecución ----------
  mount("chart-3d", () => {
    const nodes = [3, 4];
    const max = Math.max(...ALGOS.flatMap((a) => nodes.map((n) => ds.baseline(n, a).metrics.energy_joules.mean)));
    return {
      tooltip: {
        ...TOOLTIP,
        formatter: (p) => {
          const g = ds.baseline(nodes[p.value[1]], ALGOS[p.value[0]]);
          const e = g.metrics.energy_joules;
          return `<b>${LABEL[g.algorithm]} · ${g.nodes} nodos</b><br>Energía media: <b>${fmt.num(e.mean)} J</b> ± ${fmt.num(e.sd)}`;
        },
      },
      xAxis3D: { type: "category", data: ALGOS.map((a) => LABEL[a]), name: "", axisLabel: { color: "#e2e8f0", fontSize: 13 } },
      yAxis3D: { type: "category", data: nodes.map((n) => `${n} nodos`), name: "", axisLabel: { color: "#94a3b8" } },
      zAxis3D: { type: "value", name: "J", max: Math.ceil(max / 10) * 10, axisLabel: { color: "#94a3b8" }, nameTextStyle: { color: "#94a3b8" } },
      grid3D: {
        boxWidth: 120, boxDepth: 70, boxHeight: 80,
        axisLine: { lineStyle: { color: "rgba(148,163,184,.4)" } },
        splitLine: { lineStyle: { color: "rgba(148,163,184,.12)" } },
        axisPointer: { lineStyle: { color: "#38bdf8" } },
        environment: "none",
        light: { main: { intensity: 1.3, shadow: true, alpha: 40, beta: 30 }, ambient: { intensity: 0.35 } },
        viewControl: { autoRotate: !reduced(), autoRotateSpeed: 6, distance: 210, alpha: 22, beta: 35, damping: 0.85 },
        temporalSuperSampling: { enable: true },
      },
      series: [{
        type: "bar3D", shading: "realistic", bevelSize: 0.35, bevelSmoothness: 4, barSize: 16,
        realisticMaterial: { roughness: 0.4, metalness: 0.1 },
        label: { show: true, distance: 2, formatter: (p) => fmt.num(p.value[2], 1), textStyle: { color: "#fff", fontSize: 12, backgroundColor: "transparent" } },
        data: ALGOS.flatMap((a, i) => nodes.map((n, j) => ({
          value: [i, j, ds.baseline(n, a).metrics.energy_joules.mean],
          itemStyle: { color: COLOR[a] },
        }))),
        animationDurationUpdate: 1200,
      }],
    };
  });

  // ---------- Resultado de cada ejecución (0 / P / C) ----------
  mount("chart-outcomes", () => {
    const rows = [3, 4].flatMap((n) => ALGOS.map((a) => ds.baseline(n, a)));
    const cats = rows.map((g) => `${LABEL[g.algorithm]} · ${g.nodes}n`);
    const s = (key, name) => ({
      name, type: "bar", stack: "t", barWidth: 22,
      itemStyle: { color: OUTCOME_COLOR[key], borderRadius: 3 },
      label: { show: true, color: "#020617", fontWeight: 700, formatter: (p) => (p.value ? p.value : "") },
      emphasis: { focus: "series" },
      data: rows.map((g) => g[key]),
    });
    return {
      legend: { top: 0, textStyle: { color: "#cbd5e1" }, itemWidth: 12, itemHeight: 12 },
      grid: { left: 82, right: 20, top: 40, bottom: 30 },
      tooltip: {
        ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" },
        formatter: (ps) => {
          const g = rows[ps[0].dataIndex];
          return `<b>${LABEL[g.algorithm]} · ${g.nodes} nodos</b><br>${ps.map((p) => `${p.marker}${p.seriesName}: ${p.value}`).join("<br>")}<br>Tx confirmadas: ${g.committed_total}/1000`;
        },
      },
      xAxis: { type: "value", max: 10, interval: 2, name: "ejecuciones", nameLocation: "middle", nameGap: 24, ...AXIS },
      yAxis: { type: "category", data: cats, inverse: true, ...AXIS, axisLabel: { color: "#e2e8f0" } },
      series: [s("zero", "Cero"), s("partial", "Parcial"), s("full", "Completa")],
    };
  });

  // ---------- Dispersión de las 60 ejecuciones base ----------
  mount("chart-scatter", () => {
    const runs = ds.baselineRuns();
    return {
      grid: { left: 64, right: 24, top: 20, bottom: 52 },
      tooltip: {
        ...TOOLTIP, trigger: "item",
        formatter: (p) => {
          const r = p.data.run;
          return `<b>${LABEL[r.algorithm]} · ${r.node_count} nodos · rep ${r.repetition}</b><br>Energía: ${fmt.num(r.energy_joules)} J<br>TPS: ${fmt.num(r.throughput_observation_tps)}<br>Confirmadas: ${r.committed_by_quorum}/${r.submitted} (${r.completion_status})<br><span style="color:#64748b">${r.run_id.slice(0, 12)}…</span>`;
        },
      },
      xAxis: { type: "value", name: "Throughput observado (TPS)", nameLocation: "middle", nameGap: 32, min: 0, max: 15, ...AXIS },
      yAxis: { type: "log", name: "Energía por ejecución (J)", min: 1, max: 100, ...AXIS },
      series: ALGOS.flatMap((a) => [3, 4].map((n) => ({
        name: `${LABEL[a]} ${n}`, type: "scatter",
        symbol: n === 3 ? "circle" : "diamond", symbolSize: n === 3 ? 13 : 15,
        itemStyle: { color: COLOR[a], opacity: 0.85, borderColor: "#020617", borderWidth: 1 },
        emphasis: { scale: 1.5 },
        data: runs.filter((r) => r.algorithm === a && r.node_count === n)
          .map((r) => ({ value: [r.throughput_observation_tps, r.energy_joules], run: r })),
      }))),
    };
  });

  // ---------- Recursos ----------
  const RES = {
    cpu: { key: "cpu_percent_sum_node_means", name: "% CPU (100 = 1 núcleo)", f: (v) => v, d: 1 },
    mem: { key: "memory_mb_sum_node_means", name: "Memoria (MiB)", f: (v) => v, d: 1 },
    rx: { key: "total_rx_bytes", name: "Red recibida (MB)", f: (v) => v / 1e6, d: 2 },
  };
  mount("chart-resources", () => {
    const r = RES[state.res];
    return {
      legend: { top: 0, textStyle: { color: "#cbd5e1" } },
      grid: { left: 60, right: 16, top: 40, bottom: 30 },
      tooltip: { ...TOOLTIP, trigger: "axis", axisPointer: { type: "shadow" }, valueFormatter: (v) => fmt.num(v, r.d) },
      xAxis: { type: "category", data: ALGOS.map((a) => LABEL[a]), ...AXIS, axisLabel: { color: "#e2e8f0", fontWeight: 600 } },
      yAxis: { type: "value", name: r.name, ...AXIS, nameTextStyle: { color: "#94a3b8", align: "left" } },
      series: [3, 4].map((n) => ({
        name: `${n} nodos`, type: "bar", barGap: "12%",
        data: ALGOS.map((a) => ({
          value: r.f(ds.baseline(n, a).metrics[r.key].mean),
          itemStyle: { color: COLOR[a], opacity: n === 3 ? 0.55 : 1, borderRadius: [6, 6, 0, 0] },
        })),
        itemStyle: { color: n === 3 ? "rgba(226,232,240,.55)" : "#e2e8f0" },
        label: { show: true, position: "top", color: "#cbd5e1", fontSize: 11, formatter: (p) => fmt.num(p.value, r.d) },
      })),
    };
  });
  bindSegment("[data-res]", (btn) => { state.res = btn.dataset.res; refresh("chart-resources"); });

  // ---------- Escalabilidad 3 -> 4 nodos ----------
  mount("chart-scale", () => ({
    legend: { top: 0, textStyle: { color: "#cbd5e1" } },
    grid: { left: 52, right: 110, top: 40, bottom: 30 },
    tooltip: {
      ...TOOLTIP, trigger: "item",
      formatter: (p) => {
        const g = ds.baseline(p.dataIndex === 0 ? 3 : 4, p.seriesId);
        return `<b>${LABEL[g.algorithm]} · ${g.nodes} nodos</b><br>TPS media: ${fmt.num(g.metrics.throughput_observation_tps.mean)}<br>Ejecuciones sin progreso: ${g.zero}/10`;
      },
    },
    xAxis: { type: "category", data: ["3 nodos", "4 nodos"], boundaryGap: false, ...AXIS, axisLabel: { color: "#e2e8f0" } },
    yAxis: { type: "value", name: "TPS observado", min: 0, max: 15, ...AXIS },
    series: ALGOS.map((a) => {
      const [g3, g4] = [ds.baseline(3, a), ds.baseline(4, a)];
      const t3 = g3.metrics.throughput_observation_tps.mean;
      const t4 = g4.metrics.throughput_observation_tps.mean;
      const pct = ((t4 - t3) / t3) * 100;
      return {
        id: a, name: LABEL[a], type: "line", symbolSize: 14, lineStyle: { width: 3, color: COLOR[a] },
        itemStyle: { color: COLOR[a] },
        data: [t3, t4],
        endLabel: {
          show: true, color: COLOR[a], fontWeight: 600, offset: [4, { pbft: -9, pos: 9, pow: 0 }[a]],
          formatter: () => `${LABEL[a]} ${Math.abs(pct) < 0.5 ? "≈ 0 %" : `${pct > 0 ? "+" : "−"}${Math.abs(pct).toFixed(1)} %`}`,
        },
      };
    }),
  }));

  // ---------- Barrido de dificultad PoW ----------
  mount("chart-difficulty", () => {
    const sw = ds.sweep();
    const bits = sw.map((g) => g.difficulty_bits);
    return {
      legend: { top: 0, textStyle: { color: "#cbd5e1" }, data: ["J/tx", "Tx completadas", "Ejecuciones sin progreso"] },
      grid: { left: 64, right: 64, top: 44, bottom: 44 },
      tooltip: {
        ...TOOLTIP, trigger: "axis",
        formatter: (ps) => {
          const g = sw[ps[0].dataIndex];
          const j = g.j_per_tx;
          return `<b>${g.difficulty_bits} bits</b><br>J/tx: ${j.estimate == null ? "no definido (0 confirmadas)" : `${fmt.num(j.estimate, 3)} [${fmt.num(j.ci95[0], 3)}–${fmt.num(j.ci95[1], 3)}]`}<br>Tx confirmadas: ${g.committed_total}/1000<br>Sin progreso: ${g.zero}/10<br>Energía/ejec.: ${fmt.num(g.metrics.energy_joules.mean, 1)} J`;
        },
      },
      xAxis: { type: "category", data: bits.map((b) => `${b} bits`), ...AXIS, axisLabel: { color: "#e2e8f0" } },
      yAxis: [
        { type: "log", name: "J / tx", min: 0.1, max: 100, ...AXIS },
        { type: "value", name: "fracción", min: 0, max: 1, ...AXIS, splitLine: { show: false } },
      ],
      series: [
        {
          name: "J/tx", type: "line", yAxisIndex: 0, symbolSize: 14, connectNulls: false,
          lineStyle: { width: 3, color: COLOR.pow }, itemStyle: { color: COLOR.pow },
          areaStyle: { color: new (ec().graphic.LinearGradient)(0, 0, 0, 1, [{ offset: 0, color: "rgba(245,158,11,.35)" }, { offset: 1, color: "rgba(245,158,11,0)" }]) },
          data: sw.map((g) => g.j_per_tx.estimate),
          markPoint: {
            symbol: "pin", symbolSize: 54, itemStyle: { color: "#fb7185" },
            label: { color: "#020617", fontWeight: 700, formatter: "0 tx" },
            data: sw.filter((g) => g.j_per_tx.estimate == null).map((g) => ({ coord: [`${g.difficulty_bits} bits`, 12] })),
          },
        },
        errorBars(sw.map((g, i) => (g.j_per_tx.estimate == null ? [i, null, null, 0] : [i, g.j_per_tx.ci95[0], g.j_per_tx.ci95[1], 0])), "#fde68a"),
        {
          name: "Tx completadas", type: "bar", yAxisIndex: 1, barWidth: 18,
          itemStyle: { color: "rgba(52,211,153,.35)", borderColor: "rgba(52,211,153,.8)", borderWidth: 1, borderRadius: [4, 4, 0, 0] },
          data: sw.map((g) => g.committed_total / g.submitted_total),
        },
        {
          name: "Ejecuciones sin progreso", type: "line", yAxisIndex: 1, symbol: "rect", symbolSize: 10,
          lineStyle: { type: "dashed", color: "#fb7185" }, itemStyle: { color: "#fb7185" },
          data: sw.map((g) => g.zero / g.n),
        },
      ],
    };
  });
}

function bindSegment(selector, onChange) {
  const buttons = [...document.querySelectorAll(selector)];
  buttons.forEach((btn) => btn.addEventListener("click", () => {
    buttons.forEach((b) => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
    onChange(btn);
  }));
}

export { bindSegment, BASELINE };
