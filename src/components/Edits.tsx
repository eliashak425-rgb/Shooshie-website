"use client";

import { Play, ExternalLink } from "lucide-react";
import { useState } from "react";

// Add your video edits here - supports YouTube, Vimeo, or direct video URLs
const edits = [
  {
    title: "Demo Edit 1",
    description: "A showcase of motion graphics and transitions.",
    // YouTube video ID or full URL
    videoId: "dQw4w9WgXcQ", // Replace with your actual video ID
    platform: "youtube" as const,
    category: "Motion Graphics",
  },
  {
    title: "Demo Edit 2", 
    description: "Cinematic color grading and visual effects.",
    videoId: "dQw4w9WgXcQ", // Replace with your actual video ID
    platform: "youtube" as const,
    category: "Color Grading",
  },
  {
    title: "Demo Edit 3",
    description: "Fast-paced editing with dynamic sound design.",
    videoId: "dQw4w9WgXcQ", // Replace with your actual video ID
    platform: "youtube" as const,
    category: "Music Video",
  },
];

function VideoEmbed({ 
  videoId, 
  platform, 
  title 
}: { 
  videoId: string; 
  platform: "youtube" | "vimeo"; 
  title: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  const embedUrl = platform === "youtube" 
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${videoId}`;

  const thumbnailUrl = platform === "youtube"
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  if (!isLoaded && thumbnailUrl) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="group relative flex h-full w-full items-center justify-center overflow-hidden bg-zinc-900"
        aria-label={`Play ${title}`}
      >
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/30" />
        {/* Play button */}
        <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/30 transition-transform group-hover:scale-110">
          <Play className="h-6 w-6 fill-current" />
        </div>
      </button>
    );
  }

  return (
    <iframe
      src={embedUrl}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="h-full w-full"
    />
  );
}

export default function Edits() {
  return (
    <section id="edits" className="border-t border-purple-500/20 bg-[#0a0a0b] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-2 inline-block text-xs font-medium uppercase tracking-widest text-purple-400">
              Video Editing
            </span>
            <h2 className="font-serif text-4xl tracking-tight text-white md:text-5xl">
              My Edits
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500">
            A selection of my video editing work showcasing motion graphics, 
            color grading, and creative storytelling.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {edits.map((edit, index) => (
            <article key={index} className="group">
              {/* Video Container */}
              <div className="relative mb-4 aspect-video overflow-hidden rounded-lg border border-purple-500/20 bg-zinc-900 transition-all group-hover:border-purple-500/40 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                <VideoEmbed
                  videoId={edit.videoId}
                  platform={edit.platform}
                  title={edit.title}
                />
              </div>
              
              {/* Info */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="mb-1 font-serif text-xl text-white">
                    {edit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-500">
                    {edit.description}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-xs font-medium text-purple-400">
                  {edit.category}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Optional: Link to more edits */}
        <div className="mt-12 flex justify-center">
          <a
            href="https://youtube.com/@yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-purple-400"
          >
            View more on YouTube
            <ExternalLink className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

