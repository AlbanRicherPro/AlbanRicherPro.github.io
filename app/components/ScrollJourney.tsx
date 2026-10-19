"use client";

import { useEffect, useRef } from "react";

export default function ScrollJourney() {
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = rail.current;
    const main = document.getElementById("main");
    if (!element || !main) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      element.style.setProperty("--journey-progress", String(progress));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const resize = new ResizeObserver(schedule);
    resize.observe(main);
    const sections = main.querySelectorAll<HTMLElement>("section.section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) =>
          entry.target.classList.toggle("is-in-view", entry.isIntersecting),
        );
      },
      { rootMargin: "-10% 0px -10% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      sections.forEach((section) => section.classList.remove("is-in-view"));
    };
  }, []);
  return (
    <div ref={rail} className="journey-rail" aria-hidden="true">
      <span />
    </div>
  );
}
