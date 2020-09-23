precision highp float;

uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;

varying vec2 vUv;

const float duration = 8.0;
const float delay = 4.0;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d)

float random(vec2 c){
  return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 convertRgbToHsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
  float now = clamp((time - delay) / duration, 0.0, 1.0);

  // ホワイトノイズ
  float whiteNoise = random(vUv.xy * time) * 0.1 - 0.1;

  // モニターエフェクト
  float monitor1 = abs(sin(vUv.y * resolution.y * 2.4 + time * 10.0)) * 0.04;
  float monitor2 = abs(sin(vUv.y * resolution.y * 1.0 + time * 3.0)) * 0.04;
  float monitor = monitor1 - monitor2;

  // ヴィネット
  float vignetteMask = smoothstep(0.8, 1.4, length(vUv * 2.0 - 1.0));
  vec3 vignetteColor = convertHsvToRgb(vec3(0.5 + (vUv.x + vUv.y) / 40.0 + time * 0.1, 0.4, 1.0));
  vec3 vignette = vignetteMask * vignetteColor * 0.1;

  // RGBズレ
  float r = texture2D(texture, vUv - vec2(2.0, 0.0) / resolution).r;
  float g = texture2D(texture, vUv).g;
  float b = texture2D(texture, vUv + vec2(2.0, 0.0) / resolution).b;

  gl_FragColor = vec4((vec3(r, g, b) + whiteNoise) + monitor + vignette, 1.0);
}