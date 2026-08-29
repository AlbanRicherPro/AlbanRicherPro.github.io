export default function ContactSection() {
  const contactItems = [
    { icon: "📧", title: "Email", value: "Contact via LinkedIn", bgClass: "from-indigo-500/10 to-indigo-500/5", borderClass: "border-indigo-500/20", hoverBorderClass: "hover:border-indigo-500/40" },
    { icon: "📍", title: "Localisation", value: "Aizenay, Pays de la Loire, France", bgClass: "from-emerald-500/10 to-emerald-500/5", borderClass: "border-emerald-500/20", hoverBorderClass: "hover:border-emerald-500/40" },
    { icon: "💻", title: "GitHub", value: "github.com/AlbanRicherPro", link: "https://github.com/AlbanRicherPro", bgClass: "from-slate-500/10 to-slate-500/5", borderClass: "border-slate-500/20", hoverBorderClass: "hover:border-slate-500/40" },
    { icon: "🔗", title: "LinkedIn", value: "linkedin.com/in/alban-richer-144085a7", link: "https://fr.linkedin.com/in/alban-richer-144085a7", bgClass: "from-cyan-500/10 to-cyan-500/5", borderClass: "border-cyan-500/20", hoverBorderClass: "hover:border-cyan-500/40" }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          Contact
        </span>
      </h2>
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
        <div className="grid md:grid-cols-2 gap-6">
          {contactItems.map((item, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${item.bgClass} rounded-2xl p-6 border ${item.borderClass} ${item.hoverBorderClass} hover:scale-105 transition-all duration-500 group`}
            >
              <div className="flex items-center gap-4 mb-3">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <h3 className="font-semibold text-white">{item.title}</h3>
              </div>
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-indigo-400 transition-colors duration-300"
                >
                  {item.value}
                </a>
              ) : (
                <p className="text-gray-300">{item.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}