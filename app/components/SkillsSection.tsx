import SectionHeader from './ui/SectionHeader';
import SkillCard from './ui/SkillCard';

export default function SkillsSection() {
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

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader title="Compétences" />
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <SkillCard key={index} {...category} />
        ))}
      </div>
    </div>
  );
}