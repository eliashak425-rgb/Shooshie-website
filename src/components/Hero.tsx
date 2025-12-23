"use client";

import { ArrowDown, Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const ParticleCanvas = dynamic(() => import("./ui/particle-canvas"), {
  ssr: false,
});

export default function Hero() {
  return (
    <header className="relative min-h-screen overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0b]" />
      
      <div className="relative z-10 flex min-h-screen flex-col">
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
              <span className="hidden sm:inline">Drag to rotate</span>
              <span className="sm:hidden">Touch to rotate</span>
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

        {/* Stats Bar */}
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
