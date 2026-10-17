"use client";

import useI18n from "./ui/useI18n";

import Icon from "./ui/Icon";
import Image from "next/image";
import { useEffect, useRef } from "react";
export default function Footer() {
  const { t } = useI18n();
  const footer = useRef<HTMLElement>(null);
  const pageEnd = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element = footer.current;
    if (!element) return;
    // Reserve the expanded height so the footer animation cannot move the page end.
    let reservedHeight = 0;
    const reserveSpace = () => {
      reservedHeight = Math.max(
        reservedHeight,
        Math.ceil(element.getBoundingClientRect().height),
      );
      document.documentElement.style.setProperty(
        "--footer-height",
        `${reservedHeight}px`,
      );
    };
    reserveSpace();
    const observer = new ResizeObserver(reserveSpace);
    observer.observe(element);
    const endObserver = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("is-compact", !entry.isIntersecting);
      },
      { rootMargin: "0px 0px 16px 0px" },
    );
    if (pageEnd.current) endObserver.observe(pageEnd.current);
    return () => {
      observer.disconnect();
      endObserver.disconnect();
      document.documentElement.style.removeProperty("--footer-height");
    };
  }, []);
  return (
    <>
      <span ref={pageEnd} className="page-end-marker" aria-hidden="true" />
      <footer className="site-footer" ref={footer}>
        <div className="container footer-inner">
          <a
            className="brand-mark"
            href="#home"
            aria-label={t("Retour à l’accueil")}
          >
            a<span>/</span>r<span className="brand-dot" aria-hidden="true" />
          </a>
          <div className="footer-credit">
            <p>
              © {new Date().getFullYear()} {"Alban Richer"}
            </p>
            <span className="footer-separator" aria-hidden="true">
              -
            </span>
            <p className="footer-made">
              {"Made with"}{" "}
              <Image
                src="/coeur-vendeen.svg"
                alt={t("amour en Vendée")}
                width={20}
                height={22}
              />
            </p>
          </div>
          <a className="footer-top" href="#home">
            <span className="footer-top-label">{t("Retour en haut")}</span>
            <Icon name="down" className="rotate-180" />
          </a>
        </div>
      </footer>
    </>
  );
}
