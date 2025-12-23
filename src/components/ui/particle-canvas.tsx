"use client";

import { useRef, useEffect, useState } from "react";

// Module-level flag to prevent multiple initializations
let isInitialized = false;

export default function ParticleCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent double initialization (both ref and module-level check)
    if (cleanupRef.current || isInitialized) return;
    isInitialized = true;

    const loadAndRender = async () => {
      const THREE = await import("three");

      if (!mountRef.current) return;

      const currentMount = mountRef.current;
      
      // Clear any existing canvas
      while (currentMount.firstChild) {
        currentMount.removeChild(currentMount.firstChild);
      }

      const width = currentMount.clientWidth;
      const height = currentMount.clientHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 4.5;
      camera.position.x = 0.2;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      
      // HIDE BEFORE adding to DOM - prevents any flash
      renderer.domElement.style.opacity = "0";
      renderer.domElement.style.visibility = "hidden";
      
      currentMount.appendChild(renderer.domElement);

      const clock = new THREE.Clock();
      
      // Warm-up tracking - more frames for slower devices
      let frameCount = 0;
      const WARMUP_FRAMES = 15; // ~250ms at 60fps

      // Mouse drag rotation
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let targetRotationX = 0;
      let targetRotationY = 0;
      let currentRotationX = 0;
      let currentRotationY = 0;

      // Minimal particle count for fast load
      const particleCount = 2500;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const geometry = new THREE.BufferGeometry();
      const torusKnot = new THREE.TorusKnotGeometry(1.3, 0.45, 80, 12);

      const posAttr = torusKnot.attributes.position!;
      for (let i = 0; i < particleCount; i++) {
        const vertexIndex = i % posAttr.count;
        positions[i * 3] = posAttr.getX(vertexIndex);
        positions[i * 3 + 1] = posAttr.getY(vertexIndex);
        positions[i * 3 + 2] = posAttr.getZ(vertexIndex);

        // Muted purple
        colors[i * 3] = 0.45;
        colors[i * 3 + 1] = 0.15;
        colors[i * 3 + 2] = 0.65;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 0.035,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Dispose the source geometry
      torusKnot.dispose();

      const handleMouseMove = (event: MouseEvent) => {
        if (isDragging) {
          const deltaX = event.clientX - previousMousePosition.x;
          const deltaY = event.clientY - previousMousePosition.y;
          targetRotationY += deltaX * 0.005;
          targetRotationX += deltaY * 0.005;
          previousMousePosition = { x: event.clientX, y: event.clientY };
        }
      };

      const handleMouseDown = (event: MouseEvent) => {
        isDragging = true;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      };

      const handleMouseUp = () => {
        isDragging = false;
      };

      const handleMouseLeave = () => {
        isDragging = false;
      };

      currentMount.addEventListener("mousemove", handleMouseMove);
      currentMount.addEventListener("mousedown", handleMouseDown);
      currentMount.addEventListener("mouseup", handleMouseUp);
      currentMount.addEventListener("mouseleave", handleMouseLeave);

      const animate = () => {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Smooth rotation interpolation
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        // Combine auto-rotation with drag rotation
        points.rotation.x = currentRotationX;
        points.rotation.y = elapsedTime * 0.03 + currentRotationY;

        renderer.render(scene, camera);

        // Warm-up phase: render silently before showing
        frameCount++;
        if (frameCount === WARMUP_FRAMES) {
          // GPU is now warmed up - safe to show with fade
          renderer.domElement.style.visibility = "visible";
          renderer.domElement.style.transition = "opacity 0.3s ease-out";
          renderer.domElement.style.opacity = "1";
          // Signal React that we're ready
          setIsReady(true);
        }
      };
      animate();

      const handleResize = () => {
        const newWidth = currentMount.clientWidth;
        const newHeight = currentMount.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      };
      window.addEventListener("resize", handleResize);

      // Store cleanup function
      cleanupRef.current = () => {
        window.removeEventListener("resize", handleResize);
        currentMount.removeEventListener("mousemove", handleMouseMove);
        currentMount.removeEventListener("mousedown", handleMouseDown);
        currentMount.removeEventListener("mouseup", handleMouseUp);
        currentMount.removeEventListener("mouseleave", handleMouseLeave);
        if (currentMount.contains(renderer.domElement)) {
          currentMount.removeChild(renderer.domElement);
        }
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    };

    // Start immediately - no delay needed since flash is fixed
    loadAndRender();

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      isInitialized = false;
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        opacity: isReady ? 1 : 0,
        transition: isReady ? 'opacity 0.3s ease-out' : 'none',
      }}
    />
  );
}

