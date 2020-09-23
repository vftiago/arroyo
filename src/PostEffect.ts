import * as THREE from 'three';

import fragmentShader from './glsl/fragmentShader.frag';
import vertexShader from './glsl/vertexShader.vert';

export default class PostEffect {
    uniforms: any;
    obj: any;
    time: number;

  constructor(texture: any) {
    this.uniforms = {
      time: {
        type: 'f',
        value: 0,
      },
      resolution: {
        type: 'v2',
        value: new THREE.Vector2(document.body.clientWidth, window.innerHeight),
      },
      texture: {
        type: 't',
        value: texture
      }
    };
    this.obj = this.createObj();
    this.time = 1;
  }


  createObj() {
    return new THREE.Mesh(
      new THREE.PlaneBufferGeometry(2, 2),
      new THREE.RawShaderMaterial({
        uniforms: this.uniforms,
        vertexShader,
        fragmentShader
      })
    );
  }
  render(time: number) {
    this.uniforms.time.value += time * this.time;
  }
  resize() {
    this.uniforms.resolution.value.set(document.body.clientWidth, window.innerHeight);
  }
}
