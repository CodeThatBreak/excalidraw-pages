import { ActionType } from "../constants/actionTypes";

// Types
import { ExcalidrawElement } from "@excalidraw/excalidraw/dist/excalidraw/element/types";
import { AppState } from "@excalidraw/excalidraw/dist/excalidraw/types";

export type OnChangeAction = {
  type: ActionType.onChange;
  payload: {
    elements?: readonly ExcalidrawElement[];
    state?: Partial<AppState>;
  };
};

type OnNameChangeAction = {
  type: ActionType.onNameChange;
  payload: string;
};

type Action = OnChangeAction | OnNameChangeAction;

type OnAction = (action: Action) => void;

export type { Action, OnAction };
