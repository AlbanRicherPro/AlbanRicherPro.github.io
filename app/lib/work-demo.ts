export type DemoStatus = "open" | "planned" | "resolved";
export type DemoState = {
  building: "ateliers" | "verriere";
  status: DemoStatus;
  assignee: string;
};
export type DemoAction =
  | { type: "building"; building: DemoState["building"] }
  | { type: "plan"; assignee: string }
  | { type: "resolve" }
  | { type: "reset" };
export const initialDemo: DemoState = {
  building: "ateliers",
  status: "open",
  assignee: "",
};
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "building":
      return { ...initialDemo, building: action.building };
    case "plan":
      return state.status === "open" && action.assignee.trim()
        ? { ...state, status: "planned", assignee: action.assignee.trim() }
        : state;
    case "resolve":
      return state.status === "planned"
        ? { ...state, status: "resolved" }
        : state;
    case "reset":
      return { ...initialDemo };
  }
}
