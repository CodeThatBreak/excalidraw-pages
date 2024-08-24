import { type MouseEventHandler, useCallback, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";

// Components
import { TruncateWithTooltip } from "@/components/ui/TruncateWithTooltip";
import { Card, Inset, Box, Heading, Text, Flex } from "@radix-ui/themes";
import { DeleteConfirmation } from "./DeleteConfirmation";

// Utils
import { getRelativeTime } from "@/app/utils/dateTime/getRelativeTime";

// Icon
import { FileTextIcon } from "lucide-react";

// Type
import type { Scene } from "@/components/scene/types";
import type { OnAction } from "@/components/home/types/action";

// Constants
import { ActionTypes } from "@/components/home/constants/actionTypes";

const Preview = dynamic(() => import("./Preview").then((m) => m.Preview), {
  ssr: false,
  loading: () => <Box className="h-40" />,
});

type Props = { scene: Scene; onAction: OnAction };

const SceneCard = ({ scene, onAction }: Props): JSX.Element => {
  const { id, updatedAt, createdAt, name } = scene;

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

  const onDelete: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      onAction({ type: ActionTypes.Delete, payload: id });
    },
    [id, onAction]
  );

  const onEdit: MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      event.stopPropagation();
      onAction({ type: ActionTypes.Edit, payload: id });
    },
    [id, onAction]
  );

  return (
    <Link href={`/scene/${id}`}>
      <Card className="realtive">
        <Inset>
          <Preview scene={scene} />
          <Box className="px-4 py-2 border-t-2 border-muted h-16">
            <Flex
              className="realtive"
              gap="2"
              align="center"
              justify="between"
              direction="row"
            >
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
              <DeleteConfirmation onEdit={onEdit} onDelete={onDelete} />
            </Flex>
          </Box>
        </Inset>
      </Card>
    </Link>
  );
};

export { SceneCard };
