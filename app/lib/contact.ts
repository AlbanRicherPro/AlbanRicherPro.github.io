export type ContactMessage = {
  name: string;
  firstName: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactMessage(
  message: ContactMessage,
  signal: AbortSignal,
) {
  const response = await fetch(
    "https://formsubmit.co/ajax/943b18fdad2828afc66d98205154d2ea",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(message),
      signal,
    },
  );
  const result: unknown = await response.json();
  if (
    !response.ok ||
    !result ||
    typeof result !== "object" ||
    !("success" in result) ||
    (result.success !== true && result.success !== "true")
  ) {
    throw new Error("Le service n’a pas confirmé l’envoi.");
  }
}
