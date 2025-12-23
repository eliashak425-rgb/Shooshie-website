"use client";

import { ArrowDownRight, ArrowDown, Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

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
    <header className="relative min-h-screen overflow-hidden">
      {/* Background Grid Texture - Desktop only */}
      <div className="bg-grid-pattern pointer-events-none absolute inset-0 z-0 hidden opacity-60 lg:block" />
      
      {/* Aesthetic gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]" />

      {/* ==================== DESKTOP LAYOUT (lg and up) ==================== */}
      <div className="relative z-10 mx-auto hidden max-w-7xl px-6 pb-32 pt-48 lg:block">
        <div className="grid grid-cols-12 items-center gap-8">
          {/* LEFT SIDE - Content */}
          <div className="col-span-7">
            {/* Profile Photo + Badge */}
            <div className="mb-6 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-purple-500/50 shadow-lg shadow-purple-500/30">
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
                  Available for work
                </span>
              </div>
            </div>

            <h1 className="mb-8 font-serif text-7xl leading-[0.9] tracking-tight text-white xl:text-8xl">
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
          <div className="relative col-span-5">
            <div className="relative aspect-square w-full">
              <ParticleCanvas />
              {/* Rotation hint */}
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

        {/* Stats Bar - Desktop */}
        <div className="mt-24 grid grid-cols-4 gap-8 border-t border-purple-500/20 pt-8">
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
          <div className="flex items-end justify-end">
            <span className="text-right text-xs text-zinc-500">
              Based in <br />
              <span className="text-purple-400">Belgium</span>
            </span>
          </div>
        </div>
      </div>

      {/* ==================== MOBILE LAYOUT (below lg) ==================== */}
      <div className="relative z-10 flex min-h-screen flex-col lg:hidden">
        {/* Main Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-20">
          {/* Profile Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="relative mb-6">
              <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-purple-500/50 ring-offset-4 ring-offset-[#0a0a0b]">
                <Image
                  src="/profile.jpg"
                  alt="Eli Isaac"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Status indicator */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-zinc-700 bg-[#0a0a0b] px-3 py-1">
                <span className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                  <span className="text-zinc-400">Available for work</span>
                </span>
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Eli Isaac
            </h1>
            <p className="text-lg text-zinc-400 sm:text-xl">
              Frontend Developer & Editor
            </p>
            <p className="mt-1 text-sm text-zinc-600">
              Based in Belgium
            </p>
          </div>

          {/* Description */}
          <p className="mb-10 max-w-lg text-center text-base leading-relaxed text-zinc-500">
            I create clean, modern websites that help businesses establish a strong online presence. 
            Focused on performance, accessibility, and user experience.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-purple-500"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
            <Link
              href="https://github.com/eliashak425-rgb"
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/50 px-6 py-3 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-600 hover:bg-zinc-800/50"
            >
              <Github className="h-4 w-4" />
              View GitHub
            </Link>
          </div>

          {/* 3D Element - Centered, not too big */}
          <div className="relative mx-auto h-48 w-48 sm:h-56 sm:w-56 md:h-64 md:w-64">
            <ParticleCanvas />
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] text-zinc-600">
              Touch to rotate
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center pb-8">
          <Link 
            href="#projects"
            className="flex flex-col items-center gap-2 text-zinc-600 transition-colors hover:text-zinc-400"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </Link>
        </div>

        {/* Stats Bar - Mobile */}
        <div className="border-t border-zinc-800 bg-[#0a0a0b]/80 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 px-6 py-6 sm:gap-16 sm:py-8">
            <div className="text-center">
              <span className="block text-2xl font-semibold text-white sm:text-3xl">3+</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500">Years</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-semibold text-white sm:text-3xl">25+</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500">Projects</span>
            </div>
            <div className="text-center">
              <span className="block text-2xl font-semibold text-white sm:text-3xl">15+</span>
              <span className="text-xs uppercase tracking-wider text-zinc-500">Clients</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
