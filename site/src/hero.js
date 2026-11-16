// Escena 3D del hero: tres clústeres (PoW, PoS, PBFT) con nodos que intercambian
// mensajes y una cadena de bloques orbitando. Se pausa fuera de pantalla y
// respeta prefers-reduced-motion.
import {
  AdditiveBlending, AmbientLight, BoxGeometry, BufferGeometry, Color, EdgesGeometry,
  Float32BufferAttribute, Group, IcosahedronGeometry, LineBasicMaterial, LineSegments,
  Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera, PointLight, Points,
  PointsMaterial, Scene, SphereGeometry, Vector3, WebGLRenderer,
} from "three";

const CLUSTERS = [
  { color: 0xf59e0b, center: new Vector3(-4.2, -0.6, 0), nodes: 4, speed: 0.45 }, // PoW
  { color: 0x10b981, center: new Vector3(4.2, -0.6, 0), nodes: 4, speed: 0.9 },   // PoS
  { color: 0x38bdf8, center: new Vector3(0, 2.4, -1.5), nodes: 4, speed: 1.4 },   // PBFT
];

export function initHero(canvas) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  } catch {
    return null; // sin WebGL: queda el degradado CSS de respaldo
  }
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 200);
  camera.position.set(0, 0.5, 15);

  scene.add(new AmbientLight(0xffffff, 0.35));
  const world = new Group();
  scene.add(world);

  // --- clústeres de nodos con malla completa de enlaces --------------------
  const nodeGeo = new IcosahedronGeometry(0.42, 1);
  const shellGeo = new EdgesGeometry(new IcosahedronGeometry(0.62, 0));
  const pulseGeo = new SphereGeometry(0.07, 8, 8);
  const pulses = [];

  CLUSTERS.forEach((c, ci) => {
    const g = new Group();
    g.position.copy(c.center);
    const light = new PointLight(c.color, 18, 12, 2);
    g.add(light);

    const positions = [];
    for (let i = 0; i < c.nodes; i++) {
      const a = (i / c.nodes) * Math.PI * 2 + ci;
      const p = new Vector3(Math.cos(a) * 1.6, Math.sin(a) * 1.6, Math.sin(a * 2) * 0.6);
      positions.push(p);
      const node = new Mesh(nodeGeo, new MeshStandardMaterial({
        color: c.color, emissive: c.color, emissiveIntensity: 0.55, roughness: 0.35, metalness: 0.2,
      }));
      node.position.copy(p);
      g.add(node);
      const shell = new LineSegments(shellGeo, new LineBasicMaterial({ color: c.color, transparent: true, opacity: 0.35 }));
      shell.position.copy(p);
      shell.userData.spin = 0.3 + Math.random() * 0.4;
      g.add(shell);
    }
    const edges = [];
    const verts = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        edges.push([positions[i], positions[j]]);
        verts.push(...positions[i].toArray(), ...positions[j].toArray());
      }
    }
    const lineGeo = new BufferGeometry();
    lineGeo.setAttribute("position", new Float32BufferAttribute(verts, 3));
    g.add(new LineSegments(lineGeo, new LineBasicMaterial({ color: c.color, transparent: true, opacity: 0.22 })));

    for (let k = 0; k < 6; k++) {
      const m = new Mesh(pulseGeo, new MeshBasicMaterial({ color: c.color, transparent: true, blending: AdditiveBlending }));
      g.add(m);
      pulses.push({ mesh: m, edges, t: Math.random(), edge: edges[k % edges.length], speed: c.speed * (0.6 + Math.random() * 0.6) });
    }
    world.add(g);
  });

  // --- cadena de bloques en órbita -----------------------------------------
  const chain = new Group();
  const blockGeo = new BoxGeometry(0.55, 0.55, 0.55);
  const blockEdges = new EdgesGeometry(blockGeo);
  const BLOCKS = 22;
  for (let i = 0; i < BLOCKS; i++) {
    const a = (i / BLOCKS) * Math.PI * 2;
    const col = new Color(CLUSTERS[i % 3].color);
    const b = new LineSegments(blockEdges, new LineBasicMaterial({ color: col, transparent: true, opacity: 0.55 }));
    b.position.set(Math.cos(a) * 8.5, Math.sin(a * 3) * 0.5 - 0.3, Math.sin(a) * 8.5 - 3);
    b.rotation.set(a, a * 0.5, 0);
    chain.add(b);
  }
  chain.rotation.x = 0.28;
  world.add(chain);

  // --- campo de partículas --------------------------------------------------
  const starVerts = [];
  for (let i = 0; i < 900; i++) {
    starVerts.push((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 36, -Math.random() * 40 - 4);
  }
  const starGeo = new BufferGeometry();
  starGeo.setAttribute("position", new Float32BufferAttribute(starVerts, 3));
  const stars = new Points(starGeo, new PointsMaterial({ color: 0x94a3b8, size: 0.05, transparent: true, opacity: 0.6 }));
  scene.add(stars);

  // --- interacción y ciclo de vida -------------------------------------------
  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w < 640 ? 21 : 15; // más lejos en móvil para que quepan los clústeres
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(canvas);
  resize();

  let visible = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(canvas);

  const tmp = new Vector3();
  let last = performance.now();
  const frame = (now) => {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    const motion = reduced ? 0 : 1;

    world.rotation.y += (pointer.x * 0.25 - world.rotation.y) * 0.04;
    world.rotation.x += (pointer.y * 0.12 - world.rotation.x) * 0.04;
    chain.rotation.y += dt * 0.08 * motion;
    stars.rotation.y += dt * 0.004 * motion;

    world.children.forEach((g, i) => {
      if (g === chain) return;
      g.rotation.z += dt * 0.12 * (i % 2 ? 1 : -1) * motion;
      g.children.forEach((o) => { if (o.userData.spin) o.rotation.y += dt * o.userData.spin * motion; });
    });

    pulses.forEach((p) => {
      p.t += dt * p.speed * motion;
      if (p.t >= 1) {
        p.t = 0;
        p.edge = p.edges[(Math.random() * p.edges.length) | 0];
        if (Math.random() < 0.5) p.edge = [p.edge[1], p.edge[0]];
      }
      tmp.lerpVectors(p.edge[0], p.edge[1], p.t);
      p.mesh.position.copy(tmp);
      p.mesh.material.opacity = Math.sin(p.t * Math.PI);
    });

    renderer.render(scene, camera);
  };
  requestAnimationFrame(frame);
  return { renderer };
}
