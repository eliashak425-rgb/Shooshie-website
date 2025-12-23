"use client";

import dynamic from "next/dynamic";

const RotatingEarth = dynamic(
  () => import("~/components/ui/wireframe-dotted-globe"),
  { ssr: false, loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="text-zinc-500 text-sm">Loading globe...</div>
    </div>
  )}
);

export default function GlobeSection() {
  return (
    <section className="bg-[#0a0a0b] px-6 py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-xs uppercase tracking-widest text-purple-400">
            Location
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-white md:text-5xl">
            Based in <span className="text-purple-400">Belgium</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-500">
            Working with clients worldwide from the heart of Europe.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Responsive size: smaller on mobile */}
          <div className="block sm:hidden">
            <RotatingEarth width={320} height={280} />
          </div>
          <div className="hidden sm:block md:hidden">
            <RotatingEarth width={500} height={400} />
          </div>
          <div className="hidden md:block">
            <RotatingEarth width={700} height={500} />
          </div>
        </div>
      </div>
    </section>
  );
}

