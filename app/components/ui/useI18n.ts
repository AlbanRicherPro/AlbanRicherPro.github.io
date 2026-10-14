"use client";

import { useSyncExternalStore } from "react";
import { selectLocale, type Locale } from "../../lib/locale";
import english from "../../lib/en.json";
import { readPreference, subscribePreferences } from "./preferences";

const translations: Record<string, string> = english;
function subscribe(onChange: () => void) {
  const unsubscribe = subscribePreferences(onChange);
  window.addEventListener("languagechange", onChange);
  return () => {
    unsubscribe();
    window.removeEventListener("languagechange", onChange);
  };
}
function getSnapshot(): Locale {
  const preference = readPreference("language");
  if (preference === "fr" || preference === "en") return preference;
  return selectLocale(
    navigator.languages.length ? navigator.languages : [navigator.language],
  );
}
function getServerSnapshot(): Locale {
  return "fr";
}
export default function useI18n() {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return {
    locale,
    t: (text: string) =>
      locale === "en" ? (translations[text] ?? text) : text,
  };
}
