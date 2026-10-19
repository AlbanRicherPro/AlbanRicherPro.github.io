"use client";

import useI18n from "./ui/useI18n";

import Image from "next/image";
import SectionHeader from "./ui/SectionHeader";
import Reveal from "./ui/Reveal";
import Icon from "./ui/Icon";

const missions = [
  {
    title: "Produit et priorités",
    description:
      "Les applications de Deemply centralisent les registres de sécurité et les obligations des bâtiments. Mon rôle est de traduire les besoins métier en évolutions réalisables, avec les équipes commerciales et support.",
    points: [
      "Clarifier les demandes et leurs contraintes avant le développement.",
      "Arbitrer les priorités avec les besoins du produit et la capacité de l’équipe.",
      "Découper les fonctionnalités et anticiper les dépendances techniques.",
    ],
  },
  {
    title: "Architecture et développement",
    description:
      "Je travaille sur l’ensemble de la stack, des interfaces Vue.js et TypeScript aux API PHP/Symfony. Les choix d’architecture doivent servir le besoin actuel tout en permettant au produit d’évoluer.",
    points: [
      "Structurer les composants, les services et les échanges entre frontend et backend.",
      "Développer les fonctionnalités critiques et traiter les sujets de performance.",
      "Faire évoluer le code existant en maîtrisant la dette technique et les risques de régression.",
    ],
  },
  {
    title: "Équipe et leadership technique",
    description:
      "La responsabilité technique passe aussi par le collectif : rendre les décisions compréhensibles, partager les connaissances et aider chaque développeur à gagner en autonomie.",
    points: [
      "Accompagner les développeurs juniors et seniors sur les sujets techniques.",
      "Discuter les choix de conception et partager les bonnes pratiques en revue de code.",
      "Coordonner le travail et rendre visibles les difficultés ou les dépendances.",
    ],
  },
  {
    title: "Qualité, sécurité et livraisons",
    description:
      "Une fonctionnalité doit rester fiable après sa livraison. Je m’attache à relier les pratiques de développement, les tests et les processus de déploiement pour rendre les évolutions plus prévisibles.",
    points: [
      "Développer les pratiques de tests unitaires, d’intégration et de parcours utilisateur.",
      "Intégrer la sécurité, la gestion des accès et la protection des données dans la conception.",
      "Améliorer les processus CI/CD et les conditions de maintenance des applications.",
    ],
  },
  {
    title: "Intégration de l’IA",
    description:
      "J’aborde l’IA comme un sujet d’intégration logicielle : définir un usage, connecter les outils aux données utiles et vérifier le comportement obtenu. Cela concerne aussi bien l’assistance au développement que les fonctionnalités conversationnelles ou agentiques.",
    points: [
      "Intégrer des API IA et des chatbots conversationnels dans une application.",
      "Concevoir des agents capables d’enchaîner des actions dans un cadre défini.",
      "Exploiter des documents et évaluer les réponses, les limites et les cas d’erreur.",
    ],
  },
];
export default function ExperienceSection() {
  const { t } = useI18n();
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section section-anchor experience-section"
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            title={t("Expérience")}
            subtitle={t(
              "Depuis mars 2020 chez Deemply : développement full stack, pilotage technique et accompagnement de l’équipe.",
            )}
          />
        </Reveal>
        <div className="experience-grid">
          <Reveal className="company-panel">
            <div className="company-logo">
              <Image
                src="/deemply-logo.svg"
                alt={"Deemply"}
                width={138}
                height={29}
              />
            </div>
            <p className="eyebrow">{t("MARS 2020 — PRÉSENT")}</p>
            <h3>
              {"Lead Full Stack"}
              <br />
              {"Developer"}
            </h3>
            <p className="company-name">{"Deemply"}</p>
            <p className="company-description">
              {t(
                "Des solutions numériques pour centraliser les obligations réglementaires et simplifier la conformité des bâtiments. L’écosystème couvre les usages web et mobiles des exploitants et des prestataires.",
              )}
            </p>
            <p className="location">
              <Icon name="pin" /> {"La Roche-sur-Yon"}
            </p>
            <div className="company-stack">
              <span>{"Vue.js"}</span>
              <span>{"TypeScript"}</span>
              <span>{"Symfony"}</span>
              <span>{"API Platform"}</span>
              <span>{"GitHub"}</span>
              <span>{"ClickUp"}</span>
              <span>{"Claude Code"}</span>
              <span>{"Docker"}</span>
            </div>
          </Reveal>
          <div className="missions">
            {missions.map(({ title, description, points }, index) => (
              <Reveal key={title} delay={Math.min(index * 50, 160)}>
                <article className="mission">
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(description)}</p>
                    <ul className="mission-points">
                      {points.map((point) => (
                        <li key={point}>{t(point)}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            ))}
            <Reveal>
              <div className="experience-note">
                <Icon name="layers" />
                <p>
                  {t(
                    "En lien avec les équipes commerciales et support, pour aligner les solutions techniques avec les besoins des utilisateurs.",
                  )}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
