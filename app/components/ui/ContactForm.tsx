"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { sendContactMessage } from "../../lib/contact";

const initial = {
  name: "",
  firstName: "",
  email: "",
  subject: "",
  message: "",
};
const fields = [
  {
    name: "firstName",
    label: "Prénom",
    placeholder: "Votre prénom",
    autocomplete: "given-name",
  },
  {
    name: "name",
    label: "Nom",
    placeholder: "Votre nom",
    autocomplete: "family-name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "vous@exemple.fr",
    autocomplete: "email",
  },
  {
    name: "subject",
    label: "Sujet",
    placeholder: "De quoi souhaitez-vous parler ?",
    autocomplete: "off",
  },
] as const;

export default function ContactForm() {
  const [data, setData] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const request = useRef<AbortController | null>(null);
  useEffect(() => () => request.current?.abort(), []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (request.current) return;
    const controller = new AbortController();
    request.current = controller;
    setSubmitting(true);
    setStatus("idle");
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      await sendContactMessage(data, controller.signal);
      setStatus("success");
      setData(initial);
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
      request.current = null;
      setSubmitting(false);
    }
  }

  function field(item: (typeof fields)[number]) {
    return (
      <div className="form-field" key={item.name}>
        <label htmlFor={item.name}>{item.label}</label>
        <input
          id={item.name}
          name={item.name}
          type={item.name === "email" ? "email" : "text"}
          autoComplete={item.autocomplete}
          placeholder={item.placeholder}
          value={data[item.name]}
          onChange={(event) =>
            setData((previous) => ({
              ...previous,
              [item.name]: event.target.value,
            }))
          }
          required
          maxLength={item.name === "email" ? 254 : 150}
          disabled={submitting}
        />
      </div>
    );
  }
  return (
    <form onSubmit={submit} className="contact-form" aria-busy={submitting}>
      <div className="form-row">{fields.slice(0, 2).map(field)}</div>
      {fields.slice(2).map(field)}
      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Votre idée, votre question…"
          value={data.message}
          onChange={(event) =>
            setData((previous) => ({
              ...previous,
              message: event.target.value,
            }))
          }
          required
          maxLength={5000}
          disabled={submitting}
        />
      </div>
      <button
        className="button button-primary form-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting ? "Envoi en cours…" : "Envoyer le message"}
        <Icon name="arrow" />
      </button>
      <p className="form-privacy">
        Votre message est transmis via FormSubmit pour permettre une réponse.
        Vous pouvez aussi{" "}
        <a
          href="https://fr.linkedin.com/in/alban-richer-144085a7"
          target="_blank"
          rel="noopener noreferrer"
        >
          me contacter sur LinkedIn
        </a>
        .
      </p>
      <div
        className={`form-feedback ${status}`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === "success" &&
          "Merci ! Votre message a été envoyé. Je vous répondrai dès que possible."}
        {status === "error" && (
          <>
            L’envoi a échoué. Votre message est conservé : réessayez ou{" "}
            <a
              href="https://fr.linkedin.com/in/alban-richer-144085a7"
              target="_blank"
              rel="noopener noreferrer"
            >
              contactez-moi sur LinkedIn
            </a>
            .
          </>
        )}
      </div>
    </form>
  );
}
