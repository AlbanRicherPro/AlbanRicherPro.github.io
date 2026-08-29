export default function Footer() {
  return (
    <footer className="py-12 text-center border-t border-slate-700/50">
      <p className="text-gray-400 mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 font-semibold">
          © 2026 Alban Richer
        </span>
        . Tous droits réservés.
      </p>
      <div className="flex justify-center gap-6">
        <a
          href="https://github.com/AlbanRicherPro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform"
        >
          GitHub
        </a>
        <a
          href="https://fr.linkedin.com/in/alban-richer-144085a7"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-indigo-400 transition-colors duration-300 hover:scale-110 transform"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}