/*
 * @Author: Narcissus 577008637@qq.com
 * @Date: 2022-10-20 09:24:29
 * @LastEditors: Narcissus 577008637@qq.com
 * @LastEditTime: 2022-10-20 11:16:41
 * @FilePath: \react-demo\src\pages\widgets\3DTestDemoWidget\component\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const ThreeTestDemoWidget = () => {
  const ThreeBoxRef = useRef<HTMLDivElement>(null);

  const renderer = useMemo(() => {
    return new THREE.WebGL1Renderer();
  }, []);

  const CreateCubeModel = () => {
    // 创建一个立方体几何体
    const geometry = new THREE.BoxGeometry(50, 50, 50);
    // 放大，缩小
    geometry.scale(1, 1, 1);
    // 平移
    geometry.translate(50, 50, 50);
    // 旋转
    // geometry.rotateY(Math.PI / 4);

    const material = new THREE.MeshLambertMaterial({
      color: 0xff00ff,
    });
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };

  const Three3DInit = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // 场景
    const scene = new THREE.Scene();
    // 添加物体模型
    const cube = CreateCubeModel();
    scene.add(cube);
    // 相机
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(100, 100, 150);
    camera.lookAt(scene.position);
    // 设置光源
    // 环境光-显示物体
    const ambient = new THREE.AmbientLight(0x888888);
    scene.add(ambient);
    // 点光源-立体感
    const point = new THREE.PointLight(0xffffff);
    point.position.set(150, 100, 500);
    scene.add(point);

    // 添加坐标辅助
    const axes = new THREE.AxesHelper(1000);
    axes.name = "AxesHelper";
    scene.add(axes);
    // 渲染器操作
    renderer.setSize(width, height);
    renderer.setClearColor(0xb9d3ff, 1);
    // renderer.render(scene, camera);
    function render() {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    render();
    // 添加 OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.addEventListener("change", () => renderer);
  }, [renderer]);

  useEffect(() => {
    Three3DInit();
  }, [Three3DInit]);

  useEffect(() => {
    ThreeBoxRef.current?.appendChild(renderer.domElement);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ThreeBoxRef.current?.removeChild(renderer.domElement);
    };
  }, [ThreeBoxRef, renderer]);

  return <div ref={ThreeBoxRef}></div>;
};

export default ThreeTestDemoWidget;
