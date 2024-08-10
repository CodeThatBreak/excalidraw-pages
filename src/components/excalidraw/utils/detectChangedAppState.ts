// Utils
import { deepEqual } from "@/app/utils/object/deepEqual";
import { pick } from "@/app/utils/object/pick";

// Constatnts
import {
  KEYS_TO_SYNC,
  KeysToSync,
} from "@/components/scene/constants/stateKeys";

// Type
import type { AppState } from "@excalidraw/excalidraw/dist/excalidraw/types";

const detectChangedAppState = (
  appState: AppState,
  previousAppState: AppState
) => {
  return !deepEqual(appState, previousAppState);
};

export { detectChangedAppState };
