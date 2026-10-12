"use client";

import { useEffect, useRef, useState } from "react";

// The decorative video plays on all screen sizes when motion is allowed.
// The server-rendered portrait underneath remains the fallback in every state.
export default function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let failed = false;
    let disposed = false;
    let version = 0;
    function sync() {
      if (!video) return;
      const request = ++version;
      const allowed =
        !motion.matches && !document.hidden && visible && !failed && !paused;
      if (!allowed) {
        video.pause();
        setPlaying(false);
        return;
      }
      if (!video.getAttribute("src")) {
        video.src = src;
        video.load();
      }
      video
        .play()
        .then(() => {
          if (!disposed && request === version) {
            setPlaying(true);
            setHasFrame(true);
          }
        })
        .catch(() => {
          if (!disposed && request === version) setPlaying(false);
        });
    }
    const onError = () => {
      failed = true;
      setHasFrame(false);
      sync();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(video);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    video.addEventListener("error", onError);
    return () => {
      disposed = true;
      version++;
      observer.disconnect();
      video.pause();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      video.removeEventListener("error", onError);
    };
  }, [src, paused]);
  return (
    <>
      <video
        ref={ref}
        muted
        playsInline
        loop
        preload="none"
        disablePictureInPicture
        aria-hidden="true"
        className={`hero-video ${hasFrame ? "has-frame" : ""}`}
      />
      {(hasFrame || playing || paused) && (
        <button
          type="button"
          className="video-toggle"
          onClick={() => setPaused((value) => !value)}
          aria-label={
            paused
              ? "Activer la vidéo décorative"
              : "Désactiver la vidéo décorative"
          }
        >
          {paused ? "Activer la vidéo" : "Pause vidéo"}
        </button>
      )}
    </>
  );
}
