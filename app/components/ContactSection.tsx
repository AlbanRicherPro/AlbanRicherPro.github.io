import SectionHeader from "./ui/SectionHeader";
import ContactForm from "./ui/ContactForm";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

export default function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="section section-anchor contact-section"
    >
      <div className="container contact-grid">
        <Reveal>
          <SectionHeader
            title="Contact"
            subtitle="Pour échanger sur un produit web, un choix d’architecture, l’organisation d’une équipe technique ou l’intégration de l’IA, vous pouvez m’écrire ici ou sur LinkedIn."
          />
          <ul className="contact-topics">
            <li>Architecture, évolution et maintenance d’une application.</li>
            <li>
              Leadership technique, pratiques de développement et qualité.
            </li>
            <li>Chatbots, agents IA et exploitation de documents.</li>
          </ul>
          <div className="contact-links">
            <a
              href="https://fr.linkedin.com/in/alban-richer-144085a7"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="linkedin" />
              <span>
                Échanger sur LinkedIn<small>Alban Richer</small>
              </span>
              <Icon name="arrow" />
            </a>
            <a
              href="https://github.com/AlbanRicherPro"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="github" />
              <span>
                Explorer mon GitHub<small>AlbanRicherPro</small>
              </span>
              <Icon name="arrow" />
            </a>
          </div>
          <p className="location">
            <Icon name="pin" /> Aizenay, Pays de la Loire, France
          </p>
        </Reveal>
        <Reveal className="contact-panel">
          <h3>
            Envoyez-moi un message<span className="accent">.</span>
          </h3>
          <p className="form-intro">Je vous répondrai dès que possible.</p>
          <ContactForm />
          <noscript>
            <style>{".contact-form { display: none; }"}</style>
            <p className="section-description">
              Pour me contacter, retrouvez-moi sur{" "}
              <a
                className="accent"
                href="https://fr.linkedin.com/in/alban-richer-144085a7"
              >
                LinkedIn
              </a>
              .
            </p>
          </noscript>
        </Reveal>
      </div>
    </section>
  );
}
