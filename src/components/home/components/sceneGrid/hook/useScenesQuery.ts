import { useCallback, useState } from "react";
import { useQuery, gql } from "@apollo/client";

// Fragments
import { SCENE_FRAGMENT } from "@/fragments/scene";

// Types
import { Scene } from "@/components/scene/types";

const FETCH_SCENES_QUERY = gql`
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

  const { data, loading, error, fetchMore, networkStatus } = useQuery<
    Response,
    Variables
  >(FETCH_SCENES_QUERY, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const searchScenes = useCallback(
    (query: string) => {
      setSearchQuery(query);
      fetchMore({
        variables: { searchQuery: query },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          return fetchMoreResult;
        },
      });
    },
    [fetchMore]
  );

  return {
    data: data?.fetchScenes ?? [],
    loading,
    error,
    searchScenes,
    searchQuery,
    networkStatus,
  };
};

export { useScenesQuery };
