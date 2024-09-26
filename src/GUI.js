import { Color } from 'three';
import initializeGUI from './initiliazeGUI.js';

// @ts-ignore
const gui = await initializeGUI();

const rimHex = 0x4bc5c4;

export function renderControls({ cloudsMesh, sunLight, createStars, fresnelMesh }) {
    controlCloudRotation(cloudsMesh);
    controlSun(sunLight);
    controlNumOfStars(createStars);
    controlGlowColor(fresnelMesh);
}

export function controlCloudRotation(cloudsMesh) {
    const cloudsFolder = gui.addFolder("Clouds");
    cloudsFolder.add(cloudsMesh.rotation, 'x', -0.5, Math.PI * 2).name('Rotate X Axis');
    cloudsFolder.add(cloudsMesh.rotation, 'y', -0.5, Math.PI * 2).name('Rotate Y Axis');
    cloudsFolder.add(cloudsMesh.rotation, 'z', -0.5, Math.PI * 2).name('Rotate Z Axis');
    cloudsFolder.open();
}

export function controlSun(sunLight) {
    const lightParams = {
        isLightOn: true
    };

    gui.add(lightParams, 'isLightOn').name('Sun Light').onChange((value) => {
        if (value) {
            sunLight.set(20, 20, 20);
        } else {
            sunLight.set(0, 0, 0);
        }
    });
}

export function controlNumOfStars(createStars) {
    const starParams = {
        exampleProperty: 50000
    };
    gui.add(starParams, 'exampleProperty', 0, 50000).name('Number of Stars').step(10000).onChange((value) => {
        createStars(value); // Call createStars with the new number of stars
    });
}

export function controlGlowColor(fresnelMesh) {
    fresnelMesh.rimHex = new Color(rimHex);

    const glowParams = {
        GlowColor: `#${fresnelMesh.rimHex.getHexString()}`
    };

    gui.addColor(glowParams, 'GlowColor').name("Color of Glow").onChange((value) => {
        fresnelMesh.rimHex.set(value);
        fresnelMesh.material.uniforms.color1.value.set(fresnelMesh.rimHex);
        fresnelMesh.material.needsUpdate = true;
    });
}
