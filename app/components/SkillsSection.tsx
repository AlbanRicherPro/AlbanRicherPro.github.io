export default function SkillsSection() {
  const skillCategories = [
    { title: "Développement Frontend", icon: "🎨", skills: ["Angular / Vue.js", "JavaScript / TypeScript", "HTML5 / CSS3", "NativeScript (mobile)"], bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40", dotClass: "bg-indigo-400" },
    { title: "Développement Backend", icon: "⚙️", skills: ["Java / Spring Boot", "Spring Security / Spring Batch", "PHP", "REST APIs"], bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40", dotClass: "bg-cyan-400" },
    { title: "Architecture & DevOps", icon: "🚀", skills: ["Docker", "Jenkins / CI/CD", "Git / GitHub", "Maven / XL Deploy"], bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40", dotClass: "bg-slate-400" },
    { title: "Base de données", icon: "🗄️", skills: ["SQL", "Oracle SQL Developer", "PostgreSQL", "Hibernate"], bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40", dotClass: "bg-emerald-400" },
    { title: "Langages de programmation", icon: "💻", skills: ["C / C++", "Caml / OCaml", "Scheme", "Java Enterprise Edition"], bgClass: "from-amber-500/10 to-amber-500/5", borderClass: "border-amber-500/20", hoverBorderClass: "hover:border-amber-500/40", dotClass: "bg-amber-400" },
    { title: "Autres compétences", icon: "🎯", skills: ["Gestion de projet", "Gestion d'équipe", "Leadership", "Anglais professionnel"], bgClass: "from-teal-500/10 to-teal-500/5", borderClass: "border-teal-500/20", hoverBorderClass: "hover:border-teal-500/40", dotClass: "bg-teal-400" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Compétences
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${category.bgClass} backdrop-blur-xl rounded-2xl border ${category.borderClass} ${category.hoverBorderClass} hover:scale-105 transition-all duration-500 group p-8`}
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
  );
}