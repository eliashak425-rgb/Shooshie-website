"use client";

import React, { useEffect, useRef } from "react";

interface ASMRStaticBackgroundProps {
  className?: string;
}

const ASMRStaticBackground: React.FC<ASMRStaticBackgroundProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width: number;
    let height: number;
    let animationFrameId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000 };

    // Balanced settings - visual quality with good performance
    const PARTICLE_COUNT = 400;
    const MAGNETIC_RADIUS = 250;
    const VORTEX_STRENGTH = 0.06;
    const PULL_STRENGTH = 0.1;

    class Particle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      size: number = 0;
      alpha: number = 0;
      color: string = "";
      rotation: number = 0;
      rotationSpeed: number = 0;
      frictionGlow: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        // Mix of purple and charcoal
        const isPurple = Math.random() > 0.65;
        this.color = isPurple ? "168, 85, 247" : "70, 70, 80";
        this.alpha = Math.random() * 0.4 + 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.04;
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MAGNETIC_RADIUS && dist > 0) {
          const force = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;

          this.vx += (dx / dist) * force * PULL_STRENGTH;
          this.vy += (dy / dist) * force * PULL_STRENGTH;

          this.vx += (dy / dist) * force * VORTEX_STRENGTH * 8;
          this.vy -= (dx / dist) * force * VORTEX_STRENGTH * 8;

          this.frictionGlow = force * 0.6;
        } else {
          this.frictionGlow *= 0.9;
        }

        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.96;
        this.vy *= 0.96;

        this.vx += (Math.random() - 0.5) * 0.03;
        this.vy += (Math.random() - 0.5) * 0.03;

        this.rotation += this.rotationSpeed;

        if (this.x < -20) this.x = width + 20;
        if (this.x > width + 20) this.x = -20;
        if (this.y < -20) this.y = height + 20;
        if (this.y > height + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        const finalAlpha = Math.min(this.alpha + this.frictionGlow * 0.5, 0.85);
        ctx.fillStyle = `rgba(${this.color}, ${finalAlpha})`;

        // Only add glow for particles very close to mouse (performance optimization)
        if (this.frictionGlow > 0.4) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(168, 85, 247, ${this.frictionGlow * 0.5})`;
        }

        // Diamond shape
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 2);
        ctx.lineTo(this.size, 0);
        ctx.lineTo(0, this.size * 2);
        ctx.lineTo(-this.size, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      }
    }

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
      }
    };

    const render = () => {
      // Motion blur trail
      ctx.fillStyle = "rgba(10, 10, 11, 0.12)";
      ctx.fillRect(0, 0, width, height);

      // Reset shadow for performance
      ctx.shadowBlur = 0;

      for (const p of particles) {
        p.update();
        p.draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    init();
    render();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 block h-full w-full ${className}`}
    />
  );
};

export default ASMRStaticBackground;
