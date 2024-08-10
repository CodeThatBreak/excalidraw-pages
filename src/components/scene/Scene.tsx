import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { useCallback, useLayoutEffect, useState } from "react";

// Components
import { Loading } from "@/components/loading/Loading";

// Hooks
import { useSyncScene } from "./hooks/useSyncScene";
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

type Props = {
  scene: Scene;
  loading: boolean;
};

const Scene = ({ scene, loading }: Props) => {
  const [excalidrawAPI, excalidrawRefCallback] =
    useState<ExcalidrawImperativeAPI | null>(null);

  useLayoutEffect(() => {
    return () => {
      excalidrawAPI && excalidrawRefCallback(null);
    };
  }, [excalidrawAPI]);

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

  useSyncScene({ excalidrawAPI, updateSceneMutation });

  const showLoader = !excalidrawAPI || loading;

  return (
    <>
      {showLoader ? <Loading /> : null}
      <div className={cn(showLoader ? "opacity-0" : "opacity-1")}>
        <div className="w-dvw h-dvh">
          <Excalidraw
            scene={scene}
            onAction={onAction}
            excalidrawAPI={excalidrawAPI}
            excalidrawRefCallback={excalidrawRefCallback}
          />
        </div>
      </div>
    </>
  );
};

export { Scene };
