import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Icon, { type IconName } from "./ui/Icon";

const categories: {
  title: string;
  icon: IconName;
  description: string;
  skills: string[];
}[] = [
  {
    title: "Frontend",
    icon: "code",
    description:
      "Développement d’interfaces web et mobiles pour des parcours métier. Organisation des composants, cohérence des écrans et attention aux performances côté navigateur.",
    skills: [
      "Vue.js 3",
      "Vuetify 3",
      "TypeScript",
      "JavaScript",
      "HTML / CSS",
      "NativeScript",
    ],
  },
  {
    title: "Backend",
    icon: "layers",
    description:
      "Conception d’API et de services métier avec PHP et Symfony. Structuration du code, gestion des accès et échanges fiables entre les applications.",
    skills: ["PHP 8", "Symfony 7", "API Platform 4", "REST APIs"],
  },
  {
    title: "Architecture & DevOps",
    icon: "terminal",
    description:
      "Choix d’architecture, environnements de développement et automatisation des livraisons. Une attention à la maintenabilité et à la dette technique.",
    skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Maven", "Jenkins"],
  },
  {
    title: "Bases de données",
    icon: "database",
    description:
      "Modélisation des données, requêtes et intégration avec les services applicatifs. Cohérence des informations et optimisation des accès aux données.",
    skills: [
      "MySQL",
      "MariaDB",
      "PostgreSQL",
      "Oracle SQL Developer",
      "Hibernate",
    ],
  },
  {
    title: "Tests & qualité",
    icon: "check",
    description:
      "Tests des services et des parcours utilisateur pour accompagner les évolutions. Revue de code et pratiques partagées pour limiter les régressions.",
    skills: [
      "Cypress",
      "Tests unitaires",
      "Tests d’intégration",
      "Qualité logicielle",
    ],
  },
  {
    title: "Leadership",
    icon: "users",
    description:
      "Coordination de l’équipe de développement, mentorat et arbitrages techniques. Faire le lien entre les priorités produit, les contraintes techniques et le travail de l’équipe.",
    skills: [
      "Gestion d’équipe",
      "Leadership technique",
      "Gestion de projet",
      "Anglais professionnel",
    ],
  },
  {
    title: "IA",
    icon: "cpu",
    description:
      "Usage d’assistants de code et intégration d’API IA. Développement de chatbots conversationnels, de workflows agentiques et d’analyse de documents, avec vérification des réponses et des cas d’erreur.",
    skills: [
      "Codex",
      "Claude",
      "ChatGPT",
      "Assistants de code",
      "Intégration d’API IA",
      "Chatbots conversationnels",
      "IA agentique",
      "Analyse de documents",
    ],
  },
  {
    title: "Java & Spring",
    icon: "coffee",
    description:
      "Développement de services Java, sécurité applicative et traitements batch. Une autre approche des architectures backend et des applications métier.",
    skills: [
      "Java",
      "Java Enterprise Edition",
      "Spring Boot",
      "Spring Security",
      "Spring Batch",
    ],
  },
  {
    title: "Autres langages",
    icon: "code",
    description:
      "Programmation impérative et fonctionnelle. Des bases utiles pour aborder les structures de données, les algorithmes et les différentes façons d’organiser un programme.",
    skills: ["C / C++", "Caml / OCaml", "Scheme"],
  },
];
export default function SkillsSection() {
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="section section-anchor tools-section"
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            title="Compétences"
            subtitle="Les compétences que je mobilise pour développer, orienter les choix techniques et accompagner une équipe. Vue.js et Symfony constituent ma stack principale ; les autres technologies complètent mon parcours."
          />
        </Reveal>
        <div className="tools-note">
          <span className="mono">AU QUOTIDIEN</span>
          <p>
            Vue.js <span>+</span> TypeScript <span>+</span> Symfony{" "}
            <span>+</span> API Platform
          </p>
          <span className="tools-note-aside">du navigateur au serveur ↴</span>
        </div>
        <div className="skills-grid">
          {categories.map((category) => (
            <Reveal key={category.title}>
              <article className="skill-card">
                <div className="skill-topline">
                  <span className="skill-icon">
                    <Icon name={category.icon} />
                  </span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <ul className="skill-tags">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
