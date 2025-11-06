import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';

// Renderer
const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight, false);

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 2, 5);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Skybox (cube texture)
const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath('https://threejs.org/examples/textures/cube/Bridge2/');
const skybox = cubeLoader.load([
	'posx.jpg', 'negx.jpg',
	'posy.jpg', 'negy.jpg',
	'posz.jpg', 'negz.jpg'
]);
scene.background = skybox;

// Test geometry
const box = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshStandardMaterial({ color: 0x44aa88, metalness: 0.1, roughness: 0.6 })
);
scene.add(box);

// Light
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Resize handling
function onResize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	renderer.setSize(w, h, false);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}
addEventListener('resize', onResize);

// Render loop
function animate() {
	requestAnimationFrame(animate);
	controls.update();
	box.rotation.y += 0.003;
	renderer.render(scene, camera);
}
animate();