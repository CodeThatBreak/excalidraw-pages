import { useCallback } from "react";
import { useMutation, gql, FetchResult } from "@apollo/client";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";
import { Scene } from "../types";
import { SCENE_FRAGMENT } from "@/fragments/scene";

const UPDATE_SCENE_MUTATION = gql`
  mutation UpdateScene(
    $id: String!
    $name: String
    $elements: JSON
    $state: JSON
  ) {
    updateScene(id: $id, name: $name, elements: $elements, state: $state)
  }
`;

type Variables = {
  id: string;
} & Partial<Scene>;

export type UpdateSceneMutation = (
  variables: Omit<Variables, "id">
) => Promise<FetchResult<Variables>>;

const useUpdateSceneMutation = (id: string): Return => {
  const [updateSceneMutation] = useMutation<Variables>(UPDATE_SCENE_MUTATION, {
    update: (cache, result, { variables }) => {
      if (!variables) {
        return;
      }

      const id = cache.identify({
        __typename: "Scene",
        id: variables.id,
      });

      const existingScene = cache.readFragment({
        id,
        fragment: SCENE_FRAGMENT,
      });

      const data = {};

      if (variables.elements) {
        data.elements = variables.elements;
      }

      if (variables.state) {
        data.state = variables.state;
      }

      if (existingScene) {
        cache.writeFragment({
          id,
          fragment: SCENE_FRAGMENT,
          data: data,
        });
      }
    },
  });

  return useCallback<UpdateSceneMutation>(
    (variables) => {
      return updateSceneMutation({ variables: { ...variables, id } });
    },
    [id]
  );
};

export { useUpdateSceneMutation };
