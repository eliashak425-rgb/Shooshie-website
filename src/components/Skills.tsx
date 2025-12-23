import {
  Code2,
  PenTool,
  Plug,
  Zap,
  ArrowUpRight,
} from "lucide-react";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#111113] py-24 text-zinc-100"
    >
      <div className="bg-grid-pattern-dark pointer-events-none absolute inset-0 z-0 opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between border-b border-purple-500/20 pb-8 md:flex-row md:items-end">
          <div>
            <span className="mb-2 block text-xs uppercase tracking-widest text-purple-400">
              What I Do
            </span>
            <h2 className="font-serif text-4xl tracking-tight text-white md:text-5xl">
              Skills & Expertise
            </h2>
          </div>
          <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-zinc-400 md:mt-0">
            Frontend-focused expertise with a keen eye for design and user experience.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Large Card */}
          <div className="group rounded-lg border border-purple-500/20 bg-[#0a0a0b] p-8 transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 md:col-span-2">
            <div className="mb-8 flex items-start justify-between">
              <div className="rounded-md border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400 transition-colors group-hover:bg-purple-500/20">
                <Code2 strokeWidth={1.5} className="h-6 w-6" />
              </div>
              <ArrowUpRight
                strokeWidth={1.5}
                className="h-5 w-5 text-zinc-600 transition-colors group-hover:text-purple-400"
              />
            </div>
            <h3 className="mb-3 font-serif text-3xl text-white">
              Frontend Development
            </h3>
            <p className="mb-6 max-w-lg font-light leading-relaxed text-zinc-400">
              Building responsive, pixel-perfect websites that look great on every 
              device. I turn designs into clean, maintainable code that performs.
            </p>
            <ul className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wide text-zinc-500">
              {["React", "Vue.js", "Tailwind CSS", "TypeScript"].map(
                (tag) => (
                  <li key={tag} className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-purple-500" />
                    {tag}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Vertical Card */}
          <div className="group flex flex-col justify-between rounded-lg border border-purple-500/20 bg-[#0a0a0b] p-8 transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10">
            <div>
              <div className="mb-8 w-fit rounded-md border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400">
                <PenTool strokeWidth={1.5} className="h-6 w-6" />
              </div>
              <h3 className="mb-3 font-serif text-2xl text-white">
                Website Editing
              </h3>
              <p className="mb-4 text-sm font-light leading-relaxed text-zinc-400">
                Updating and maintaining existing websites with fresh content, 
                improved layouts, and modern features.
              </p>
            </div>
            <div className="my-4 h-px w-full bg-purple-500/20" />
            <span className="text-xs uppercase tracking-wider text-purple-400">
              CMS & Updates
            </span>
          </div>

          {/* Standard Card */}
          <div className="group rounded-lg border border-purple-500/20 bg-[#0a0a0b] p-8 transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10">
            <div className="mb-6 w-fit rounded-md border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400">
              <Plug strokeWidth={1.5} className="h-6 w-6" />
            </div>
            <h3 className="mb-2 font-serif text-2xl text-white">
              API Integration
            </h3>
            <p className="text-sm font-light leading-relaxed text-zinc-400">
              Connecting frontends to backends, third-party services, and 
              headless CMS platforms seamlessly.
            </p>
          </div>

          {/* Horizontal Card */}
          <div className="group rounded-lg border border-purple-500/20 bg-[#0a0a0b] p-8 transition-all hover:border-purple-500/40 hover:shadow-lg hover:shadow-purple-500/10 md:col-span-2">
            <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
              <div className="w-fit rounded-md border border-purple-500/30 bg-purple-500/10 p-3 text-purple-400">
                <Zap strokeWidth={1.5} className="h-6 w-6" />
              </div>
              <div>
                <h3 className="mb-2 font-serif text-2xl text-white">
                  Performance & SEO
                </h3>
                <p className="max-w-xl text-sm font-light leading-relaxed text-zinc-400">
                  Optimizing websites for speed, accessibility, and search engines. 
                  Fast sites rank better and convert more visitors into customers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
