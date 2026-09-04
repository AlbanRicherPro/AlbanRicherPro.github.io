interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}