'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface Section3DProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Section3D({ children, className = '', id }: Section3DProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 80;
      const rotateY = (centerX - x) / 80;
      
      section.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      section.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`py-20 px-4 relative transition-transform duration-100 ease-out ${className}`}
    >
      {children}
    </section>
  );
}