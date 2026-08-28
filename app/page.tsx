'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Update active section based on scroll position
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
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNext = () => {
    scrollToSection('about');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Animated background particles - more subtle */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-xl z-50 border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-white hover:text-indigo-400 transition-colors duration-300 cursor-pointer">Alban Richer</h1>
          <div className="flex gap-6">
            {[
              { name: 'À propos', id: 'about' },
              { name: 'Expérience', id: 'experience' },
              { name: 'Compétences', id: 'skills' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 relative">
        <div className="max-w-4xl mx-auto text-center z-10">
          <div className="mb-8 relative inline-block">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl mx-auto border-4 border-purple-500/30 hover:border-purple-400 transition-all duration-500 hover:scale-105">
              <img
                src="/alban-richer.jpg"
                alt="Alban Richer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-cyan-500/20 blur-xl animate-pulse"></div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-gradient">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
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
            <a
              href="#experience"
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
            >
              Découvrir mon parcours
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border-2 border-purple-500 text-purple-400 rounded-full font-semibold hover:bg-purple-500/10 transition-all duration-300"
            >
              Me contacter
            </a>
          </div>
        </div>

        {/* Scroll indicator - clickable */}
        <button
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
          aria-label="Scroll to next section"
        >
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative scroll-section">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                À propos de moi
              </span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p className="hover:text-white transition-colors duration-300">
                Lead Full Stack Developer chez <span className="text-indigo-400 font-semibold">Deemply</span>, spécialisé dans le développement d'applications web modernes et performantes. Je conçois et développe des solutions techniques innovantes pour la gestion de bâtiments et les services immobiliers.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Avec plus de 6 ans d'expérience en développement full stack, j'expertise les technologies front-end et back-end pour créer des expériences utilisateur fluides et des architectures robustes. Je suis passionné par l'innovation technologique et l'amélioration continue des processus de développement.
              </p>
              <p className="hover:text-white transition-colors duration-300">
                Basé dans la région Pays de la Loire, je travaille au sein d'une équipe dynamique pour transformer le secteur immobilier grâce à des solutions numériques innovantes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative scroll-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Expérience Professionnelle
            </span>
          </h2>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
            <div className="mb-8">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
                  <img
                    src="/deemply_logo.jpeg"
                    alt="Deemply Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Lead Full Stack Developer</h3>
                  <p className="text-xl text-indigo-400 font-semibold">Deemply • Mars 2020 - Présent (6 ans)</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl p-6 border border-indigo-500/20">
                  <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-3xl">🏢</span> Entreprise
                  </h4>
                  <p className="text-gray-300 leading-relaxed mb-3">
                    <span className="text-indigo-400 font-semibold">Deemply</span> est une entreprise technologique fondée en 2012, spécialisée dans la dématérialisation des registres de sécurité et la conformité digitale pour les bâtiments. Basée à La Roche-sur-Yon, l'entreprise compte 10-20 employés et dispose d'une équipe R&D de 9 développeurs.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    L'entreprise développe en interne l'ensemble de son écosystème de solutions numériques : solutions web pour exploitants et prestataires, ainsi que des applications mobiles. Sa mission est de fournir "la mémoire digitale de vos bâtiments" avec une plateforme unique qui centralise toutes les obligations réglementaires.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-2xl p-6 border border-cyan-500/20">
                  <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-3xl">🎯</span> Contexte & Missions
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      "Conception et développement de solutions web et mobiles pour la gestion de registres de sécurité dématérialisés",
                      "Transformation de processus administratifs complexes en interfaces intuitives et performantes",
                      "Garantie de la qualité, sécurité et évolutivité des solutions développées en interne",
                      "Collaboration étroite avec les équipes commerciales et support pour aligner le développement avec les besoins clients"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                        <span className="text-cyan-400 mt-1">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-slate-500/10 to-indigo-500/10 rounded-2xl p-6 border border-slate-500/20">
                  <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-3xl">💻</span> Stack Technique
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { title: "Frontend", tech: "Angular, Vue.js, JavaScript, TypeScript, HTML5, CSS3", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" },
                      { title: "Backend", tech: "Java, Spring Boot, Spring Security, Spring Batch, PHP, Node.js", bgClass: "bg-cyan-500/10", borderClass: "border-cyan-500/20", hoverClass: "hover:bg-cyan-500/20" },
                      { title: "Base de données", tech: "SQL, Oracle SQL Developer, PostgreSQL", bgClass: "bg-slate-500/10", borderClass: "border-slate-500/20", hoverClass: "hover:bg-slate-500/20" },
                      { title: "DevOps & Outils", tech: "Docker, Jenkins, CI/CD, Git, Maven, XL Deploy", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" }
                    ].map((item, index) => (
                      <div key={index} className={`${item.bgClass} rounded-xl p-4 border ${item.borderClass} ${item.hoverClass} transition-all duration-300`}>
                        <h5 className="font-semibold text-white mb-2">{item.title}</h5>
                        <p className="text-gray-300 text-sm">{item.tech}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20">
                  <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="text-3xl">🔧</span> Responsabilités
                  </h4>
                  <ul className="space-y-3 text-gray-300">
                    {[
                      "Leadership technique et coordination de l'équipe de développement",
                      "Architecture et conception des solutions full stack",
                      "Développement des fonctionnalités critiques et optimisation des performances",
                      "Mise en place des processus CI/CD et bonnes pratiques de développement",
                      "Mentorat des développeurs juniors et montée en compétences de l'équipe"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                        <span className="text-emerald-400 mt-1">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 relative scroll-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Compétences
            </span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Développement Frontend", icon: "🎨", skills: ["Angular / Vue.js", "JavaScript / TypeScript", "HTML5 / CSS3", "NativeScript (mobile)"], bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40", dotClass: "bg-indigo-400" },
              { title: "Développement Backend", icon: "⚙️", skills: ["Java / Spring Boot", "Spring Security / Spring Batch", "PHP", "REST APIs"], bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40", dotClass: "bg-cyan-400" },
              { title: "Architecture & DevOps", icon: "🚀", skills: ["Docker", "Jenkins / CI/CD", "Git / GitHub", "Maven / XL Deploy"], bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40", dotClass: "bg-slate-400" },
              { title: "Base de données", icon: "🗄️", skills: ["SQL", "Oracle SQL Developer", "PostgreSQL", "Hibernate"], bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40", dotClass: "bg-emerald-400" },
              { title: "Langages de programmation", icon: "💻", skills: ["C / C++", "Caml / OCaml", "Scheme", "Java Enterprise Edition"], bgClass: "from-amber-500/10 to-amber-500/5", borderClass: "border-amber-500/20", hoverBorderClass: "hover:border-amber-500/40", dotClass: "bg-amber-400" },
              { title: "Autres compétences", icon: "🎯", skills: ["Gestion de projet", "Gestion d'équipe", "Leadership", "Anglais professionnel"], bgClass: "from-teal-500/10 to-teal-500/5", borderClass: "border-teal-500/20", hoverBorderClass: "hover:border-teal-500/40", dotClass: "bg-teal-400" }
            ].map((category, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${category.bgClass} backdrop-blur-xl rounded-2xl border ${category.borderClass} ${category.hoverBorderClass} hover:scale-105 transition-all duration-500 group`}
              >
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{category.icon}</span>
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <li key={skillIndex} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                      <span className={`w-1.5 h-1.5 ${category.dotClass} rounded-full group-hover:scale-150 transition-transform duration-300`}></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative scroll-section">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
              Contact
            </span>
          </h2>
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: "📧", title: "Email", value: "Contact via LinkedIn", bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40" },
                { icon: "📍", title: "Localisation", value: "Aizenay, Pays de la Loire, France", bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40" },
                { icon: "💻", title: "GitHub", value: "github.com/AlbanRicherPro", link: "https://github.com/AlbanRicherPro", bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40" },
                { icon: "🔗", title: "LinkedIn", value: "linkedin.com/in/alban-richer-144085a7", link: "https://fr.linkedin.com/in/alban-richer-144085a7", bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-br ${item.bgClass} rounded-2xl p-6 border ${item.borderClass} ${item.hoverBorderClass} hover:scale-105 transition-all duration-500 group`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                  </div>
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-300">{item.value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-slate-700/50">
        <p className="text-gray-400 mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 font-semibold">
            © 2026 Alban Richer
          </span>
          . Tous droits réservés.
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://github.com/AlbanRicherPro"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform"
          >
            GitHub
          </a>
          <a
            href="https://fr.linkedin.com/in/alban-richer-144085a7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform"
          >
            LinkedIn
          </a>
        </div>
      </footer>

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
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}