"use client";

import { useEffect, useRef } from "react";
import { INTRO_SESSION_KEY } from "../lib/intro";

const parts = ["a", "slash", "r", "dot"] as const;

export default function BrandIntro() {
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const scene = overlay.current;
    if (!scene || root.dataset.intro !== "pending") return;
    let disposed = false;
    let started = false;
    const animations: Animation[] = [];
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer = 0;

    function finish() {
      root.dataset.intro = "done";
      animations.forEach((animation) => animation.cancel());
      window.clearTimeout(timer);
      changes.forEach((name) => window.removeEventListener(name, interrupt));
      preference.removeEventListener("change", interrupt);
      window.removeEventListener("portfolio-intro-cancel", interrupt);
    }
    const interrupt = () => finish();
    const changes = [
      "wheel",
      "touchstart",
      "pointerdown",
      "keydown",
      "scroll",
      "resize",
    ] as const;
    changes.forEach((name) =>
      window.addEventListener(name, interrupt, { passive: true }),
    );
    preference.addEventListener("change", interrupt);
    window.addEventListener("portfolio-intro-cancel", interrupt);

    async function play() {
      await document.fonts.ready;
      if (disposed || root.dataset.intro !== "pending") return;
      // Restored scroll positions and direct anchors keep their native behavior.
      if (
        window.scrollY > 16 ||
        (window.location.hash && window.location.hash !== "#home")
      ) {
        finish();
        return;
      }
      started = true;
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, "1");
      } catch {}
      if (preference.matches) {
        const fade = scene!.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 180,
          fill: "forwards",
        });
        animations.push(fade);
        timer = window.setTimeout(finish, 200);
        return;
      }

      const targets = parts.map((part) =>
        document.querySelector<HTMLElement>(`[data-intro-target="${part}"]`),
      );
      const glyphs = parts.map((part) =>
        scene!.querySelector<HTMLElement>(`[data-intro-glyph="${part}"]`),
      );
      if (targets.some((target) => !target) || glyphs.some((glyph) => !glyph)) {
        finish();
        return;
      }
      root.dataset.intro = "running";
      const starts = glyphs.map((glyph) => glyph!.getBoundingClientRect());
      const sizes = glyphs.map((glyph) =>
        parseFloat(getComputedStyle(glyph!).fontSize),
      );
      const ends = targets.map((target) => target!.getBoundingClientRect());
      const styles = targets.map((target) => getComputedStyle(target!));
      const easing = "cubic-bezier(0.76, 0, 0.24, 1)";

      glyphs.forEach((glyph, index) => {
        const node = glyph!;
        const end = ends[index];
        const style = styles[index];
        const scale = sizes[index] / parseFloat(style.fontSize);
        Object.assign(node.style, {
          position: "fixed",
          left: `${end.left}px`,
          top: `${end.top}px`,
          fontSize: style.fontSize,
          fontFamily: style.fontFamily,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          lineHeight: style.lineHeight,
          color: style.color,
        });
        const start = `translate(${starts[index].left - end.left}px, ${starts[index].top - end.top}px) scale(${scale})`;
        const flight = node.animate(
          [
            { transform: start, opacity: 0, offset: 0 },
            { transform: start, opacity: 1, offset: 0.18 },
            { transform: "translate(0, 0) scale(1)", opacity: 1, offset: 1 },
          ],
          { duration: 2400, delay: index * 70, easing, fill: "both" },
        );
        animations.push(flight);
        const lower = node.querySelector<HTMLElement>(".intro-lower");
        const capital = node.querySelector<HTMLElement>(".intro-capital");
        if (lower && capital) {
          animations.push(
            lower.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 300,
              delay: 1440,
              fill: "forwards",
            }),
          );
          animations.push(
            capital.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 300,
              delay: 1440,
              fill: "forwards",
            }),
          );
        }
      });
      const backdrop = scene!.querySelector<HTMLElement>(".intro-backdrop")!;
      animations.push(
        backdrop.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 1240,
          delay: 860,
          fill: "forwards",
        }),
      );
      document
        .querySelectorAll<HTMLElement>(
          "[data-intro-rest], #home .hero-copy > :not(h1), #home .hero-visual, .site-header, .site-footer",
        )
        .forEach((element, index) => {
          animations.push(
            element.animate(
              [
                { opacity: 0, translate: "0 10px" },
                { opacity: 1, translate: "0 0" },
              ],
              {
                duration: element.hasAttribute("data-intro-rest") ? 560 : 1000,
                delay: element.hasAttribute("data-intro-rest")
                  ? 2300
                  : 1520 + Math.min(index * 50, 280),
                easing: "cubic-bezier(.22,1,.36,1)",
                fill: "both",
              },
            ),
          );
        });
      timer = window.setTimeout(finish, 3000);
    }
    void play().catch(finish);
    return () => {
      disposed = true;
      if (started) finish();
      changes.forEach((name) => window.removeEventListener(name, interrupt));
      preference.removeEventListener("change", interrupt);
      window.removeEventListener("portfolio-intro-cancel", interrupt);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div className="brand-intro" ref={overlay} aria-hidden="true">
      <div className="intro-backdrop" />
      <div className="intro-mark">
        <span className="intro-glyph" data-intro-glyph="a">
          <span className="intro-lower">a</span>
          <span className="intro-capital">A</span>
        </span>
        <span className="intro-glyph intro-accent" data-intro-glyph="slash">
          /
        </span>
        <span className="intro-glyph" data-intro-glyph="r">
          <span className="intro-lower">r</span>
          <span className="intro-capital">R</span>
        </span>
        <span className="intro-glyph intro-accent" data-intro-glyph="dot">
          .
        </span>
      </div>
    </div>
  );
}
