"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./ui/Icon";

const items = [
  { name: "À propos", id: "about" },
  { name: "Expérience", id: "experience" },
  { name: "Compétences", id: "skills" },
  { name: "Contact", id: "contact" },
];

export default function Navigation() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLElement>(null);
  const links = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const header = nav.current;
    const sentinel = document.getElementById("header-sentinel");
    const sections = ["home", ...items.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(entry.target.id === "home" ? "" : entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    const headerObserver = new IntersectionObserver(([entry]) => {
      header?.classList.toggle("is-scrolled", !entry.isIntersecting);
    });
    if (sentinel) headerObserver.observe(sentinel);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", onResize);
    return () => {
      observer.disconnect();
      headerObserver.disconnect();
      desktop.removeEventListener("change", onResize);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    links.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  function navigate(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    setOpen(false);
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
      return;
    const destination = document.getElementById(id);
    // Native anchor behavior preserves the URL and browser history.
    destination?.focus({ preventScroll: true });
  }

  return (
    <nav
      aria-label="Navigation principale"
      className="site-header"
      ref={nav}
      onBlur={(event) => {
        if (
          open &&
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          setOpen(false);
      }}
    >
      <div className="container nav-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Alban Richer, accueil"
          onClick={(event) => navigate(event, "home")}
        >
          <span className="brand-mark">
            a<span>/</span>r
          </span>
          <span className="brand-name">Alban Richer</span>
        </a>
        <button
          ref={toggle}
          type="button"
          className="menu-toggle icon-link"
          aria-expanded={open}
          aria-controls="navigation-links"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <div
          id="navigation-links"
          ref={links}
          className={`nav-links ${open ? "is-open" : ""}`}
        >
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={`nav-link ${active === item.id ? "is-active" : ""}`}
              onClick={(event) => navigate(event, item.id)}
            >
              {item.name}
            </a>
          ))}
          <div className="nav-socials">
            <a
              className="icon-link nav-social"
              href="https://github.com/AlbanRicherPro"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub, nouvel onglet"
            >
              <Icon name="github" />
            </a>
            <a
              className="icon-link nav-social"
              href="https://fr.linkedin.com/in/alban-richer-144085a7"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn, nouvel onglet"
            >
              <Icon name="linkedin" />
            </a>
          </div>
        </div>
      </div>
      <noscript>
        <div className="no-js-nav">
          {items.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.name}
            </a>
          ))}
        </div>
      </noscript>
    </nav>
  );
}
