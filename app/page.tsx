"use client";

import useI18n from "./components/ui/useI18n";

import BrowserPreferences from "./components/BrowserPreferences";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <BrowserPreferences />
      <a className="skip-link" href="#main">
        {t("Aller au contenu")}
      </a>
      <Navigation />
      <main id="main" tabIndex={-1} className="section-anchor">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
