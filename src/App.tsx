import React, { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import PostEffect from "./PostEffect";


function App() {
  const clock = new Clock();

  // barbelith
  const barbelithScene = new THREE.Scene();
  const barbelithCamera = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);
  const renderer = new THREE.WebGLRenderer({
    antialias: false,
  });
  const geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
  const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
  });
  const cube: THREE.Mesh = new THREE.Mesh(geometry, material);

  // post
  const postEffectScene = new THREE.Scene();
  const postEffectCamera = new THREE.PerspectiveCamera(45, document.body.clientWidth / window.innerHeight, 1, 10000);
  const postEffectRenderer = new THREE.WebGLRenderTarget(document.body.clientWidth, window.innerHeight);
  const postEffect = new PostEffect(postEffectRenderer.texture);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  barbelithScene.add(cube);

  useEffect(() => {
    barbelithCamera.position.z = 2;

    const stats = Stats();
    document.body.appendChild(stats.dom);

    var renderLoop = function () {
      requestAnimationFrame(renderLoop);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      render();

      stats.update();
    };

    const render = () => {
      stats.begin();
      const time = clock.getDelta();

      renderer.setRenderTarget(postEffectRenderer);
      renderer.render(postEffectScene, postEffectCamera);
      postEffect.render(time);
      renderer.setRenderTarget(null);
      renderer.render(barbelithScene, barbelithCamera);

      stats.end();
    }

    const init = () => {
      renderer.setSize(document.body.clientWidth, window.innerHeight);
      renderer.setClearColor(0x111111, 1.0);
      postEffectCamera.position.z = 800;
  
      barbelithScene.add(postEffect.obj);
  
      clock.start();
  
      renderLoop();
    }

    init();
  });

  return (
    <div>
    </div>
  );
}

export default App;
