import React, { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import PostEffect from "./PostEffect";
import Logo from "./Logo";
import Waves from "./Waves";

const perspectiveCamera = [45, window.innerWidth / window.innerHeight, 0.1, 10000];
const orthographicCamera = [-1, 1, 1, -1, 0, 1];

const updateMaterialUniformsTimeValue = (material: THREE.RawShaderMaterial, time: number) => {
    material.uniforms.time.value += time;
};

const Canvas = (props: { texture: THREE.Texture }) => {
    const { texture } = props;

    useEffect(() => {
        const clock = new Clock();

        // renderer
        const foregroundRenderer = new THREE.WebGLRenderer({
            antialias: false,
        });

        document.body.appendChild(foregroundRenderer.domElement);

        const backgroundRenderer = new THREE.WebGLRenderTarget(
            document.body.clientWidth,
            window.innerHeight,
        );

        // scenes
        const foregroundScene = new THREE.Scene();
        const foregroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const backgroundScene = new THREE.Scene();
        const backgroundCamera = new THREE.PerspectiveCamera(...perspectiveCamera);

        // sphere
        // const geometry = new THREE.SphereGeometry(1, 32, 32);
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0x00ff00,
        //     wireframe: true,
        // });
        // const sphere: THREE.Mesh = new THREE.Mesh(geometry, material);
        // backgroundScene.add(sphere);

        // post
        const postEffect = new PostEffect(backgroundRenderer.texture);
        foregroundScene.add(postEffect.obj);

        // waves
        const waves = Waves();
        waves.position.set(0, -200, 0);
        waves.rotation.set((-90 * Math.PI) / 180, 0, 0);
        backgroundScene.add(waves);

        // logo
        const logo = Logo(texture);
        logo.mesh.position.y = 150;
        // logo.mesh.rotation.set(0, 0, 0);

        backgroundScene.add(logo.mesh);

        foregroundRenderer.setSize(window.innerWidth, window.innerHeight);
        foregroundRenderer.setClearColor(0x111111, 1.0);

        backgroundCamera.position.z = 800;
        // backgroundCamera.position.y = 2;
        // foregroundCamera.position.z = 4;

        // resize
        window.addEventListener("resize", () => {
            backgroundCamera.aspect = document.body.clientWidth / window.innerHeight;
            backgroundCamera.updateProjectionMatrix();
            foregroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
            backgroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
            postEffect.resize();
        });

        // stats
        const stats = Stats();
        document.body.appendChild(stats.dom);

        // render
        const renderLoop = function () {
            render();
            requestAnimationFrame(renderLoop);
        };

        const render = () => {
            stats.begin();
            const time = clock.getDelta();

            updateMaterialUniformsTimeValue(logo.material, time);
            updateMaterialUniformsTimeValue(waves.material, time);

            foregroundRenderer.setRenderTarget(backgroundRenderer);
            foregroundRenderer.render(backgroundScene, backgroundCamera);
            postEffect.render(time);
            foregroundRenderer.setRenderTarget(null);
            foregroundRenderer.render(foregroundScene, foregroundCamera);

            stats.end();
        };

        clock.start();

        renderLoop();
    }, [texture]);

    return <React.Fragment />;
};

export default Canvas;
