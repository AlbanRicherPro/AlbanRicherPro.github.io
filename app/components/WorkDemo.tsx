"use client";

import { useId, useReducer, useRef, useState } from "react";
import Image from "next/image";
import Icon from "./ui/Icon";
import Reveal from "./ui/Reveal";
import SectionHeader from "./ui/SectionHeader";
import useI18n from "./ui/useI18n";
import { demoReducer, initialDemo } from "../lib/work-demo";

const stages = ["Tableau de bord", "Interventions", "Historique"];
const layers = ["Frontend", "Backend", "Architecture"] as const;
const explanations = {
  Frontend: {
    title: "Rendre l’action évidente",
    text: "Un état lisible, une action principale et un retour immédiat. Les composants Vue.js et TypeScript gardent l’interface cohérente à chaque étape.",
    points: [
      "Composants réutilisables",
      "Validation du formulaire",
      "États vides, chargement et erreurs",
    ],
    code: 'type Status = "open" | "planned" | "resolved";\n\n<InterventionCard\n  :status="intervention.status"\n  @plan="planIntervention"\n/>',
  },
  Backend: {
    title: "Encadrer les règles métier",
    text: "L’API valide les droits et les transitions d’état. Une intervention doit être planifiée avant d’être clôturée ; cette règle appartient au serveur.",
    points: [
      "Validation côté Symfony",
      "Contrôle des accès",
      "Transitions métier explicites",
    ],
    code: 'POST /api/interventions/{id}/plan\n\n{\n  "assignee": "camille",\n  "scheduledAt": "…"\n}',
  },
  Architecture: {
    title: "Garder une trace fiable",
    text: "L’interface, les règles métier et la persistance ont des responsabilités distinctes. L’historique permet de comprendre ce qui s’est passé.",
    points: [
      "Interface → API → service métier",
      "État et historique enregistrés ensemble",
      "Tests des règles et suivi des erreurs",
    ],
    code: "Vue.js → API Platform\n       → InterventionService\n       → Transaction SQL\n         ├─ intervention\n         └─ history entry",
  },
};

export default function WorkDemo() {
  const { t } = useI18n();
  const [state, dispatch] = useReducer(demoReducer, initialDemo);
  const [stage, setStage] = useState(0);
  const [layer, setLayer] = useState<(typeof layers)[number]>("Frontend");
  const [assignee, setAssignee] = useState("Camille Martin");
  const tabId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const building =
    state.building === "ateliers" ? "Les Ateliers" : "La Verrière";
  const issue =
    state.building === "ateliers"
      ? "Vérification des extincteurs"
      : "Contrôle de l’éclairage de sécurité";
  const statusLabel = {
    open: "À planifier",
    planned: "Planifiée",
    resolved: "Clôturée",
  }[state.status];
  const explanation = explanations[layer];

  function navigate(next: number) {
    setStage(next);
    panel.current?.focus({ preventScroll: true });
  }
  function reset() {
    dispatch({ type: "reset" });
    setAssignee("Camille Martin");
    navigate(0);
  }

  return (
    <section
      id="work-demo"
      className="section section-anchor work-demo"
      tabIndex={-1}
    >
      <div className="container">
        <Reveal>
          <SectionHeader
            title={t("En pratique")}
            subtitle={t(
              "Un aperçu inspiré de Deemply : suivre les obligations d’un site, organiser une intervention et retrouver son historique.",
            )}
          />
        </Reveal>
        <Reveal delay={80}>
          <div className="demo-shell">
            <div className="demo-topbar">
              <span className="demo-product">
                <Image
                  src="/deemply-logo.svg"
                  alt="Deemply"
                  width="114"
                  height="24"
                />
                <span>{t("Aperçu interactif")}</span>
              </span>
              <span className="demo-fiction">
                <span aria-hidden="true" />
                {t("Démo fictive · données locales")}
              </span>
            </div>
            <div className="demo-columns">
              <div className="demo-app">
                <div className="demo-app-layout">
                  <nav
                    className="demo-steps"
                    aria-label={t("Parcours de démonstration")}
                  >
                    {stages.map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        aria-current={stage === index ? "step" : undefined}
                        onClick={() => navigate(index)}
                      >
                        <Icon
                          name={
                            (["monitor", "wrench", "history"] as const)[index]
                          }
                        />
                        {t(label)}
                      </button>
                    ))}
                  </nav>
                  <div
                    className="demo-workspace"
                    ref={panel}
                    tabIndex={-1}
                    role="region"
                    aria-label={t(stages[stage])}
                  >
                    <div className="demo-screen" key={stage}>
                      {stage === 0 && (
                        <>
                          <div className="demo-screen-heading">
                            <div>
                              <p>{t("Accueil / Tableau de bord")}</p>
                              <h3>{t("Bonjour Alban")}</h3>
                              <p className="demo-welcome">
                                {t("Vos obligations en un coup d’œil.")}
                              </p>
                            </div>
                            <Icon name="building" />
                          </div>
                          <div
                            className="demo-building-picker"
                            role="group"
                            aria-label={t("Choisir un bâtiment")}
                          >
                            {(["ateliers", "verriere"] as const).map(
                              (value, index) => (
                                <button
                                  type="button"
                                  key={value}
                                  aria-pressed={state.building === value}
                                  onClick={() =>
                                    dispatch({
                                      type: "building",
                                      building: value,
                                    })
                                  }
                                >
                                  {index === 0 ? "Les Ateliers" : "La Verrière"}
                                </button>
                              ),
                            )}
                          </div>
                          <div className="demo-kpis">
                            <div>
                              <span>{t("À planifier")}</span>
                              <strong>{state.status === "open" ? 1 : 0}</strong>
                              <small>{t("intervention")}</small>
                            </div>
                            <div>
                              <span>{t("Clôturées")}</span>
                              <strong>
                                {state.status === "resolved" ? 12 : 11}
                                <small>/ 12</small>
                              </strong>
                              <small>{t("sur ce site")}</small>
                            </div>
                            <div>
                              <span>{t("Rapports")}</span>
                              <strong>
                                {state.status === "resolved" ? 12 : 11}
                              </strong>
                              <small>{t("disponibles")}</small>
                            </div>
                          </div>
                          <div className="demo-charts">
                            <div className="demo-chart-card">
                              <h4>{t("Interventions par statut")}</h4>
                              <div
                                className="demo-bars"
                                aria-label={t(
                                  "Répartition des 12 interventions du site",
                                )}
                              >
                                {[
                                  [
                                    "À planifier",
                                    state.status === "open" ? 1 : 0,
                                  ],
                                  [
                                    "Planifiées",
                                    state.status === "planned" ? 1 : 0,
                                  ],
                                  [
                                    "Clôturées",
                                    state.status === "resolved" ? 12 : 11,
                                  ],
                                ].map(([label, count]) => (
                                  <div key={label}>
                                    <strong>{count}</strong>
                                    <span
                                      style={{
                                        height: `${8 + Number(count) * 4}px`,
                                      }}
                                    />
                                    <small>{t(String(label))}</small>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="demo-chart-card demo-report-chart">
                              <h4>{t("Suivi documentaire")}</h4>
                              <div
                                className={`demo-donut ${state.status === "resolved" ? "is-complete" : ""}`}
                              >
                                <strong>
                                  {state.status === "resolved" ? 12 : 11}
                                  <small>/ 12</small>
                                </strong>
                              </div>
                              <p>{t("rapports disponibles")}</p>
                            </div>
                          </div>
                          <div className="demo-interventions-list">
                            <h4>
                              {t("Registre de sécurité")}{" "}
                              <span>{building}</span>
                            </h4>
                            <div className="demo-intervention-row">
                              <Icon name="wrench" />
                              <div>
                                <strong>{t(issue)}</strong>
                                <small>{t("Contrôle · Annuel")}</small>
                              </div>
                              <span className={`demo-status ${state.status}`}>
                                <span />
                                {t(statusLabel)}
                              </span>
                            </div>
                            <div className="demo-intervention-row">
                              <Icon name="check" />
                              <div>
                                <strong>
                                  {t(
                                    "Vérification des installations électriques",
                                  )}
                                </strong>
                                <small>
                                  {t("Rapport archivé · aucune observation")}
                                </small>
                              </div>
                              <span className="demo-status resolved">
                                <span />
                                {t("Clôturée")}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="demo-primary"
                            onClick={() => navigate(1)}
                          >
                            {t("Consulter l’intervention")}
                            <Icon name="arrow" />
                          </button>
                        </>
                      )}
                      {stage === 1 && (
                        <>
                          <div className="demo-screen-heading">
                            <div>
                              <p>{building}</p>
                              <h3>{t("Organiser l’intervention")}</h3>
                            </div>
                            <span className={`demo-status ${state.status}`}>
                              <span />
                              {t(statusLabel)}
                            </span>
                          </div>
                          <div className="demo-task">
                            <Icon name="wrench" />
                            <div>
                              <h4>{t(issue)}</h4>
                              <p>
                                {t(
                                  "Vérifier l’équipement et consigner le résultat de l’intervention.",
                                )}
                              </p>
                            </div>
                          </div>
                          {state.status === "open" ? (
                            <form
                              className="demo-plan-form"
                              onSubmit={(event) => {
                                event.preventDefault();
                                dispatch({ type: "plan", assignee });
                                navigate(2);
                              }}
                            >
                              <div className="demo-record-meta">
                                <span>
                                  {t("Module")}
                                  <strong>{t("Registre de sécurité")}</strong>
                                </span>
                                <span>
                                  {t("Périodicité")}
                                  <strong>{t("Annuelle")}</strong>
                                </span>
                              </div>
                              <label htmlFor={`${tabId}-assignee`}>
                                {t("Responsable de l’intervention")}
                              </label>
                              <select
                                id={`${tabId}-assignee`}
                                value={assignee}
                                onChange={(event) =>
                                  setAssignee(event.target.value)
                                }
                              >
                                <option>Camille Martin</option>
                                <option>Alex Dupont</option>
                              </select>
                              <div className="demo-schedule">
                                <Icon name="calendar" />
                                <span>{t("Créneau fictif : demain, 9 h")}</span>
                              </div>
                              <button type="submit" className="demo-primary">
                                {t("Planifier l’intervention")}
                                <Icon name="arrow" />
                              </button>
                            </form>
                          ) : (
                            <div className="demo-plan-summary">
                              <Icon name="check" />
                              <p>
                                {t(
                                  state.status === "resolved"
                                    ? "L’intervention est clôturée."
                                    : "L’intervention est planifiée.",
                                )}
                                <strong>{state.assignee}</strong>
                              </p>
                              <button
                                type="button"
                                className="demo-text-button"
                                onClick={() => navigate(2)}
                              >
                                {t("Consulter l’historique")}
                                <Icon name="arrow" />
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {stage === 2 && (
                        <>
                          <div className="demo-screen-heading">
                            <div>
                              <p>{building}</p>
                              <h3>{t("Chaque action laisse une trace")}</h3>
                            </div>
                            <Icon name="history" />
                          </div>
                          <ol
                            className="demo-timeline"
                            aria-label={t("Historique de l’intervention")}
                          >
                            <li>
                              <span className="demo-event-dot" />
                              <div>
                                <strong>{t("Intervention à planifier")}</strong>
                                <p>{t(issue)}</p>
                              </div>
                              <small>{t("Étape 1")}</small>
                            </li>
                            {state.status !== "open" && (
                              <li>
                                <span className="demo-event-dot" />
                                <div>
                                  <strong>{t("Intervention planifiée")}</strong>
                                  <p>
                                    {state.assignee} · {t("demain, 9 h")}
                                  </p>
                                </div>
                                <small>{t("Étape 2")}</small>
                              </li>
                            )}
                            {state.status === "resolved" && (
                              <li>
                                <span className="demo-event-dot is-done" />
                                <div>
                                  <strong>{t("Intervention clôturée")}</strong>
                                  <p>
                                    {t(
                                      "Rapport fictif archivé, aucune observation à suivre.",
                                    )}
                                  </p>
                                </div>
                                <small>{t("Étape 3")}</small>
                              </li>
                            )}
                          </ol>
                          <p className="demo-live" role="status">
                            {t(
                              state.status === "open"
                                ? "Planifiez l’intervention pour enrichir l’historique."
                                : state.status === "planned"
                                  ? "La planification est visible dans l’historique."
                                  : "L’intervention est clôturée et le rapport est archivé.",
                            )}
                          </p>
                          {state.status === "open" && (
                            <button
                              type="button"
                              className="demo-primary"
                              onClick={() => navigate(1)}
                            >
                              {t("Planifier l’intervention")}
                              <Icon name="arrow" />
                            </button>
                          )}
                          {state.status === "planned" && (
                            <button
                              type="button"
                              className="demo-primary"
                              onClick={() => dispatch({ type: "resolve" })}
                            >
                              {t("Simuler la clôture et le rapport")}
                              <Icon name="check" />
                            </button>
                          )}
                          {state.status === "resolved" && (
                            <button
                              type="button"
                              className="demo-primary"
                              onClick={() => navigate(0)}
                            >
                              {t("Revenir au tableau de bord")}
                              <Icon name="arrow" />
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="demo-app-footer">
                  <span>{t("Aucun envoi ni donnée réelle")}</span>
                  <button type="button" onClick={reset}>
                    {t("Recommencer")}
                    <Icon name="reset" />
                  </button>
                </div>
              </div>
              <aside
                className="demo-technical"
                aria-label={t("Les choix techniques")}
              >
                <div className="demo-technical-heading">
                  <Icon name="code" />
                  <span>{t("Sous le capot")}</span>
                </div>
                <div
                  className="demo-layer-tabs"
                  role="tablist"
                  aria-label={t("Explorer les choix techniques")}
                >
                  {layers.map((name, index) => (
                    <button
                      type="button"
                      key={name}
                      id={`${tabId}-tab-${name}`}
                      role="tab"
                      aria-selected={layer === name}
                      tabIndex={layer === name ? 0 : -1}
                      aria-controls={`${tabId}-explanation`}
                      onClick={() => setLayer(name)}
                      onKeyDown={(event) => {
                        const next =
                          event.key === "ArrowRight"
                            ? (index + 1) % layers.length
                            : event.key === "ArrowLeft"
                              ? (index + layers.length - 1) % layers.length
                              : event.key === "Home"
                                ? 0
                                : event.key === "End"
                                  ? layers.length - 1
                                  : -1;
                        if (next < 0) return;
                        event.preventDefault();
                        setLayer(layers[next]);
                        event.currentTarget.parentElement
                          ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
                          [next]?.focus();
                      }}
                    >
                      {name}
                    </button>
                  ))}
                </div>
                <div
                  id={`${tabId}-explanation`}
                  role="tabpanel"
                  aria-labelledby={`${tabId}-tab-${layer}`}
                  tabIndex={0}
                >
                  <div className="demo-explanation" key={layer}>
                    <h3>{t(explanation.title)}</h3>
                    <p>{t(explanation.text)}</p>
                    <ul>
                      {explanation.points.map((point) => (
                        <li key={point}>
                          <Icon name="check" />
                          {t(point)}
                        </li>
                      ))}
                    </ul>
                    <pre>
                      <code>{explanation.code}</code>
                    </pre>
                  </div>
                </div>
                <p className="demo-contract-note">
                  {t(
                    "Choix et contrats illustratifs, indépendants du code de Deemply.",
                  )}
                </p>
              </aside>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
