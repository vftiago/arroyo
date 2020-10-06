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

    // this.obj.position.set(0, -200, 0);
    // this.obj.rotation.set((-90 * Math.PI / 180), 0, 0);

    return new THREE.Mesh(
        new THREE.PlaneBufferGeometry(1024, 1024, 32, 32),
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
