import { exportToSvg } from "@excalidraw/excalidraw";
import { useCallback } from "react";

// Components
import { Box } from "@radix-ui/themes";

// Type
import type { Scene } from "@/components/scene/types";

type Props = {
  scene: Scene;
};

const Preview = ({ scene }: Props) => {
  const setRef = useCallback(
    (containerNode: HTMLDivElement) => {
      if (!containerNode) {
        return;
      }

      exportToSvg({
        elements: scene.elements,
        appState: scene.state,
        files: {},
        exportPadding: 24,
      }).then((svg) => {
        svg.classList.add(...["h-full", "w-full"]);
        containerNode.replaceChildren(svg);
      });
    },
    [scene]
  );

  return <Box className="h-40" ref={setRef}></Box>;
};

export { Preview };
