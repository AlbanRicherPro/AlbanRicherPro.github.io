"use client";

import useI18n from "./ui/useI18n";

import Image from "next/image";
import Icon from "./ui/Icon";
import HeroVideo from "./HeroVideo";

const videoPoster = "/videos/pointing-down-poster.jpg";

export default function Hero() {
  const { t } = useI18n();
  return (
    <section id="home" tabIndex={-1} className="hero section-anchor">
      <div id="header-sentinel" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-enter">
            {"Alban"}
            <span className="hero-slash accent" aria-hidden="true">
              /
            </span>
            <br />
            <span className="hero-surname">
              {"Richer"}
              <span className="accent">.</span>
            </span>
          </h1>
          <p className="hero-role hero-enter">
            {"Lead Full Stack Developer."}
            <br />
            <span className="role-aside">
              {t("Le code, et les gens derrière.")}
            </span>
          </p>
          <p className="hero-description hero-enter">
            {t(
              "Chez Deemply, je pilote les choix techniques, je développe les fonctionnalités et j’accompagne l’équipe. Mon rôle relie les besoins du produit, l’architecture et la qualité des applications, du frontend au backend.",
            )}
          </p>
          <div className="hero-actions hero-enter">
            <a href="#experience" className="button button-primary">
              {t("Mon parcours")} <Icon name="arrow" />
            </a>
            <a href="#contact" className="button button-secondary">
              {t("On en parle ?")} <Icon name="arrow" />
            </a>
          </div>
          <div className="hero-meta">
            <span>
              <Icon name="pin" /> {"Aizenay, Pays de la Loire"}
            </span>
            <span>{t("Deemply · depuis 2020")}</span>
          </div>
        </div>
        <div className="hero-visual hero-enter">
          <div className="portrait-note" aria-hidden="true">
            <span>{t("Salut, c’est moi.")}</span>
            <svg width="92" height="58" viewBox="0 0 92 58" fill="none">
              <path
                d="M5 7c37-12 62 6 65 38m-12-9 13 13 12-14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="portrait-frame">
            <Image
              src={videoPoster}
              alt={t("Aperçu de la vidéo d’Alban Richer")}
              fill
              sizes="(max-width: 767px) 80vw, 340px"
              preload
              className="portrait-image"
            />
            <HeroVideo src="/videos/pointing-down.mp4" poster={videoPoster} />
          </div>
          <div className="portrait-label">
            <span className="mono">{t("ALBAN, CÔTÉ HUMAIN")}</span>
            <span className="brand-mark" aria-hidden="true">
              a<span>/</span>r<span className="brand-dot" />
            </span>
          </div>
          <span className="portrait-side mono" aria-hidden="true">
            {"FRONTEND ↔ BACKEND"}
          </span>
        </div>
      </div>
    </section>
  );
}
