import { useCallback } from "react";
import { useMutation, gql, FetchResult } from "@apollo/client";

// Types
import type { Scene } from "../types";

// Fragement
import { SCENE_FRAGMENT } from "@/fragments/scene";

// Utils
import { insertIf } from "@/utils/object/insertIf";

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

const useUpdateSceneMutation = (id: string): UpdateSceneMutation => {
  const [updateSceneMutation] = useMutation<Variables>(UPDATE_SCENE_MUTATION, {
    update: (cache, _, { variables }) => {
      if (!variables) return;

      const id = cache.identify({ __typename: "Scene", id: variables.id });

      const existingScene = cache.readFragment<Scene>({
        id,
        fragment: SCENE_FRAGMENT,
      });

      if (existingScene) {
        cache.writeFragment({
          id,
          fragment: SCENE_FRAGMENT,
          data: {
            ...existingScene,
            ...insertIf(variables.elements, variables.elements),
            ...insertIf(variables.state, variables.state),
          },
        });
      }
    },
  });

  return useCallback<UpdateSceneMutation>(
    (variables) => {
      return updateSceneMutation({ variables: { ...variables, id } });
    },
    [id, updateSceneMutation]
  );
};

export { useUpdateSceneMutation };
