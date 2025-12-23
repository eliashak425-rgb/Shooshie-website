"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ASMRBackground = dynamic(() => import("./ui/asmr-background"), {
  ssr: false,
});

interface LoadingScreenProps {
  children: React.ReactNode;
}

// Preload Three.js during loading screen
let threePreloaded = false;
const preloadThree = () => {
  if (threePreloaded) return;
  threePreloaded = true;
  import("three").catch(() => {});
};

export default function LoadingScreen({ children }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "interact" | "done">("loading");
  const [progress, setProgress] = useState(0);
  const [mouseTime, setMouseTime] = useState(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const mouseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const movementAccumulator = useRef(0);
  const isTouching = useRef(false);

  // Preload Three.js immediately when component mounts
  useEffect(() => {
    preloadThree();
  }, []);

  // Delay content visibility to prevent flash
  useEffect(() => {
    if (phase === "done" && !contentVisible) {
      // Wait 2 frames before making content visible
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setContentVisible(true);
        });
      });
    }
  }, [phase, contentVisible]);

  // Phase 1: Progress bar loading
  useEffect(() => {
    if (phase !== "loading") return;

    const assets = [
      { weight: 20, delay: 150 },
      { weight: 30, delay: 200 },
      { weight: 30, delay: 200 },
      { weight: 20, delay: 150 },
    ];

    let currentProgress = 0;
    let assetIndex = 0;

    const loadNextAsset = () => {
      if (assetIndex >= assets.length) {
        setProgress(100);
        setTimeout(() => setPhase("interact"), 400);
        return;
      }

      const asset = assets[assetIndex]!;
      const steps = 8;
      const stepDelay = asset.delay / steps;
      const stepIncrement = asset.weight / steps;

      let step = 0;
      const animateProgress = () => {
        if (step < steps) {
          currentProgress += stepIncrement;
          setProgress(Math.min(currentProgress, 100));
          step++;
          setTimeout(animateProgress, stepDelay);
        } else {
          assetIndex++;
          setTimeout(loadNextAsset, 30);
        }
      };
      animateProgress();
    };

    const timer = setTimeout(loadNextAsset, 100);
    return () => clearTimeout(timer);
  }, [phase]);

  // Phase 2: Mouse/touch interaction
  useEffect(() => {
    if (phase !== "interact") return;

    let accumulated = 0;
    const isMobile = "ontouchstart" in window;
    
    // Settings
    const REQUIRED_TIME = isMobile ? 1200 : 2000; // 1.2s hold on mobile, 2s movement on desktop
    const MOVEMENT_THRESHOLD = 5;
    const DECAY_RATE = 20;

    // Desktop: mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      movementAccumulator.current += distance;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
    };

    // Mobile: touch and hold
    const handleTouchStart = () => {
      isTouching.current = true;
    };

    const handleTouchEnd = () => {
      isTouching.current = false;
    };

    const tick = () => {
      if (isMobile) {
        // Mobile: progress while touching, pause when not
        if (isTouching.current) {
          accumulated += 50;
        }
        // No decay on mobile - just pause
      } else {
        // Desktop: progress while moving
        const movement = movementAccumulator.current;
        movementAccumulator.current = 0;
        
        if (movement > MOVEMENT_THRESHOLD) {
          accumulated += 50;
        } else {
          accumulated = Math.max(0, accumulated - DECAY_RATE);
        }
      }
      
      setMouseTime(Math.min(accumulated / REQUIRED_TIME * 100, 100));

      if (accumulated >= REQUIRED_TIME) {
        setPhase("done");
        setTimeout(() => setHideLoader(true), 600);
        return;
      }
      
      mouseTimerRef.current = setTimeout(tick, 50);
    };

    if (isMobile) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("touchcancel", handleTouchEnd);
    } else {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    mouseTimerRef.current = setTimeout(tick, 50);

    return () => {
      if (isMobile) {
        window.removeEventListener("touchstart", handleTouchStart);
        window.removeEventListener("touchend", handleTouchEnd);
        window.removeEventListener("touchcancel", handleTouchEnd);
      } else {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    };
  }, [phase]);

  return (
    <>
      {/* Loading/Intro Screen - hidden after done, removed from DOM after hideLoader */}
      {!hideLoader && (
        <div
          className={`fixed inset-0 z-50 bg-[#0a0a0b] transition-opacity duration-500 ${
            phase === "done" ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          {/* Particle Background - only in interact phase */}
          {phase === "interact" && <ASMRBackground />}

          {/* Content */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            {/* Name */}
            <h1 className="mb-2 font-serif text-5xl tracking-tight text-white md:text-7xl">
              Eli <span className="italic text-purple-400">Isaac</span>
            </h1>

            {/* Subtitle */}
            <p className="mb-12 text-sm tracking-widest text-zinc-500">
              FRONTEND DEVELOPER
            </p>

            {/* Progress/Interaction Bar */}
            <div className="w-64 md:w-80">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-200 ease-out"
                  style={{ width: `${phase === "loading" ? progress : mouseTime}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                {phase === "loading" ? (
                  <>
                    <span className="text-zinc-600">Loading</span>
                    <span className="font-mono text-purple-400">{Math.round(progress)}%</span>
                  </>
                ) : (
                  <>
                    <span className="flex items-center gap-2 text-purple-400/80">
                      <svg
                        className="h-3 w-3 animate-pulse"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
                      </svg>
                      <span className="hidden sm:inline">Move mouse to enter</span>
                      <span className="sm:hidden">Hold to enter</span>
                    </span>
                    <span className="font-mono text-purple-400">{Math.round(mouseTime)}%</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - always in same wrapper to prevent remounting */}
      <div 
        style={{ 
          opacity: phase === "done" && contentVisible ? 1 : 0,
          transition: phase === "done" && contentVisible ? 'opacity 0.4s ease-out' : 'none',
          visibility: phase === "done" ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </>
  );
}

