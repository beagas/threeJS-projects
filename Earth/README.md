<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Earth Visualization using Three.js - README</title>
</head>
<body>

    <h1>3D Earth Visualization using Three.js</h1>

    <h2>Project Overview</h2>
    <p>
        This project is a 3D Earth visualization built using <strong>Three.js</strong>, a popular 3D rendering library in JavaScript.
        The Earth is rendered with day and night textures, cloud layers, and a glowing atmosphere. Users can interact with the Earth
        using <strong>OrbitControls</strong>, allowing them to rotate and zoom into the globe. Additionally, a starfield surrounds the Earth,
        giving it a space-like environment.
    </p>

    <h3>Features:</h3>
    <ul>
        <li>Realistic Earth with day and night textures.</li>
        <li>Cloud layer with transparency.</li>
        <li>Fresnel effect glow for the Earth’s atmosphere.</li>
        <li>Starfield background simulating outer space.</li>
        <li>User-interaction with orbit controls to explore the 3D globe.</li>
    </ul>

    <hr>

    <h2>Project Structure</h2>
    <pre>
.
├── index.html          # Entry point for the application.
├── main.js             # Main JavaScript file that initializes the scene.
├── getStarfield.js     # Module for generating a starfield around the Earth.
├── getFresnelMat.js    # Module to create a Fresnel material for the glow effect.
├── textures/           # Folder containing Earth textures (day, night, clouds).
├── shaders/            # Shader files for custom fragment and vertex shaders.
└── README.md           # This file!
    </pre>

    <hr>

    <h2>Live Demo</h2>
    <p>You can see a live demo of this project <a href="#">here</a> (link to the deployment if available).</p>

    <hr>

    <h2>Getting Started</h2>

    <h3>Prerequisites:</h3>
    <p>Before running this project, you need to have:</p>
    <ul>
        <li><strong>Node.js</strong> (for local development with npm)</li>
        <li><strong>A web browser</strong> (latest versions of Chrome, Firefox, Edge, etc.)</li>
    </ul>

    <h3>Installing the Dependencies</h3>
    <p>You need to install a local development server such as <strong>http-server</strong> or <strong>lite-server</strong>.</p>

    <ol>
        <li><strong>Clone the Repository:</strong>
            <pre><code>
git clone https://github.com/yourusername/3d-earth-visualization.git
cd 3d-earth-visualization
            </code></pre>
        </li>
        <li><strong>Install Dependencies:</strong>
            <pre><code>
npm install lite-server --save-dev
            </code></pre>
        </li>
        <li><strong>Run the Project:</strong>
            <pre><code>
npm run start
            </code></pre>
        </li>
        <li>Open the application in your web browser:
            <pre><code>
http://localhost:3000
            </code></pre>
        </li>
    </ol>

    <h3>Usage:</h3>
    <ul>
        <li><strong>Camera Interaction:</strong> You can rotate the Earth by dragging your mouse or using touch controls. Zoom in and out with the scroll wheel.</li>
        <li><strong>Day/Night Transition:</strong> The Earth automatically transitions between day and night views as it rotates.</li>
        <li><strong>Cloud Layer:</strong> The Earth is surrounded by a semi-transparent cloud layer that rotates independently.</li>
    </ul>

    <hr>

    <h2>Customization</h2>

    <h3>Textures:</h3>
    <ul>
        <li><strong>Day Texture:</strong> Located in <code>./textures/00_earthmap1k.jpg</code>.</li>
        <li><strong>Night Texture:</strong> Located in <code>./textures/earth_lights_lrg.jpg</code>.</li>
        <li><strong>Cloud Texture:</strong> Located in <code>./textures/05_earthcloudmaptrans.jpg</code>.</li>
    </ul>

    <h3>Starfield:</h3>
    <p>The starfield around the Earth can be customized by modifying the number of stars or their distribution. Check the <code>getStarfield.js</code> file to tweak the star generation parameters.</p>

    <hr>

    <h2>Project Breakdown</h2>
    <ol>
        <li><strong>Scene Initialization (<code>initScene</code>):</strong> Sets up the Three.js renderer, camera, and scene.</li>
        <li><strong>Earth Creation (<code>createEarth</code>):</strong> Loads the day and night textures and applies them using a custom shader. Adds the Earth to a group to allow for flexible rotation.</li>
        <li><strong>Cloud Layer (<code>createClouds</code>):</strong> Adds a transparent cloud layer using a standard material with additive blending.</li>
        <li><strong>Glow Effect (<code>createGlow</code>):</strong> Adds a Fresnel-based glow around the Earth to simulate the atmospheric effect.</li>
        <li><strong>Starfield (<code>createStars</code>):</strong> Creates a field of stars around the Earth using points with randomly generated positions.</li>
        <li><strong>Orbit Controls:</strong> Allows the user to rotate and zoom the Earth for exploration.</li>
    </ol>

    <hr>

    <h2>Unit Testing</h2>
    <p>This project uses <strong>Jest</strong> for unit testing. Tests are located in the <code>__tests__</code> folder and cover the creation of the Earth, starfield, and materials.</p>

    <h3>Running Tests</h3>
    <pre><code>
npm test
    </code></pre>

    <hr>

    <h2>Future Improvements</h2>
    <ul>
        <li><strong>Higher-resolution textures:</strong> Implement better quality maps for day, night, and clouds for higher fidelity.</li>
        <li><strong>Dynamic Lighting:</strong> Make the sun position dynamic, simulating real-time lighting changes.</li>
        <li><strong>Atmospheric Effects:</strong> Add more complex shaders to simulate atmospheric scattering.</li>
        <li><strong>Performance Optimizations:</strong> Use lower-resolution assets on mobile for better performance.</li>
    </ul>

    <hr>

    <h2>Contributing</h2>
    <p>Contributions, issues, and feature requests are welcome! Feel free to check out the <a href="#">issues page</a> or submit a pull request.</p>

    <hr>

    <h2>License</h2>
    <p>This project is licensed under the MIT License - see the <code>LICENSE</code> file for details.</p>

    <hr>

    <h2>Contact</h2>
    <p>If you have any questions or feedback, feel free to reach out via <a href="mailto:your-email@example.com">your-email@example.com</a>.</p>

</body>
</html>
