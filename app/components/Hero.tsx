'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface HeroProps {
  onScrollDown: (sectionId: string) => void;
}

export default function Hero({ onScrollDown }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 3D tilt effect on mouse move - réduit pour le conteneur principal
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 60;
      const rotateY = (centerX - x) / 60;
      
      container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      container.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      <div ref={containerRef} className="max-w-4xl mx-auto text-center z-10 transition-transform duration-100 ease-out">
        <div className="mb-8 relative inline-block">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl mx-auto border-4 border-indigo-500/30 hover:border-indigo-400 transition-all duration-500 hover:scale-105 relative z-10">
            <Image
              src="/alban-richer.jpg"
              alt="Alban Richer"
              width={256}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>
          {/* 3D rotating ring effect */}
          <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-spin-slow" style={{ animationDuration: '20s' }}></div>
          <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30 animate-spin-reverse" style={{ animationDuration: '15s' }}></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-gradient">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-400">
            Alban Richer
          </span>
        </h1>

        <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
          Lead Full Stack Developer
        </p>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Transformant le futur du développement web avec des solutions innovantes et des expériences utilisateur exceptionnelles
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => onScrollDown('experience')}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/50 hover:shadow-2xl"
          >
            Découvrir mon parcours
          </button>
          <button
            onClick={() => onScrollDown('contact')}
            className="px-8 py-3 border-2 border-indigo-500 text-indigo-400 rounded-full font-semibold hover:bg-indigo-500/10 transition-all duration-300"
          >
            Me contacter
          </button>
        </div>
      </div>

      {/* Scroll indicator - clickable */}
      <button
        onClick={() => onScrollDown('about')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300 z-10"
        aria-label="Scroll to next section"
      >
        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
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
    </section>
  );
}