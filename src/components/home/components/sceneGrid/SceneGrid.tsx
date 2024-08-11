// Components
import { SceneCard } from "./component/card/SceneCard";
import { Grid } from "@radix-ui/themes";

// Types
import type { Scene } from "@/components/scene/types";
import { useCallback } from "react";
import { useDeleteSceneMutation } from "@/components/scene/mutation/useDeleteSceneMutation";
import { OnAction } from "../../types/action";
import { ActionTypes } from "../../constants/actionTypes";
import { useRouter } from "next/router";

const SceneGrid = ({ scenes }: { scenes: Scene[] }) => {
  const router = useRouter();
  const [onDelete] = useDeleteSceneMutation();

  const onAction: OnAction = useCallback(
    (action) => {
      switch (action.type) {
        case ActionTypes.Delete: {
          onDelete(action.payload);
          break;
        }

        case ActionTypes.Edit: {
          router.push(`/scene/${action.payload}`);
          break;
        }
      }
    },
    [router, onDelete]
  );

  return (
    <Grid columns={{ md: "4", sm: "3", xs: "2" }} gap="4">
      {scenes.map((scene) => (
        <SceneCard key={scene.id} scene={scene} onAction={onAction} />
      ))}
    </Grid>
  );
};

export { SceneGrid };
