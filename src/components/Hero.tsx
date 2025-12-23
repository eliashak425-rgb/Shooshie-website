"use client";

import { ArrowDownRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

// Lazy load Three.js particle canvas
const ParticleCanvas = dynamic(() => import("./ui/particle-canvas"), {
  ssr: false,
});

export default function Hero() {
  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "25+", label: "Projects Completed" },
    { value: "15+", label: "Happy Clients" },
  ];

  return (
    <header className="relative overflow-hidden px-6 pb-20 pt-32 md:pb-32 md:pt-48">
      {/* Background Grid Texture */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 z-0 opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* LEFT SIDE - Content */}
          <div className="lg:col-span-7">
            {/* Profile Photo */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-purple-500/50 shadow-lg shadow-purple-500/30">
                <Image
                  src="/profile.jpg"
                  alt="Eli Isaac"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-400" />
                <span className="text-xs font-medium uppercase tracking-widest text-purple-300">
                  Available for opportunities
                </span>
              </div>
            </div>
            <h1 className="mb-8 font-serif text-5xl leading-[0.9] tracking-tight text-white md:text-7xl lg:text-8xl">
              Hello, I&apos;m <br />
              <span className="font-light italic text-purple-400 neon-text">
                Eli Isaac
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-lg font-light leading-relaxed text-zinc-400">
              A frontend web developer & editor based in Belgium. I craft
              beautiful, user-friendly websites that help businesses stand out
              online.
            </p>
            <Link
              href="#about"
              className="inline-flex items-center gap-2 border-b border-purple-500 pb-0.5 text-sm font-medium text-purple-400 transition-all hover:border-purple-300 hover:text-purple-300"
            >
              Learn more about me
              <ArrowDownRight strokeWidth={1.5} className="h-4 w-4" />
            </Link>
          </div>

          {/* RIGHT SIDE - 3D Particle Animation */}
          <div className="relative lg:col-span-5">
            <div className="relative aspect-square w-full">
              <ParticleCanvas />
              <div className="pointer-events-none absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-1.5 text-[10px] text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                <span>Drag to rotate</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-purple-500/20 pt-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index}>
              <span className="block font-serif text-4xl text-white">
                {stat.value}
              </span>
              <span className="mt-1 text-xs uppercase tracking-widest text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
          <div className="flex items-end justify-start md:justify-end">
            <span className="text-right text-xs text-zinc-500">
              Based in <br />
              <span className="text-purple-400">Belgium</span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
