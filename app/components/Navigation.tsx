'use client';

import { useState, useEffect } from 'react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'À propos', id: 'about' },
    { name: 'Expérience', id: 'experience' },
    { name: 'Compétences', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full backdrop-blur-xl z-50 border-b transition-all duration-300 ${
      scrolled ? 'bg-slate-900/80 border-slate-700/50' : 'bg-transparent border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
          Alban Richer
        </h1>
        <div className="flex gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`text-gray-300 hover:text-white hover:scale-110 transition-all duration-300 relative group ${
                activeSection === item.id ? 'text-indigo-400' : ''
              }`}
            >
              {item.name}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-indigo-400 transition-all duration-300 ${
                activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </button>
          ))}
          <a
            href="https://fr.linkedin.com/in/alban-richer-144085a7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-indigo-400 hover:scale-110 transition-all duration-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </nav>
  );
}