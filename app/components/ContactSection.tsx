import SectionHeader from './ui/SectionHeader';
import ContactItem from './ui/ContactItem';

export default function ContactSection() {
  const contactItems = [
    { icon: "📧", title: "Email", value: "Contact via LinkedIn", bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40" },
    { icon: "📍", title: "Localisation", value: "Aizenay, Pays de la Loire, France", bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40" },
    { icon: "💻", title: "GitHub", value: "github.com/AlbanRicherPro", link: "https://github.com/AlbanRicherPro", bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40" },
    { icon: "🔗", title: "LinkedIn", value: "linkedin.com/in/alban-richer-144085a7", link: "https://fr.linkedin.com/in/alban-richer-144085a7", bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader title="Contact" />
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
        <div className="grid md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <ContactItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}