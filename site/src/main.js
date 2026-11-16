// Punto de entrada del sitio: datos, escena 3D, animaciones, tablas y gráficos.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initHero } from "./hero.js";
import { initCharts, bindSegment } from "./charts.js";
import { ALGOS, COLOR, LABEL, fmt, loadData } from "./data.js";

gsap.registerPlugin(ScrollTrigger);
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced) document.documentElement.classList.add("js-motion");

initNav();
initRepoLinks();
initCopyButtons();
initHero(document.getElementById("hero-canvas"));
initMotion();

loadData()
  .then((ds) => {
    initCounters(ds);
    fillHardware(ds);
    fillPerfTable(ds);
    fillDifficultyCards(ds);
    fillStatsTables(ds);
    initCharts(ds);
    ScrollTrigger.refresh();
  })
  .catch((err) => {
    console.error(err);
    const main = document.getElementById("resultados");
    main?.insertAdjacentHTML("afterbegin",
      `<div class="card mb-6 border-rose-500/40 text-rose-200"><i class="bi bi-exclamation-triangle"></i> No se pudieron cargar los datos (${err.message}). Si abriste el archivo localmente, sirve la carpeta con <code class="code-inline">python -m http.server</code>.</div>`);
  });

// ---------------------------------------------------------------------------
function initNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("hidden") === false;
    btn.setAttribute("aria-expanded", String(open));
  });
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
    menu.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
  }));

  // Resalta la sección visible en la barra
  const links = [...document.querySelectorAll('.nav-link[href^="#"]')];
  document.querySelectorAll("main section[id]").forEach((section) => {
    ScrollTrigger.create({
      trigger: section, start: "top 45%", end: "bottom 45%",
      onToggle: ({ isActive }) => {
        if (!isActive) return;
        links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${section.id}`));
      },
    });
  });
}

function initRepoLinks() {
  const url = window.SITE_CONFIG?.repoUrl;
  document.querySelectorAll("[data-repo-link]").forEach((a) => { a.href = url; });
}

function initCopyButtons() {
  document.querySelectorAll("[data-copy]").forEach((btn) => btn.addEventListener("click", async () => {
    const text = document.querySelector(btn.dataset.copy).innerText;
    try {
      await navigator.clipboard.writeText(text);
      btn.innerHTML = '<i class="bi bi-check2"></i>';
    } catch {
      btn.innerHTML = '<i class="bi bi-x"></i>';
    }
    setTimeout(() => { btn.innerHTML = '<i class="bi bi-clipboard"></i>'; }, 1600);
  }));
}

function initMotion() {
  if (reduced) return;
  gsap.to(".hero-line", { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: "power3.out", startAt: { y: 28 }, delay: 0.15 });

  gsap.utils.toArray(".reveal").forEach((el) => {
    gsap.fromTo(el, { opacity: 0, y: 36 }, {
      opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });

  // Pila de capas: entra con rotación en 3D, una a una
  gsap.fromTo(".layer", { opacity: 0, rotateX: -55, y: 40, transformOrigin: "50% 0%" }, {
    opacity: 1, rotateX: 0, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.4)",
    scrollTrigger: { trigger: ".layer-stack", start: "top 80%", once: true },
  });

  // Parallax suave del contenido del hero al hacer scroll
  gsap.to("#inicio .max-w-7xl", {
    yPercent: -12, opacity: 0.2, ease: "none",
    scrollTrigger: { trigger: "#inicio", start: "top top", end: "bottom top", scrub: true },
  });
}

function initCounters(ds) {
  const ratios = [3, 4].flatMap((n) => ["pos", "pbft"].map((a) => ds.ratio(n, a)));
  const values = {
    runs: ds.raw.registered_runs,
    groups: new Set(ds.runs.map((r) => `${r.experiment_name}:${r.algorithm}`)).size,
    ratioMin: Math.round(Math.min(...ratios)),
    ratioMax: Math.round(Math.max(...ratios)),
    audit: ds.raw.audit_issues,
  };
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = values[el.dataset.count];
    if (reduced) { el.textContent = target; return; }
    const obj = { v: 0 };
    gsap.to(obj, { v: target, duration: 2, ease: "power2.out", delay: 0.6, onUpdate: () => { el.textContent = Math.round(obj.v); } });
  });
}

function fillHardware(ds) {
  const hw = ds.raw.hardware;
  const set = (k, v) => { const el = document.querySelector(`[data-hw="${k}"]`); if (el) el.textContent = v; };
  set("name", hw.Name.replace(/\(R\)|\(TM\)/g, "").replace(/\s+/g, " ").trim());
  set("logical", `${hw.NumberOfLogicalProcessors} (${hw.NumberOfCores} núcleos)`);
}

const outcome = (g) => `<span class="tag tag-zero">${g.zero}</span> <span class="tag tag-partial">${g.partial}</span> <span class="tag tag-full">${g.full}</span>`;
const algoCell = (a) => `<span class="legend-dot" style="background:${COLOR[a]}"></span><b class="text-white">${LABEL[a]}</b>`;
const jtxCell = (g) => {
  const j = g.j_per_tx;
  if (j.estimate == null) return "no definido";
  return `${fmt.num(j.estimate, 3)} <span class="text-slate-500">[${fmt.num(j.ci95[0], 3)}–${j.ci95[1] == null ? "n.a." : fmt.num(j.ci95[1], 3)}]</span>`;
};

function fillPerfTable(ds) {
  const rows = [3, 4].flatMap((n) => ALGOS.map((a) => ds.baseline(n, a)));
  document.querySelector("#table-perf tbody").innerHTML = rows.map((g) => {
    const tps = g.metrics.throughput_observation_tps;
    const lat = g.metrics.finality_ms_p50;
    const e = g.metrics.energy_joules;
    return `<tr>
      <td>${algoCell(g.algorithm)}</td><td>${g.nodes}</td><td>${outcome(g)}</td><td>${g.committed_total}</td>
      <td>${fmt.num(tps.mean)} <span class="text-slate-500">(${fmt.num(tps.sd)})</span></td>
      <td>${lat.mean == null ? "—" : `${fmt.num(lat.mean, lat.mean < 10 ? 1 : 0)} ms`} <span class="text-slate-500">(n=${lat.n})</span></td>
      <td>${fmt.num(e.mean)} ± ${fmt.num(e.sd)} J</td><td>${jtxCell(g)}</td></tr>`;
  }).join("");
}

function fillDifficultyCards(ds) {
  document.getElementById("difficulty-cards").innerHTML = ds.sweep().map((g) => `
    <div class="card !p-4">
      <div class="flex items-baseline justify-between">
        <p class="font-mono text-2xl font-bold text-pow">${g.difficulty_bits} <span class="text-sm text-slate-400">bits</span></p>
        <p class="text-sm">${outcome(g)}</p>
      </div>
      <div class="mt-2 grid grid-cols-2 gap-2 text-sm">
        <p><span class="text-slate-400">Tx conf.</span><br><b class="text-white">${g.committed_total}</b>/1000</p>
        <p><span class="text-slate-400">J/tx</span><br><b class="text-white">${g.j_per_tx.estimate == null ? "no definido" : fmt.num(g.j_per_tx.estimate, 3)}</b></p>
      </div>
    </div>`).join("");
}

const METRIC = { energy_joules: "Energía", throughput_observation_tps: "TPS", completion_fraction: "Completitud" };
const nodesOf = (exp) => (exp.includes("n3") ? 3 : 4);

function fillStatsTables(ds) {
  document.querySelector("#table-primary tbody").innerHTML = ds.raw.primary_tests.map((t) => `
    <tr><td>${nodesOf(t.experiment)}</td><td>${METRIC[t.metric]}</td><td>${fmt.num(t.statistic)}</td>
    <td>${fmt.p(t.p_holm)} ${t.reject_at_0_05 ? '<i class="bi bi-check-circle-fill text-pos" title="significativo"></i>' : ""}</td></tr>`).join("");

  const render = (metric) => {
    document.querySelector("#table-pairwise tbody").innerHTML = ds.raw.pairwise_tests
      .filter((t) => t.metric === metric)
      .map((t) => `<tr>
        <td>${nodesOf(t.experiment)}</td>
        <td>${algoCell(t.a)} <span class="text-slate-500">vs</span> ${algoCell(t.b)}</td>
        <td>${fmt.num(t.U, 0)}</td><td>${fmt.p(t.p_holm)}</td>
        <td class="text-white">${t.cliffs_delta_a_minus_b > 0 ? "+" : ""}${fmt.num(t.cliffs_delta_a_minus_b)}</td>
        <td>${t.reject_at_0_05 ? '<span class="tag tag-full">significativo</span>' : '<span class="tag tag-partial">no detectado</span>'}</td>
      </tr>`).join("");
  };
  render("energy_joules");
  bindSegment("[data-pair]", (btn) => render(btn.dataset.pair));
}
