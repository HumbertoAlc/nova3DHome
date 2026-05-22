import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";

/* =========================
   SCENE
========================= */

const scene = new THREE.Scene();

/* =========================
   CAMERA
========================= */

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.z = 6;

/* =========================
   RENDERER
========================= */

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

/* =========================
   GEOMETRY
========================= */

const geometry = new THREE.IcosahedronGeometry(1.5, 1);

const material = new THREE.MeshPhysicalMaterial({
  color: 0x00ffff,

  metalness: 0.2,

  roughness: 0,

  transmission: 1,

  thickness: 1.5,

  transparent: true,

  opacity: 1,
});

const sphere = new THREE.Mesh(geometry, material);

scene.add(sphere);

/* =========================
   WIREFRAME
========================= */

const wireframe = new THREE.Mesh(
  geometry,

  new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: true,
  }),
);

scene.add(wireframe);

/* =========================
   PARTICLES
========================= */

const particlesGeometry = new THREE.BufferGeometry();

const count = 5000;

const positions = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 50;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3),
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,

  color: 0xffffff,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(particles);

/* =========================
   LIGHTS
========================= */

const light1 = new THREE.PointLight(0x00ffff, 4);

light1.position.set(5, 5, 5);

scene.add(light1);

const light2 = new THREE.PointLight(0xffffff, 2);

light2.position.set(-5, -5, 5);

scene.add(light2);

/* =========================
   MOUSE INTERACTION
========================= */

let mouseX = 0;
let mouseY = 0;

document.addEventListener("mousemove", (event) => {
  mouseX = event.clientX / window.innerWidth - 0.5;

  mouseY = event.clientY / window.innerHeight - 0.5;
});

/* =========================
   GLOW EFFECT
========================= */

const glow = document.querySelector(".glow");

document.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX - 300 + "px";

  glow.style.top = e.clientY - 300 + "px";
});

/* =========================
   ANIMATION
========================= */

function animate() {
  requestAnimationFrame(animate);

  sphere.rotation.x += 0.002;
  sphere.rotation.y += 0.003;

  wireframe.rotation.x -= 0.001;
  wireframe.rotation.y -= 0.002;

  sphere.rotation.y += mouseX * 0.02;
  sphere.rotation.x += mouseY * 0.02;

  particles.rotation.y += 0.0005;

  renderer.render(scene, camera);
}

animate();

/* =========================
   RESPONSIVE
========================= */

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* =========================
   typing
========================= */

const texts = ["THE FUTURE OF DIGITAL INTERACTION", "DIGITAL EVOLUTION"];

const heading = document.getElementById("typing");

let textIndex = 0;
let charIndex = 0;

function typeEffect() {
  // limpia antes de comenzar una nueva frase
  if (charIndex === 0) {
    heading.textContent = "";
  }

  if (charIndex < texts[textIndex].length) {
    heading.textContent += texts[textIndex][charIndex];
    charIndex++;

    setTimeout(typeEffect, 100);
  } else {
    setTimeout(() => {
      textIndex = (textIndex + 1) % texts.length;
      charIndex = 0;

      typeEffect();
    }, 2000);
  }
}

typeEffect();

/* =========================
   navbar
========================= */

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});
