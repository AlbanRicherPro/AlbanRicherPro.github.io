import SectionHeader from './ui/SectionHeader';
import InfoCard from './ui/InfoCard';
import TechStackItem from './ui/TechStackItem';
import BulletList from './ui/BulletList';
import CompanyInfo from './ui/CompanyInfo';
import Image from 'next/image';

interface ExperienceSectionProps {
  videoSrc?: string;
}

export default function ExperienceSection({ videoSrc }: ExperienceSectionProps) {
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
    <div className="max-w-7xl mx-auto relative min-h-screen">
      <SectionHeader title="Expérience Professionnelle" />
      
      <div className="flex flex-col lg:flex-row gap-8 relative">
        {/* Contenu principal (2/3 de l'écran) */}
        <div className="flex-1 bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/20 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500 shadow-2xl">
          <div className="mb-8">
            <CompanyInfo 
              logo="/deemply_logo.jpeg"
              logoAlt="Deemply Logo"
              position="Lead Full Stack Developer"
              company="Deemply"
              period="Mars 2020 - Présent (6 ans)"
            />
          </div>
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
        
        {/* Vidéo sur le côté droit (1/3 de l'écran) - Position sticky */}
        <div className="lg:w-1/3 hidden lg:block">
          {videoSrc && (
            <div className="sticky top-24 space-y-6">
              <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-700/20 overflow-hidden shadow-2xl">
                <video
                  src={videoSrc}
                  muted
                  playsInline
                  loop
                  autoPlay
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="bg-white/3 backdrop-blur-xl rounded-3xl border border-slate-700/30 p-6 hover:border-indigo-500/30 transition-all duration-500">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl overflow-hidden border-2 border-indigo-500/30 hover:border-indigo-400 transition-all duration-300 hover:scale-105">
                    <Image
                      src="/deemply_logo.jpeg"
                      alt="Deemply Logo"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white">Deemply</h3>
                  <p className="text-indigo-400 font-semibold">Lead Full Stack Developer</p>
                  <div className="pt-4 border-t border-slate-700/30 space-y-2">
                    <p className="text-sm text-gray-400">📅 Mars 2020 - Présent</p>
                    <p className="text-sm text-gray-400">📍 La Roche-sur-Yon</p>
                    <p className="text-sm text-gray-400">👥 10-20 employés</p>
                    <p className="text-sm text-gray-400">💻 9 développeurs R&D</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}