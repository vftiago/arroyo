import * as THREE from "three";

import fragmentShader from "./glsl/titleObject.frag";
import vertexShader from "./glsl/titleObject.vert";

const Logo = (textureValue: THREE.Texture) => {
    const uniforms = {
        time: {
            type: "f",
            value: 0,
        },
        resolution: {
            type: "v2",
            value: new THREE.Vector2(),
        },
        texture: {
            type: "t",
            value: textureValue,
            magFilter: THREE.NearestFilter,
            minFilter: THREE.NearestFilter,
        },
    };

    const geometry = new THREE.CircleBufferGeometry(150, 60);

    const material = new THREE.RawShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
    });

    return {
        mesh: new THREE.Mesh(geometry, material),
        material,
    };
};

export default Logo;
