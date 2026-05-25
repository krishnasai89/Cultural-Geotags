"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Setup Scene, Camera, and Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Build Geometry (An abstract grid globe via particles)
    const count = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      // Math to distribute particles uniformly across a sphere surface
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.2; // Radius of your geotag mesh globe

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // 3. Create Custom Spatial Material (Glowing emerald nodes)
    const material = new THREE.PointsMaterial({
      size: 0.025,
      color: 0x34d399, // Tailwind's emerald-400 hex
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particleGlobe = new THREE.Points(geometry, material);
    scene.add(particleGlobe);

    // 4. Mouse Move Interaction Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation
      particleGlobe.rotation.y = elapsedTime * 0.05;
      particleGlobe.rotation.x = elapsedTime * 0.02;

      // Inertia tracking for mouse interaction
      targetX = mouseX * 0.4;
      targetY = mouseY * 0.4;
      particleGlobe.rotation.y += (targetX - particleGlobe.rotation.y) * 0.1;
      particleGlobe.rotation.x += (targetY - particleGlobe.rotation.x) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Windows Resizing
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Clean up WebGL context on unmount to prevent memory leaks
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none w-screen h-screen overflow-hidden bg-slate-950"
    />
  );
}
