interface TechStackItemProps {
  title: string;
  tech: string;
  bgClass?: string;
  borderClass?: string;
  hoverClass?: string;
}

export default function TechStackItem({ 
  title, 
  tech, 
  bgClass = "bg-indigo-500/10",
  borderClass = "border-indigo-500/20",
  hoverClass = "hover:bg-indigo-500/20"
}: TechStackItemProps) {
  return (
    <div className={`${bgClass} rounded-xl p-4 border ${borderClass} ${hoverClass} transition-all duration-300`}>
      <h5 className="font-semibold text-white mb-2">{title}</h5>
      <p className="text-gray-300 text-sm">{tech}</p>
    </div>
  );
}