interface ContactItemProps {
  icon: string;
  title: string;
  value: string;
  link?: string;
  bgClass?: string;
  borderClass?: string;
  hoverBorderClass?: string;
}

export default function ContactItem({ 
  icon, 
  title, 
  value, 
  link, 
  bgClass = "from-indigo-500/10 to-indigo-500/5",
  borderClass = "border-indigo-500/20",
  hoverBorderClass = "hover:border-indigo-500/40"
}: ContactItemProps) {
  return (
    <div className={`bg-gradient-to-br ${bgClass} rounded-2xl p-6 border ${borderClass} ${hoverBorderClass} hover:scale-105 transition-all duration-500 group`}>
      <div className="flex items-center gap-4 mb-3">
        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{icon}</span>
        <h3 className="font-semibold text-white">{title}</h3>
      </div>
      {link ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
        >
          {value}
        </a>
      ) : (
        <p className="text-gray-300">{value}</p>
      )}
    </div>
  );
}