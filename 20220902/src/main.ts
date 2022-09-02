import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 描画先のDOM指定
const root = document.querySelector<HTMLElement>('#canvas-container');

const width = window.innerWidth;
const height = window.innerHeight;

// シーンの初期化
const scene = new THREE.Scene();

// オブジェクトの初期化（ジオメトリ + メッシュ）
const geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
const material = new THREE.MeshNormalMaterial();
// const material = new THREE.MeshStandardMaterial();
const mesh = new THREE.Mesh( geometry, material );

// 座表軸
const axes = new THREE.AxesHelper();

// シーツにオブジェクトを追加
scene.add(mesh, axes);

// カメラの初期化
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(scene.position);

// レンダラーの初期化
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0xffffff, 1.0); // 背景色
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// カメラコントローラー設定
// const orbitControls = new OrbitControls(camera, renderer.domElement);
// orbitControls.maxPolarAngle = Math.PI * 0.5;
// orbitControls.minDistance = 0.1;
// orbitControls.maxDistance = 100;
//orbitControls.autoRotate = true;  // カメラの自動回転設定
//orbitControls.autoRotateSpeed = 1.0;  // カメラの自動回転速度

// レンダラーをDOMに追加
root!.appendChild(renderer.domElement);
// メモ: 「!」はnullでないことを明示的に宣言している
// ref. https://zenn.dev/kanachan/articles/0fe893b105fa24

// 描画ループ開始
renderer.setAnimationLoop((time: DOMHighResTimeStamp) => {
  // mesh.rotation.x = time / 2000;
  // mesh.rotation.y = time / 1000;

  // カメラコントローラーを更新
  //orbitControls.update();

  // 描画する
  renderer.render(scene, camera);
});