import type { GetServerSidePropsContext, NextPage } from "next";

// Hooks
import { getScene } from "@/components/scene/query/useInitialScene";

// Components
import { Scene as BaseScene } from "@/components/scene/Scene";

// Type
import type { Scene } from "@/components/scene/types";
import Head from "next/head";

type PageProps = { scene: Scene };

const Scene: NextPage<PageProps> = ({ scene }) => {
  return (
    <>
      <Head>
        <title>{scene.name}</title>
      </Head>
      <BaseScene scene={scene} />
    </>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.query.id as string;

  try {
    const { data } = await getScene(id);

    if (!data) {
      return {
        redirect: { destination: "/" },
      };
    }

    return { props: { scene: data } };
  } catch (err) {
    console.error("Error fetching scene", err);
    return {
      redirect: { destination: "/" },
    };
  }
};

export default Scene;
