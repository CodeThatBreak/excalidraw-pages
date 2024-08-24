import { gql, useMutation } from "@apollo/client";
import { useCallback } from "react";

const UPDATE_PREFERENCE_MUTATION = gql`
  mutation updatePreference($key: String!, $value: JSON) {
    updatePreference(key: $key, value: $value)
  }
`;

const useUpdatePreference = () => {
  const [updatePreference] = useMutation(UPDATE_PREFERENCE_MUTATION);

  return useCallback(
    (key: string, value: Record<string, any>) => {
      updatePreference({ variables: { key, value } });
    },
    [updatePreference]
  );
};

export { useUpdatePreference };
