export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          À propos de moi
        </span>
      </h2>
      <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p className="hover:text-white transition-colors duration-300">
            Lead Full Stack Developer chez <span className="text-indigo-400 font-semibold">Deemply</span>, spécialisé dans le développement d&apos;applications web modernes et performantes. Je conçois et développe des solutions techniques innovantes pour la gestion de bâtiments et les services immobiliers.
          </p>
          <p className="hover:text-white transition-colors duration-300">
            Avec plus de 6 ans d&apos;expérience en développement full stack, j&apos;expertise les technologies front-end et back-end pour créer des expériences utilisateur fluides et des architectures robustes. Je suis passionné par l&apos;innovation technologique et l&apos;amélioration continue des processus de développement.
          </p>
          <p className="hover:text-white transition-colors duration-300">
            Basé dans la région Pays de la Loire, je travaille au sein d&apos;une équipe dynamique pour transformer le secteur immobilier grâce à des solutions numériques innovantes.
          </p>
        </div>
      </div>
    </div>
  );
}