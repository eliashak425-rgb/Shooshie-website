import { ArrowRight, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Soundlaunch",
    description:
      "A music promotion platform helping artists get discovered. Built with modern web technologies for a seamless user experience.",
    category: "Web App",
    tech: ["Next.js", "Vercel"],
    link: "https://soundlaunch.vercel.app",
    image: "/soundlaunch.png",
  },
  {
    title: "The Nigerian Empire",
    description:
      "An interactive chronicle website featuring imperial lore, calendars, media archives, and a rich immersive experience.",
    category: "Interactive",
    tech: ["HTML/CSS", "JavaScript", "Netlify"],
    link: "https://nigerian-empires-official.netlify.app",
    image: "/nigerian-empire.png",
  },
  {
    title: "Personal Portfolio",
    description:
      "This portfolio site featuring 3D particle animations, an interactive globe, custom music player, and smooth transitions.",
    category: "Portfolio",
    tech: ["Next.js", "Three.js", "Tailwind CSS"],
    link: null,
    image: "/portfolio.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-t border-purple-500/20 bg-[#111113] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl tracking-tight text-white md:text-5xl">
            Featured Work
          </h2>
          <Link
            href="#"
            className="group flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-purple-400"
          >
            View All Projects
            <ArrowRight
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {projects.map((project, index) => (
            <article key={index} className="group">
              {project.link ? (
                <Link href={project.link} target="_blank" rel="noopener noreferrer" className="block cursor-pointer">
                  <div className="relative mb-6 h-64 overflow-hidden rounded-lg border border-purple-500/20 bg-[#0a0a0b] transition-all group-hover:border-purple-500/40 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <span className="rounded-md bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm">
                        {project.category}
                      </span>
                      <ExternalLink strokeWidth={1.5} className="h-4 w-4 text-purple-400 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-2xl leading-tight text-white decoration-purple-500 decoration-1 underline-offset-4 group-hover:underline">
                    {project.title}
                  </h3>
                </Link>
              ) : (
                <div>
                  <div className="relative mb-6 h-64 overflow-hidden rounded-lg border border-purple-500/20 bg-[#0a0a0b]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <span className="rounded-md bg-purple-500/20 px-2 py-1 text-xs font-medium text-purple-300 backdrop-blur-sm">
                        {project.category}
                      </span>
                      <span className="rounded-md bg-green-500/20 px-2 py-1 text-xs font-medium text-green-300 backdrop-blur-sm">
                        You&apos;re here
                      </span>
                    </div>
                  </div>
                  <h3 className="mb-2 font-serif text-2xl leading-tight text-white">
                    {project.title}
                  </h3>
                </div>
              )}
              <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500">
                {project.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-purple-500/20 bg-purple-500/5 px-2 py-0.5 text-xs text-purple-400">
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
