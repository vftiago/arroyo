import React, { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import PostEffect from "./PostEffect";


function App() {
  useEffect(() => {
    const clock = new Clock();

    // cube
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
    const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    const cube: THREE.Mesh = new THREE.Mesh(geometry, material);
    scene.add(cube)
  
    // post
    const postEffectScene = new THREE.Scene();
    const postEffectCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const postEffectRenderer = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
    const postEffect = new PostEffect(postEffectRenderer.texture);

    // renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x111111, 1.0);

    document.body.appendChild(renderer.domElement);
  
    camera.position.z = 2;
    postEffectCamera.position.z = 2;

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
      
      renderer.render(scene, camera);
      renderer.setRenderTarget(postEffectRenderer);
      renderer.render(postEffectScene, postEffectCamera);
      postEffect.render(time);
      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      stats.end();
    }
    // scene.add(postEffect.obj);

    clock.start();

    renderLoop();
  });

  return (
    <React.Fragment />
  );
}

export default App;
