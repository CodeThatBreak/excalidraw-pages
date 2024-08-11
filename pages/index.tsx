// External Libraries
import { NetworkStatus } from "@apollo/client";
import Head from "next/head";

// Components
import { Heading, Flex, IconButton } from "@radix-ui/themes";
import { Layout } from "@/components/layout/Layout";
import { Search } from "@/components/home/components/search/Search";
import { NoData } from "@/components/home/components/noData/NoData";
import { Tombstone } from "@/components/home/components/sceneGrid/component/tombstone/Tombstone";
import { AddScene } from "@/components/home/components/addScene";
import { SceneGrid } from "@/components/home/components/sceneGrid/SceneGrid";

// Custom Hooks
import { useScenesQuery } from "@/components/home/components/sceneGrid/hook/useScenesQuery";
import { ThemeSwitcher } from "@/components/themeSwitcher/ThemeSwitcher";

// Icons
import { SignatureIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data, loading, searchQuery, searchScenes, networkStatus } =
    useScenesQuery();

  const searching = networkStatus === NetworkStatus.refetch;

  let mainContent = <SceneGrid scenes={data} />;

  if (loading && !searching) {
    mainContent = <Tombstone />;
  } else if (data.length === 0) {
    mainContent = <NoData searchQuery={searchQuery} />;
  }

  return (
    <Layout>
      <Layout.Header>
        <Head>
          <title>Drawings·Excalidraw</title>
        </Head>
        <Flex className="w-full">
          <Heading className="flex-1">Drawings</Heading>
          <Search loading={searching} onSearch={searchScenes} />
          <Flex gap="1" className="flex-1" justify="end">
            <AddScene />
            <Link href="scene/scribble">
              <IconButton>
                <SignatureIcon size={16} />
              </IconButton>
            </Link>
            <ThemeSwitcher />
          </Flex>
        </Flex>
      </Layout.Header>
      <Layout.Main>{mainContent}</Layout.Main>
    </Layout>
  );
}
