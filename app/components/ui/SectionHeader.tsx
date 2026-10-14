"use client";

import useI18n from "./useI18n";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const { t } = useI18n();
  return (
    <div className="section-header">
      <h2>{t(title)}</h2>
      {subtitle && <p className="section-description">{t(subtitle)}</p>}
    </div>
  );
}
