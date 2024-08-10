import type { AppState } from "@excalidraw/excalidraw/dist/excalidraw/types";

type KeysToSync = keyof AppState;

const KEYS_TO_SYNC: KeysToSync[] = [
  "name",
  "zoom",
  "scrollX",
  "scrollY",
  "gridSize",
  "openSidebar",
  "zenModeEnabled",
  "scrolledOutside",
  "selectedGroupIds",
  "selectedElementIds",
  "viewBackgroundColor",
  "selectedLinearElement",
  "objectsSnapModeEnabled",
] as const;

export { KEYS_TO_SYNC, type KeysToSync };
