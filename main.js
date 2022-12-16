
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Creando un plano
const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xECECEC });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// rectángulo
const rectangleGeometry = new THREE.BoxGeometry(4, 2, 2);
const rectangleMaterial = new THREE.MeshBasicMaterial({ color: 0xF2B702 });
const rectangle = new THREE.Mesh(rectangleGeometry, rectangleMaterial);
rectangle.position.set(0, 1, 0);
scene.add(rectangle);

// cubo
const cubeGeometry = new THREE.BoxGeometry(2, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x564A24 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(2, 0.5, 0);
scene.add(cube);

// esfera
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xF4CCCC });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(2, 1, 0);
scene.add(sphere);

// colicion
//const raycaster = new THREE.Raycaster();
//raycaster.set(plane.position, new THREE.Vector3().subVectors(plane.position, rectangle.position, cube.position, sphere.position).normalize());


// posicion del mouse y control
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
document.addEventListener('mousedown', () => {
  isDragging = true;
});
document.addEventListener('mouseup', () => {
  isDragging = false;
});
document.addEventListener('mousemove', event => {
  if (!isDragging) {
    return;
  }
  const deltaMove = {
    x: event.offsetX - previousMousePosition.x,
    y: event.offsetY - previousMousePosition.y
  };
  sphere.position.x += deltaMove.x * 0.02;
  sphere.position.y -= deltaMove.y * 0.02;
  previousMousePosition = {
    x: event.offsetX,
    y: event.offsetY
  };
});

const cameraFollowsSphere = true;

// Dibuja la escena
const animate = () => {
  requestAnimationFrame(animate);
  if (cameraFollowsSphere) {
    camera.position.x = sphere.position.x;
    camera.position.y = sphere.position.y;
  }
  renderer.render(scene, camera);
};

// Ajustando el tamaño del renderer y de la cámara
const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener('resize', onWindowResize, false);

animate();
