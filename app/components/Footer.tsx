import Icon from "./ui/Icon";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a className="brand-mark" href="#home" aria-label="Retour à l’accueil">
          a<span>/</span>r
        </a>
        <p>© {new Date().getFullYear()} Alban Richer</p>
        <a className="footer-top" href="#home">
          Retour en haut <Icon name="down" className="rotate-180" />
        </a>
      </div>
    </footer>
  );
}
