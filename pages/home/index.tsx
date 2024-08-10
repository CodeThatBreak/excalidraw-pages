// External Libraries
import dynamic from "next/dynamic";
import { NetworkStatus } from "@apollo/client";

// Components
import { Heading, Flex, Box } from "@radix-ui/themes";
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
        <Flex className="w-full">
          <Heading className="flex-1">Drawings</Heading>
          <Search loading={searching} onSearch={searchScenes} />
          <Flex className="flex-1" justify="end">
            <AddScene />
          </Flex>
        </Flex>
      </Layout.Header>
      <Layout.Main>{mainContent}</Layout.Main>
    </Layout>
  );
}
