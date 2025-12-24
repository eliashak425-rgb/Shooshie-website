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

      // Check if mobile
      const isMobile = "ontouchstart" in window || window.innerWidth < 768;

      // Mouse drag rotation (desktop only)
      let isDragging = false;
      let previousMousePosition = { x: 0, y: 0 };
      let targetRotationX = 0;
      let targetRotationY = 0;
      let currentRotationX = 0;
      let currentRotationY = 0;

      // Reduced particles on mobile for performance
      const particleCount = isMobile ? 1500 : 2500;
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

        // Solid purple - consistent color
        colors[i * 3] = 0.6;      // R
        colors[i * 3 + 1] = 0.2;  // G
        colors[i * 3 + 2] = 0.9;  // B - nice purple
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: isMobile ? 0.045 : 0.038,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.NormalBlending,
      });

      const points = new THREE.Points(geometry, material);
      scene.add(points);

      // Dispose the source geometry
      torusKnot.dispose();

      // Mouse handlers (desktop)
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

      // Touch handlers (mobile) - prevent scroll/refresh while rotating
      const handleTouchMove = (event: TouchEvent) => {
        if (isDragging && event.touches[0]) {
          event.preventDefault(); // Prevent scrolling while rotating
          const touch = event.touches[0];
          const deltaX = touch.clientX - previousMousePosition.x;
          const deltaY = touch.clientY - previousMousePosition.y;
          targetRotationY += deltaX * 0.008;
          targetRotationX += deltaY * 0.008;
          previousMousePosition = { x: touch.clientX, y: touch.clientY };
        }
      };

      const handleTouchStart = (event: TouchEvent) => {
        if (event.touches[0]) {
          event.preventDefault(); // Prevent pull-to-refresh
          isDragging = true;
          previousMousePosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
        }
      };

      const handleTouchEnd = () => {
        isDragging = false;
      };

      // Add event listeners based on device type
      // passive: false required to allow preventDefault()
      if (isMobile) {
        currentMount.addEventListener("touchmove", handleTouchMove, { passive: false });
        currentMount.addEventListener("touchstart", handleTouchStart, { passive: false });
        currentMount.addEventListener("touchend", handleTouchEnd);
      } else {
        currentMount.addEventListener("mousemove", handleMouseMove);
        currentMount.addEventListener("mousedown", handleMouseDown);
        currentMount.addEventListener("mouseup", handleMouseUp);
        currentMount.addEventListener("mouseleave", handleMouseLeave);
      }

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
        if (isMobile) {
          currentMount.removeEventListener("touchmove", handleTouchMove);
          currentMount.removeEventListener("touchstart", handleTouchStart);
          currentMount.removeEventListener("touchend", handleTouchEnd);
        } else {
          currentMount.removeEventListener("mousemove", handleMouseMove);
          currentMount.removeEventListener("mousedown", handleMouseDown);
          currentMount.removeEventListener("mouseup", handleMouseUp);
          currentMount.removeEventListener("mouseleave", handleMouseLeave);
        }
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
        touchAction: 'none', // Prevent scroll/zoom/refresh on touch
      }}
    />
  );
}

