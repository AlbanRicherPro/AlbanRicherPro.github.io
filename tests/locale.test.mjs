import { test } from "node:test";
import assert from "node:assert/strict";
import { selectLocale } from "../app/lib/locale.ts";

test("la langue suit la première préférence française ou anglaise du navigateur", () => {
  assert.equal(selectLocale(["fr-FR", "en-US"]), "fr");
  assert.equal(selectLocale(["en-GB", "fr"]), "en");
  assert.equal(selectLocale(["de-DE", "fr-CA", "en"]), "fr");
  assert.equal(selectLocale(["EN-us"]), "en");
  assert.equal(selectLocale(["es"]), "en");
  assert.equal(selectLocale([]), "en");
});
