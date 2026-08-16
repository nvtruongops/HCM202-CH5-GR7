import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const StatueContainer = styled.div`
  width: 100%;
  height: clamp(420px, 50vh, 540px);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  overflow: visible;
  background: transparent;

  &:active {
    cursor: grabbing;
  }

  canvas {
    width: 100% !important;
    height: 100% !important;
    outline: none;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }

  .spinner {
    width: 42px;
    height: 42px;
    border: 3px solid rgba(255, 215, 0, 0.2);
    border-top-color: #FFD700;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const StatueHero3D = () => {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const modelRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 450;
    const height = container.clientHeight || 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3.6);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Golden Bronze Lighting Setup)
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffd700, 3.2);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xef4444, 2.0);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 2.4);
    rimLight.position.set(0, 4, -4);
    scene.add(rimLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.6, 8);
    pointLight.position.set(0, 2, 2);
    scene.add(pointLight);

    // 3. Golden Pedestal Ring & Halo Particles
    const haloGroup = new THREE.Group();
    scene.add(haloGroup);

    const ringGeo = new THREE.TorusGeometry(1.4, 0.015, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const baseRing = new THREE.Mesh(ringGeo, ringMat);
    baseRing.rotation.x = Math.PI / 2;
    baseRing.position.y = -1.25;
    haloGroup.add(baseRing);

    const haloCount = 60;
    const haloPositions = new Float32Array(haloCount * 3);
    for (let i = 0; i < haloCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.2 + Math.random() * 0.4;
      haloPositions[i * 3] = Math.cos(angle) * radius;
      haloPositions[i * 3 + 1] = -1.25 + Math.random() * 0.4;
      haloPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const haloGeo = new THREE.BufferGeometry();
    haloGeo.setAttribute("position", new THREE.BufferAttribute(haloPositions, 3));
    const haloPointsMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.035,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const haloPoints = new THREE.Points(haloGeo, haloPointsMat);
    haloGroup.add(haloPoints);

    // 4. Load 3D Statue GLB
    const loader = new GLTFLoader();
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelRef.current = modelGroup;

    const glbUrl = `${process.env.PUBLIC_URL || ""}/models/tuong_bac_ho.glb`;

    loader.load(
      glbUrl,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and auto-scale model to fit scene
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 2.7 / (maxDim || 1);
        model.scale.setScalar(targetScale);

        model.position.x = -center.x * targetScale;
        model.position.y = -center.y * targetScale - 0.12;
        model.position.z = -center.z * targetScale;

        // Enhance material with golden bronze aesthetic
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

            if (child.material) {
              child.material.roughness = 0.35;
              child.material.metalness = 0.75;
              child.material.envMapIntensity = 1.2;
              child.material.needsUpdate = true;
            }
          }
        });

        modelGroup.add(model);
        setLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
        setLoading(false);
      }
    );

    // 5. Interactive Mouse / Touch Drag
    let isDragging = false;
    let previousPosition = { x: 0, y: 0 };
    let autoRotate = true;

    const onPointerDown = (e) => {
      isDragging = true;
      autoRotate = false;
      previousPosition = {
        x: e.clientX || (e.touches && e.touches[0].clientX),
        y: e.clientY || (e.touches && e.touches[0].clientY)
      };
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = currentX - previousPosition.x;
      const deltaY = currentY - previousPosition.y;

      if (modelRef.current) {
        modelRef.current.rotation.y += deltaX * 0.01;
        modelRef.current.rotation.x = Math.max(-0.4, Math.min(0.4, modelRef.current.rotation.x + deltaY * 0.005));
      }

      previousPosition = { x: currentX, y: currentY };
    };

    const onPointerUp = () => {
      isDragging = false;
      setTimeout(() => {
        autoRotate = true;
      }, 3000);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onPointerDown);
    domElement.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchend", onPointerUp);

    // 6. Animation Loop
    let animationId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (autoRotate && modelRef.current) {
        modelRef.current.rotation.y += 0.005;
      }

      haloGroup.rotation.y = elapsed * 0.15;
      baseRing.rotation.z = elapsed * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize
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

      ringGeo.dispose();
      ringMat.dispose();
      haloGeo.dispose();
      haloPointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <StatueContainer ref={mountRef}>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner" />
        </div>
      )}
    </StatueContainer>
  );
};

export default StatueHero3D;
