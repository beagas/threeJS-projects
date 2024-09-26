import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { getFresnelMat } from "./getFresnelMat.js";
import { renderControls } from "./GUI.js";
import { createStarGroup } from "./stars.js";

let scene, camera, renderer, earthGroup, dayNight, cloudsMesh, fresnelMesh;

const dayMapJPG = './00_earthmap1k.jpg';
const nightMapJPG = './earth_lights_lrg.jpg';
const cloudMapJPG = './05_earthcloudmaptrans.jpg';
let sunLight = new THREE.Vector3(20, 20, 20);
const rimHex = 0x4bc5c4;
const facingHex = 0x000000;
let starGroup = new THREE.Group();
let numOfStars = 50000;

export function initScene() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    document.body.appendChild(renderer.domElement);

    scene = new THREE.Scene();
    const fov = 75;
    const aspect = w / h;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 3;
}

export function createEarth(dayMapJPG, nightMapJPG) {
    const textureLoader = new THREE.TextureLoader();
    const dayMap = textureLoader.load(dayMapJPG);
    const nightMap = textureLoader.load(nightMapJPG);

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            dayTexture: { value: dayMap },
            nightTexture: { value: nightMap },
            lightDirection: { value: sunLight },
        },
        vertexShader: `
            varying vec2 vUv;
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
                vUv = uv;
                vNormal = normalize(normalMatrix * normal);
                vPosition = vec3(modelViewMatrix * vec4(position, 1.0));
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform sampler2D dayTexture;
            uniform sampler2D nightTexture;
            uniform vec3 lightDirection;
            varying vec2 vUv;
            varying vec3 vNormal;
            void main() {
                vec3 lightDir = normalize(lightDirection);
                float lightIntensity = dot(vNormal, lightDir);
                lightIntensity = clamp(lightIntensity, 0.0, 1.0);
                vec4 dayColor = texture2D(dayTexture, vUv);
                vec4 nightColor = texture2D(nightTexture, vUv);
                vec4 finalColor = mix(nightColor, dayColor, lightIntensity);
                gl_FragColor = finalColor;
            }
        `,
        side: THREE.DoubleSide,
    });

    earthGroup = new THREE.Group();
    earthGroup.rotation.z = -23.4 * Math.PI / 180;

    dayNight = new THREE.Mesh(geometry, material);
    earthGroup.add(dayNight);

    scene.add(earthGroup);
}

export function createGlow(rimHex, facingHex) {
    const fresnelMat = getFresnelMat({ rimHex: rimHex, facingHex: facingHex });
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    fresnelMesh = new THREE.Mesh(geometry, fresnelMat);
    fresnelMesh.scale.set(1.001, 1.001, 1.001);
    earthGroup.add(fresnelMesh);
}

export function createClouds(cloudMapJPG) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const textureLoader = new THREE.TextureLoader();
    const cloudMap = textureLoader.load(cloudMapJPG);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudMap,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
    });

    cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.set(1.02, 1.02, 1.02);
    earthGroup.add(cloudsMesh);
}

export function createStars(numOfStars) {
    if (starGroup) {
        scene.remove(starGroup);
    }
    starGroup = createStarGroup(numOfStars);
    scene.add(starGroup);
}
export function initControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
}

export function animate() {
    requestAnimationFrame(animate);

    dayNight.rotation.y += 0.0005;
    cloudsMesh.rotation.y -= 0.0003;

    renderer.render(scene, camera);
}

window.addEventListener("load", init);

export function init() {
    initScene();
    createEarth(dayMapJPG, nightMapJPG);
    createGlow(rimHex, facingHex);
    createClouds(cloudMapJPG);
    createStars(numOfStars);
    initControls();
    animate();
    renderControls({ cloudsMesh, sunLight, createStars, fresnelMesh });
}

