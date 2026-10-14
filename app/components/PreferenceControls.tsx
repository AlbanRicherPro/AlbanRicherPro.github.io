"use client";

import { useEffect, useRef, useState } from "react";
import Icon, { type IconName } from "./ui/Icon";
import useI18n from "./ui/useI18n";
import { usePreferences } from "./ui/preferences";

const themes = [
  { value: "auto", label: "Système", icon: "monitor" },
  { value: "light", label: "Clair", icon: "sun" },
  { value: "dark", label: "Sombre", icon: "moon" },
] as const;
const languages = [
  { value: "auto", label: "Navigateur", icon: "globe" },
  { value: "fr", label: "Français", code: "FR" },
  { value: "en", label: "English", code: "EN" },
] as const;

export default function PreferenceControls() {
  const { locale, t } = useI18n();
  const { theme, language, setTheme, setLanguage } = usePreferences();
  const [panel, setPanel] = useState<"theme" | "language" | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const themeButton = useRef<HTMLButtonElement>(null);
  const languageButton = useRef<HTMLButtonElement>(null);
  const selectedTheme = themes.find((item) => item.value === theme)!;

  function close(restoreFocus = false) {
    if (restoreFocus)
      (panel === "theme" ? themeButton : languageButton).current?.focus();
    setPanel(null);
  }
  useEffect(() => {
    if (!panel) return;
    root.current
      ?.querySelector<HTMLButtonElement>(
        '.preference-panel [aria-pressed="true"]',
      )
      ?.focus();
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setPanel(null);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.stopPropagation();
      (panel === "theme" ? themeButton : languageButton).current?.focus();
      setPanel(null);
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape, true);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape, true);
    };
  }, [panel]);

  return (
    <div
      className="nav-preferences"
      ref={root}
      onBlur={(event) => {
        if (
          event.relatedTarget &&
          !event.currentTarget.contains(event.relatedTarget as Node)
        )
          setPanel(null);
      }}
    >
      <div className="preference-control">
        <button
          ref={themeButton}
          type="button"
          className="preference-trigger icon-link"
          aria-label={`${t("Thème")} : ${t(selectedTheme.label)}`}
          title={t("Thème")}
          aria-expanded={panel === "theme"}
          aria-controls="theme-options"
          onClick={() => setPanel(panel === "theme" ? null : "theme")}
        >
          <Icon name={selectedTheme.icon} />
        </button>
        {panel === "theme" && (
          <div
            className="preference-panel"
            id="theme-options"
            role="group"
            aria-label={t("Thème")}
          >
            <p>{t("Thème")}</p>
            {themes.map((item) => (
              <button
                key={item.value}
                type="button"
                className="preference-option"
                aria-pressed={theme === item.value}
                onClick={() => {
                  setTheme(item.value);
                  close(true);
                }}
              >
                <Icon name={item.icon} />
                <span>{t(item.label)}</span>
                <span className="preference-selected" aria-hidden="true">
                  {theme === item.value && <Icon name="check" />}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="preference-control">
        <button
          ref={languageButton}
          type="button"
          className="preference-trigger preference-language icon-link"
          aria-label={`${t("Langue")} : ${language === "auto" ? t("Navigateur") : language === "fr" ? "Français" : "English"}`}
          title={t("Langue")}
          aria-expanded={panel === "language"}
          aria-controls="language-options"
          onClick={() => setPanel(panel === "language" ? null : "language")}
        >
          <span>{locale.toUpperCase()}</span>
        </button>
        {panel === "language" && (
          <div
            className="preference-panel"
            id="language-options"
            role="group"
            aria-label={t("Langue")}
          >
            <p>{t("Langue")}</p>
            {languages.map((item) => (
              <button
                key={item.value}
                type="button"
                className="preference-option"
                aria-pressed={language === item.value}
                onClick={() => {
                  setLanguage(item.value);
                  close(true);
                }}
              >
                {"icon" in item ? (
                  <Icon name={item.icon as IconName} />
                ) : (
                  <span className="preference-code">{item.code}</span>
                )}
                <span>{t(item.label)}</span>
                <span className="preference-selected" aria-hidden="true">
                  {language === item.value && <Icon name="check" />}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
