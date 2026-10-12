"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import Icon from "./ui/Icon";

// Precomputed geometry keeps SVG attributes identical across JS engines during hydration.
// Each eye reuses this normalized heart with a fixed translate/scale transform.
const HEART_PATH =
  "M0,-0.51724 L0.00094,-0.53074 L0.00743,-0.56971 L0.02446,-0.62975 L0.05604,-0.70411 L0.10475,-0.7844 L0.17148,-0.86158 L0.25531,-0.92692 L0.35355,-0.97287 L0.46191,-0.99381 L0.57483,-0.98652 L0.68595,-0.95028 L0.78858,-0.88677 L0.8763,-0.79961 L0.94346,-0.69377 L0.98562,-0.57482 L1,-0.44828 L0.98562,-0.31898 L0.94346,-0.19069 L0.8763,-0.06586 L0.78858,0.05428 L0.68595,0.16952 L0.57483,0.28024 L0.46191,0.38701 L0.35355,0.49011 L0.25531,0.58921 L0.17148,0.68314 L0.10475,0.76994 L0.05604,0.84694 L0.02446,0.91114 L0.00743,0.95957 L0.00094,0.98975 L0,1 L-0.00094,0.98975 L-0.00743,0.95957 L-0.02446,0.91114 L-0.05604,0.84694 L-0.10475,0.76994 L-0.17148,0.68314 L-0.25531,0.58921 L-0.35355,0.49011 L-0.46191,0.38701 L-0.57483,0.28024 L-0.68595,0.16952 L-0.78858,0.05428 L-0.8763,-0.06586 L-0.94346,-0.19069 L-0.98562,-0.31898 L-1,-0.44828 L-0.98562,-0.57482 L-0.94346,-0.69377 L-0.8763,-0.79961 L-0.78858,-0.88677 L-0.68595,-0.95028 L-0.57483,-0.98652 L-0.46191,-0.99381 L-0.35355,-0.97287 L-0.25531,-0.92692 L-0.17148,-0.86158 L-0.10475,-0.7844 L-0.05604,-0.70411 L-0.02446,-0.62975 L-0.00743,-0.56971 L-0.00094,-0.53074 L0,-0.51724 Z";

export default function DeemplyMascot() {
  const id = useId().replace(/:/g, "");
  const scene = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hearts, setHearts] = useState(false);

  useEffect(() => {
    const element = scene.current;
    if (!element) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () =>
      setMoving(visible && !document.hidden && !preference.matches);
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    preference.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      preference.removeEventListener("change", sync);
    };
  }, []);

  function look(event: React.PointerEvent<HTMLButtonElement>) {
    if (event.pointerType !== "mouse" || paused || !moving) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    scene.current?.style.setProperty(
      "--look-x",
      `${((event.clientX - bounds.left) / bounds.width - 0.5) * -8}px`,
    );
    scene.current?.style.setProperty(
      "--look-y",
      `${((event.clientY - bounds.top) / bounds.height - 0.5) * 6}px`,
    );
  }
  function resetLook() {
    scene.current?.style.setProperty("--look-x", "0px");
    scene.current?.style.setProperty("--look-y", "0px");
  }

  return (
    <div
      ref={scene}
      className={`mascot-scene ${moving && !paused ? "is-moving" : ""} ${hearts ? "has-hearts" : ""}`}
    >
      <button
        type="button"
        className="mascot-trigger"
        aria-pressed={hearts}
        aria-label="Afficher les yeux en cœur de la mascotte Deemply"
        onClick={() => setHearts((value) => !value)}
        onPointerMove={look}
        onPointerLeave={resetLook}
      >
        <span className="mascot-art">
          <Image
            src="/deemply-mascot.webp"
            alt="Mascotte Deemply"
            width={1000}
            height={905}
            sizes="(max-width: 767px) 280px, 360px"
            className="mascot-body"
          />
          <svg
            className="mascot-eyes"
            viewBox="0 0 1000 905"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id={`${id}-dots`}
                width="17"
                height="17"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="8.5" cy="8.5" r="4.2" fill="#d9adf4" />
              </pattern>
              <clipPath id={`${id}-neutral`}>
                <ellipse cx="203" cy="425" rx="86" ry="123" />
                <ellipse cx="487" cy="425" rx="106" ry="123" />
              </clipPath>
              <clipPath id={`${id}-love`}>
                <path
                  d={HEART_PATH}
                  transform="translate(203 425) scale(94 127)"
                />
                <path
                  d={HEART_PATH}
                  transform="translate(487 425) scale(116 127)"
                />
              </clipPath>
            </defs>
            <g className="mascot-neutral" clipPath={`url(#${id}-neutral)`}>
              <rect width="1000" height="905" fill={`url(#${id}-dots)`} />
            </g>
            <g className="mascot-love" clipPath={`url(#${id}-love)`}>
              <rect width="1000" height="905" fill={`url(#${id}-dots)`} />
            </g>
          </svg>
        </span>
      </button>
      <div className="mascot-caption">
        <p>Deemply, mon quotidien depuis 2020.</p>
        <a
          className="mascot-link"
          href="https://www.deemply.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Découvrir Deemply <Icon name="arrow" />
        </a>
      </div>
      <button
        type="button"
        className="mascot-motion-toggle"
        onClick={() => {
          setPaused((value) => !value);
          resetLook();
        }}
        aria-pressed={paused}
      >
        {paused ? "Reprendre l’animation" : "Mettre l’animation en pause"}
      </button>
    </div>
  );
}
