"use client";

import { useEffect, useRef, type ReactNode } from "react";

// One observer for all reveals. Content is visible before JS initializes.
const callbacks = new Map<Element, () => void>();
let observer: IntersectionObserver | undefined;
function observe(element: Element, callback: () => void) {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          callbacks.get(entry.target)?.();
          callbacks.delete(entry.target);
          observer?.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.08 },
  );
  callbacks.set(element, callback);
  observer.observe(element);
  return () => {
    callbacks.delete(element);
    observer?.unobserve(element);
    if (!callbacks.size) {
      observer?.disconnect();
      observer = undefined;
    }
  };
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  variant = "rise",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li";
  variant?: "rise" | "card";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation: Animation | undefined;
    const stop = () => {
      if (preference.matches) animation?.cancel();
    };
    preference.addEventListener("change", stop);
    const cleanup = observe(element, () => {
      if (preference.matches) return;
      animation = element.animate(
        [
          {
            opacity: 0,
            transform:
              variant === "card"
                ? "perspective(900px) translateY(28px) rotateX(4deg) scale(.97)"
                : "translateY(16px)",
          },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: variant === "card" ? 640 : 480,
          delay: Math.min(delay, 400),
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "backwards",
        },
      );
    });
    return () => {
      cleanup();
      animation?.cancel();
      preference.removeEventListener("change", stop);
    };
  }, [delay, variant]);
  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      className={className}
    >
      {children}
    </Tag>
  );
}
