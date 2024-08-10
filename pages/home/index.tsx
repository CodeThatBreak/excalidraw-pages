// External Libraries
import dynamic from "next/dynamic";
import { NetworkStatus } from "@apollo/client";

// Components
import { Box } from "@radix-ui/themes";
import { Layout } from "@/components/layout/Layout";
import { Search } from "@/components/home/components/search/Search";
import { NoData } from "@/components/home/components/noData/NoData";
import { Tombstone } from "@/components/home/components/sceneGrid/component/tombstone/Tombstone";
import { AddScene } from "@/components/home/components/addScene/AddScene";
import { SceneGrid } from "@/components/home/components/sceneGrid/SceneGrid";

// Custom Hooks
import { useScenesQuery } from "@/components/home/components/sceneGrid/hook/useScenesQuery";

export default function Home() {
  const { data, loading, searchQuery, searchScenes, networkStatus } =
    useScenesQuery();

  const searching = networkStatus === NetworkStatus.fetchMore;

  let mainContent = <SceneGrid scenes={data} />;

  if (loading && !searching) {
    mainContent = <Tombstone />;
  } else if (data.length === 0) {
    mainContent = <NoData searchQuery={searchQuery} />;
  }

  return (
    <Layout>
      <Layout.Header>
        <div className="w-full gap-2 flex-1 flex flex-row justify-end">
          <Box className="flex-1">Scenes</Box>
          <Search loading={searching} onSearch={searchScenes} />
          <div className="flex-1 ml-auto flex justify-end">
            <AddScene />
          </div>
        </div>
      </Layout.Header>
      <Layout.Main>{mainContent}</Layout.Main>
    </Layout>
  );
}
