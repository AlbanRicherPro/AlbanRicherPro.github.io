import { test } from "node:test";
import assert from "node:assert/strict";
import { demoReducer, initialDemo } from "../app/lib/work-demo.ts";

test("une résolution exige une planification et un responsable", () => {
  assert.equal(demoReducer(initialDemo, { type: "resolve" }), initialDemo);
  assert.equal(
    demoReducer(initialDemo, { type: "plan", assignee: "  " }),
    initialDemo,
  );
  const planned = demoReducer(initialDemo, {
    type: "plan",
    assignee: " Alex Dupont ",
  });
  assert.equal(planned.status, "planned");
  assert.equal(planned.assignee, "Alex Dupont");
  const resolved = demoReducer(planned, { type: "resolve" });
  assert.equal(resolved.status, "resolved");
  assert.equal(resolved.assignee, "Alex Dupont");
  assert.equal(
    demoReducer(resolved, { type: "plan", assignee: "Camille Martin" }),
    resolved,
  );
  assert.equal(initialDemo.status, "open");
});

test("changer de bâtiment ou recommencer remet le parcours à zéro", () => {
  const resolved = {
    building: "ateliers",
    status: "resolved",
    assignee: "Camille Martin",
  };
  assert.deepEqual(
    demoReducer(resolved, { type: "building", building: "verriere" }),
    {
      building: "verriere",
      status: "open",
      assignee: "",
    },
  );
  assert.deepEqual(demoReducer(resolved, { type: "reset" }), initialDemo);
});
