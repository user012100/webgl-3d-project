import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2000);
camera.position.set(0, 2, 5);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const box = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x44aa88 })
);
scene.add(box);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7);
scene.add(light);

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

(function animate(){
  requestAnimationFrame(animate);
  box.rotation.y += 0.003;
  controls.update();
  renderer.render(scene, camera);
})();
