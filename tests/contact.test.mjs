import { test } from "node:test";
import assert from "node:assert/strict";
import { sendContactMessage } from "../app/lib/contact.ts";

const message = {
  name: "de Test",
  firstName: "test",
  email: "test@example.com",
  subject: "test",
  message: "Texte conservé tel que saisi.",
};

test("le service doit confirmer explicitement un envoi, pas seulement retourner HTTP 200", async (t) => {
  for (const success of [true, "true"]) {
    t.mock.method(globalThis, "fetch", async (_url, options) => {
      assert.deepEqual(JSON.parse(options.body), message);
      assert.equal(options.method, "POST");
      return Response.json({ success });
    });
    await sendContactMessage(message, new AbortController().signal);
    t.mock.restoreAll();
  }
  for (const result of [{ success: false }, { success: "false" }, {}, null]) {
    t.mock.method(globalThis, "fetch", async () => Response.json(result));
    await assert.rejects(
      sendContactMessage(message, new AbortController().signal),
    );
    t.mock.restoreAll();
  }
});

test("les erreurs HTTP, réponses invalides et erreurs réseau ne deviennent pas des succès", async (t) => {
  for (const response of [
    Response.json({ success: true }, { status: 500 }),
    new Response("not JSON"),
  ]) {
    t.mock.method(globalThis, "fetch", async () => response);
    await assert.rejects(
      sendContactMessage(message, new AbortController().signal),
    );
    t.mock.restoreAll();
  }
  t.mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Network error");
  });
  await assert.rejects(
    sendContactMessage(message, new AbortController().signal),
  );
});

test("la requête transmet le signal d’annulation du formulaire", async (t) => {
  const controller = new AbortController();
  controller.abort();
  t.mock.method(globalThis, "fetch", async (_url, options) => {
    assert.equal(options.signal, controller.signal);
    options.signal.throwIfAborted();
  });
  await assert.rejects(sendContactMessage(message, controller.signal), {
    name: "AbortError",
  });
});
