"use client";

import { useEffect, useRef, useState } from "react";

// The decorative video plays on all screen sizes when motion is allowed.
// The server-rendered first frame underneath remains the fallback in every state.
export default function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [hasFrame, setHasFrame] = useState(false);
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
      const allowed = !motion.matches && !document.hidden && visible && !failed;
      if (!allowed) {
        video.pause();
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
            setHasFrame(true);
          }
        })
        .catch(() => {});
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
  }, [src]);
  return (
    <video
      ref={ref}
      poster={poster}
      muted
      playsInline
      loop
      preload="none"
      disablePictureInPicture
      aria-hidden="true"
      className={`hero-video ${hasFrame ? "has-frame" : ""}`}
    />
  );
}
