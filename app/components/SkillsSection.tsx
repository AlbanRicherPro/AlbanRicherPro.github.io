'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeader from './ui/SectionHeader';
import SkillCard from './ui/SkillCard';

interface SkillsSectionProps {
  videoSrc?: string;
}

export default function SkillsSection({ videoSrc }: SkillsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const skillCategories = [
    { title: "Développement Frontend", icon: "🎨", skills: ["Vue.js 3", "Vuetify 3", "TypeScript 6", "JavaScript", "HTML5 / CSS3", "NativeScript (mobile)"], bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40", dotClass: "bg-indigo-400" },
    { title: "Développement Backend", icon: "⚙️", skills: ["PHP 8", "Symfony 7", "API Platform 4", "REST APIs"], bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40", dotClass: "bg-cyan-400" },
    { title: "Architecture & DevOps", icon: "🚀", skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Maven", "Jenkins"], bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40", dotClass: "bg-slate-400" },
    { title: "Base de données", icon: "🗄️", skills: ["MySQL", "MariaDB", "PostgreSQL", "Oracle SQL Developer", "Hibernate"], bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40", dotClass: "bg-emerald-400" },
    { title: "Langages de programmation", icon: "💻", skills: ["C / C++", "Caml / OCaml", "Scheme", "Java Enterprise Edition"], bgClass: "from-amber-500/10 to-amber-500/5", borderClass: "border-amber-500/20", hoverBorderClass: "hover:border-amber-500/40", dotClass: "bg-amber-400" },
    { title: "Tests & Qualité", icon: "🧪", skills: ["Cypress", "Tests unitaires", "Tests d'intégration", "Qualité logicielle"], bgClass: "from-rose-500/10 to-rose-500/5", borderClass: "border-rose-500/20", hoverBorderClass: "hover:border-rose-500/40", dotClass: "bg-rose-400" },
    { title: "Leadership & Management", icon: "🎯", skills: ["Responsabilité équipe dev", "Gestion d'équipe", "Leadership technique", "Gestion de projet", "Anglais professionnel"], bgClass: "from-teal-500/10 to-teal-500/5", borderClass: "border-teal-500/20", hoverBorderClass: "hover:border-teal-500/40", dotClass: "bg-teal-400" },
    { title: "Java & Spring", icon: "☕", skills: ["Java", "Spring Boot", "Spring Security", "Spring Batch"], bgClass: "from-orange-500/10 to-orange-500/5", borderClass: "border-orange-500/20", hoverBorderClass: "hover:border-orange-500/40", dotClass: "bg-orange-400" }
  ];

  useEffect(() => {
    const container = sectionRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;

    const prefersReducedMotion = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculer le progrès de scroll dans la section (0 à 1)
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - windowHeight)));
      setScrollProgress(progress);

      // Mettre à jour la vidéo selon le scroll
      if (!prefersReducedMotion() && video.duration) {
        const nextTime = video.duration * progress;
        if (Math.abs(video.currentTime - nextTime) > 0.03) {
          video.currentTime = nextTime;
        }
      }
      
      requestAnimationFrame(() => {
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer l'index actuel et la phase de transition
  const totalSkills = skillCategories.length;
  const progressPerSkill = 2 / totalSkills;
  const skillProgress = (scrollProgress % progressPerSkill) / progressPerSkill; // 0 à 1 dans chaque tuile
  
  // Cycle complexe complet (comme avant qui fonctionnait bien):
  // 0-0.08: vidéo à droite, carte skill cachée à droite en dessous
  // 0.08-0.25: carte skill se déplace vers la gauche
  // 0.25-0.42: carte skill à gauche, vidéo à droite (stable)
  // 0.42-0.58: carte skill se déplace vers la droite pour se cacher derrière la vidéo
  // 0.58-0.67: vidéo à droite, carte skill cachée à droite en dessous
  // 0.67-0.83: vidéo se déplace à gauche
  // 0.83-0.92: vidéo à gauche, carte skill suivante cachée à gauche en dessous
  // 0.92-1.08: carte skill suivante se déplace vers la droite
  // 1.08-1.25: carte skill suivante à droite, vidéo à gauche (stable)
  // 1.25-1.42: carte skill suivante se déplace vers la gauche pour se cacher derrière la vidéo
  // 1.42-1.50: vidéo à gauche, carte skill suivante cachée à gauche en dessous
  // 1.50-1.67: vidéo se déplace à droite
  // 1.67-1.75: vidéo à droite, carte skill 3 cachée à droite en dessous
  // 1.75-2.0: transition pour repartir
  
  const phase = skillProgress * 2; // Doubler le cycle pour inclure les deux cartes
  
  // Fonction d'easing
  const easeInOut = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  
  // Calculer les positions et transformations
  let skillTransform, videoTransform, skillOpacity, videoOpacity, skillPosition, videoPosition;
  
  if (phase < 0.08) {
    // Phase 1: vidéo à droite, carte skill cachée à droite en dessous
    skillTransform = 'translateX(0) scale(0.9)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-right';
    videoPosition = 'right';
  } else if (phase < 0.25) {
    // Phase 2: carte skill se déplace vers la gauche
    const localProgress = (phase - 0.08) / 0.17;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = `translateX(-${smoothLocal * 100}%) scale(${0.9 + smoothLocal * 0.1})`;
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = smoothLocal * 0.8;
    videoOpacity = 1;
    skillPosition = 'moving-to-left';
    videoPosition = 'right';
  } else if (phase < 0.42) {
    // Phase 3: carte skill à gauche, vidéo à droite (stable)
    skillTransform = 'translateX(0) scale(1)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 1;
    videoOpacity = 1;
    skillPosition = 'left';
    videoPosition = 'right';
  } else if (phase < 0.58) {
    // Phase 4: carte skill se déplace vers la droite pour se cacher derrière la vidéo
    const localProgress = (phase - 0.42) / 0.16;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = `translateX(${smoothLocal * 100}%) scale(${1 - smoothLocal * 0.1})`;
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 1 - smoothLocal * 0.8;
    videoOpacity = 1;
    skillPosition = 'moving-to-right';
    videoPosition = 'right';
  } else if (phase < 0.67) {
    // Phase 5: vidéo à droite, carte skill cachée à droite en dessous
    skillTransform = 'translateX(100%) scale(0.9)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-right';
    videoPosition = 'right';
  } else if (phase < 0.83) {
    // Phase 6: vidéo se déplace à gauche
    const localProgress = (phase - 0.67) / 0.16;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = 'translateX(100%) scale(0.9)';
    videoTransform = `translateX(-${smoothLocal * 100}%) scale(1)`;
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-right';
    videoPosition = 'moving-to-left';
  } else if (phase < 0.92) {
    // Phase 7: vidéo à gauche, carte skill suivante cachée à gauche en dessous
    skillTransform = 'translateX(0) scale(0.9)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-left';
    videoPosition = 'left';
  } else if (phase < 1.08) {
    // Phase 8: carte skill suivante se déplace vers la droite
    const localProgress = (phase - 0.92) / 0.16;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = `translateX(${smoothLocal * 100}%) scale(${0.9 + smoothLocal * 0.1})`;
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = smoothLocal * 0.8;
    videoOpacity = 1;
    skillPosition = 'moving-to-right';
    videoPosition = 'left';
  } else if (phase < 1.25) {
    // Phase 9: carte skill suivante à droite, vidéo à gauche (stable)
    skillTransform = 'translateX(0) scale(1)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 1;
    videoOpacity = 1;
    skillPosition = 'right';
    videoPosition = 'left';
  } else if (phase < 1.42) {
    // Phase 10: carte skill suivante se déplace vers la gauche pour se cacher derrière la vidéo
    const localProgress = (phase - 1.25) / 0.17;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = `translateX(-${smoothLocal * 100}%) scale(${1 - smoothLocal * 0.1})`;
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 1 - smoothLocal * 0.8;
    videoOpacity = 1;
    skillPosition = 'moving-to-left';
    videoPosition = 'left';
  } else if (phase < 1.50) {
    // Phase 11: vidéo à gauche, carte skill suivante cachée à gauche en dessous
    skillTransform = 'translateX(-100%) scale(0.9)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-left';
    videoPosition = 'left';
  } else if (phase < 1.67) {
    // Phase 12: vidéo se déplace à droite
    const localProgress = (phase - 1.50) / 0.17;
    const smoothLocal = easeInOut(localProgress);
    skillTransform = 'translateX(-100%) scale(0.9)';
    videoTransform = `translateX(${smoothLocal * 100}%) scale(1)`;
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-left';
    videoPosition = 'moving-to-right';
  } else {
    // Phase 13: transition pour repartir
    skillTransform = 'translateX(0) scale(0.9)';
    videoTransform = 'translateX(0) scale(1)';
    skillOpacity = 0;
    videoOpacity = 1;
    skillPosition = 'hidden-right';
    videoPosition = 'right';
  }
  
  // Z-index pour gérer le chevauchement
  const skillZIndex = skillPosition === 'left' || skillPosition === 'right' ? 20 : 10;
  const videoZIndex = videoPosition === 'left' || videoPosition === 'right' ? 20 : 10;

  // Déterminer quelle carte afficher (changer à la moitié du cycle doublé)
  const cycleIndex = Math.floor(scrollProgress * totalSkills) % totalSkills;
  const displaySkillIndex = cycleIndex;
  const currentSkill = skillCategories[displaySkillIndex];

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto" style={{ minHeight: '400vh' }}>
      <SectionHeader title="Compétences" />
      
      <div className="sticky top-24 h-[60vh] flex items-center justify-center gap-8 relative">
        {/* Carte skill */}
        <div 
          className={`w-1/2 absolute ${
            skillPosition === 'left' ? 'left-0' : skillPosition === 'right' ? 'right-0' : skillPosition === 'moving-to-right' ? 'left-0' : skillPosition === 'moving-to-left' ? 'right-0' : skillPosition === 'hidden-right' ? 'right-0' : skillPosition === 'hidden-left' ? 'left-0' : 'left-1/2 -translate-x-1/2'
          } transition-all duration-300 ease-out`}
          style={{ 
            transform: skillTransform,
            opacity: skillOpacity,
            zIndex: skillZIndex,
            // Désactiver la transition pendant les changements de classe
            transition: (skillPosition === 'hidden-right' || skillPosition === 'hidden-left' || videoPosition === 'right' || videoPosition === 'left') ? 'none' : 'all 300ms ease-out'
          }}
        >
          <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/20 p-8 shadow-2xl">
            <SkillCard {...currentSkill} />
          </div>
        </div>
        
        {/* Vidéo */}
        {videoSrc && (
          <div 
            className={`w-1/2 absolute ${
              videoPosition === 'left' ? 'left-0' : videoPosition === 'right' ? 'right-0' : videoPosition === 'moving-to-right' ? 'left-0' : videoPosition === 'moving-to-left' ? 'right-0' : 'left-1/2 -translate-x-1/2'
            } transition-all duration-300 ease-out`}
            style={{ 
              transform: videoTransform,
              opacity: videoOpacity,
              zIndex: videoZIndex,
              // Désactiver la transition pendant les changements de classe
              transition: (skillPosition === 'hidden-right' || skillPosition === 'hidden-left' || videoPosition === 'hidden-right' || videoPosition === 'hidden-left') ? 'none' : 'all 300ms ease-out'
            }}
          >
            <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/20 overflow-hidden shadow-2xl h-full">
              <video
                ref={videoRef}
                src={videoSrc}
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}