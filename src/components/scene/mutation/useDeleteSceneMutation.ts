import { FetchResult, gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

// Query
import { FETCH_SCENES_QUERY } from "@/components/home/components/sceneGrid/hook/useScenesQuery";
import { Scene } from "../types";

const DELETE_SCENE_MUTATION = gql`
  mutation deleteScene($id: String!) {
    deleteScene(id: $id)
  }
`;

type Return = [(id: string) => Promise<FetchResult<any>>, boolean];

const useDeleteSceneMutation = (): Return => {
  const [deleteSceneMutation, { loading }] = useMutation(
    DELETE_SCENE_MUTATION,
    {
      update: (cache, _, { variables }) => {
        const data: { fetchScenes: Scene[] } | null = cache.readQuery({
          query: FETCH_SCENES_QUERY,
        });

        if (!data || !variables) {
          return;
        }

        cache.writeQuery({
          query: FETCH_SCENES_QUERY,
          data: {
            fetchScenes: data.fetchScenes.filter(
              (scene) => scene.id !== variables.id
            ),
          },
        });
      },
    }
  );

  const deleteScene = useCallback(
    (id: string) => {
      return deleteSceneMutation({ variables: { id } });
    },
    [deleteSceneMutation]
  );

  return [deleteScene, loading];
};

export { useDeleteSceneMutation };
