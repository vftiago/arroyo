import * as THREE from "three";

import fragmentShader from "./glsl/waves.frag";
import vertexShader from "./glsl/waves.vert";

const Waves = () => {
    const uniforms = {
        time: {
            type: "f",
            value: 0,
        },
    };

    return new THREE.Mesh(
        new THREE.PlaneBufferGeometry(2048, 2048, 64, 64),
        new THREE.RawShaderMaterial({
            uniforms,
            vertexShader,
            fragmentShader,
            transparent: true,
            wireframe: true,
        }),
    );
};

export default Waves;
