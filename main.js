// ===== CONFIGURACIÓN INICIAL =====
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0e27);
scene.fog = new THREE.Fog(0x0a0e27, 10, 50);

// Cámara con perspectiva personalizada
const camera = new THREE.PerspectiveCamera(
    65, // Campo de visión más amplio
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.set(5, 4, 8);
camera.lookAt(0, 0, 0);

// Renderizador
const renderer = new THREE.WebGLRenderer({ 
    antialias: true,
    alpha: true 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// ===== SISTEMA DE ILUMINACIÓN =====

// Luz ambiental suave para evitar oscuridad total
const ambientLight = new THREE.AmbientLight(0x404060, 0.4);
scene.add(ambientLight);

// Luz direccional principal
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
scene.add(directionalLight);

// Luz puntual de acento (color cálido)
const pointLight = new THREE.PointLight(0xff6b35, 1.5, 20);
pointLight.position.set(-3, 3, 3);
scene.add(pointLight);

// Luz puntual adicional (color frío)
const pointLight2 = new THREE.PointLight(0x4fc3f7, 1.2, 20);
pointLight2.position.set(3, -2, -3);
scene.add(pointLight2);

// ===== CONSTRUCCIÓN DE LA ESTRUCTURA COMPUESTA =====

// Contenedor principal para la composición
const composition = new THREE.Group();

// GEOMETRÍA 1: Cubo central (base del tótem)
const boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0x4fc3f7,
    metalness: 0.7,
    roughness: 0.2,
    emissive: 0x0a4d68,
    emissiveIntensity: 0.2
});
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
cube.position.y = 0;
cube.castShadow = true;
cube.receiveShadow = true;
composition.add(cube);

// GEOMETRÍA 2: Esfera superior
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
    color: 0xff6b35,
    metalness: 0.3,
    roughness: 0.4,
    emissive: 0x8b3a1a,
    emissiveIntensity: 0.15
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 2.5;
sphere.castShadow = true;
sphere.receiveShadow = true;
composition.add(sphere);

// GEOMETRÍA 3: Cono inferior
const coneGeometry = new THREE.ConeGeometry(1.2, 2, 32);
const coneMaterial = new THREE.MeshStandardMaterial({
    color: 0x9b59b6,
    metalness: 0.5,
    roughness: 0.3,
    emissive: 0x4a2850,
    emissiveIntensity: 0.2
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
cone.position.y = -2.2;
cone.castShadow = true;
cone.receiveShadow = true;
composition.add(cone);

// GEOMETRÍA 4: Toro orbital (anillo decorativo)
const torusGeometry = new THREE.TorusGeometry(2.5, 0.2, 16, 100);
const torusMaterial = new THREE.MeshStandardMaterial({
    color: 0xf39c12,
    metalness: 0.8,
    roughness: 0.1,
    emissive: 0x7d5e08,
    emissiveIntensity: 0.3
});
const torus = new THREE.Mesh(torusGeometry, torusMaterial);
torus.rotation.x = Math.PI / 2;
torus.castShadow = true;
torus.receiveShadow = true;
composition.add(torus);

// GEOMETRÍA 5: Octaedro flotante
const octahedronGeometry = new THREE.OctahedronGeometry(0.6);
const octahedronMaterial = new THREE.MeshPhongMaterial({
    color: 0x2ecc71,
    shininess: 100,
    specular: 0x88ff88,
    emissive: 0x0d5c2b,
    emissiveIntensity: 0.2
});
const octahedron = new THREE.Mesh(octahedronGeometry, octahedronMaterial);
octahedron.position.set(3, 1, 0);
octahedron.castShadow = true;
composition.add(octahedron);

scene.add(composition);

// Plano base para recibir sombras
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0x1a1a2e,
    roughness: 0.8,
    metalness: 0.2
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -4;
plane.receiveShadow = true;
scene.add(plane);

// ===== FUNCIÓN DE ANIMACIÓN =====
let time = 0;

function animate() {
    requestAnimationFrame(animate);
    
    time += 0.01;

    // Rotación de la composición principal
    composition.rotation.y += 0.005;

    // Rotaciones individuales con velocidades diferentes
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.02;
    sphere.rotation.z += 0.01;

    cone.rotation.y -= 0.015;
    cone.rotation.x += 0.005;

    torus.rotation.z += 0.008;

    octahedron.rotation.x += 0.03;
    octahedron.rotation.y += 0.02;
    
    // Movimiento orbital del octaedro
    octahedron.position.x = Math.cos(time) * 3;
    octahedron.position.z = Math.sin(time) * 3;
    octahedron.position.y = 1 + Math.sin(time * 2) * 0.5;

    // Movimiento de las luces puntuales
    pointLight.position.x = Math.cos(time * 0.5) * 4;
    pointLight.position.z = Math.sin(time * 0.5) * 4;

    pointLight2.position.x = Math.sin(time * 0.7) * 4;
    pointLight2.position.z = Math.cos(time * 0.7) * 4;

    // Oscilación vertical de la cámara
    camera.position.y = 4 + Math.sin(time * 0.3) * 0.5;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

// ===== RESPONSIVE =====
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar animación
animate();