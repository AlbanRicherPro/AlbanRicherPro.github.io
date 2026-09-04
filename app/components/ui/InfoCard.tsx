import { ReactNode } from 'react';

interface InfoCardProps {
  icon: string;
  title: string;
  children: ReactNode;
  bgClass?: string;
  borderClass?: string;
  hoverBorderClass?: string;
}

export default function InfoCard({ 
  icon, 
  title, 
  children, 
  bgClass = "bg-gradient-to-r from-indigo-500/10 to-cyan-500/10",
  borderClass = "border-indigo-500/20",
  hoverBorderClass = "hover:border-indigo-500/40"
}: InfoCardProps) {
  return (
    <div className={`${bgClass} rounded-2xl p-6 border ${borderClass} ${hoverBorderClass} transition-all duration-300`}>
      <h4 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-3xl">{icon}</span> {title}
      </h4>
      {children}
    </div>
  );
}