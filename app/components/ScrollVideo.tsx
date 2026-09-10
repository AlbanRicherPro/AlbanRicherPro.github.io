'use client';

import { useEffect, useRef } from 'react';

// Add style tag for animations
const styleId = 'scroll-video-styles';
if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background-size: 200% 200%;
      animation: gradient 3s ease infinite;
    }
  `;
  document.head.appendChild(style);
}

type ScrollVideoProps = {
  src: string;
  scrollHeight?: string;
  centerTransparent?: boolean;
};

export default function ScrollVideo({
  src,
  scrollHeight = '250vh',
  centerTransparent = false,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;
    let readyToSeek = true;
    let seekTimeout: number | undefined;

    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const releaseSeek = () => {
      readyToSeek = true;
      if (seekTimeout !== undefined) {
        window.clearTimeout(seekTimeout);
        seekTimeout = undefined;
      }
    };

    const updateTime = () => {
      ticking = false;

      if (!Number.isFinite(video.duration) || video.duration === 0) {
        return;
      }

      if (prefersReducedMotion()) {
        video.currentTime = 0;
        return;
      }

      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return;

      const scrollPosition = Math.max(0, Math.min(-rect.top, scrollableDistance));
      // Ajuster pour une vitesse plus rapide (x1.5)
      const nextTime = video.duration * (scrollPosition / scrollableDistance) * 1.5;

      if (!readyToSeek) return;
      if (Math.abs(video.currentTime - nextTime) < 0.03) return;

      readyToSeek = false;
      video.pause();
      video.currentTime = nextTime;
      seekTimeout = window.setTimeout(releaseSeek, 120);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateTime);
    };

    const handleSeeked = () => {
      releaseSeek();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    video.addEventListener('loadedmetadata', onScroll);
    video.addEventListener('seeked', handleSeeked);

    onScroll();

    return () => {
      releaseSeek();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', onScroll);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: scrollHeight }}
      aria-hidden="true"
    >
      <div className="sticky flex h-svh w-full items-center justify-center overflow-hidden bg-[#6f6f6f]" style={{ top: '60px' }}>
        <div className="absolute inset-0 bg-[#6f6f6f]" />
        <div className="w-2/5 max-w-2xl h-full relative z-10">
          <video
            ref={videoRef}
            src={src}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            className="h-full w-full object-cover rounded-3xl"
          />
          <div className={`pointer-events-none absolute inset-0 rounded-3xl ${centerTransparent ? 'bg-gradient-to-r from-slate-900/95 via-slate-900/10 to-slate-900/95' : 'bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-slate-900/60'}`} />
        </div>
      </div>
    </div>
  );
}
