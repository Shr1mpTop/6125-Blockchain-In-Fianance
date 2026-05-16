import * as THREE from "three";

const canvas = document.querySelector("#ocean-canvas");
const sections = [...document.querySelectorAll(".scene")];
const progressBar = document.querySelector("#progress-bar");
const counter = document.querySelector("#slide-counter");
const prevButton = document.querySelector("#prev-slide");
const nextButton = document.querySelector("#next-slide");

let activeIndex = 0;

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
  preserveDrawingBuffer: true,
  powerPreference: "high-performance",
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x07110f, 0.045);

const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 160);
camera.position.set(0, 6.2, 18);

const clock = new THREE.Clock();
const pointer = new THREE.Vector2();
const packetObjects = [];

const colors = {
  hull: 0x172522,
  teal: 0x21c2b2,
  mint: 0x9af0d8,
  coral: 0xf06f5f,
  gold: 0xe9b85e,
  violet: 0x8c7bff,
  cream: 0xf6f0e7,
};

scene.add(new THREE.HemisphereLight(0x9af0d8, 0x07110f, 1.35));

const keyLight = new THREE.DirectionalLight(0xf6f0e7, 2.2);
keyLight.position.set(-8, 9, 10);
scene.add(keyLight);

const rimLight = new THREE.PointLight(0x21c2b2, 9, 42);
rimLight.position.set(7, 3, -5);
scene.add(rimLight);

const oceanUniforms = {
  uTime: { value: 0 },
  uDeep: { value: new THREE.Color(0x06110f) },
  uShallow: { value: new THREE.Color(0x144d49) },
  uGlow: { value: new THREE.Color(0x21c2b2) },
};

const ocean = new THREE.Mesh(
  new THREE.PlaneGeometry(180, 180, 180, 180),
  new THREE.ShaderMaterial({
    uniforms: oceanUniforms,
    vertexShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform float uTime;

      void main() {
        vUv = uv;
        vec3 pos = position;
        float waveA = sin(pos.x * 0.18 + uTime * 0.85) * 0.18;
        float waveB = sin(pos.y * 0.24 - uTime * 0.62) * 0.12;
        float waveC = sin((pos.x + pos.y) * 0.09 + uTime * 0.42) * 0.16;
        pos.z += waveA + waveB + waveC;
        vWave = pos.z;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying float vWave;
      uniform vec3 uDeep;
      uniform vec3 uShallow;
      uniform vec3 uGlow;

      void main() {
        float horizon = smoothstep(0.18, 0.96, vUv.y);
        float foam = smoothstep(0.18, 0.46, abs(vWave));
        vec3 base = mix(uDeep, uShallow, horizon * 0.62 + foam * 0.12);
        vec3 glow = uGlow * foam * 0.14;
        gl_FragColor = vec4(base + glow, 0.96);
      }
    `,
    transparent: true,
  })
);
ocean.rotation.x = -Math.PI / 2;
ocean.position.y = -2.15;
scene.add(ocean);

const grid = new THREE.GridHelper(72, 38, 0x21c2b2, 0x2c504b);
grid.position.y = -2.08;
grid.material.transparent = true;
grid.material.opacity = 0.12;
scene.add(grid);

function roundedBox(width, height, depth, color, roughness = 0.55, metalness = 0.05) {
  return new THREE.Mesh(
    new THREE.BoxGeometry(width, height, depth),
    new THREE.MeshStandardMaterial({
      color,
      roughness,
      metalness,
      emissive: color,
      emissiveIntensity: 0.018,
    })
  );
}

function buildShip() {
  const group = new THREE.Group();

  const hullGeometry = new THREE.BufferGeometry();
  const l = 6.8;
  const w = 1.55;
  const deckY = -0.64;
  const keelY = -1.46;
  const stern = -l / 2;
  const bowBase = l / 2 - 0.86;
  const bowTip = l / 2 + 0.44;
  const vertices = new Float32Array([
    stern, deckY, -w / 2,
    stern, deckY, w / 2,
    bowBase, deckY, -w / 2,
    bowBase, deckY, w / 2,
    bowTip, deckY - 0.08, 0,
    stern + 0.34, keelY, -w * 0.34,
    stern + 0.34, keelY, w * 0.34,
    bowBase, keelY + 0.08, -w * 0.18,
    bowBase, keelY + 0.08, w * 0.18,
    bowTip, keelY + 0.14, 0,
  ]);
  const indices = [
    0, 2, 1, 1, 2, 3, 2, 4, 3,
    5, 6, 7, 6, 8, 7, 7, 8, 9,
    0, 5, 2, 2, 5, 7, 2, 7, 4, 4, 7, 9,
    1, 3, 6, 3, 8, 6, 3, 4, 8, 4, 9, 8,
    0, 1, 5, 1, 6, 5,
  ];
  hullGeometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  hullGeometry.setIndex(indices);
  hullGeometry.computeVertexNormals();

  const hull = new THREE.Mesh(
    hullGeometry,
    new THREE.MeshStandardMaterial({
      color: 0x102521,
      roughness: 0.48,
      metalness: 0.18,
      emissive: 0x102521,
      emissiveIntensity: 0.04,
    })
  );
  group.add(hull);

  const hullEdge = new THREE.LineSegments(
    new THREE.EdgesGeometry(hullGeometry, 24),
    new THREE.LineBasicMaterial({ color: 0x9af0d8, transparent: true, opacity: 0.18 })
  );
  group.add(hullEdge);

  const deck = roundedBox(5.45, 0.1, 1.25, 0x21352f, 0.5, 0.12);
  deck.position.set(-0.24, deckY + 0.09, 0);
  group.add(deck);

  const bridge = roundedBox(1.04, 1.08, 1.02, 0xf3efe4, 0.38, 0.05);
  bridge.position.set(-2.72, 0.0, 0);
  group.add(bridge);

  const bridgeTop = roundedBox(0.82, 0.18, 0.82, 0x24342f, 0.42, 0.08);
  bridgeTop.position.set(-2.72, 0.64, 0);
  group.add(bridgeTop);

  for (let index = 0; index < 3; index += 1) {
    const windowBand = roundedBox(0.06, 0.12, 0.72, 0x21c2b2, 0.25, 0.02);
    windowBand.position.set(-2.18, 0.1 + index * 0.18, 0);
    windowBand.material.emissiveIntensity = 0.25;
    group.add(windowBand);
  }

  const containerPalette = [colors.coral, colors.gold, colors.teal, colors.violet, 0xefefdf];
  for (let tier = 0; tier < 3; tier += 1) {
    for (let col = 0; col < 8; col += 1) {
      const stackWidth = col > 5 ? 0.45 : 0.56;
      const box = roundedBox(stackWidth, 0.34, 0.47, containerPalette[(tier + col) % containerPalette.length]);
      box.position.set(-1.55 + col * 0.52, -0.4 + tier * 0.34, -0.29 + (col % 2) * 0.58);
      group.add(box);

      const edge = new THREE.LineSegments(
        new THREE.EdgesGeometry(box.geometry),
        new THREE.LineBasicMaterial({ color: 0x06110f, transparent: true, opacity: 0.18 })
      );
      edge.position.copy(box.position);
      group.add(edge);
    }
  }

  const mast = roundedBox(0.06, 1.05, 0.06, colors.gold, 0.36, 0.2);
  mast.position.set(2.8, 0.18, -0.58);
  const mastArm = roundedBox(0.82, 0.04, 0.04, colors.gold, 0.36, 0.2);
  mastArm.position.set(2.46, 0.68, -0.58);
  group.add(mast, mastArm);

  const wakeMaterial = new THREE.MeshBasicMaterial({ color: 0x9af0d8, transparent: true, opacity: 0.14 });
  for (let index = 0; index < 3; index += 1) {
    const wake = new THREE.Mesh(new THREE.RingGeometry(0.55 + index * 0.38, 0.57 + index * 0.38, 64), wakeMaterial);
    wake.rotation.x = -Math.PI / 2;
    wake.scale.set(1.9, 0.34, 1);
    wake.position.set(-3.62 - index * 0.28, -1.52, 0);
    group.add(wake);
  }

  group.position.set(-2.4, 0.45, -0.4);
  group.rotation.y = -0.18;
  return group;
}

const ship = buildShip();
ship.scale.setScalar(1.18);
scene.add(ship);

const harborShip = buildShip();
harborShip.scale.setScalar(0.72);
harborShip.position.set(11.5, -0.25, -5.8);
harborShip.rotation.y = -0.72;
scene.add(harborShip);

const chainGroup = new THREE.Group();
const blockMaterial = new THREE.MeshStandardMaterial({
  color: colors.mint,
  roughness: 0.32,
  metalness: 0.28,
  emissive: colors.teal,
  emissiveIntensity: 0.12,
  transparent: true,
  opacity: 0.86,
});
for (let index = 0; index < 6; index += 1) {
  const block = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.42, 0.42), blockMaterial.clone());
  block.position.set(-1.3 + index * 0.54, 0.58 + Math.sin(index) * 0.12, 2.7);
  block.rotation.set(0.4, index * 0.35, 0.2);
  chainGroup.add(block);
}
chainGroup.position.set(1.7, 0.15, 0.1);
scene.add(chainGroup);

function makeCrane(x, z, height, color) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.38,
    metalness: 0.2,
    emissive: color,
    emissiveIntensity: 0.03,
  });
  const mast = new THREE.Mesh(new THREE.BoxGeometry(0.16, height, 0.16), material);
  mast.position.y = height / 2 - 1.75;
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 0.12), material);
  arm.position.set(0.76, height - 1.72, 0);
  const cable = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.8, 0.035), material);
  cable.position.set(1.42, height - 2.17, 0);
  group.add(mast, arm, cable);
  group.position.set(x, 0, z);
  return group;
}

scene.add(makeCrane(-6.8, -3.4, 3.2, colors.gold));
scene.add(makeCrane(6.0, -4.0, 2.8, colors.coral));
scene.add(makeCrane(7.6, -2.2, 2.4, colors.mint));

const anchorageRing = new THREE.Mesh(
  new THREE.TorusGeometry(3.7, 0.015, 8, 160),
  new THREE.MeshBasicMaterial({ color: colors.mint, transparent: true, opacity: 0.5 })
);
anchorageRing.rotation.x = Math.PI / 2;
anchorageRing.position.set(2.4, -1.92, -1.1);
scene.add(anchorageRing);

const routeMaterial = new THREE.LineBasicMaterial({
  color: colors.mint,
  transparent: true,
  opacity: 0.55,
});

function addRoute(points, packetColor, speed, phase) {
  const curve = new THREE.CatmullRomCurve3(points);
  const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(120));
  const line = new THREE.Line(geometry, routeMaterial.clone());
  scene.add(line);

  for (let i = 0; i < 3; i += 1) {
    const packet = new THREE.Mesh(
      new THREE.SphereGeometry(0.08, 18, 18),
      new THREE.MeshBasicMaterial({ color: packetColor })
    );
    packetObjects.push({ packet, curve, speed, phase: phase + i / 3 });
    scene.add(packet);
  }
}

addRoute(
  [
    new THREE.Vector3(-9, -0.6, -5.4),
    new THREE.Vector3(-3.8, 1.0, -2.3),
    new THREE.Vector3(1.6, 0.5, -1.1),
    new THREE.Vector3(6.4, 1.2, 1.2),
  ],
  colors.teal,
  0.045,
  0.1
);
addRoute(
  [
    new THREE.Vector3(6.8, -0.2, -4.8),
    new THREE.Vector3(2.2, 0.3, -1.2),
    new THREE.Vector3(-2.4, 1.4, 1.4),
    new THREE.Vector3(-8.6, 0.0, 4.5),
  ],
  colors.gold,
  0.034,
  0.42
);

function makeCoin(index) {
  const coin = new THREE.Mesh(
    new THREE.CylinderGeometry(0.36, 0.36, 0.08, 48),
    new THREE.MeshStandardMaterial({
      color: colors.gold,
      roughness: 0.32,
      metalness: 0.58,
      emissive: colors.gold,
      emissiveIntensity: 0.06,
    })
  );
  coin.position.set(-5.4 + index * 0.58, -0.65 + index * 0.02, 2.8 + index * 0.18);
  coin.rotation.x = Math.PI / 2;
  return coin;
}

const coins = [makeCoin(0), makeCoin(1), makeCoin(2), makeCoin(3)];
coins.forEach((coin) => scene.add(coin));

function sectionTarget(index) {
  const presets = [
    { camera: [0, 5.35, 16.2], ship: [3.2, 0.5, -1.2], rot: -0.48 },
    { camera: [-3, 5.2, 17], ship: [1.9, 0.35, -1.4], rot: -0.32 },
    { camera: [0, 7.2, 19], ship: [-2.2, 0.45, -0.7], rot: -0.22 },
    { camera: [2.5, 5.2, 16], ship: [0.2, 0.55, -1.4], rot: -0.48 },
    { camera: [1.8, 5.3, 15.2], ship: [0.8, 0.52, -1.2], rot: -0.42 },
    { camera: [-2.5, 5.6, 15], ship: [-2.8, 0.55, 0.2], rot: 0.16 },
    { camera: [-4, 5.8, 15], ship: [-2.8, 0.45, 0.8], rot: 0.1 },
    { camera: [1.2, 7.5, 18], ship: [-1.4, 0.5, -1], rot: -0.3 },
    { camera: [0, 5.7, 16], ship: [-2.1, 0.4, -0.2], rot: -0.18 },
    { camera: [0, 6.8, 18], ship: [-2.1, 0.4, -0.2], rot: -0.18 },
    { camera: [0, 8.4, 22], ship: [-2.4, 0.45, -0.4], rot: -0.18 },
  ];
  return presets[index] || presets[0];
}

function pageProgress() {
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return documentHeight <= 0 ? 0 : window.scrollY / documentHeight;
}

function updateCounter() {
  const current = String(activeIndex + 1).padStart(2, "0");
  const total = String(sections.length).padStart(2, "0");
  counter.textContent = `${current} / ${total}`;
}

function goTo(index) {
  const bounded = Math.max(0, Math.min(sections.length - 1, index));
  sections[bounded].scrollIntoView({ behavior: "smooth", block: "start" });
}

prevButton.addEventListener("click", () => goTo(activeIndex - 1));
nextButton.addEventListener("click", () => goTo(activeIndex + 1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "PageDown") goTo(activeIndex + 1);
  if (event.key === "ArrowUp" || event.key === "PageUp") goTo(activeIndex - 1);
});

window.addEventListener("pointermove", (event) => {
  pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
  pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
});

const simulator = document.querySelector("#simulator");
const delayRange = document.querySelector("#delayRange");
const delayValue = document.querySelector("#delayValue");
const delayFill = document.querySelector("#delayFill");
const scenarioLabel = document.querySelector("#scenarioLabel");
const settlementStatus = document.querySelector("#settlementStatus");
const settlementCopy = document.querySelector("#settlementCopy");
const payoutValue = document.querySelector("#payoutValue");
const lpOutcome = document.querySelector("#lpOutcome");
const scenarioButtons = [...document.querySelectorAll("[data-scenario-button]")];

const scenarios = {
  safe: {
    delay: 42,
    label: "No trigger before policy expiry",
    status: "Expired without claim",
    copy: "Reserved capital is released back to the pool; premium remains as LP yield.",
    payout: "0 USDC",
    lp: "Premium retained",
  },
  port: {
    delay: 76,
    label: "Trigger B · Idea 1",
    status: "Port-delay payout",
    copy: "AIS and port records confirm the vessel stayed in destination anchorage for more than 72 hours.",
    payout: "2,000 USDC",
    lp: "Reserved capital used for claim",
  },
  rollover: {
    delay: 18,
    label: "Trigger A · Idea 5",
    status: "Roll-over micro-payout",
    copy: "Carrier and terminal data confirm the insured container missed the scheduled vessel.",
    payout: "650 USDC",
    lp: "Small claim absorbed by pool",
  },
};

let simWheelProgress = 0;

function renderScenario(name, delayOverride = null) {
  if (!simulator) return;
  const base = scenarios[name] || scenarios.safe;
  const delay = delayOverride ?? base.delay;
  simulator.dataset.scenario = name;
  delayRange.value = String(delay);
  delayValue.textContent = String(delay);
  delayFill.style.width = `${Math.min(100, (delay / 120) * 100)}%`;
  scenarioLabel.textContent = base.label;
  settlementStatus.textContent = base.status;
  settlementCopy.textContent = base.copy;
  payoutValue.textContent = base.payout;
  lpOutcome.textContent = base.lp;
  scenarioButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.scenarioButton === name));
  });
}

function renderSimulatorProgress(progress) {
  if (!simulator) return;
  if (progress < 0.34) {
    const delay = Math.round(24 + progress * 72);
    renderScenario("safe", delay);
  } else if (progress < 0.67) {
    renderScenario("rollover", 18);
  } else {
    const delay = Math.round(72 + (progress - 0.67) / 0.33 * 42);
    renderScenario("port", Math.min(120, delay));
  }
}

if (simulator && delayRange) {
  scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.scenarioButton;
      simWheelProgress = selected === "port" ? 0.82 : selected === "rollover" ? 0.5 : 0;
      renderScenario(selected);
    });
  });
  delayRange.addEventListener("input", () => {
    const delay = Number(delayRange.value);
    renderScenario(delay >= 72 ? "port" : "safe", delay);
  });
  renderScenario("safe");
  simulator.addEventListener(
    "wheel",
    (event) => {
      const rect = simulator.getBoundingClientRect();
      const centered = rect.top < window.innerHeight * 0.22 && rect.bottom > window.innerHeight * 0.78;
      if (!centered) return;
      const direction = Math.sign(event.deltaY);
      const atStart = simWheelProgress <= 0.01 && direction < 0;
      const atEnd = simWheelProgress >= 0.99 && direction > 0;
      if (atStart || atEnd) return;
      event.preventDefault();
      simWheelProgress = Math.min(1, Math.max(0, simWheelProgress + event.deltaY * 0.0014));
      renderSimulatorProgress(simWheelProgress);
    },
    { passive: false }
  );
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeIndex = sections.indexOf(entry.target);
        entry.target.classList.add("in-view");
        updateCounter();
      }
    });
  },
  { rootMargin: "-36% 0px -45% 0px", threshold: 0.02 }
);
sections.forEach((section) => observer.observe(section));
sections[0].classList.add("in-view");
updateCounter();

function updateProgress() {
  const progress = pageProgress();
  progressBar.style.width = `${Math.min(100, Math.max(0, progress * 100))}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

window.addEventListener("resize", () => {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

function animate() {
  const elapsed = clock.getElapsedTime();
  const scroll = pageProgress();
  oceanUniforms.uTime.value = elapsed;

  const target = sectionTarget(activeIndex);
  camera.position.lerp(new THREE.Vector3(...target.camera), 0.035);
  camera.position.x += pointer.x * 0.012;
  camera.position.y -= pointer.y * 0.008;
  camera.lookAt(0, -0.7, 0);

  ship.position.lerp(new THREE.Vector3(...target.ship), 0.036);
  ship.rotation.y += (target.rot + Math.sin(elapsed * 0.42) * 0.025 - ship.rotation.y) * 0.04;
  ship.position.y += Math.sin(elapsed * 1.4) * 0.002;

  const harborProgress = Math.min(1, Math.max(0, (scroll - 0.08) / 0.55));
  harborShip.position.x = 11.5 - harborProgress * 14.6;
  harborShip.position.z = -5.8 + harborProgress * 4.15;
  harborShip.position.y = -0.32 + Math.sin(elapsed * 1.2 + 1.8) * 0.08;
  harborShip.rotation.y = -0.72 + harborProgress * 0.46 + Math.sin(elapsed * 0.38) * 0.025;

  chainGroup.children.forEach((block, index) => {
    block.rotation.x += 0.006 + index * 0.0008;
    block.rotation.y += 0.008;
    block.position.y = 0.58 + Math.sin(elapsed * 1.4 + index * 0.7) * 0.13;
    block.material.opacity = 0.62 + Math.sin(elapsed * 1.8 + index) * 0.18;
  });
  chainGroup.position.y = Math.sin(elapsed * 0.9) * 0.08;
  chainGroup.rotation.y = Math.sin(elapsed * 0.35) * 0.12;

  anchorageRing.rotation.z = elapsed * 0.18;
  anchorageRing.material.opacity = 0.35 + Math.sin(elapsed * 1.7) * 0.18;

  packetObjects.forEach(({ packet, curve, speed, phase }) => {
    const t = (elapsed * speed + phase) % 1;
    const point = curve.getPointAt(t);
    packet.position.copy(point);
    const scale = 0.85 + Math.sin((elapsed + phase) * 5) * 0.18;
    packet.scale.setScalar(scale);
  });

  coins.forEach((coin, index) => {
    coin.rotation.z = elapsed * (0.8 + index * 0.12);
    coin.position.y = -0.7 + Math.sin(elapsed * 1.3 + index) * 0.1;
  });

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
