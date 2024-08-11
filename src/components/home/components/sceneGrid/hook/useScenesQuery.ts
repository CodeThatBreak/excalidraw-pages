import { useCallback, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Fragments
import { SCENE_FRAGMENT } from "@/fragments/scene";

// Types
import { Scene } from "@/components/scene/types";

export const FETCH_SCENES_QUERY = gql`
  query fetchScenes($searchQuery: String) {
    fetchScenes(searchQuery: $searchQuery) {
      ...SceneFragment
    }
  }
  ${SCENE_FRAGMENT}
`;

type Variables = { searchQuery?: string };

type Response = { fetchScenes: Scene[] };

const useScenesQuery = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data,
    loading: _loading,
    error,
    refetch,
    networkStatus,
  } = useQuery<Response, Variables>(FETCH_SCENES_QUERY, {
    fetchPolicy: "cache-and-network",
    //  notifyOnNetworkStatusChange: true,
  });

  const searchScenes = useCallback(
    (query: string) => {
      setSearchQuery(query);
      refetch({
        searchQuery: query,
      });
    },
    [refetch]
  );

  return {
    data: data?.fetchScenes ?? [],
    loading: !data?.fetchScenes?.length && _loading,
    error,
    searchScenes,
    searchQuery,
    networkStatus,
  };
};

export { useScenesQuery };
