interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle && <p className="section-description">{subtitle}</p>}
    </div>
  );
}
