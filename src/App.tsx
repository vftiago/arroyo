import React, { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import PostEffect from "./PostEffect";


function App() {
  useEffect(() => {
    const clock = new Clock();

    // cube
    const backgroundScene = new THREE.Scene();
    const backgroundCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
    backgroundScene.add(cube)

    // post
    const foregroundScene = new THREE.Scene();
    const foregroundCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const foregroundRenderer = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
    const postEffect = new PostEffect(foregroundRenderer.texture);
    foregroundScene.add(postEffect.obj);

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111, 1.0);

    document.body.appendChild(renderer.domElement);
  
    backgroundCamera.position.z = 2;
    foregroundCamera.position.z = 2;

    const stats = Stats();
    document.body.appendChild(stats.dom);

    var renderLoop = function () {
      requestAnimationFrame(renderLoop);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      render();
    };

    const render = () => {
      stats.begin();
      const time = clock.getDelta();
      
      renderer.setRenderTarget(foregroundRenderer);
      renderer.render(backgroundScene, backgroundCamera);
      postEffect.render(time);
      renderer.setRenderTarget(null);
      renderer.render(foregroundScene, foregroundCamera);

      stats.end();
    }

    clock.start();

    renderLoop();
  });

  return (
    <React.Fragment />
  );
}

export default App;
