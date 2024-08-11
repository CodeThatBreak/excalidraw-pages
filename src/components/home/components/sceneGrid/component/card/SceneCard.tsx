import { useCallback, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";

// Components
import { TruncateWithTooltip } from "@/components/ui/TruncateWithTooltip";
import {
  Card,
  Inset,
  Box,
  Heading,
  Text,
  Flex,
  IconButton,
  Dialog,
} from "@radix-ui/themes";

// Utils
import { getRelativeTime } from "@/app/utils/dateTime/getRelativeTime";

// Icon
import { FileTextIcon, Trash2Icon } from "lucide-react";

// Type
import type { Scene } from "@/components/scene/types";
import { DeleteConfirmation } from "./DeleteConfirmation";
import { useDeleteSceneMutation } from "@/components/scene/mutation/useDeleteSceneMutation";
import { useRouter } from "next/router";

const Preview = dynamic(() => import("./Preview").then((m) => m.Preview), {
  ssr: false,
  loading: () => <Box className="h-40" />,
});

type Props = { scene: Scene };

const SceneCard = ({ scene }: Props): JSX.Element => {
  const router = useRouter();

  const { id, updatedAt, createdAt, name } = scene;

  const [deleteScene, loading] = useDeleteSceneMutation();

  const relativeUpdateTime = useMemo(
    () => `Edited ${getRelativeTime(updatedAt)}`,
    [updatedAt]
  );

  const createdDate = useMemo(() => {
    if (typeof createdAt === "string") {
      return DateTime.fromISO(createdAt).toFormat("dd LLL yyyy");
    }

    return DateTime.fromMillis(createdAt).toFormat("dd LLL yyyy");
  }, [createdAt]);

  const onDelete = useCallback(
    (event: Event) => {
      event.preventDefault();
      event.stopPropagation();

      deleteScene(id);
    },
    [id]
  );

  return (
    <Link href={`/scene/${id}`}>
      <Card>
        <Inset className="bg-white">
          <Preview scene={scene} />
          <Box className="px-4 py-2 border-t-2 border-muted h-16">
            <Flex gap="2" align="center" justify="between" direction="row">
              <Box className="overflow-hidden">
                <TruncateWithTooltip content={name}>
                  <Heading truncate size="4" className="font-medium text-lg">
                    {name}
                  </Heading>
                </TruncateWithTooltip>

                <Flex
                  align="center"
                  gap="1"
                  className="text-sm text-muted-foreground"
                >
                  <FileTextIcon className="w-4 h-4" />
                  <TruncateWithTooltip content={createdDate}>
                    <Text>{createdDate}</Text>
                  </TruncateWithTooltip>
                  <Text>·</Text>
                  <TruncateWithTooltip content={relativeUpdateTime}>
                    <Text> {relativeUpdateTime}</Text>
                  </TruncateWithTooltip>
                </Flex>
              </Box>
              <DeleteConfirmation onDelete={onDelete} loading={loading} />
            </Flex>
          </Box>
        </Inset>
      </Card>
    </Link>
  );
};

export { SceneCard };
