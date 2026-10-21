"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "./ui/Icon";
import useI18n from "./ui/useI18n";

const perspectives = [
  {
    label: "Interface",
    title: "Commencer par l’usage.",
    description:
      "Une interface doit rendre un métier complexe plus simple. Je travaille les parcours, les composants et les retours visuels pour que chaque action soit compréhensible.",
    tags: ["Vue.js", "TypeScript", "Vuetify"],
    detail: "Du besoin utilisateur au composant.",
    icon: "code" as const,
  },
  {
    label: "Architecture",
    title: "Penser au prochain changement.",
    description:
      "Derrière l’écran, je structure les API, les données et les règles métier. L’objectif : faire évoluer le produit avec des responsabilités claires et des livraisons fiables.",
    tags: ["Symfony", "API Platform", "Docker"],
    detail: "Des règles claires, des échanges fiables.",
    icon: "layers" as const,
  },
  {
    label: "Équipe",
    title: "Faire avancer le collectif.",
    description:
      "Les choix techniques se construisent aussi en discutant. J’accompagne l’équipe, partage les connaissances et relie les priorités du produit au travail de développement.",
    tags: ["Revue de code", "Mentorat", "Priorités"],
    detail: "Le lien entre le produit et les personnes.",
    icon: "users" as const,
  },
];

export default function ProductLayers() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const track = useRef<HTMLElement>(null);
  const sticky = useRef<HTMLDivElement>(null);
  const geometry = useRef({ enabled: false, top: 100, step: 500 });
  const [scrollDriven, setScrollDriven] = useState(false);
  const id = useId();

  useEffect(() => {
    const section = track.current;
    const content = sticky.current;
    if (!section || !content) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { enabled, top, step } = geometry.current;
      if (!enabled) return;
      const distance = top - section.getBoundingClientRect().top;
      setActive(
        Math.max(
          0,
          Math.min(perspectives.length - 1, Math.floor(distance / step)),
        ),
      );
      section.style.setProperty(
        "--layers-progress",
        String(
          Math.max(0, Math.min(1, distance / (step * perspectives.length))),
        ),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      const top =
        document.querySelector(".site-header")?.getBoundingClientRect()
          .height ?? 68;
      const footer =
        document.querySelector(".site-footer")?.getBoundingClientRect()
          .height ?? 57;
      const available = Math.max(160, window.innerHeight - top - footer);
      section.style.setProperty("--layers-stage-height", `${available}px`);
      section.style.setProperty(
        "--layers-scene-scale",
        String(Math.min(1.12, Math.max(0.76, available / 850))),
      );
      // Fill the viewport; only shrink if the intrinsic content needs more room.
      const naturalHeight = content.offsetHeight;
      const scale = Math.min(1, available / naturalHeight);
      const enabled = true;
      section.style.setProperty("--layers-scale", String(scale));
      section.style.setProperty("--layers-visible-height", `${available}px`);
      section.style.setProperty("--layers-content-height", `${available}px`);
      const step = Math.max(320, window.innerHeight * 0.65);
      geometry.current = { enabled, top, step };
      section.style.setProperty("--layers-top", `${top}px`);
      section.style.setProperty(
        "--layers-travel",
        enabled ? `${step * perspectives.length}px` : "0px",
      );
      section.classList.toggle("is-scroll-driven", enabled);
      setScrollDriven(enabled);
      schedule();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    const header = document.querySelector(".site-header");
    const footer = document.querySelector(".site-footer");
    if (header) observer.observe(header);
    if (footer) observer.observe(footer);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", schedule, { passive: true });
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", schedule);
      cancelAnimationFrame(frame);
      section.classList.remove("is-scroll-driven");
      section.style.removeProperty("--layers-travel");
    };
  }, []);

  function selectPerspective(index: number) {
    setActive(index);
    const { enabled, top, step } = geometry.current;
    if (!enabled || !track.current) return;
    // Tabs and native scrolling share the same position in the sequence.
    const start =
      window.scrollY + track.current.getBoundingClientRect().top - top;
    window.scrollTo({
      top: start + step * (index + 0.15),
      behavior: "instant",
    });
  }

  const perspective = perspectives[active];

  return (
    <section
      ref={track}
      id="approach"
      className="section section-anchor product-layers"
      tabIndex={-1}
    >
      <div className="layers-track">
        <div className="layers-pin">
          <div ref={sticky} className="container layers-sticky">
            <div className="layers-title">
              <div className="layers-heading">
                <h2>
                  {t("Du besoin")}
                  <br />
                  <span>{t("à la mise en ligne.")}</span>
                </h2>
                <p>{t("Un même produit. Trois regards complémentaires.")}</p>
              </div>
            </div>
            <div className="layers-body">
              <div className="layers-studio" data-layer={active}>
                <div className="layers-explorer">
                  <div className="layers-art" aria-hidden="true">
                    <div className="layers-scene">
                      <div className="layers-grid" />
                      <span className="layer-axis">
                        a<span>/</span>r<span className="brand-dot" />
                      </span>
                      <div className="layer-plane plane-team">
                        <div className="plane-label">
                          <span /> PEOPLE
                        </div>
                        <div className="team-connections">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="team-avatars">
                          <span>AR</span>
                          <span>↗</span>
                          <span>&</span>
                        </div>
                        <div className="plane-line short" />
                        <div className="plane-line" />
                      </div>
                      <div className="layer-plane plane-system">
                        <div className="plane-label">
                          <span /> SYSTEM
                        </div>
                        <div className="system-route">
                          <span>API</span>
                          <i />
                          <span>SQL</span>
                        </div>
                        <div className="system-code">
                          <span>request</span> → <b>service</b>
                          <br />
                          <span>response</span> ← <b>data</b>
                        </div>
                      </div>
                      <div className="layer-plane plane-interface">
                        <div className="plane-label">
                          <span /> INTERFACE <i>— · ×</i>
                        </div>
                        <div className="mini-interface">
                          <div className="mini-nav">
                            <b />
                            <span />
                            <span />
                          </div>
                          <div className="mini-content">
                            <div className="plane-line short" />
                            <div className="mini-cards">
                              <i />
                              <i />
                              <i />
                            </div>
                            <div className="plane-line" />
                            <div className="plane-line short" />
                          </div>
                        </div>
                      </div>
                      <span className="layer-coordinate">
                        DESIGN / BUILD / SHARE
                      </span>
                    </div>
                  </div>
                  <div
                    className="layers-tabs"
                    role="tablist"
                    aria-label={t("Explorer mon approche")}
                  >
                    {perspectives.map((item, index) => (
                      <button
                        type="button"
                        role="tab"
                        key={item.label}
                        id={`${id}-tab-${index}`}
                        aria-selected={active === index}
                        aria-controls={`${id}-panel`}
                        tabIndex={active === index ? 0 : -1}
                        onClick={() => selectPerspective(index)}
                        onKeyDown={(event) => {
                          const next =
                            event.key === "ArrowRight"
                              ? (index + 1) % 3
                              : event.key === "ArrowLeft"
                                ? (index + 2) % 3
                                : event.key === "Home"
                                  ? 0
                                  : event.key === "End"
                                    ? 2
                                    : -1;
                          if (next < 0) return;
                          event.preventDefault();
                          selectPerspective(next);
                          event.currentTarget.parentElement
                            ?.querySelectorAll<HTMLButtonElement>(
                              '[role="tab"]',
                            )
                            [next]?.focus();
                        }}
                      >
                        <Icon name={item.icon} />
                        <span>{t(item.label)}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div
                  className="layers-panel"
                  role="tabpanel"
                  id={`${id}-panel`}
                  aria-labelledby={`${id}-tab-${active}`}
                  tabIndex={0}
                >
                  <div className="layers-panel-content" key={active}>
                    <div className="layers-panel-icon">
                      <Icon name={perspective.icon} />
                    </div>
                    <h3>{t(perspective.title)}</h3>
                    <p>{t(perspective.description)}</p>
                    <ul>
                      {perspective.tags.map((tag) => (
                        <li key={tag}>{t(tag)}</li>
                      ))}
                    </ul>
                    <div className="layers-detail">
                      <span aria-hidden="true">↳</span>
                      {t(perspective.detail)}
                    </div>
                  </div>
                  <a href="#experience" className="layers-experience-link">
                    {t("Dans mon quotidien chez Deemply")}
                    <Icon name="arrow" />
                  </a>
                </div>
              </div>
            </div>
            <div className="layers-scroll-cue">
              <span>
                {scrollDriven
                  ? t("Faites défiler pour explorer")
                  : t("Choisissez un regard")}
              </span>
              <span aria-hidden="true">{active + 1} / 3</span>
              <i aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
