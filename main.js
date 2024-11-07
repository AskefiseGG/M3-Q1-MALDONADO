import * as THREE from 'three';

// Scene and Camera Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 3, 5); 

// Renderer Setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; 
document.body.appendChild(renderer.domElement);

// Load Textures
const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('textures/stone_wall.jpg');
const floorTexture = textureLoader.load('textures/concrete_floor.jpg');
const ironBarTexture = textureLoader.load('textures/iron_bar.jpg');
const steelFrameTexture = textureLoader.load('textures/steel_frame.jpg');
const windowTexture = textureLoader.load('textures/window_texture.jpg');
const concreteBedframeTexture = textureLoader.load('textures/concrete_bedframe.jpg');
const mattressTexture = textureLoader.load('textures/mattress_texture.jpg');
const concretePillowTexture = textureLoader.load('textures/concrete_pillow.jpg');
const toiletTexture = textureLoader.load('textures/toilet_texture.jpg'); 
const bunkbedPoleTexture = textureLoader.load('textures/bunkbed_pole_texture.jpg'); 

// Create Walls with Textures
const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
const wallGeometry = new THREE.BoxGeometry(10, 5, 0.1);

// Back Wall
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 2.5, -5);
scene.add(wall1);

// Left Wall
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.rotation.y = Math.PI / 2;
wall2.position.set(-5, 2.5, 0);
scene.add(wall2);

// Right Wall
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.rotation.y = -Math.PI / 2;
wall3.position.set(5, 2.5, 0);
scene.add(wall3);

// Front Wall
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.position.set(0, 2.5, 5);
scene.add(wall4);

// Floor
const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true; 
scene.add(floor);

// Add Window with Texture
try {
    const windowGeometry = new THREE.PlaneGeometry(2, 1.2);
    const windowMaterial = new THREE.MeshStandardMaterial({ map: windowTexture, transparent: true, opacity: 0.8 });
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(0, 3.5, -4.95); 
    scene.add(window);

    // Add Bars to Window with Iron Texture
    const barGeometry = new THREE.BoxGeometry(0.13, 1.2, 0.05);
    const barMaterial = new THREE.MeshStandardMaterial({ map: ironBarTexture });

    for (let i = -0.9; i <= 0.9; i += 0.45) {
        const bar = new THREE.Mesh(barGeometry, barMaterial);
        bar.position.set(i, 3.5, -4.92); 
        bar.castShadow = true; 
        scene.add(bar);
    }

    // Add Steel Frame around Window
    const frameMaterial = new THREE.MeshStandardMaterial({ map: steelFrameTexture });

    // Top Frame
    const topFrameGeometry = new THREE.BoxGeometry(2.1, 0.1, 0.1);
    const topFrame = new THREE.Mesh(topFrameGeometry, frameMaterial);
    topFrame.position.set(0, 4.1, -4.92); 
    topFrame.castShadow = true; 
    scene.add(topFrame);

    // Bottom Frame
    const bottomFrameGeometry = new THREE.BoxGeometry(2.1, 0.1, 0.1);
    const bottomFrame = new THREE.Mesh(bottomFrameGeometry, frameMaterial);
    bottomFrame.position.set(0, 2.9, -4.92); 
    bottomFrame.castShadow = true; 
    scene.add(bottomFrame);

    // Left Frame
    const leftFrameGeometry = new THREE.BoxGeometry(0.1, 1.3, 0.1);
    const leftFrame = new THREE.Mesh(leftFrameGeometry, frameMaterial);
    leftFrame.position.set(-1.05, 3.5, -4.92); 
    leftFrame.castShadow = true;
    scene.add(leftFrame);

    // Right Frame
    const rightFrameGeometry = new THREE.BoxGeometry(0.1, 1.3, 0.1);
    const rightFrame = new THREE.Mesh(rightFrameGeometry, frameMaterial);
    rightFrame.position.set(1.05, 3.5, -4.92); 
    rightFrame.castShadow = true;
    scene.add(rightFrame);
} catch (e) {
    console.error("Error adding the window, bars, or frame:", e);
}

// Lighting Setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(2, 5, 3);
pointLight.castShadow = true;
scene.add(pointLight);

// Add Ceiling Light
const ceilingLight = new THREE.PointLight(0xfff1b8, 15, 50); 
ceilingLight.position.set(0, 3.3, -3); 
ceilingLight.castShadow = true;
scene.add(ceilingLight);

// Create Bunk Bed with Concrete Bedframe Texture, Mattress Texture, and Concrete Pillow Texture
function createBunkBed() {
    // Bedframe Geometry and Material
    const bedGeometry = new THREE.BoxGeometry(2, 0.5, 4);
    const bedMaterial = new THREE.MeshStandardMaterial({ map: concreteBedframeTexture, roughness: 0.8, metalness: 0.1 });

    // Bottom Bed
    const bottomBed = new THREE.Mesh(bedGeometry, bedMaterial);
    bottomBed.position.set(-4.0, 0.25, -2.5); 
    bottomBed.castShadow = true;
    scene.add(bottomBed);

    // Top Bed
    const topBed = new THREE.Mesh(bedGeometry, bedMaterial);
    topBed.position.set(-4.0, 2.0, -2.5); 
    topBed.castShadow = true;
    scene.add(topBed);

    // Mattress Geometry and Material
    const mattressGeometry = new THREE.BoxGeometry(1.9, 0.25, 3.8);
    const mattressMaterial = new THREE.MeshStandardMaterial({ map: mattressTexture, color: 0x00b3b3, roughness: 0.7 });

    // Bottom Mattress
    const bottomMattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    bottomMattress.position.set(-4.0, 0.625, -2.5); 
    bottomMattress.castShadow = true;
    scene.add(bottomMattress);

    // Top Mattress
    const topMattress = new THREE.Mesh(mattressGeometry, mattressMaterial);
    topMattress.position.set(-4.0, 2.375, -2.5); 
    topMattress.castShadow = true;
    scene.add(topMattress);

    // Pillow Geometry and Material
    const pillowGeometry = new THREE.BoxGeometry(1, 0.2, 0.6);
    const pillowMaterial = new THREE.MeshStandardMaterial({ map: concretePillowTexture, roughness: 0.6 });

    // Bottom Pillow
    const bottomPillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    bottomPillow.position.set(-4.0, 0.74, -3.7); 
    bottomPillow.castShadow = true;
    scene.add(bottomPillow);

    // Top Pillow
    const topPillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
    topPillow.position.set(-4.0, 2.49, -3.7); 
    topPillow.castShadow = true;
    scene.add(topPillow);

    // Support Poles for Bunk Bed
    const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 3, 16);
    const poleMaterial = new THREE.MeshStandardMaterial({ map: bunkbedPoleTexture, roughness: 0.6 });

    // Four Support Poles
    const pole1 = new THREE.Mesh(poleGeometry, poleMaterial);
    pole1.position.set(-3.0, 1, -0.5);
    pole1.castShadow = true;
    scene.add(pole1);

    const pole2 = new THREE.Mesh(poleGeometry, poleMaterial);
    pole2.position.set(-5.0, 1, -0.5);
    pole2.castShadow = true;
    scene.add(pole2);

    const pole3 = new THREE.Mesh(poleGeometry, poleMaterial);
    pole3.position.set(-3.0, 1, -4.2);
    pole3.castShadow = true;
    scene.add(pole3);

    const pole4 = new THREE.Mesh(poleGeometry, poleMaterial);
    pole4.position.set(-5.0, 1, -4.2);
    pole4.castShadow = true;
    scene.add(pole4);
}

createBunkBed();

// Create Toilet and Sink
function createBathroomFixtures() {
    // Toilet
    const toiletBowlGeometry = new THREE.CylinderGeometry(0.4, 0.3, 0.9, 32);
    const toiletBowlMaterial = new THREE.MeshStandardMaterial({ map: toiletTexture, roughness: 0.8 }); 
    const toiletBowl = new THREE.Mesh(toiletBowlGeometry, toiletBowlMaterial);
    toiletBowl.position.set(2.5, 0.4, -4.5);
    toiletBowl.castShadow = true;
    scene.add(toiletBowl);

    const toiletSeatGeometry = new THREE.CircleGeometry(0.4, 32);
    const toiletSeatMaterial = new THREE.MeshStandardMaterial({ color: 0x404040, roughness: 0.6 });
    const toiletSeat = new THREE.Mesh(toiletSeatGeometry, toiletSeatMaterial);
    toiletSeat.position.set(2.5, 1.2, -4.7);
    toiletSeat.rotation.x = -Math.PI / 180;
    toiletSeat.castShadow = true;
    scene.add(toiletSeat);

    const toiletHoleGeometry = new THREE.CircleGeometry(0.2, 32);
    const toiletHoleMaterial = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.6 });
    const toiletHole = new THREE.Mesh(toiletHoleGeometry, toiletHoleMaterial);
    toiletHole.position.set(2.5, 0.855, -4.45);
    toiletHole.rotation.x = -Math.PI / 2;
    toiletHole.castShadow = true;
    scene.add(toiletHole);

    // Sink
    const sinkBasinGeometry = new THREE.BoxGeometry(1, 0.2, 0.5);
    const sinkBasinMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.8 });
    const sinkBasin = new THREE.Mesh(sinkBasinGeometry, sinkBasinMaterial);
    sinkBasin.position.set(3.7, 1.5, -3.5);
    sinkBasin.castShadow = true;
    scene.add(sinkBasin);

    const sinkHoleGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.3);
    const sinkHoleMaterial = new THREE.MeshStandardMaterial({ color: 0x262626, roughness: 0.8 });
    const sinkHole = new THREE.Mesh(sinkHoleGeometry, sinkHoleMaterial);
    sinkHole.position.set(3.7, 1.6, -3.5);
    sinkHole.castShadow = true;
    scene.add(sinkHole);

    const sinkStandGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.2, 32);
    const sinkStandMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.6 });
    const sinkStand = new THREE.Mesh(sinkStandGeometry, sinkStandMaterial);
    sinkStand.position.set(3.7, 0.8, -3.5);
    sinkStand.castShadow = true;
    scene.add(sinkStand);

    // Faucet
    const faucetBaseGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.1, 16);
    const faucetBaseMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.4 });
    const faucetBase = new THREE.Mesh(faucetBaseGeometry, faucetBaseMaterial);
    faucetBase.position.set(3.85, 1.63, -4);
    faucetBase.castShadow = true;
    scene.add(faucetBase);

    const faucetPipeGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.3, 16);
    const faucetPipeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.4 });
    const faucetPipe = new THREE.Mesh(faucetPipeGeometry, faucetPipeMaterial);
    faucetPipe.position.set(3.85, 1.75, -4);
    faucetPipe.rotation.x = -Math.PI / 2;
    faucetPipe.castShadow = true;
    scene.add(faucetPipe);

    const faucetSpoutGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.3, 16);
    const faucetSpoutMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.4 });
    const faucetSpout = new THREE.Mesh(faucetSpoutGeometry, faucetSpoutMaterial);
    faucetSpout.position.set(3.85, 1.6, -4);
    faucetSpout.castShadow = true;
    scene.add(faucetSpout);
}

createBathroomFixtures();

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle Window Resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
