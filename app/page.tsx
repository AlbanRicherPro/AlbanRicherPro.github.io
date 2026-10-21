"use client";

import useI18n from "./components/ui/useI18n";

import BrandIntro from "./components/BrandIntro";
import BrowserPreferences from "./components/BrowserPreferences";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProductLayers from "./components/ProductLayers";
import SignatureMotion from "./components/SignatureMotion";

export default function Home() {
  const { t } = useI18n();
  return (
    <>
      <BrowserPreferences />
      <BrandIntro />
      <a className="skip-link" href="#main">
        {t("Aller au contenu")}
      </a>
      <Navigation />
      <SignatureMotion />
      <main id="main" tabIndex={-1} className="section-anchor">
        <Hero />
        <AboutSection />
        <ProductLayers />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
