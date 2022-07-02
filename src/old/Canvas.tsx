// import * as THREE from "three";
// import { BoxBufferGeometry, Clock, Mesh, RawShaderMaterial } from "three";
// // import Stats from "three/examples/jsm/libs/stats.module";
// import PostEffect from "../PostEffect";
// import Debris from "../Debris";
// import Waves from "../Waves";

// const perspectiveCamera = [
//   45,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   10000,
// ];

// const updateMaterialUniformsTimeValue = (
//   material: THREE.RawShaderMaterial,
//   time: number,
// ) => {
//   material.uniforms.time.value += time;
// };

// const Canvas = (textures: THREE.Texture[], canvas: HTMLCanvasElement) => {
//   const clock = new Clock();

//   // renderer
//   const foregroundRenderer = new THREE.WebGLRenderer({
//     antialias: false,
//     canvas,
//   });

//   document.body.appendChild(foregroundRenderer.domElement);

//   const backgroundRenderer = new THREE.WebGLRenderTarget(
//     document.body.clientWidth,
//     window.innerHeight,
//   );

//   // scenes
//   const foregroundScene = new THREE.Scene();
//   const foregroundCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

//   const backgroundScene = new THREE.Scene();
//   const backgroundCamera = new THREE.PerspectiveCamera(...perspectiveCamera);

//   // post
//   const postEffect = new PostEffect(backgroundRenderer.texture);
//   foregroundScene.add(postEffect.obj);

//   // waves
//   const waves = Waves();
//   waves.position.set(0, -200, 0);
//   waves.rotation.set((-90 * Math.PI) / 180, 0, 0);
//   backgroundScene.add(waves);

//   // debris
//   const debrisCoordinates = [
//     { x: 400, y: -500, z: 200 },
//     { x: -350, y: -500, z: -150 },
//     { x: -150, y: -700, z: -150 },
//     { x: -500, y: -900, z: 0 },
//     { x: 100, y: -1100, z: 250 },
//   ];
//   let debris: {
//     mesh: Mesh<BoxBufferGeometry, RawShaderMaterial>;
//     material: RawShaderMaterial;
//   }[] = [];

//   debrisCoordinates.forEach((coordinate, index) => {
//     debris.push(Debris());
//     debris[index].mesh.position.set(coordinate.x, coordinate.y, coordinate.z);
//   });

//   debris.forEach((debris) => {
//     backgroundScene.add(debris.mesh);
//   });

//   // logo.mesh.rotation.set(1, 0, 0);

//   foregroundRenderer.setSize(window.innerWidth, window.innerHeight);
//   foregroundRenderer.setClearColor(0x111111, 1.0);

//   backgroundCamera.position.z = 800;

//   // resize
//   const resizeCanvas = () => {
//     canvas.width = document.body.clientWidth;
//     canvas.height = window.innerHeight;
//     backgroundCamera.aspect = document.body.clientWidth / window.innerHeight;
//     backgroundCamera.updateProjectionMatrix();
//     foregroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
//     backgroundRenderer.setSize(document.body.clientWidth, window.innerHeight);
//     postEffect.resize();
//   };

//   window.addEventListener("resize", resizeCanvas);

//   // scroll
//   const backgroundCameraPosition = { y: 0 };
//   backgroundCamera.position.y = backgroundCameraPosition.y;

//   function updateCamera() {
//     backgroundCamera.position.y = -window.pageYOffset / 2;
//   }

//   window.addEventListener("scroll", updateCamera);

//   // stats
//   // const stats = Stats();
//   // document.body.appendChild(stats.dom);

//   // render
//   const renderLoop = function () {
//     const time = clock.getDelta();
//     render(time);
//     requestAnimationFrame(renderLoop);
//   };

//   const render = (time: number) => {
//     // stats.begin();

//     debris.forEach((debris) => {
//       updateMaterialUniformsTimeValue(debris.material, time);
//     });

//     updateMaterialUniformsTimeValue(waves.material, time);

//     foregroundRenderer.setRenderTarget(backgroundRenderer);
//     foregroundRenderer.render(backgroundScene, backgroundCamera);
//     postEffect.render(time);
//     foregroundRenderer.setRenderTarget(null);
//     foregroundRenderer.render(foregroundScene, foregroundCamera);

//     // stats.end();
//   };

//   clock.start();
//   resizeCanvas();

//   renderLoop();
// };

// export default Canvas;

export {};
