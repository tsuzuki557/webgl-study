import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 描画先のDOM指定
const root = document.querySelector<HTMLElement>('#canvas-container');

const width = window.innerWidth;
const height = window.innerHeight;

// シーンの初期化
const scene = new THREE.Scene();

// メッシュの初期化（ ジオメトリ + マテリアル )
// 形: 平面や球体
const geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
//const geometry = new THREE.PlaneGeometry( 1, 1 );
//const geometry = new THREE.CapsuleGeometry(4.0, 1.0, 10.0, 3.0);
// 色や画像
const material = new THREE.MeshNormalMaterial({
  wireframe: false,
  //transparent: true,
  //opacity: 0.5,
});
// const material = new THREE.MeshStandardMaterial();
//const material = new THREE.MeshBasicMaterial({color: '#00f'});
const mesh = new THREE.Mesh( geometry, material );

// ref. https://threejs.org/docs/index.html#api/en/geometries/EdgesGeometry
// const edges = new THREE.EdgesGeometry( geometry );
// const line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x0ff } ) );
// scene.add(line);


// 座表軸
const axes = new THREE.AxesHelper();

// シーツにオブジェクトを追加
scene.add(mesh, axes);

// カメラの初期化
const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 1000);
camera.position.set(1, 1, 1);
//camera.lookAt(scene.position);

// レンダラーの初期化
const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setClearColor(0xffffff, 1.0); // 背景色
//renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);

// カメラコントローラー設定
const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.maxPolarAngle = Math.PI * 0.5;
orbitControls.minDistance = 0.1;
orbitControls.maxDistance = 100;
orbitControls.enableDamping = true; // 慣性が働く
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

  // カメラコントローラーを更新（※enableDamping、autoRotateを使う時にupdateの設定が必要）
  orbitControls.update();

  // 描画する
  renderer.render(scene, camera);
});