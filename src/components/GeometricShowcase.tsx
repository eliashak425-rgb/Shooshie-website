"use client";

import dynamic from "next/dynamic";

const GeometricBlurMesh = dynamic(
  () => import("~/components/ui/geometric-blur-mesh"),
  { ssr: false }
);

export default function GeometricShowcase() {
  return (
    <section className="bg-[#0a0a0b] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-xs uppercase tracking-widest text-purple-400">
            Interactive
          </span>
          <h2 className="font-serif text-4xl tracking-tight text-white md:text-5xl">
            Geometric <span className="text-purple-400">Exploration</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm font-light leading-relaxed text-zinc-500">
            Hover to blur, click to morph between shapes. A visual representation
            of the intersection between mathematics and design.
          </p>
        </div>

        <GeometricBlurMesh />

        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: "Shapes", value: "8" },
            { label: "Vertices", value: "∞" },
            { label: "Dimensions", value: "3D" },
            { label: "Interactions", value: "Live" },
          ].map((stat, index) => (
            <div
              key={index}
              className="rounded-lg border border-purple-500/20 bg-[#111113] p-4 text-center"
            >
              <span className="block font-serif text-2xl text-purple-400">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-zinc-500">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

