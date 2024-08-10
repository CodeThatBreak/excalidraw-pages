import { useCallback, useRef } from "react";
import { useMutation, gql, useApolloClient } from "@apollo/client";

import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState } from "@excalidraw/excalidraw/types/types";

// Hooks
import { useDebounceCallback } from "usehooks-ts";
import { FetchSceneQuery } from "../../scene/query/useInitialScene";

// Constants
import { STORAGE_KEYS } from "@/constants/localStorage";

// Utils
import { isEqual } from "@/app/utils/object/deepEqual";
import { pick } from "@/app/utils/object/pick";

const UPDATE_MUTATION = gql`
  mutation UpdateScene(
    $id: String!
    $name: String!
    $elements: JSON
    $state: JSON
  ) {
    updateScene(id: $id, name: $name, elements: $elements, state: $state)
  }
`;

const useSyncChanges = () => {
  const [synChanges] = useMutation(UPDATE_MUTATION);
  const syncChangesRef = useRef(synChanges);
  const previousElements = useRef();
  const previousAppState = useRef();

  const apolloClient = useApolloClient();

  const saveDataToDataBase = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AppState) => {
      const data = apolloClient.cache.readQuery({ query: FetchSceneQuery });

      syncChangesRef.current({
        variables: {
          id: "548f913f-330a-4cb9-a340-8f579fabac4f",
          elements,
          state: pick(appState, KEYS),
          name: "",
          version: Date.now(),
        },
      });
    },
    []
  );

  const debouncedSaveChanges = useDebounceCallback(saveDataToDataBase, 10000);

  const onChange = useCallback(
    (elements: readonly ExcalidrawElement[], appState: AppState) => {
      if (previousElements.current !== elements) {
        previousElements.current = elements;
      }
      if (previousAppState.current !== appState) {
        previousAppState.current = appState;
      }

      debouncedSaveChanges(elements, appState);
    },
    [debouncedSaveChanges]
  );

  return {
    onChange: onChange,
  };
};

export { useSyncChanges };
