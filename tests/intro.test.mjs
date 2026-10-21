import { test } from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { introBootstrap, INTRO_SESSION_KEY } from "../app/lib/intro.ts";

function bootstrap({
  hash = "",
  path = "/",
  seen = false,
  type = "navigate",
  theme = "auto",
  blocked = false,
} = {}) {
  const dataset = {};
  const timers = [];
  const events = [];
  runInNewContext(introBootstrap, {
    document: { documentElement: { dataset } },
    location: { hash, pathname: path },
    performance: { getEntriesByType: () => [{ type }] },
    localStorage: {
      getItem: () => {
        if (blocked) throw Error("unavailable");
        return theme;
      },
    },
    sessionStorage: {
      getItem: (key) => {
        assert.equal(key, INTRO_SESSION_KEY);
        if (blocked) throw Error("unavailable");
        return seen ? "1" : null;
      },
    },
    window: {
      setTimeout: (callback) => timers.push(callback),
      dispatchEvent: (event) => events.push(event.type),
    },
    Event: class {
      constructor(type) {
        this.type = type;
      }
    },
  });
  return { dataset, timers, events };
}

test("l’intro respecte les liens directs, l’historique et une session déjà vue", () => {
  for (const options of [
    { hash: "#skills" },
    { hash: "#approach" },
    { type: "back_forward" },
    { seen: true },
    { path: "/404.html" },
  ]) {
    const result = bootstrap(options);
    assert.equal(result.dataset.intro, undefined);
    assert.equal(result.timers.length, 0);
  }
  assert.equal(bootstrap({ hash: "#home" }).dataset.intro, "pending");
});

test("le thème est posé avant l’intro et une panne ne peut laisser l’écran couvert", () => {
  const result = bootstrap({ theme: "light" });
  assert.equal(result.dataset.theme, "light");
  assert.equal(result.dataset.intro, "pending");
  result.dataset.intro = "running";
  result.timers[0]();
  assert.equal(result.dataset.intro, "done");
  assert.deepEqual(result.events, ["portfolio-intro-cancel"]);
});

test("le stockage indisponible laisse toujours une sortie vers le contenu", () => {
  const result = bootstrap({ blocked: true });
  assert.equal(result.dataset.intro, "pending");
  result.timers[0]();
  assert.equal(result.dataset.intro, "done");
});
