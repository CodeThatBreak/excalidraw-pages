// Util
import { hashElementsVersion } from "@excalidraw/excalidraw";

// Types
import type { NonDeletedExcalidrawElement } from "@excalidraw/excalidraw/dist/excalidraw/element/types";

const detectChangedElement = (
  elements: readonly NonDeletedExcalidrawElement[],
  previousElements: readonly NonDeletedExcalidrawElement[]
) => {
  const previousVersion = hashElementsVersion(previousElements);
  const currentVersion = hashElementsVersion(elements);

  return previousVersion !== currentVersion;
};

export { detectChangedElement };
