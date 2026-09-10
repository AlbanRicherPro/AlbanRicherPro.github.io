'use client';

import { useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import ScrollVideo from './components/ScrollVideo';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
      
      // Show/hide about section based on scroll position
      if (window.scrollY > 200) {
        setVisibleSections((prev) => new Set([...prev, 'about']));
      } else {
        setVisibleSections((prev) => {
          const newSet = new Set(prev);
          newSet.delete('about');
          return newSet;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = ['about', 'experience', 'skills', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated background particles - more subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <Navigation activeSection={activeSection} onNavigate={scrollToSection} />
      
      <div className="relative" style={{ height: '400vh' }}>
        <ScrollVideo src="/videos/pointing-down.mp4" scrollHeight="400vh" />
        
        {/* Titre initial */}
        <div id="hero-title" className={`absolute top-0 left-0 right-0 h-screen flex items-center justify-center z-10 pointer-events-none transition-all duration-1000 ${
          visibleSections.has('about') ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400 animate-gradient">
                Alban Richer
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Lead Full Stack Developer
            </p>
          </div>
        </div>
        
        {/* AboutSection qui apparaît pendant le scroll */}
        <section id="about" className={`absolute top-1/3 left-0 right-0 flex items-center justify-center py-16 px-4 transition-all duration-1000 pointer-events-none ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}>
          <div className="pointer-events-auto">
            <AboutSection />
          </div>
        </section>
      </div>

      <section id="experience" className={`scroll-mt-24 py-16 px-4 relative transition-all duration-1000 ${
        visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <ExperienceSection videoSrc="/videos/presenting.mp4" />
      </section>

      <section id="skills" className={`scroll-mt-24 py-16 px-4 relative transition-all duration-1000 ${
        visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <SkillsSection videoSrc="/videos/floating.mp4" />
      </section>
      
      <section id="contact" className={`scroll-mt-24 py-16 px-4 relative transition-all duration-1000 ${
        visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}>
        <ContactSection />
      </section>
      
      <Footer />

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}