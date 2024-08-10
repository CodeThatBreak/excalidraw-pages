// Utils
import { deepEqual } from "@/app/utils/object/deepEqual";

// Type
import type { AppState } from "@excalidraw/excalidraw/dist/excalidraw/types";

const detectChangedAppState = (
  appState: Partial<AppState>,
  previousAppState: Partial<AppState>
) => {
  return !deepEqual(appState, previousAppState);
};

export { detectChangedAppState };
