import { useMemo, useCallback, useRef } from "react";

// Components
import { AppMainMenu } from "@/components/excalidraw/components/mainMenu";
import { TitleInput } from "./components/titleInput";
import { BackButton } from "@/components/excalidraw/components/backButton";
import {
  Excalidraw as BaseExcalidraw,
  getNonDeletedElements,
} from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";

// Type
import type { Scene } from "../scene/types";
import type { OnAction, OnChangeAction } from "../scene/types/action";

// Constants
import { ActionType } from "../scene/constants/actionTypes";
import { KEYS_TO_SYNC } from "../scene/constants/stateKeys";

// Hooks
import { useDebounceCallback } from "usehooks-ts";
import { useThemeContext } from "@/provider/ThemeProvider";

// Types
import type {
  NonDeletedExcalidrawElement,
  OrderedExcalidrawElement,
  Theme,
} from "@excalidraw/excalidraw/dist/excalidraw/element/types";
import type {
  AppState,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/dist/excalidraw/types";

// Utils
import { detectChangedElement } from "./utils/detectChangedElements";
import { detectChangedAppState } from "./utils/detectChangedAppState";
import { pick } from "@/app/utils/object/pick";

type Props = {
  scene: Scene;
  excalidrawAPI: ExcalidrawImperativeAPI | null;
  excalidrawRefCallback: (api: ExcalidrawImperativeAPI) => void;
  onAction: OnAction;
};

const Excalidraw = ({
  scene,
  onAction,
  excalidrawAPI,
  excalidrawRefCallback,
}: Props): JSX.Element => {
  const { theme: theme } = useThemeContext() as { theme: Theme };

  const initialData = useMemo(
    () => ({
      appState: scene.state,
      elements: scene.elements,
    }),
    [scene]
  );

  const previousElementsRef = useRef<readonly NonDeletedExcalidrawElement[]>(
    initialData.elements
  );

  const previousStateRef = useRef<Partial<AppState>>(initialData.appState);

  const onChange = useCallback(
    (elements: readonly OrderedExcalidrawElement[], appState: AppState) => {
      const nonDeletedElements = getNonDeletedElements(elements);
      const partialAppState = pick(appState, KEYS_TO_SYNC);

      const didElementsChange = detectChangedElement(
        nonDeletedElements,
        previousElementsRef.current
      );

      const didStateChange = detectChangedAppState(
        partialAppState,
        previousStateRef.current
      );

      if (didElementsChange || didStateChange) {
        const payload: OnChangeAction["payload"] = {};

        if (didElementsChange) {
          payload.elements = nonDeletedElements;
        }

        if (didStateChange) {
          payload.state = partialAppState;
        }

        onAction({
          type: ActionType.onChange,
          payload,
        });
      }

      previousElementsRef.current = nonDeletedElements.map((element) => ({
        ...element,
      }));
      previousStateRef.current = partialAppState;
    },
    [onAction]
  );

  const debouncedOnChange = useDebounceCallback(onChange, 150, {
    maxWait: 1000,
  });

  return (
    <>
      <TitleInput onAction={onAction} scene={scene} />
      <BaseExcalidraw
        excalidrawAPI={excalidrawRefCallback}
        initialData={initialData}
        onChange={debouncedOnChange}
        name={scene.name}
        autoFocus={true}
        theme={theme}
        UIOptions={{
          canvasActions: {
            toggleTheme: true,
          },
        }}
      >
        <AppMainMenu />
        <BackButton />
      </BaseExcalidraw>
    </>
  );
};

export { Excalidraw };
