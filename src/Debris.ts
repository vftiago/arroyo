import * as THREE from "three";

import fragmentShader from "./glsl/debris.frag";
import vertexShader from "./glsl/debris.vert";

const size = 100;

const Debirs = () => {
    const uniforms = {
        time: {
            type: "f",
            value: 0,
        },
        rotate: {
            type: "f",
            value: Math.random() * 10,
        },
    };

    const geometry = new THREE.BoxBufferGeometry(size, size, size);

    const material = new THREE.RawShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
        wireframe: true,
    });

    return {
        mesh: new THREE.Mesh(geometry, material),
        material,
    };
};

export default Debirs;
