import SectionHeader from './ui/SectionHeader';

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto">
      <SectionHeader title="À propos de moi" />
      <div className="bg-white/3 backdrop-blur-xl rounded-3xl border border-slate-700/30 p-8 md:p-12 hover:border-indigo-500/30 transition-all duration-500">
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
          <div className="pt-6 border-t border-slate-700/30">
            <div className="text-center space-y-3">
              <div className="text-5xl mb-2">👨‍💻</div>
              <h3 className="text-xl font-bold text-white">Lead Full Stack Developer</h3>
              <p className="text-indigo-400 font-semibold">Deemply</p>
              <p className="text-gray-400">Mars 2020 - Présent</p>
              <div className="pt-3 border-t border-slate-700/30">
                <p className="text-sm text-gray-400">📍 Pays de la Loire, France</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}