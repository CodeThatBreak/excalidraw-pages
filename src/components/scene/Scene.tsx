import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

// Components
import { Box } from "@radix-ui/themes";
import { FullScreenLoader } from "@/components/loader";

// Hooks
import { useUpdateSceneMutation } from "./mutation/useUpdateSceneMutation";

// Constant
import { ActionType } from "./constants/actionTypes";

// Types
import type { Scene } from "./types";
import type { Action } from "./types/action";
import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/dist/excalidraw/types";

const Excalidraw = dynamic(
  () => import("../excalidraw").then((m) => m.Excalidraw),
  { ssr: false }
);

type Props = { scene: Scene };

const Scene = ({ scene }: Props) => {
  const [excalidrawAPI, excalidrawRefCallback] =
    useState<ExcalidrawImperativeAPI | null>(null);

  const updateSceneMutation = useUpdateSceneMutation(scene.id);

  const onAction = useCallback(
    (action: Action) => {
      switch (action.type) {
        case ActionType.onChange:
          updateSceneMutation({
            elements: action.payload.elements,
            state: action.payload.state,
          });
          break;

        case ActionType.onNameChange:
          updateSceneMutation({
            name: action.payload,
          });

        default:
          break;
      }
    },
    [updateSceneMutation]
  );

  const showLoader = !excalidrawAPI;

  return (
    <>
      {showLoader ? <FullScreenLoader /> : null}
      <Box className={cn(showLoader ? "opacity-0" : "opacity-1")}>
        <Box className="w-dvw h-dvh">
          <Excalidraw
            scene={scene}
            onAction={onAction}
            excalidrawAPI={excalidrawAPI}
            excalidrawRefCallback={excalidrawRefCallback}
          />
        </Box>
      </Box>
    </>
  );
};

export { Scene };
