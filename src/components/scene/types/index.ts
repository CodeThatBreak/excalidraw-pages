// Type
import type { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import type { AppState } from "@excalidraw/excalidraw/types/types";

type Scene = {
  id: string;
  name: string;
  elements: readonly ExcalidrawElement[];
  state: Partial<AppState>;
  updatedAt: number | string;
  createdAt: number | string;
};

export type { Scene };
