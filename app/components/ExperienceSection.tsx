import SectionHeader from './ui/SectionHeader';
import InfoCard from './ui/InfoCard';
import TechStackItem from './ui/TechStackItem';
import BulletList from './ui/BulletList';
import CompanyInfo from './ui/CompanyInfo';

export default function ExperienceSection() {
  const stackItems = [
    { title: "Frontend", tech: "Vue.js 3, Vuetify 3, TypeScript 6, JavaScript, HTML5, CSS3", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" },
    { title: "Backend", tech: "PHP 8, Symfony 7, API Platform 4, REST APIs", bgClass: "bg-cyan-500/10", borderClass: "border-cyan-500/20", hoverClass: "hover:bg-cyan-500/20" },
    { title: "Base de données", tech: "MySQL, MariaDB, PostgreSQL", bgClass: "bg-slate-500/10", borderClass: "border-slate-500/20", hoverClass: "hover:bg-slate-500/20" },
    { title: "DevOps & Outils", tech: "Docker, Git, GitHub Actions, CI/CD", bgClass: "bg-indigo-500/10", borderClass: "border-indigo-500/20", hoverClass: "hover:bg-indigo-500/20" }
  ];

  const responsibilities = [
    "Responsabilité de l'équipe de développement et leadership technique",
    "Coordination et mentorat des développeurs juniors et seniors",
    "Gestion des priorités et planning de l'équipe dev",
    "Architecture et conception des solutions full stack",
    "Développement des fonctionnalités critiques et optimisation des performances",
    "Mise en place des processus CI/CD et bonnes pratiques de développement",
    "Montée en compétences technique de l'équipe"
  ];

  const missions = [
    "Conception et développement de solutions web et mobiles pour la gestion de registres de sécurité dématérialisés",
    "Transformation de processus administratifs complexes en interfaces intuitives et performantes",
    "Garantie de la qualité, sécurité et évolutivité des solutions développées en interne",
    "Collaboration étroite avec les équipes commerciales et support pour aligner le développement avec les besoins clients"
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader title="Expérience Professionnelle" />
      
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
        <div className="mb-8">
          <CompanyInfo 
            logo="/deemply_logo.jpeg"
            logoAlt="Deemply Logo"
            position="Lead Full Stack Developer"
            company="Deemply"
            period="Mars 2020 - Présent (6 ans)"
          />

          <div className="space-y-8">
            <InfoCard 
              icon="🏢" 
              title="Entreprise"
              bgClass="bg-gradient-to-r from-indigo-500/10 to-cyan-500/10"
              borderClass="border-indigo-500/20"
              hoverBorderClass="hover:border-indigo-500/40"
            >
              <p className="text-gray-300 leading-relaxed mb-3">
                <span className="text-indigo-400 font-semibold">Deemply</span> est une entreprise technologique fondée en 2012, spécialisée dans la dématérialisation des registres de sécurité et la conformité digitale pour les bâtiments. Basée à La Roche-sur-Yon, l&apos;entreprise compte 10-20 employés et dispose d&apos;une équipe R&D de 9 développeurs.
              </p>
              <p className="text-gray-300 leading-relaxed">
                L&apos;entreprise développe en interne l&apos;ensemble de son écosystème de solutions numériques : solutions web pour exploitants et prestataires, ainsi que des applications mobiles. Sa mission est de fournir &quot;la mémoire digitale de vos bâtiments&quot; avec une plateforme unique qui centralise toutes les obligations réglementaires.
              </p>
            </InfoCard>

            <InfoCard 
              icon="🎯" 
              title="Contexte & Missions"
              bgClass="bg-gradient-to-r from-cyan-500/10 to-indigo-500/10"
              borderClass="border-cyan-500/20"
              hoverBorderClass="hover:border-cyan-500/40"
            >
              <BulletList items={missions} bulletColor="text-cyan-400" bulletIcon="→" />
            </InfoCard>

            <InfoCard 
              icon="💻" 
              title="Stack Technique"
              bgClass="bg-gradient-to-r from-slate-500/10 to-indigo-500/10"
              borderClass="border-slate-500/20"
              hoverBorderClass="hover:border-slate-500/40"
            >
              <div className="grid md:grid-cols-2 gap-4">
                {stackItems.map((item, index) => (
                  <TechStackItem key={index} {...item} />
                ))}
              </div>
            </InfoCard>

            <InfoCard 
              icon="🔧" 
              title="Responsabilités"
              bgClass="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10"
              borderClass="border-emerald-500/20"
              hoverBorderClass="hover:border-emerald-500/40"
            >
              <BulletList 
                items={responsibilities} 
                bulletColor="text-emerald-400" 
                bulletIcon="✓"
                highlightFirst={true}
              />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}