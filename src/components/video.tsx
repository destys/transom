"use client";

import { useEffect, useRef } from "react";

interface VideoProps {
  url: string;
  className?: string;
}

export function Video({ url, className }: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 767;

    const playAllVideos = () => {
      const videos = document.querySelectorAll("video[data-autoplay-video]");
      videos.forEach((video) => {
        if (video instanceof HTMLVideoElement) {
          video.muted = true;
          video.load();
          video.play().catch((err) => {
            console.warn("Autoplay failed:", err);
          });
        }
      });
    };

    if (isMobile) {
      playAllVideos();
      const handleInteraction = () => {
        playAllVideos();
        document.removeEventListener("DOMContentLoaded", handleInteraction);
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      };

      document.addEventListener("DOMContentLoaded", handleInteraction);
      document.addEventListener("click", handleInteraction);
      document.addEventListener("touchstart", handleInteraction);

      return () => {
        document.removeEventListener("DOMContentLoaded", handleInteraction);
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      };
    } else {
      // Десктоп: автозапуск без клика
      playAllVideos();
    }
  }, []);

  return (
    <video
      ref={videoRef}
      src={url}
      className={className}
      muted
      playsInline
      loop
      preload="auto"
      data-autoplay-video
    />
  );
}
