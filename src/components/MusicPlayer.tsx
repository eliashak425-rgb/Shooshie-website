"use client";

import { useState, useRef, useEffect } from "react";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const DEFAULT_VOLUME = 0.12; // 12% volume - nice and quiet

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [showVolume, setShowVolume] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const initializedRef = useRef(false);
  const hasAutoPlayedRef = useRef(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent double initialization in Strict Mode
    if (initializedRef.current) return;
    initializedRef.current = true;

    // Create audio element
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = DEFAULT_VOLUME;
    audioRef.current = audio;

    const handleCanPlay = () => setIsReady(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleTimeUpdate = () => setProgress(audio.currentTime);

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.pause();
      audio.src = "";
      initializedRef.current = false;
    };
  }, []);

  // Auto-play ONCE when audio is ready
  useEffect(() => {
    if (autoPlay && isReady && audioRef.current && !hasAutoPlayedRef.current) {
      hasAutoPlayedRef.current = true;
      audioRef.current.play().catch(() => {
        // Autoplay blocked - user will need to click
      });
    }
  }, [autoPlay, isReady]);

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    // State is updated by the play/pause event listeners
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current || !duration) return;
    
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons !== 1) return; // Only when mouse button is held
    handleSeek(e);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-black/50 text-purple-400 backdrop-blur-sm transition-all hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Volume Control */}
      <div 
        className="relative"
        onMouseEnter={() => setShowVolume(true)}
        onMouseLeave={() => setShowVolume(false)}
      >
        <button
          onClick={toggleMute}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-purple-500/30 bg-black/50 text-purple-400 backdrop-blur-sm transition-all hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted || volume === 0 ? (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
        
        {/* Volume Slider - appears on hover */}
        {showVolume && (
          <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg border border-purple-500/30 bg-black/80 p-3 backdrop-blur-sm">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="h-20 w-2 cursor-pointer appearance-none rounded-full bg-zinc-700 accent-purple-500"
              style={{ writingMode: "vertical-lr", direction: "rtl" }}
            />
          </div>
        )}
      </div>

      {/* Track info with progress bar - hidden on small screens */}
      <div className="hidden items-center gap-3 rounded-full border border-purple-500/20 bg-black/50 px-3 py-2 backdrop-blur-sm sm:flex">
        {/* Animated bars */}
        {isPlaying && (
          <div className="flex gap-0.5">
            <span className="inline-block h-3 w-0.5 animate-pulse bg-purple-400" style={{ animationDelay: "0ms" }} />
            <span className="inline-block h-3 w-0.5 animate-pulse bg-purple-400" style={{ animationDelay: "150ms" }} />
            <span className="inline-block h-3 w-0.5 animate-pulse bg-purple-400" style={{ animationDelay: "300ms" }} />
          </div>
        )}
        
        {/* Track name */}
        <span className="text-xs text-purple-300/70">scars - Novulent</span>
        
        {/* Progress bar - larger click area with padding */}
        <div 
          ref={progressBarRef}
          onClick={handleSeek}
          onMouseMove={handleDrag}
          className="group relative flex h-4 w-28 cursor-pointer items-center"
        >
          {/* Track background */}
          <div className="absolute h-1 w-full rounded-full bg-zinc-700" />
          {/* Progress fill */}
          <div 
            className="absolute h-1 rounded-full bg-gradient-to-r from-purple-600 to-purple-400"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Playhead dot - always visible */}
          <div 
            className="absolute h-3 w-3 -translate-x-1/2 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50 transition-transform hover:scale-125"
            style={{ left: `${progressPercent}%` }}
          />
        </div>
        
        {/* Time */}
        <span className="font-mono text-[10px] text-zinc-500">
          {formatTime(progress)}
        </span>
      </div>
    </div>
  );
}

