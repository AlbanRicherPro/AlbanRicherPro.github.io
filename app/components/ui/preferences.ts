"use client";

import { useSyncExternalStore } from "react";

export type ThemePreference = "auto" | "light" | "dark";
export type LanguagePreference = "auto" | "fr" | "en";
const changeEvent = "portfolio-preferences-change";
const keys = { theme: "portfolio-theme", language: "portfolio-language" };
const allowed = {
  theme: ["auto", "light", "dark"],
  language: ["auto", "fr", "en"],
};
const memory: Record<string, string> = {};
let storageUnavailable = false;

export function readPreference(kind: keyof typeof keys): string {
  if (storageUnavailable) return memory[kind] ?? "auto";
  let value: string | null;
  try {
    value = localStorage.getItem(keys[kind]);
  } catch {
    value = memory[kind] ?? null;
  }
  return value && allowed[kind].includes(value) ? value : "auto";
}
export function subscribePreferences(onChange: () => void) {
  window.addEventListener(changeEvent, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(changeEvent, onChange);
    window.removeEventListener("storage", onChange);
  };
}
function setPreference(kind: keyof typeof keys, value: string) {
  if (!allowed[kind].includes(value)) return;
  memory[kind] = value;
  try {
    if (value === "auto") localStorage.removeItem(keys[kind]);
    else localStorage.setItem(keys[kind], value);
  } catch {
    storageUnavailable = true;
    /* Keep the selection for this visit if storage is unavailable. */
  }
  window.dispatchEvent(new Event(changeEvent));
}
const serverSnapshot = () => "auto";
const themeSnapshot = () => readPreference("theme") as ThemePreference;
const languageSnapshot = () => readPreference("language") as LanguagePreference;
export function usePreferences() {
  const theme = useSyncExternalStore(
    subscribePreferences,
    themeSnapshot,
    serverSnapshot,
  ) as ThemePreference;
  const language = useSyncExternalStore(
    subscribePreferences,
    languageSnapshot,
    serverSnapshot,
  ) as LanguagePreference;
  return {
    theme,
    language,
    setTheme: (value: ThemePreference) => setPreference("theme", value),
    setLanguage: (value: LanguagePreference) =>
      setPreference("language", value),
  };
}
