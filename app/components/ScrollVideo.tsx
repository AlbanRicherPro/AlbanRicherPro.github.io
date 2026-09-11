'use client';

import { useEffect, useRef, useState } from 'react';

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

// Easing function for smooth transitions
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export default function ScrollVideo({
  src,
  scrollHeight = '250vh',
  centerTransparent = false,
}: ScrollVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;
    let lastScrollY = 0;
    let scrollVelocity = 0;
    let velocitySmoothed = 0;
    let targetTime = 0;
    let currentTime = 0;
    let lastTimestamp = 0;
    let animationFrameId: number | null = null;
    let isPlaying = false;
    let lastUpdateTime = 0;

    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleLoaded = () => {
      setIsLoaded(true);
      if (video.duration) {
        currentTime = video.currentTime;
        targetTime = currentTime;
      }
    };

    const updateVelocity = (currentScrollY: number) => {
      const deltaY = currentScrollY - lastScrollY;
      const now = performance.now();
      const deltaTime = now - lastUpdateTime;
      
      if (deltaTime > 0) {
        scrollVelocity = deltaY / deltaTime;
        // Smooth the velocity with exponential moving average
        velocitySmoothed = velocitySmoothed * 0.9 + scrollVelocity * 0.1;
      }
      
      lastScrollY = currentScrollY;
      lastUpdateTime = now;
    };

    const calculateTargetTime = () => {
      const rect = container.getBoundingClientRect();
      const scrollableDistance = container.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return currentTime;

      const scrollPosition = Math.max(0, Math.min(-rect.top, scrollableDistance));
      const scrollProgress = scrollPosition / scrollableDistance;
      
      // Apply easing for smoother feel
      const easedProgress = easeInOutCubic(scrollProgress);
      
      return video.duration * easedProgress;
    };

    const updateVideo = (timestamp: number) => {
      if (!video.duration || video.duration === 0) {
        animationFrameId = requestAnimationFrame(updateVideo);
        return;
      }

      if (prefersReducedMotion()) {
        video.pause();
        video.currentTime = 0;
        return;
      }

      // Calculate target time based on scroll position
      targetTime = calculateTargetTime();

      // Check if user is actively scrolling
      const isScrolling = Math.abs(velocitySmoothed) > 0.01;

      if (isScrolling) {
        // When scrolling, update time based on scroll velocity
        const playSpeed = Math.min(Math.abs(velocitySmoothed) * 5, 5); // Cap at 5x speed
        const direction = velocitySmoothed > 0 ? 1 : -1;
        
        if (playSpeed > 0.1) {
          if (!isPlaying) {
            video.playbackRate = playSpeed;
            video.play().catch(() => {});
            isPlaying = true;
          } else {
            video.playbackRate = playSpeed;
          }
          
          // Also nudge towards target position
          const timeDiff = targetTime - currentTime;
          currentTime += (timeDiff * 0.2) + (direction * playSpeed * 0.033);
        } else {
          video.pause();
          isPlaying = false;
        }
      } else {
        // When not scrolling, smoothly interpolate to target position
        if (isPlaying) {
          video.pause();
          isPlaying = false;
        }

        const timeDiff = targetTime - currentTime;
        if (Math.abs(timeDiff) > 0.01) {
          // Smooth interpolation
          currentTime += timeDiff * 0.2;
          video.currentTime = currentTime;
        }
      }

      // Clamp to video duration
      currentTime = Math.max(0, Math.min(currentTime, video.duration));

      animationFrameId = requestAnimationFrame(updateVideo);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      
      const currentScrollY = window.scrollY;
      updateVelocity(currentScrollY);
      
      requestAnimationFrame(() => {
        ticking = false;
      });
    };

    const startAnimation = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      lastUpdateTime = performance.now();
      animationFrameId = requestAnimationFrame(updateVideo);
    };

    const stopAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (isPlaying) {
        video.pause();
        isPlaying = false;
      }
    };

    // Initialize
    video.addEventListener('loadedmetadata', handleLoaded);
    video.addEventListener('canplay', handleLoaded);
    
    if (video.readyState >= 1) {
      handleLoaded();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    
    // Start animation loop
    startAnimation();

    return () => {
      stopAnimation();
      video.removeEventListener('loadedmetadata', handleLoaded);
      video.removeEventListener('canplay', handleLoaded);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (isPlaying) {
        video.pause();
      }
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
