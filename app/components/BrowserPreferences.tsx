"use client";

import { useEffect } from "react";
import useI18n from "./ui/useI18n";
import { usePreferences } from "./ui/preferences";

export default function BrowserPreferences() {
  const { locale } = useI18n();
  const { theme } = usePreferences();
  useEffect(() => {
    if (theme === "auto") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = "Alban Richer - Lead Full Stack Developer | Deemply";
    const description = document.querySelector('meta[name="description"]');
    description?.setAttribute(
      "content",
      locale === "en"
        ? "Alban Richer’s portfolio. Lead Full Stack Developer at Deemply since 2020: web development, software architecture and technical leadership."
        : "Portfolio d’Alban Richer. Lead Full Stack Developer chez Deemply depuis 2020 : développement web, architecture logicielle et leadership technique.",
    );
  }, [locale]);
  return null;
}
