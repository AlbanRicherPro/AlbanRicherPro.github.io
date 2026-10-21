"use client";

import useI18n from "./ui/useI18n";

import Image from "next/image";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Icon, { type IconName } from "./ui/Icon";

const stack = [
  { name: "Vue.js", role: "Interfaces", logo: "vue" },
  { name: "Symfony", role: "Backend", logo: "symfony" },
  { name: "GitHub", role: "Code & intégration", logo: "github" },
  { name: "ClickUp", role: "Suivi & priorités", logo: "clickup" },
  { name: "Docker", role: "Environnements", logo: "docker" },
  { name: "Claude Code", role: "Assistance au code", logo: "claude" },
];

const toolPictograms: Record<string, { logo: string } | { icon: IconName }> = {
  "Vue.js": { logo: "vue" },
  TypeScript: { logo: "typescript" },
  Symfony: { logo: "symfony" },
  "API Platform": { logo: "api-platform" },
  PHP: { logo: "php" },
  Vuetify: { logo: "vuetify" },
  Vite: { logo: "vite" },
  Flutter: { logo: "flutter" },
  Sentry: { logo: "sentry" },
  REST: { icon: "layers" },
  Mentorat: { icon: "users" },
  "Revue de code": { icon: "code" },
  Priorisation: { icon: "check" },
  ClickUp: { logo: "clickup" },
  GitHub: { logo: "github" },
  Docker: { logo: "docker" },
  "GitHub Actions": { logo: "githubactions" },
  Cypress: { logo: "cypress" },
  SQL: { icon: "database" },
  "Codex / ChatGPT": { logo: "openai" },
  "Claude Code": { logo: "claude" },
  Devin: { logo: "devin" },
};

const domains: {
  id: string;
  title: string;
  icon: IconName;
  description: string;
  tools: string[];
  exampleTitle: string;
  example: string;
  practices: string[];
}[] = [
  {
    id: "frontend",
    title: "Frontend",
    icon: "code",
    description:
      "Je développe les interfaces web avec Vue.js et TypeScript : composants, navigation et parcours adaptés aux besoins métier.",
    tools: ["Vue.js", "TypeScript", "Vuetify", "Vite"],
    exampleTitle: "Les interfaces web de Deemply",
    example:
      "Les interfaces de Deemply permettent aux exploitants et aux prestataires de gérer leurs bâtiments et registres de sécurité. Je travaille sur les écrans, leurs interactions et leur connexion aux API.",
    practices: [
      "Parcours utilisateur et composants frontend",
      "Cohérence des écrans et composants avec Vuetify",
      "Intégration des API et performances côté navigateur",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    icon: "database",
    description:
      "Je conçois les API et les services métier avec PHP et Symfony, en structurant les données, les règles métier et la gestion des accès.",
    tools: ["PHP", "Symfony", "API Platform", "SQL", "REST"],
    exampleTitle: "Les services métier de Deemply",
    example:
      "Le backend alimente les applications web et mobiles de Deemply. J’interviens sur les fonctionnalités critiques, les échanges de données et les règles qui encadrent les usages du produit.",
    practices: [
      "Conception d’API avec Symfony et API Platform",
      "Services métier, données et contrôle des accès",
      "Fiabilité des échanges et optimisation des requêtes",
    ],
  },
  {
    id: "leadership",
    title: "Leadership technique",
    icon: "users",
    description:
      "J’accompagne les développeurs et je fais le lien entre les besoins du produit, les choix techniques et les priorités de l’équipe.",
    tools: ["ClickUp", "GitHub", "Mentorat", "Revue de code"],
    exampleTitle: "Accompagnement de l’équipe",
    example:
      "Chez Deemply, le rôle de lead passe par les échanges avec les développeurs juniors et seniors, mais aussi avec les équipes commerciales et support pour clarifier les demandes terrain.",
    practices: [
      "Discussion des choix de conception",
      "Partage des connaissances et autonomie",
      "Suivi des tâches, priorités et dépendances dans ClickUp",
      "Collaboration sur GitHub : branches, pull requests et revues de code",
    ],
  },
  {
    id: "architecture",
    title: "Architecture & qualité",
    icon: "layers",
    description:
      "Je structure les évolutions du produit et les conditions de livraison, avec une attention à la maintenance, aux régressions et au comportement des applications en production.",
    tools: ["Docker", "GitHub Actions", "Cypress", "Sentry"],
    exampleTitle: "Faire évoluer une application existante",
    example:
      "Une nouvelle fonctionnalité doit s’intégrer à l’existant. Les choix de conception, les tests et les pratiques de livraison permettent de maîtriser son impact sur le reste du produit.",
    practices: [
      "Architecture des composants et services",
      "Tests unitaires, d’intégration et de parcours",
      "Intégration continue avec GitHub Actions, performance et dette technique",
      "Suivi des erreurs et des performances avec Sentry pour diagnostiquer les incidents et orienter les corrections",
    ],
  },
  {
    id: "ai",
    title: "IA",
    icon: "cpu",
    description:
      "Assistants de code, chatbots, agents et analyse de documents : je travaille sur leurs usages et leur intégration dans les applications.",
    tools: ["Codex / ChatGPT", "Claude Code", "Devin"],
    exampleTitle: "Conversation et analyse documentaire",
    example:
      "L’intégration relie les API IA aux données et aux actions utiles : échanges conversationnels, lecture de documents ou enchaînement d’actions par un agent.",
    practices: [
      "Intégration d’API et chatbots conversationnels",
      "Workflows agentiques et analyse de documents",
      "Vérification des réponses et cas d’erreur",
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    icon: "phone",
    description:
      "Dans le cadre professionnel, je supervise les projets mobiles développés avec Flutter. En parallèle, j’utilise Flutter pour développer mes projets personnels.",
    tools: ["Flutter", "REST"],
    exampleTitle: "Flutter, au travail et en perso",
    example:
      "Au travail, mon rôle porte sur la supervision technique des projets Flutter. En perso, je développe directement avec Flutter pour explorer les interfaces mobiles et essayer de nouvelles interactions.",
    practices: [
      "Supervision technique des projets Flutter professionnels",
      "Développement d’interfaces et intégration d’API dans mes projets personnels",
      "Expérimentation et développement de projets personnels",
    ],
  },
];
const additional = [
  {
    title: "Java & Spring",
    technologies:
      "Java, Java Enterprise Edition, Spring Boot, Spring Security, Spring Batch",
  },
  {
    title: "Données",
    technologies: "MySQL, MariaDB, PostgreSQL, Oracle SQL Developer, Hibernate",
  },
  {
    title: "Autres langages",
    technologies: "C / C++, Caml / OCaml, Scheme, JavaScript, HTML / CSS",
  },
  { title: "Autres outils", technologies: "Git, Maven, Jenkins" },
  {
    title: "Collaboration",
    technologies: "Gestion de projet, anglais professionnel",
  },
];

export default function SkillsSection() {
  const { t } = useI18n();
  return (
    <section
      id="skills"
      tabIndex={-1}
      className="section section-anchor tools-section"
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            title={t("Compétences")}
            subtitle={t(
              "Développer le produit, prendre les décisions techniques et accompagner l’équipe.",
            )}
          />
        </Reveal>
        <Reveal>
          <div className="skills-stack">
            <div className="skills-stack-heading">
              <h3>{t("Mes outils au quotidien")}</h3>
              <span>{t("Développement, collaboration et livraison")}</span>
            </div>
            <ul className="stack-technologies">
              {stack.map((technology, index) => (
                <Reveal
                  as="li"
                  variant="card"
                  delay={80 + index * 60}
                  key={technology.name}
                >
                  <span className="stack-logo">
                    <Image
                      src={`/stack/${technology.logo}.svg`}
                      alt=""
                      width={36}
                      height={36}
                    />
                  </span>
                  <span>
                    <strong>{t(technology.name)}</strong>
                    <small>{t(technology.role)}</small>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </Reveal>
        <div className="skills-domains">
          {domains.map((domain, index) => (
            <Reveal
              key={domain.id}
              variant="card"
              delay={(index % 2) * 100}
              className={`domain-slot domain-slot-${domain.id}`}
            >
              <article className={`skill-domain skill-domain-${domain.id}`}>
                <div className="domain-heading">
                  <span className="domain-icon">
                    <Icon name={domain.icon} />
                  </span>
                  <h3>{t(domain.title)}</h3>
                </div>
                <p className="domain-description">{t(domain.description)}</p>
                <ul
                  className="domain-tools"
                  aria-label={`${t("Outils et pratiques")} : ${t(domain.title)}`}
                >
                  {domain.tools.map((tool) => {
                    const pictogram = toolPictograms[tool];
                    return (
                      <li key={tool}>
                        {"logo" in pictogram ? (
                          <Image
                            src={`/stack/${pictogram.logo}.svg`}
                            alt=""
                            width={16}
                            height={16}
                          />
                        ) : (
                          <Icon name={pictogram.icon} />
                        )}
                        {t(tool)}
                      </li>
                    );
                  })}
                </ul>
                <details className="skill-example" name="skill-examples">
                  <summary
                    aria-label={`${t("Voir un exemple")} : ${t(domain.title)}`}
                  >
                    {t("Voir un exemple")} <Icon name="arrow" />
                  </summary>
                  <div className="skill-example-content">
                    <h4>{t(domain.exampleTitle)}</h4>
                    <p>{t(domain.example)}</p>
                    <ul>
                      {domain.practices.map((practice) => (
                        <li key={practice}>{t(practice)}</li>
                      ))}
                    </ul>
                  </div>
                </details>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <details className="skills-additional">
            <summary>
              <span>
                <strong>{t("Autres technologies")}</strong>
                <small>
                  {t("Les outils et langages qui complètent mon parcours")}
                </small>
              </span>
              <Icon name="down" />
            </summary>
            <div className="additional-content">
              {additional.map((group) => (
                <div key={group.title}>
                  <h3>{t(group.title)}</h3>
                  <p>{t(group.technologies)}</p>
                </div>
              ))}
            </div>
          </details>
        </Reveal>
      </div>
    </section>
  );
}
