import { gql } from "@apollo/client";

const PREFERENCE_QUERY_FRAGMENT = gql`
  query fetchPreference($key: String!) {
    fetchPreference(key: $key) {
      value
    }
  }
`;

export { PREFERENCE_QUERY_FRAGMENT };
