import * as glsl from 'glslify'
import THREE from 'three';

const fragmentShader = glsl.file('./glsl/fragmentShader.glsl')
const vertexShader = glsl.file('./glsl/vertexShader.glsl')

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
    console.log(vertexShader);

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
