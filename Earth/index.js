import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./getStarfield.js";
import { getFresnelMat } from "./getFresnelMat.js";

let scene, camera, renderer, earthGroup, dayNight, cloudsMesh, fresnelMesh;

const dayMapJPG = './textures/00_earthmap1k.jpg';
const nightMapJPG = './textures/earth_lights_lrg.jpg';
const cloudMapJPG = './textures/05_earthcloudmaptrans.jpg';
const fresnelMat = getFresnelMat();
const numOfStars = 10000;

function initScene() {
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

function createEarth(dayMapJPG, nightMapJPG) {
    const textureLoader = new THREE.TextureLoader();
    const dayMap = textureLoader.load(dayMapJPG); // Day view texture
    const nightMap = textureLoader.load(nightMapJPG); // Night lights texture
    //const cloudMap = textureLoader.load('./textures/04_earthcloudmap.jpg');

    const geometry = new THREE.SphereGeometry(1, 64, 64);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            dayTexture: { value: dayMap },
            nightTexture: { value: nightMap },
            //cloudTexture: { value: cloudMap },
            lightDirection: { value: new THREE.Vector3(45, 20, 20) },
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

function createClouds(cloudMapJPG) {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Strong ambient light
    scene.add(ambientLight);
    const textureLoader = new THREE.TextureLoader();
    const cloudMap = textureLoader.load(cloudMapJPG);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
        map: cloudMap,
        //color: 0xffffff,
        //transparent: true,   // Enable transparency
        opacity: 0.5,        // Adjust opacity
        blending: THREE.AdditiveBlending,
        // side: THREE.DoubleSide,  // Render both sides
    });

    cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
    cloudsMesh.scale.set(1.02, 1.02, 1.02); // Slightly scale up to avoid z-fighting
    earthGroup.add(cloudsMesh);
}

function createGlow(){
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Strong ambient light
    scene.add(ambientLight);

    const geometry = new THREE.SphereGeometry(1, 64, 64);
    fresnelMesh = new THREE.Mesh(geometry, fresnelMat);
    fresnelMesh.scale.set(1.02, 1.02, 1.02);
    earthGroup.add(fresnelMesh);
}

function createStars(numOfStars) {
    const stars = getStarfield({ numStars: numOfStars });
    scene.add(stars);
}

function initControls() {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.03;
}

function animate() {
    requestAnimationFrame(animate);

    dayNight.rotation.y += 0.0005;
    cloudsMesh.rotation.y += 0.0007;
    fresnelMesh.rotation.y += 0.0007;
    renderer.render(scene, camera);
}

function init() {
    initScene();
    createEarth(dayMapJPG, nightMapJPG);
    createClouds(cloudMapJPG);
    createGlow();
    createStars(numOfStars);
    initControls();
    animate();
}

init();
