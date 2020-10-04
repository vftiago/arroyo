import React, { useEffect } from "react";
import * as THREE from "three";
import { Clock } from "three";
import Stats from "../node_modules/three/examples/jsm/libs/stats.module.js";
import PostEffect from "./PostEffect";
import Logo from "./Logo";

const perspectiveCamera = [75, window.innerWidth / window.innerHeight, 0.1, 10000];

const Canvas = (props: { texture: THREE.Texture }) => {
    const { texture } = props;

    useEffect(() => {
        const clock = new Clock();

        // scenes
        const backgroundScene = new THREE.Scene();
        const backgroundCamera = new THREE.PerspectiveCamera(...perspectiveCamera);
        const foregroundScene = new THREE.Scene();
        const foregroundCamera = new THREE.PerspectiveCamera(...perspectiveCamera);

        // sphere
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            wireframe: true,
        });
        const sphere: THREE.Mesh = new THREE.Mesh(geometry, material);
        // backgroundScene.add(sphere);

        // logo
        const logo = Logo(texture);
        backgroundScene.add(logo.mesh);

        // post
        const foregroundRenderer = new THREE.WebGLRenderTarget(
            document.body.clientWidth,
            window.innerHeight,
        );
        const postEffect = new PostEffect(foregroundRenderer.texture);
        foregroundScene.add(postEffect.obj);

        // renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: false,
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x111111, 1.0);

        document.body.appendChild(renderer.domElement);

        backgroundCamera.position.z = 6;
        foregroundCamera.position.z = 4;

        // resize
        window.addEventListener("resize", () => {
            backgroundCamera.aspect = document.body.clientWidth / window.innerHeight;
            backgroundCamera.updateProjectionMatrix();
            renderer.setSize(document.body.clientWidth, window.innerHeight);
            postEffect.resize();
        });

        const stats = Stats();
        document.body.appendChild(stats.dom);

        const renderLoop = function () {
            requestAnimationFrame(renderLoop);

            sphere.rotation.x += 0.01;
            sphere.rotation.y += 0.008;

            render();
        };

        const render = () => {
            stats.begin();
            const time = clock.getDelta();

            logo.material.uniforms.time.value += time;
            renderer.setRenderTarget(foregroundRenderer);
            renderer.render(backgroundScene, backgroundCamera);
            postEffect.render(time);
            renderer.setRenderTarget(null);
            renderer.render(foregroundScene, foregroundCamera);

            stats.end();
        };

        clock.start();

        renderLoop();
    }, [texture]);

    return <React.Fragment />;
};

export default Canvas;
