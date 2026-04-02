import * as THREE from "./vendor/three.module.min.js";

const COLOR_MAP = {
  push: "#14b8a6",
  pr: "#a3e635",
  issue: "#38bdf8",
  star: "#facc15",
  create: "#f97316",
  event: "#94a3b8",
};

const focusTracksEl = document.querySelector("#focus-tracks");
const signalMixEl = document.querySelector("#signal-mix");
const eventStreamEl = document.querySelector("#event-stream");
const displayNameEl = document.querySelector("#display-name");
const lastSyncEl = document.querySelector("#last-sync");
const lastEventEl = document.querySelector("#last-event");
const lastRepoTouchEl = document.querySelector("#last-repo-touch");
const clockEl = document.querySelector("#clock");
const canvasEl = document.querySelector("#scene");
const meshModeEl = document.querySelector("#mesh-mode");

const uiState = {
  activeTrackIndex: 0,
  snapshot: null,
};

let sceneState = null;

function setClock() {
  clockEl.textContent = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Europe/Prague",
  }).format(new Date());
}

function renderFocusTracks(snapshot) {
  focusTracksEl.innerHTML = "";

  snapshot.focusTracks.forEach((track, index) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `chip${index === uiState.activeTrackIndex ? " is-active" : ""}`;
    chip.innerHTML = `<span class="chip-dot"></span><span>${track}</span>`;
    chip.addEventListener("mouseenter", () => {
      uiState.activeTrackIndex = index;
      renderFocusTracks(snapshot);
      updateTrackHighlights();
    });
    chip.addEventListener("click", () => {
      uiState.activeTrackIndex = index;
      renderFocusTracks(snapshot);
      updateTrackHighlights();
    });
    focusTracksEl.append(chip);
  });
}

function renderSignalMix(snapshot) {
  signalMixEl.innerHTML = "";

  Object.entries(snapshot.eventCounts).forEach(([kind, value]) => {
    const row = document.createElement("div");
    row.className = "bar-row";
    row.innerHTML = `
      <div class="bar-label">${kind.toUpperCase()}</div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${Math.max(12, value * 18 + 12)}px;background:${COLOR_MAP[kind] || COLOR_MAP.event};"></div>
      </div>
      <div class="bar-value">${value}</div>
    `;
    signalMixEl.append(row);
  });
}

function renderEvents(snapshot) {
  eventStreamEl.innerHTML = "";

  snapshot.events.forEach((event) => {
    const card = document.createElement("article");
    card.className = "event-card";
    card.style.setProperty("--event-accent", event.accent);
    card.innerHTML = `
      <div class="event-head">
        <div class="event-title">${event.summary}</div>
        <div class="event-time">${event.absolute}</div>
      </div>
      <div class="event-detail">${event.detail}</div>
    `;
    eventStreamEl.append(card);
  });
}

function renderSnapshot(snapshot) {
  displayNameEl.textContent = snapshot.displayName;
  lastSyncEl.textContent = snapshot.generatedAtPrague;
  lastEventEl.textContent = snapshot.lastEventAt;
  lastRepoTouchEl.textContent = snapshot.repoUpdatedAtDisplay;
  renderFocusTracks(snapshot);
  renderSignalMix(snapshot);
  renderEvents(snapshot);
}

function clearGroup(group) {
  while (group.children.length > 0) {
    const child = group.children[0];
    group.remove(child);
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) {
      child.material.forEach((material) => material.dispose?.());
    } else {
      child.material?.dispose?.();
    }
  }
}

function updateTrackHighlights() {
  if (!sceneState) {
    return;
  }

  sceneState.trackGroup.children.forEach((pivot, index) => {
    const node = pivot.children[1];
    const active = index === uiState.activeTrackIndex;
    node.material.color.set(active ? "#f97316" : "#14b8a6");
    node.material.emissive.set(active ? "#4f1605" : "#0b7d73");
    node.material.emissiveIntensity = active ? 1.9 : 1.25;
    pivot.children[0].material.color.set(active ? "#f97316" : "#38bdf8");
  });
}

function buildTrackMesh(snapshot) {
  if (!sceneState) {
    return;
  }

  clearGroup(sceneState.trackGroup);

  snapshot.focusTracks.forEach((track, index) => {
    const pivot = new THREE.Group();
    pivot.rotation.y = (index / snapshot.focusTracks.length) * Math.PI * 2;
    pivot.rotation.x = index % 2 === 0 ? 0.42 : -0.42;

    const node = new THREE.Mesh(
      new THREE.SphereGeometry(index === uiState.activeTrackIndex ? 0.25 : 0.2, 24, 24),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(index === uiState.activeTrackIndex ? "#f97316" : "#14b8a6"),
        emissive: new THREE.Color(index === uiState.activeTrackIndex ? "#4f1605" : "#0b7d73"),
        emissiveIntensity: index === uiState.activeTrackIndex ? 1.9 : 1.25,
        roughness: 0.24,
        metalness: 0.08,
      })
    );
    node.position.set(3.25 + index * 0.1, 0, 0);

    const beam = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(node.position.x, node.position.y, node.position.z),
      ]),
      new THREE.LineBasicMaterial({
        color: index === uiState.activeTrackIndex ? 0xf97316 : 0x38bdf8,
        transparent: true,
        opacity: 0.42,
      })
    );

    pivot.add(beam, node);
    pivot.userData = { speed: 0.1 + index * 0.035 };
    sceneState.trackGroup.add(pivot);
  });
}

function buildEventMesh(snapshot) {
  if (!sceneState) {
    return;
  }

  clearGroup(sceneState.eventGroup);

  snapshot.events.forEach((event, index) => {
    const pivot = new THREE.Group();
    pivot.rotation.y = (index / Math.max(snapshot.events.length, 1)) * Math.PI * 2;
    pivot.rotation.z = 0.34 + index * 0.08;

    const node = new THREE.Mesh(
      new THREE.SphereGeometry(0.12 + Math.max(0, 0.05 - index * 0.01), 20, 20),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(event.accent),
        transparent: true,
        opacity: 0.95,
      })
    );
    node.position.set(4.75 + index * 0.18, 0, 0);
    pivot.add(node);
    pivot.userData = { speed: 0.16 + index * 0.04 };
    sceneState.eventGroup.add(pivot);
  });
}

function syncScene(snapshot) {
  if (!sceneState) {
    return;
  }

  buildTrackMesh(snapshot);
  buildEventMesh(snapshot);
}

function resize() {
  if (!sceneState) {
    return;
  }

  sceneState.camera.aspect = window.innerWidth / window.innerHeight;
  sceneState.camera.updateProjectionMatrix();
  sceneState.renderer.setSize(window.innerWidth, window.innerHeight);
}

function bootScene() {
  try {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.11);

    const camera = new THREE.PerspectiveCamera(46, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasEl,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.dataset.engine = "three.js r164";
    meshModeEl.textContent = "Three.js signal orbit";

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    const rimLight = new THREE.PointLight(0x14b8a6, 8, 40, 2);
    rimLight.position.set(6, 4, 8);
    const warmLight = new THREE.PointLight(0xf97316, 7, 40, 2);
    warmLight.position.set(-8, -4, 6);
    scene.add(ambientLight, rimLight, warmLight);

    const rig = new THREE.Group();
    scene.add(rig);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.42,
      })
    );
    rig.add(shell);

    const innerCore = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.62, 0),
      new THREE.MeshStandardMaterial({
        color: 0x14b8a6,
        emissive: 0x0b7d73,
        emissiveIntensity: 1.2,
        metalness: 0.2,
        roughness: 0.22,
      })
    );
    rig.add(innerCore);

    const orbitRingA = new THREE.Mesh(
      new THREE.TorusGeometry(2.9, 0.035, 16, 160),
      new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.6 })
    );
    orbitRingA.rotation.x = Math.PI / 2.4;
    orbitRingA.rotation.y = Math.PI / 7;
    rig.add(orbitRingA);

    const orbitRingB = new THREE.Mesh(
      new THREE.TorusGeometry(3.5, 0.028, 16, 160),
      new THREE.MeshBasicMaterial({ color: 0x14b8a6, transparent: true, opacity: 0.4 })
    );
    orbitRingB.rotation.x = Math.PI / 1.9;
    orbitRingB.rotation.z = Math.PI / 5;
    rig.add(orbitRingB);

    const starGeometry = new THREE.BufferGeometry();
    const starCount = 900;
    const starPositions = new Float32Array(starCount * 3);

    for (let index = 0; index < starCount; index += 1) {
      const stride = index * 3;
      const radius = 12 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[stride] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[stride + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[stride + 2] = radius * Math.cos(phi);
    }

    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.03,
        transparent: true,
        opacity: 0.58,
      })
    );
    scene.add(stars);

    const trackGroup = new THREE.Group();
    const eventGroup = new THREE.Group();
    rig.add(trackGroup, eventGroup);

    const pointer = { x: 0, y: 0 };
    const rotation = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    sceneState = {
      scene,
      camera,
      renderer,
      rig,
      shell,
      innerCore,
      orbitRingA,
      orbitRingB,
      stars,
      trackGroup,
      eventGroup,
      pointer,
      rotation,
      targetRotation,
    };

    if (uiState.snapshot) {
      syncScene(uiState.snapshot);
    }

    window.addEventListener("pointermove", (event) => {
      if (!sceneState) {
        return;
      }

      sceneState.pointer.x = ((event.clientX / window.innerWidth) * 2 - 1) * 0.9;
      sceneState.pointer.y = (1 - (event.clientY / window.innerHeight) * 2) * 0.7;
      sceneState.targetRotation.y = sceneState.pointer.x * 0.28;
      sceneState.targetRotation.x = sceneState.pointer.y * 0.18;
    });

    window.addEventListener("resize", resize);

    function animate(time) {
      if (!sceneState) {
        return;
      }

      const seconds = time * 0.001;

      sceneState.rotation.x += (sceneState.targetRotation.x - sceneState.rotation.x) * 0.03;
      sceneState.rotation.y += (sceneState.targetRotation.y - sceneState.rotation.y) * 0.03;

      sceneState.rig.rotation.x = sceneState.rotation.x;
      sceneState.rig.rotation.y = sceneState.rotation.y + seconds * 0.12;
      sceneState.shell.rotation.y -= 0.005;
      sceneState.shell.rotation.x += 0.0025;
      sceneState.innerCore.rotation.y += 0.012;
      sceneState.innerCore.rotation.x += 0.01;
      sceneState.orbitRingA.rotation.z += 0.004;
      sceneState.orbitRingB.rotation.z -= 0.003;
      sceneState.stars.rotation.y += 0.0007;

      sceneState.trackGroup.children.forEach((pivot, index) => {
        pivot.rotation.z += pivot.userData.speed * 0.0022;
        const node = pivot.children[1];
        const scale =
          index === uiState.activeTrackIndex
            ? 1.26
            : 1 + Math.sin(seconds * 1.7 + index) * 0.08;
        node.scale.setScalar(scale);
      });

      sceneState.eventGroup.children.forEach((pivot, index) => {
        pivot.rotation.x += pivot.userData.speed * 0.0028;
        const node = pivot.children[0];
        const scale = 0.95 + Math.sin(seconds * 2.8 + index) * 0.14;
        node.scale.setScalar(scale);
      });

      sceneState.camera.position.x +=
        ((sceneState.pointer.x * 0.7) - sceneState.camera.position.x) * 0.02;
      sceneState.camera.position.y +=
        ((sceneState.pointer.y * 0.5) - sceneState.camera.position.y) * 0.02;
      sceneState.camera.lookAt(0, 0, 0);

      sceneState.renderer.render(sceneState.scene, sceneState.camera);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  } catch (error) {
    canvasEl.dataset.engine = "three.js unavailable";
    meshModeEl.textContent = "Renderer fallback / telemetry live";
    lastSyncEl.textContent = lastSyncEl.textContent === "loading"
      ? "snapshot ready / renderer fallback"
      : lastSyncEl.textContent;
    console.warn("Three.js scene fallback active:", error);
  }
}

async function loadSnapshot() {
  try {
    const response = await fetch(`./data/live-data.json?ts=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load snapshot: ${response.status}`);
    }

    const snapshot = await response.json();
    uiState.snapshot = snapshot;
    renderSnapshot(snapshot);
    syncScene(snapshot);
  } catch (error) {
    lastSyncEl.textContent = "snapshot unavailable";
    eventStreamEl.innerHTML = `<article class="event-card"><div class="event-title">Snapshot unavailable</div><div class="event-detail">${error.message}</div></article>`;
  }
}

setClock();
bootScene();
loadSnapshot();
setInterval(setClock, 1000);
setInterval(loadSnapshot, 60_000);
