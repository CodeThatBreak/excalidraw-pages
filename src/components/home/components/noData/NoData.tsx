import Image from "next/image";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { PlusIcon } from "lucide-react";
import { AddScene } from "../addScene";

type Props = {
  searchQuery?: string;
  onAddScene?: () => void;
};

const NoData = ({ searchQuery = "", onAddScene }: Props): JSX.Element => {
  const heading = searchQuery ? "No Scenes Found" : "No Scenes Created";
  const description = searchQuery ? (
    <>
      Oops! We couldn't find any scenes that match your search.
      <br />
      Please try a different keyword.
    </>
  ) : (
    <>
      It looks like no scenes have been created yet. Start by creating your
      first scene!
    </>
  );

  return (
    <Flex
      gap="3"
      direction="column"
      className="h-full"
      justify="center"
      align="center"
    >
      <Image alt="No result" width={300} height={200} src="/canvas.svg" />
      <Heading className="mt-4">{heading}</Heading>
      <Text align="center">{description}</Text>
      <AddScene />
    </Flex>
  );
};

export { NoData };
