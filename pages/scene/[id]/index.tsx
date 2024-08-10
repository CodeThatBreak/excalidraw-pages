import type { NextPage } from "next";

// Hooks
import { getScene } from "@/components/scene/query/useInitialScene";

// Components
import { Scene as BaseScene } from "@/components/scene/Scene";

type PageProps = { params: { id: string } };

const Scene: NextPage<PageProps> = ({ scene }) => {
  return <BaseScene scene={scene} loading={false} />;
};

export const getServerSideProps = async (context) => {
  const { id } = context.query;

  const { data, loading } = await getScene(id);

  return { props: { scene: data } };
};

export default Scene;
