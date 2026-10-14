"use client";

import useI18n from "./ui/useI18n";

import Icon from "./ui/Icon";
import Image from "next/image";
export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
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
          {t("Retour en haut")} <Icon name="down" className="rotate-180" />
        </a>
      </div>
    </footer>
  );
}
