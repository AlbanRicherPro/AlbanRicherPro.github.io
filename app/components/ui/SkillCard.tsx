interface SkillCardProps {
  title: string;
  icon: string;
  skills: string[];
  bgClass?: string;
  borderClass?: string;
  hoverBorderClass?: string;
  dotClass?: string;
}

export default function SkillCard({ 
  title, 
  icon, 
  skills, 
  bgClass = "from-indigo-500/10 to-indigo-500/5",
  borderClass = "border-indigo-500/20",
  hoverBorderClass = "hover:border-indigo-500/40",
  dotClass = "bg-indigo-400"
}: SkillCardProps) {
  return (
    <div className={`bg-gradient-to-br ${bgClass} backdrop-blur-xl rounded-2xl border ${borderClass} ${hoverBorderClass} hover:scale-105 transition-all duration-500 group p-8`}>
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        {title}
      </h3>
      <ul className="space-y-2">
        {skills.map((skill, skillIndex) => (
          <li key={skillIndex} className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
            <span className={`w-1.5 h-1.5 ${dotClass} rounded-full group-hover:scale-150 transition-transform duration-300`}></span>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}