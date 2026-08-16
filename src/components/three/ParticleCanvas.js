import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import * as THREE from "three";

const CanvasWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  opacity: 1;

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw !important;
    height: 100vh !important;
    display: block;
  }
`;

const ParticleCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      2000
    );
    camera.position.set(0, 0, 480);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight, true);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 2. High-Res Procedural Texture of Vietnamese National Flag (Soft Vignette & Harmonious Presence)
    const createVietnamFlagTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 2048;
      canvas.height = 1365; // Standard 3:2 Ratio
      const ctx = canvas.getContext("2d");

      // Deep Silk Velvet Crimson Background with soft gradient falloff
      const bgGradient = ctx.createRadialGradient(
        1024, 682.5, 80,
        1024, 682.5, 1150
      );
      bgGradient.addColorStop(0, "rgba(216, 32, 32, 0.95)");
      bgGradient.addColorStop(0.45, "rgba(175, 18, 18, 0.85)");
      bgGradient.addColorStop(0.75, "rgba(120, 10, 10, 0.65)");
      bgGradient.addColorStop(1, "rgba(20, 5, 5, 0.35)");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Fine silk fabric weave texture
      ctx.fillStyle = "rgba(255, 255, 255, 0.022)";
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1.5);
      }
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      for (let x = 0; x < canvas.width; x += 4) {
        ctx.fillRect(x, 0, 1.5, canvas.height);
      }

      // Golden Halo Glow behind Star
      const cx = 1024;
      const cy = 682.5; // True horizontal & vertical center
      const outerRadius = 250; // Refined, balanced star scale
      const innerRadius = outerRadius * (Math.sin(Math.PI / 10) / Math.sin((7 * Math.PI) / 10));

      const haloGrad = ctx.createRadialGradient(cx, cy, 50, cx, cy, 460);
      haloGrad.addColorStop(0, "rgba(255, 215, 0, 0.38)");
      haloGrad.addColorStop(0.45, "rgba(255, 180, 0, 0.15)");
      haloGrad.addColorStop(1, "rgba(218, 41, 28, 0)");
      ctx.fillStyle = haloGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 460, 0, Math.PI * 2);
      ctx.fill();

      // Standard Vietnam 5-Pointed Gold Star
      const drawStarPath = (context) => {
        context.beginPath();
        for (let i = 0; i < 10; i++) {
          const r = i % 2 === 0 ? outerRadius : innerRadius;
          const angle = (i * Math.PI) / 5 - Math.PI / 2;
          const x = cx + Math.cos(angle) * r;
          const y = cy + Math.sin(angle) * r;
          if (i === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        context.closePath();
      };

      // Star Silk Shading & Golden Gradient
      const starGrad = ctx.createRadialGradient(cx, cy - 50, 18, cx, cy, outerRadius);
      starGrad.addColorStop(0, "#FFF9B8");
      starGrad.addColorStop(0.35, "#FFD700");
      starGrad.addColorStop(0.72, "#F59E0B");
      starGrad.addColorStop(1, "#B45309");

      ctx.save();
      ctx.shadowColor = "rgba(255, 215, 0, 0.7)";
      ctx.shadowBlur = 35;
      drawStarPath(ctx);
      ctx.fillStyle = starGrad;
      ctx.fill();
      ctx.restore();

      // Star Bevel 3D Highlights on facet rays
      for (let i = 0; i < 5; i++) {
        const topAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        const topX = cx + Math.cos(topAngle) * outerRadius;
        const topY = cy + Math.sin(topAngle) * outerRadius;

        const leftInnerAngle = topAngle - Math.PI / 5;
        const leftInnerX = cx + Math.cos(leftInnerAngle) * innerRadius;
        const leftInnerY = cy + Math.sin(leftInnerAngle) * innerRadius;

        // Left facet (highlight)
        ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(topX, topY);
        ctx.lineTo(leftInnerX, leftInnerY);
        ctx.closePath();
        ctx.fill();

        // Right facet (shadow)
        const rightInnerAngle = topAngle + Math.PI / 5;
        const rightInnerX = cx + Math.cos(rightInnerAngle) * innerRadius;
        const rightInnerY = cy + Math.sin(rightInnerAngle) * innerRadius;

        ctx.fillStyle = "rgba(0, 0, 0, 0.17)";
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(topX, topY);
        ctx.lineTo(rightInnerX, rightInnerY);
        ctx.closePath();
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.ClampToEdgeWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      texture.generateMipmaps = true;
      return texture;
    };

    const flagTexture = createVietnamFlagTexture();

    // 3. 3D Waving Silk Cloth Mesh (Seamless Background with Refined Opacity)
    const flagWidth = 960;
    const flagHeight = 640;
    const gridX = 130;
    const gridY = 85;

    const flagGeometry = new THREE.PlaneGeometry(flagWidth, flagHeight, gridX, gridY);
    const origPositions = Float32Array.from(flagGeometry.attributes.position.array);

    const flagMaterial = new THREE.MeshStandardMaterial({
      map: flagTexture,
      side: THREE.DoubleSide,
      roughness: 0.35,
      metalness: 0.1,
      transparent: true,
      opacity: 0.48, // Gentle, elegant background opacity
    });

    const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
    flagMesh.position.set(0, 0, 0); // Strictly centered at (0, 0, 0)
    scene.add(flagMesh);

    // 4. Lighting for Silk Sheen & Star Radiance
    const ambientLight = new THREE.AmbientLight(0xFFEEDD, 1.1);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    dirLight1.position.set(-200, 300, 320);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xFFD700, 0.95);
    dirLight2.position.set(300, -200, 220);
    scene.add(dirLight2);

    const starPointLight = new THREE.PointLight(0xFFD700, 1.3, 800);
    starPointLight.position.set(0, 0, 140);
    scene.add(starPointLight);

    // 5. Floating Golden Particle Embers
    const emberCount = 65;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberVelocities = [];

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 1100;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 750;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 350 + 50;

      emberVelocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: Math.random() * 0.35 + 0.1,
        z: (Math.random() - 0.5) * 0.2,
      });
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute("position", new THREE.BufferAttribute(emberPositions, 3));

    const getCircleTexture = () => {
      const c = document.createElement("canvas");
      c.width = 32;
      c.height = 32;
      const ctx = c.getContext("2d");
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)");
      grad.addColorStop(0.3, "rgba(255, 215, 0, 0.85)");
      grad.addColorStop(1, "rgba(255, 215, 0, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 16, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };

    const emberMat = new THREE.PointsMaterial({
      size: 7.5,
      map: getCircleTexture(),
      color: 0xFFD700,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const emberSystem = new THREE.Points(emberGeo, emberMat);
    scene.add(emberSystem);

    // 6. Dynamic Responsive Scaling (Strictly True Centered at 50% Viewport)
    const updateDimensionsAndScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height, true);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Calculate visible 3D world frustum dimensions at camera distance 480
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;

      // Perfectly scaled to fill the background seamlessly without hard cutoffs
      const scaleX = visibleWidth / flagWidth;
      const scaleY = visibleHeight / flagHeight;
      const coverScale = Math.max(scaleX, scaleY) * 1.05;

      flagMesh.scale.set(coverScale, coverScale, 1);
      flagMesh.position.set(0, 0, 0); // Exactly centered at scene origin
    };

    updateDimensionsAndScale();

    // 7. Mouse Interaction for subtle dynamic light sheen
    let targetLightX = -200;
    let targetLightY = 300;

    const handleMouseMove = (e) => {
      const normX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const normY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetLightX = -200 + normX * 80;
      targetLightY = 300 - normY * 60;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 8. Animation Loop with Dynamic 3D Silk Flag Wave Simulation
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Camera locked in exact center
      camera.position.set(0, 0, 480);
      camera.lookAt(0, 0, 0);

      // Subtle light sheen response
      dirLight1.position.x += (targetLightX - dirLight1.position.x) * 0.05;
      dirLight1.position.y += (targetLightY - dirLight1.position.y) * 0.05;

      // Gentle natural 3D flag floating tilt
      flagMesh.position.set(0, 0, 0);
      flagMesh.rotation.y = Math.sin(time * 0.3) * 0.02;
      flagMesh.rotation.x = Math.cos(time * 0.22) * 0.015;

      // Realistic 3D Silk Wave Cloth Deformation
      const pos = flagGeometry.attributes.position.array;
      for (let i = 0; i < pos.length; i += 3) {
        const origX = origPositions[i];
        const origY = origPositions[i + 1];

        // Normalized coordinate [-0.5, 0.5]
        const u = origX / flagWidth;
        const v = origY / flagHeight;

        // Smooth wave propagation with realistic silk drape across full viewport
        const w1 = Math.sin(u * 5.8 - time * 2.2) * 22;
        const w2 = Math.cos((u * 3.8 + v * 4.2) - time * 2.7) * 12;
        const w3 = Math.sin((u * 7.5 - v * 6.0) + time * 3.2) * 6;

        pos[i + 2] = w1 + w2 + w3;
      }

      flagGeometry.computeVertexNormals();
      flagGeometry.attributes.position.needsUpdate = true;

      // Floating Embers movement
      const emberArr = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        emberArr[i * 3] += emberVelocities[i].x;
        emberArr[i * 3 + 1] += emberVelocities[i].y;
        emberArr[i * 3 + 2] += emberVelocities[i].z;

        if (emberArr[i * 3 + 1] > 380) {
          emberArr[i * 3 + 1] = -380;
          emberArr[i * 3] = (Math.random() - 0.5) * 1100;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Multi-listener Resize & Fullscreen handler
    const handleResize = () => {
      updateDimensionsAndScale();
      requestAnimationFrame(updateDimensionsAndScale);
      setTimeout(updateDimensionsAndScale, 60);
      setTimeout(updateDimensionsAndScale, 200);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("fullscreenchange", handleResize);
    document.addEventListener("webkitfullscreenchange", handleResize);
    document.addEventListener("mozfullscreenchange", handleResize);
    document.addEventListener("MSFullscreenChange", handleResize);
    window.addEventListener("orientationchange", handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("fullscreenchange", handleResize);
      document.removeEventListener("webkitfullscreenchange", handleResize);
      document.removeEventListener("mozfullscreenchange", handleResize);
      document.removeEventListener("MSFullscreenChange", handleResize);
      window.removeEventListener("orientationchange", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      flagGeometry.dispose();
      flagMaterial.dispose();
      flagTexture.dispose();
      emberGeo.dispose();
      emberMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <CanvasWrapper ref={mountRef} />;
};

export default ParticleCanvas;
