import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";
import DeemplyMascot from "./DeemplyMascot";

export default function AboutSection() {
  return (
    <section id="about" tabIndex={-1} className="section section-anchor">
      <div className="container">
        <Reveal>
          <SectionHeader title="À propos" />
        </Reveal>
        <div className="about-grid">
          <div className="about-mascot">
            <DeemplyMascot />
          </div>
          <Reveal className="about-content">
            <p className="about-lead">
              Lead developer chez <span className="accent">Deemply</span> depuis
              mars 2020.
            </p>
            <p>
              Nous développons des applications web et mobiles pour la gestion
              de bâtiments et les registres de sécurité. Des besoins métier
              précis, qui demandent des interfaces compréhensibles et un backend
              fiable.
            </p>
            <p>
              Je travaille sur l’ensemble du produit : développement full stack,
              architecture, priorités techniques et qualité des livraisons. Je
              reste impliqué dans les fonctionnalités critiques tout en gardant
              une vue sur l’évolution du code et sa maintenance.
            </p>
            <p>
              J’accompagne les développeurs dans leurs choix et leur montée en
              compétences. Avec les équipes commerciales et support, je clarifie
              les demandes terrain, discute les compromis et organise leur
              traduction dans le produit.
            </p>
            <p>
              Mes sujets IA vont des assistants de code aux chatbots
              conversationnels, agents et analyse de documents. Je m’intéresse à
              leur intégration dans les applications, à la fiabilité des
              réponses et aux données manipulées.
            </p>
            <div className="about-facts">
              <div>
                <Icon name="code" />
                <strong>Full stack</strong>
                <span>Frontend & backend</span>
              </div>
              <div>
                <Icon name="users" />
                <strong>Leadership</strong>
                <span>Équipe & architecture</span>
              </div>
              <div>
                <Icon name="pin" />
                <strong>Pays de la Loire</strong>
                <span>France</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
