import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

const GlobeContainer = styled.div`
  width: 100%;
  height: 380px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    outline: none;
  }
`;

const GlobeHero3D = ({ portraitImage }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 380;
    const height = container.clientHeight || 380;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLightGold = new THREE.DirectionalLight(0xffd700, 2.5);
    dirLightGold.position.set(5, 5, 5);
    scene.add(dirLightGold);

    const dirLightRed = new THREE.DirectionalLight(0xef4444, 2);
    dirLightRed.position.set(-5, -3, 3);
    scene.add(dirLightRed);

    const pointLightBlue = new THREE.PointLight(0x38bdf8, 3, 10);
    pointLightBlue.position.set(0, 0, 4);
    scene.add(pointLightBlue);

    // 3. Central Holographic Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3.1 Inner Sphere Core
    const sphereGeo = new THREE.SphereGeometry(1.6, 36, 36);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: false,
      transparent: true,
      opacity: 0.85
    });
    const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(coreSphere);

    // 3.2 Wireframe Latitude & Longitude Lines
    const wireGeo = new THREE.SphereGeometry(1.62, 24, 18);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffd700,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    globeGroup.add(wireSphere);

    // 3.3 Golden Latitude Ring (Equator)
    const ringGeo1 = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    globeGroup.add(ring1);

    // 3.4 Diagonal Orbit Ring (Đoàn kết quốc tế)
    const ringGeo2 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3.5;
    ring2.rotation.y = Math.PI / 4;
    globeGroup.add(ring2);

    // 3.5 Orbiting Satellites / Front Nodes (Nodes representing solidarity)
    const satellitesGroup = new THREE.Group();
    globeGroup.add(satellitesGroup);

    const nodeColors = [0xffd700, 0xef4444, 0x38bdf8, 0xffffff];
    const nodeGeo = new THREE.SphereGeometry(0.09, 16, 16);

    const numNodes = 8;
    for (let i = 0; i < numNodes; i++) {
      const angle = (i / numNodes) * Math.PI * 2;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i % nodeColors.length],
        emissive: nodeColors[i % nodeColors.length],
        emissiveIntensity: 0.8
      });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 2.1, Math.sin(angle) * 0.4, Math.sin(angle) * 2.1);
      satellitesGroup.add(node);
    }

    // 3.6 Floating Halo Particles
    const haloCount = 120;
    const haloPositions = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.7 + Math.random() * 0.8;
      const sinPhi = Math.sin(phi);
      haloPositions[i * 3] = r * sinPhi * Math.cos(theta);
      haloPositions[i * 3 + 1] = r * sinPhi * Math.sin(theta);
      haloPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const haloGeo = new THREE.BufferGeometry();
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
    const haloMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const haloPoints = new THREE.Points(haloGeo, haloMat);
    globeGroup.add(haloPoints);

    // 4. Interactive Mouse / Touch Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (e) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX || (e.touches && e.touches[0].clientX), y: e.clientY || (e.touches && e.touches[0].clientY) };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - previousMousePosition.x;
      const deltaY = currentY - previousMousePosition.y;

      globeGroup.rotation.y += deltaX * 0.008;
      globeGroup.rotation.x += deltaY * 0.008;

      previousMousePosition = { x: currentX, y: currentY };
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onPointerDown);
    domElement.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);

    // 5. Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!isDragging) {
        globeGroup.rotation.y += 0.004;
        globeGroup.rotation.x += 0.001;
      }

      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.25;
      satellitesGroup.rotation.y = elapsedTime * 0.3;
      haloPoints.rotation.y = -elapsedTime * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domElement.removeEventListener("mousedown", onPointerDown);
      domElement.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchend", onPointerUp);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      nodeGeo.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <GlobeContainer ref={mountRef} />;
};

export default GlobeHero3D;
