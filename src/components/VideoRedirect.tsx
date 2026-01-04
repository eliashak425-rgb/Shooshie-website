"use client";

import { useEffect, useState } from "react";

// PLACEHOLDER - Replace with your actual YouTube video URL
const YOUTUBE_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function VideoRedirect({ children }: { children: React.ReactNode }) {
  const [countdown, setCountdown] = useState(3);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    // Check if already redirected this session
    if (sessionStorage.getItem("video_redirected")) {
      setRedirected(true);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          sessionStorage.setItem("video_redirected", "true");
          window.location.href = YOUTUBE_URL;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // If already redirected this session, show the website
  if (redirected) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0b]">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-violet-900/20" />
      
      {/* Pulsing circle countdown */}
      <div className="relative mb-8">
        <div className="absolute inset-0 animate-ping rounded-full bg-purple-500/30" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-purple-500/50 bg-black/50 backdrop-blur-sm">
          <span className="text-6xl font-bold text-purple-400">{countdown}</span>
        </div>
      </div>

      {/* Text */}
      <h1 className="mb-2 text-2xl font-light tracking-wide text-white">
        Redirecting you...
      </h1>
      <p className="text-zinc-500">
        Taking you to learn more about me
      </p>

      {/* Skip button */}
      <button
        onClick={() => {
          sessionStorage.setItem("video_redirected", "true");
          window.location.href = YOUTUBE_URL;
        }}
        className="mt-8 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-sm text-purple-400 transition-all hover:border-purple-400 hover:bg-purple-500/20"
      >
        Skip countdown →
      </button>
    </div>
  );
}

