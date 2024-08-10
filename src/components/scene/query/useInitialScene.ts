import { gql } from "@apollo/client";

import apolloClient from "@/lib/apollo";

export const FETCH_SCENE_QUERY = gql`
  query fetchScene($id: String!) {
    fetchScene(id: $id) {
      id
      name
      elements
      state
    }
  }
`;

export const getScene = async (id: string) => {
  const { data, ...rest } = await apolloClient.query({
    query: FETCH_SCENE_QUERY,
    variables: { id },
    fetchPolicy: "no-cache",
  });

  return { data: data.fetchScene, ...rest };
};
