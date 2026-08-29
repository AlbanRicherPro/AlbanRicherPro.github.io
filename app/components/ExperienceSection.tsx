import Image from 'next/image';

export default function ExperienceSection() {
  const stackItems = [
    { title: "Frontend", tech: "Angular, Vue.js, JavaScript, TypeScript, HTML5, CSS3", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" },
    { title: "Backend", tech: "Java, Spring Boot, Spring Security, Spring Batch, PHP, Node.js", bgClass: "bg-cyan-500/10", borderClass: "border-cyan-500/20", hoverClass: "hover:bg-cyan-500/20" },
    { title: "Base de données", tech: "SQL, Oracle SQL Developer, PostgreSQL", bgClass: "bg-slate-500/10", borderClass: "border-slate-500/20", hoverClass: "hover:bg-slate-500/20" },
    { title: "DevOps & Outils", tech: "Docker, Jenkins, CI/CD, Git, Maven, XL Deploy", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" }
  ];

  const responsibilities = [
    "Leadership technique et coordination de l'équipe de développement",
    "Architecture et conception des solutions full stack",
    "Développement des fonctionnalités critiques et optimisation des performances",
    "Mise en place des processus CI/CD et bonnes pratiques de développement",
    "Mentorat des développeurs juniors et montée en compétences de l'équipe"
  ];

  const missions = [
    "Conception et développement de solutions web et mobiles pour la gestion de registres de sécurité dématérialisés",
    "Transformation de processus administratifs complexes en interfaces intuitives et performantes",
    "Garantie de la qualité, sécurité et évolutivité des solutions développées en interne",
    "Collaboration étroite avec les équipes commerciales et support pour aligner le développement avec les besoins clients"
  ];

  return (
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
              <Image
                src="/deemply_logo.jpeg"
                alt="Deemply Logo"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">Lead Full Stack Developer</h3>
              <p className="text-xl text-indigo-400 font-semibold">Deemply • Mars 2020 - Présent (6 ans)</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl p-6 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🏢</span> Entreprise
              </h4>
              <p className="text-gray-300 leading-relaxed mb-3">
                <span className="text-indigo-400 font-semibold">Deemply</span> est une entreprise technologique fondée en 2012, spécialisée dans la dématérialisation des registres de sécurité et la conformité digitale pour les bâtiments. Basée à La Roche-sur-Yon, l&apos;entreprise compte 10-20 employés et dispose d&apos;une équipe R&D de 9 développeurs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                L&apos;entreprise développe en interne l&apos;ensemble de son écosystème de solutions numériques : solutions web pour exploitants et prestataires, ainsi que des applications mobiles. Sa mission est de fournir &quot;la mémoire digitale de vos bâtiments&quot; avec une plateforme unique qui centralise toutes les obligations réglementaires.
              </p>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🎯</span> Contexte & Missions
              </h4>
              <ul className="space-y-3 text-gray-300">
                {missions.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 hover:text-white transition-colors duration-300">
                    <span className="text-cyan-400 mt-1">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-r from-slate-500/10 to-indigo-500/10 rounded-2xl p-6 border border-slate-500/20 hover:border-slate-500/40 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">💻</span> Stack Technique
              </h4>
              <div className="grid md:grid-cols-2 gap-4">
                {stackItems.map((item, index) => (
                  <div key={index} className={`${item.bgClass} rounded-xl p-4 border ${item.borderClass} ${item.hoverClass} transition-all duration-300`}>
                    <h5 className="font-semibold text-white mb-2">{item.title}</h5>
                    <p className="text-gray-300 text-sm">{item.tech}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300">
              <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">🔧</span> Responsabilités
              </h4>
              <ul className="space-y-3 text-gray-300">
                {responsibilities.map((item, index) => (
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
  );
}