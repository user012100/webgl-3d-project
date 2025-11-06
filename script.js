const canvas = document.getElementById('c');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.setSize(innerWidth, innerHeight, false);

const scene = new THREE.Scene();

// Skybox (cube map)
const cubeLoader = new THREE.CubeTextureLoader();
cubeLoader.setPath('https://threejs.org/examples/textures/cube/Bridge2/');
scene.background = cubeLoader.load([
  'px.png','nx.png','py.png','ny.png','pz.png','nz.png'
]);

// Camera + controls
const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 2000);
camera.position.set(0, 2, 5);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Test mesh + light
scene.add(new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({ color: 0x44aa88, metalness: 0.1, roughness: 0.6 })
));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,10,7.5);
scene.add(light);

// Resize
addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

// Loop
(function animate(){
  requestAnimationFrame(animate);
  controls.update();
  scene.children[0].rotation.y += 0.003;
  renderer.render(scene, camera);
})();