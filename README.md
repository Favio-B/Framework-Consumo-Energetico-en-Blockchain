# Framework experimental de consenso blockchain

[![CI](https://github.com/Favio-B/Framework-Consumo-Energetico-en-Blockchain/actions/workflows/ci.yml/badge.svg)](https://github.com/Favio-B/Framework-Consumo-Energetico-en-Blockchain/actions/workflows/ci.yml)
[![Pages](https://github.com/Favio-B/Framework-Consumo-Energetico-en-Blockchain/actions/workflows/pages.yml/badge.svg)](https://favio-b.github.io/Framework-Consumo-Energetico-en-Blockchain/)
![Python](https://img.shields.io/badge/python-3.13-3776AB?logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/docker-required-2496ED?logo=docker&logoColor=white)

Framework reproducible para **medir y comparar el consumo energético estimado y el desempeño** de
**Proof of Work**, **Proof of Stake** y **PBFT** bajo las mismas condiciones de red, carga y recursos.
Cada nodo corre en un contenedor Docker, la red se emula con Pumba (tc/netem) y la energía se estima
con un modelo proxy basado en CPU y TDP.

**Resultados interactivos:** https://favio-b.github.io/Framework-Consumo-Energetico-en-Blockchain/

> Proyecto de investigación — Ingeniería de Sistemas, Universidad Libre (Bogotá), presentado en COI 2026-2.

## Resultados principales

Campaña final del 14 de octubre de 2026: **90 ejecuciones** (9 grupos × 10), orden aleatorizado con
semilla `20261014`, ninguna ejecución descartada ni reemplazada. J/tx = energía de **todas** las
ejecuciones del grupo (incluidas las fallidas) / transacciones confirmadas por quórum.

| Nodos | Algoritmo | Ejec. 0/P/C | Tx confirmadas | Energía/ejec. (J) | J/tx [IC 95 %] |
|---:|---|:---:|---:|---:|---:|
| 3 | PoW  | 2/7/1  | 342  | 46.48 ± 1.18 | 1.359 [0.863–2.741] |
| 3 | PBFT | 0/0/10 | 1000 | 4.92 ± 0.12  | 0.049 [0.049–0.050] |
| 3 | PoS  | 1/0/9  | 900  | 2.08 ± 0.18  | 0.023 [0.020–0.029] |
| 4 | PoW  | 8/2/0  | 23   | 64.35 ± 2.32 | 27.98 [9.80–n.a.] |
| 4 | PBFT | 0/10/0 | 928  | 9.13 ± 0.97  | 0.098 [0.092–0.105] |
| 4 | PoS  | 1/0/9  | 900  | 3.66 ± 0.27  | 0.041 [0.036–0.052] |

- PoW gastó entre **28× y 688×** más energía por transacción confirmada que PBFT y PoS.
- Energía por ejecución: Kruskal-Wallis H = 25.81, p<sub>Holm</sub> = 1.49×10⁻⁵ (3 y 4 nodos); todos los
  pares significativos (Mann-Whitney + Holm, p = 0.0029, δ de Cliff = 1.0).
- Barrido PoW (3 nodos): 14 bits → 0.474 J/tx; 18 bits → 3.685 J/tx; 20 bits → 0 transacciones confirmadas.

Tablas completas, pruebas estadísticas y figuras: [`results/final_campaign_20261014/final_results/`](results/final_campaign_20261014/final_results/).

## Arquitectura

```
Capa 0  Entrada         CLI (Click) · dashboard Flask · experiment.yaml
Capa 1  Orquestador     ScenarioRunner · DockerManager · NetworkController (Pumba | tc)
Capa 2  Consenso        PoW (SHA-256) · PoS (ranuras, Ed25519) · PBFT (Castro & Liskov)
Capa 3  Monitoreo       EnergyEstimator · ResourceMonitor · TxTracker · NetMonitor
Capa 4  Almacenamiento  SQLite · CSV crudo · snapshot JSON por UUID · logs
Capa 5  Análisis        Shapiro-Wilk → Kruskal-Wallis · Mann-Whitney + Holm · bootstrap
```

Todos los algoritmos implementan la interfaz común `consensus.base.ConsensusModule`
(`start`, `submit_transactions`, `get_metrics`, `stop`).

Modelo energético (proxy, no medición física):

```
E = Σ_i (cpu_i% / (100 · N_cpu)) · TDP · t
```

## Estructura

```
├── consensus/          # PoW, PoS, PBFT: Dockerfile + nodo + módulo
├── orchestrator/       # ejecución de escenarios, Docker, red emulada, bloqueo
├── monitoring/         # energía, recursos, transacciones, red
├── storage/            # esquema SQLite y repositorio
├── analysis/           # pipeline estadístico, figuras, informe final
├── dashboard/          # visor Flask de solo lectura
├── scripts/            # campaña final congelada y generador de datos del sitio
├── tests/              # 209 pruebas unitarias + 7 de integración con Docker
├── results/final_campaign_20261014/   # datos de las 90 ejecuciones (evidencia)
├── site/               # sitio estático de resultados (GitHub Pages)
├── experiment.yaml     # configuración de referencia
└── run_experiment.py   # CLI
```

## Uso

Requisitos: Python 3.13 y Docker (Docker Desktop en Windows/macOS).

```bash
python -m venv .venv
source .venv/bin/activate          # Windows: .venv\Scripts\activate
pip install -r requirements.txt

# validar configuración sin Docker
python run_experiment.py run --config experiment.yaml --dry-run

# ejecutar y analizar
python run_experiment.py run --config experiment.yaml --analyze-after

# otros comandos
python run_experiment.py list
python run_experiment.py analyze <experiment_name>
python run_experiment.py dashboard        # http://127.0.0.1:5000
python run_experiment.py cleanup          # limpia contenedores bcf-* huérfanos
```

Para usar `tc` directamente en un host Linux, cambia `network.driver: tc` en el YAML; el código no cambia.

### Pruebas

```bash
pytest tests/ -q      # las 7 pruebas de integración se omiten si Docker no está disponible
```

El CI ejecuta solo las 209 pruebas unitarias: las de integración levantan clústeres Docker reales
y su resultado depende del timing del host (por ejemplo, forks de PoW en runners compartidos).

## Reproducibilidad de la campaña publicada

`results/final_campaign_20261014/` contiene la base SQLite, configuración, métricas, eventos crudos y
logs por nodo de cada ejecución, el manifiesto (imágenes por digest, versiones, hardware, plan de
ejecución) y una copia del código con su SHA-256.

```bash
python run_experiment.py --db results/final_campaign_20261014/experiments.db list
python analysis/final_results.py   # regenera tablas/figuras y verifica hashes del código
```

> Los archivos fuente listados en `manifest.json → source_sha256` están **congelados**: modificarlos
> hace que `final_results.py` rechace la verificación. Cualquier cambio de código implica una campaña nueva.

`scripts/final_campaign.py` reproduce la campaña completa (≈ varias horas; requiere las imágenes
indicadas en el manifiesto).

## Sitio de resultados

`site/` es un sitio estático (Tailwind CSS, Three.js, ECharts/echarts-gl, GSAP, Bootstrap Icons) sin
dependencias de CDN. Todas las cifras se generan desde los CSV finales:

```bash
python scripts/build_site_data.py          # -> site/data/results.json
cd site && npm ci && npm run build         # CSS, JS y librerías en assets/
npm run serve                              # http://localhost:8000
```

El workflow `.github/workflows/pages.yml` publica `site/` en GitHub Pages en cada push a `main`.

## Limitaciones

- La energía es un estimador por CPU y TDP (Intel Core Ultra 9 185H, 45 W, 22 CPU lógicas), no una
  medición con hardware ni RAPL.
- Solo 3 y 4 nodos en un único equipo, carga fija (100 tx a 50 TPS) y red emulada (50 ms, 10 Mbps).
- Con 3 nodos PBFT tiene f = 0: su latencia no evidencia tolerancia bizantina.
- Implementaciones simplificadas: PBFT sin cambio de vista ni checkpoints; PoS sin slashing.
- La observación termina 5 s después del envío; el throughput no mide capacidad máxima.

## Autores

- **Favio Alejandro Bernal González** — [ORCID 0009-0002-9210-5688](https://orcid.org/0009-0002-9210-5688)
- **Luisa María López Rugeles** — [ORCID 0009-0004-6906-9740](https://orcid.org/0009-0004-6906-9740)

Universidad Libre, Bogotá, Colombia. Para citar: [`CITATION.cff`](CITATION.cff).
