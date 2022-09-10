import './style.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import GUI from 'lil-gui';

// 描画先のDOM指定
const root = document.querySelector<HTMLElement>('#canvas-container');

const width = window.innerWidth;
const height = window.innerHeight;

// シーンの初期化
const scene = new THREE.Scene();

// メッシュの初期化（ ジオメトリ + マテリアル )
// 形: 平面や球体
const geometry = new THREE.BoxGeometry( 1.0, 1.0, 1.0 );
const material = new THREE.MeshBasicMaterial({color: '#00f'});
const mesh = new THREE.Mesh( geometry, material );

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
  //mesh.rotation.x += 0.01;

  // カメラコントローラーを更新（※enableDamping、autoRotateを使う時にupdateの設定が必要）
  orbitControls.update();

  // 描画する
  renderer.render(scene, camera);
});

// 検証ツール(lil-gui)　※ "dat-gui"の代わり
// ref. https://lil-gui.georgealways.com/
const gui = new GUI();

const folder1 = gui.addFolder('X,Y,Z軸移動（-50〜50、1刻み）');
const folder2 = gui.addFolder('カラー');

folder1.open(false);
folder2.open();

gui.add( document, 'title' );

folder1.add( mesh.position, 'x', -50, 50, 1 );
folder1.add( mesh.position, 'y', -50, 50, 1 );
folder1.add( mesh.position, 'z', -50, 50, 1 );

folder2.addColor( material, 'color' ).onChange( () => {
  console.log("カラーが変更された");
});

// パフォーマンス測定ツール
// ref. https://github.com/mrdoob/stats.js
const stats = Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);
function animate() {
	stats.begin();

  // 測定物をいれる ----
  orbitControls.update();
  renderer.render(scene, camera);
  // -----------------

	stats.end();
	requestAnimationFrame(animate);
}
animate();