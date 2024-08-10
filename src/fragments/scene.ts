import { gql } from "@apollo/client";

const SCENE_FRAGMENT = gql`
  fragment SceneFragment on Scene {
    id
    name
    updatedAt
    createdAt
    elements
    state
  }
`;

export { SCENE_FRAGMENT };
