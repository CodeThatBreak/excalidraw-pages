// Component
import { IconButton } from "@radix-ui/themes";
import { gql, useMutation } from "@apollo/client";

// Icon
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/router";

const CREATE_SCENE_MUTATION = gql`
  mutation createScene {
    createScene
  }
`;

type Response = { createScene: string };

const AddScene = (): JSX.Element => {
  const router = useRouter();

  const [createScene, { loading }] = useMutation<Response>(
    CREATE_SCENE_MUTATION,
    {
      onCompleted: (data) => {
        router.push(`/scene/${data.createScene}`);
      },
    }
  );

  return (
    <IconButton loading={loading} onClick={() => createScene()}>
      <PlusIcon />
    </IconButton>
  );
};

export { AddScene };
