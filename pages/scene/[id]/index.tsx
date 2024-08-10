import type { GetServerSidePropsContext, NextPage } from "next";

// Hooks
import { getScene } from "@/components/scene/query/useInitialScene";

// Components
import { Scene as BaseScene } from "@/components/scene/Scene";

// Type
import type { Scene } from "@/components/scene/types";

type PageProps = { scene: Scene };

const Scene: NextPage<PageProps> = ({ scene }) => {
  return <BaseScene scene={scene} />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string;

  try {
    const { data } = await getScene(id);

    if (!data) {
      return {
        redirect: { destination: "/home" },
      };
    }

    return { props: { scene: data } };
  } catch (err) {
    console.error("Error fetching scene", err);
    return {
      redirect: { destination: "/home" },
    };
  }
};

export default Scene;
