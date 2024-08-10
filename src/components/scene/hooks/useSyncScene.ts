import { useEffect, useRef } from "react";

// Constants
import { KEYS_TO_SYNC, KeysToSync } from "../constants/stateKeys";

// Types
import type {
  AppState,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import type { UpdateSceneMutation } from "../mutation/useUpdateSceneMutation";

// Utils
import { pick } from "@/app/utils/object/pick";
import { deepEqual } from "@/app/utils/object/deepEqual";

type Props = {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  updateSceneMutation: UpdateSceneMutation;
};

const SYNC_STATE_DURATION = 2000;

const useSyncScene = ({ excalidrawAPI, updateSceneMutation }: Props) => {
  const previousAppStateRef = useRef<AppState | null>(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!excalidrawAPI) return;

  //     const state = excalidrawAPI.getAppState();

  //     if (!previousAppStateRef.current) {
  //       previousAppStateRef.current = state;
  //       return;
  //     }

  //     const partialAppState = pick<AppState, KeysToSync>(state, KEYS_TO_SYNC);
  //     const previousAppState = pick<AppState, KeysToSync>(
  //       previousAppStateRef.current,
  //       KEYS_TO_SYNC
  //     );

  //     const hasStateChanged = !deepEqual(partialAppState, previousAppState);

  //     if (hasStateChanged) {
  //       updateSceneMutation({
  //         state: partialAppState,
  //       });

  //       previousAppStateRef.current = state;
  //     }
  //   }, SYNC_STATE_DURATION);

  //   return () => clearInterval(interval);
  // }, [excalidrawAPI, updateSceneMutation]);

  useEffect(() => {
    const sync = () => {
      if (!excalidrawAPI) {
        return;
      }

      const state = excalidrawAPI.getAppState();
      const elements = excalidrawAPI.getSceneElements();
      const partialAppState = pick<AppState, KeysToSync>(state, KEYS_TO_SYNC);

      updateSceneMutation({
        state: partialAppState,
        elements,
      });
    };
    window.addEventListener("beforeunload", sync);
    return () => window.removeEventListener("beforeunload", sync);
  }, [excalidrawAPI, updateSceneMutation]);
};

export { useSyncScene };
