import { ActionTypes } from "../constants/actionTypes";

type DeleteAction = { type: ActionTypes.Delete; payload: string };
type EditAction = { type: ActionTypes.Edit; payload: string };

type OnAction = (action: DeleteAction | EditAction) => void;

export type { OnAction };
