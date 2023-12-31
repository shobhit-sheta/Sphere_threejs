import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";


//Scene
const scene = new THREE.Scene();

// Create our Sphere

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

gltfLoader.load(
  'car.glb',
  (gltf)=>{
    scene.add(gltf.scene)
  }
)

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// light
const light = new THREE.PointLight(0xfffff, 1, 100);
light.position.set(0, 10, 10);
light.intensity = 1.25
scene.add(light);

// Camera
const camera = new THREE.PerspectiveCamera(
  15,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);




// renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5);
// document.body.appendChild( renderer.domElement );
renderer.render(scene, camera);

//controls
const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true
// controls.enablePan = false;
// controls.enableZoom = false
controls.autoRotate = true;

// controls.autoRotateSpeed = 5
controls.keys = {
	LEFT: 'ArrowLeft', //left arrow
	UP: 'ArrowUp', // up arrow
	RIGHT: 'ArrowRight', // right arrow
	BOTTOM: 'ArrowDown' // down arrow
}
// controls.mouseButtons = {
// 	LEFT: THREE.MOUSE.ROTATE,
// 	MIDDLE: THREE.MOUSE.DOLLY,
// 	RIGHT: THREE.MOUSE.PAN
// }
controls.touches = {
	ONE: THREE.TOUCH.ROTATE,
	TWO: THREE.TOUCH.DOLLY_PAN
}


canvas.addEventListener('mouseenter', function() {
  controls.autoRotate = false;
});

// Add an event listener for when the mouse leaves the object
canvas.addEventListener('mouseleave', function() {
  controls.autoRotate = true;
});



// Resize
window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

//loop
const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
  controls.update(loop);
};
loop();

// Timeline magic

const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });

// Mouse Animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => (mouseDown = true))
window.addEventListener("mouseup", () => (mouseDown = false))

// window.addEventListener("mousemove", (e) => {
//   if (mouseDown) {
//     rgb = [
//       Math.round((e.pageX / sizes.width) * 255),
//       Math.round((e.pageY / sizes.height) * 255),
//       150,
//     ]
//     // Let's animate
//     let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
//     gsap.to(mesh.material.color, {
//       r: newColor.r,
//       g: newColor.g,
//       b: newColor.b,
//     })
//   }
// })

