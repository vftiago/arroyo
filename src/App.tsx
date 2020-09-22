import React, { useEffect } from "react";
import * as THREE from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
scene.add(cube);

function App() {
  useEffect(() => {
    camera.position.z = 2;

    window.addEventListener("resize", onWindowResize, false);
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    }

    const stats = Stats();
    document.body.appendChild(stats.dom);

    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      render();

      stats.update();
    };

    function render() {
      stats.begin();
      renderer.render(scene, camera);
      stats.end();
    }

    animate();
  });

  return (
    <div>
    </div>
  );
}

export default App;
