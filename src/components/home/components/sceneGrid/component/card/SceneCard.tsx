import { useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { DateTime } from "luxon";

// Components
import { TruncateWithTooltip } from "@/components/ui/TruncateWithTooltip";
import { Card, Inset, Box, Heading, Text } from "@radix-ui/themes";

// Utils
import { getRelativeTime } from "@/app/utils/dateTime/getRelativeTime";

// Icon
import { FileTextIcon } from "lucide-react";

// Type
import type { Scene } from "@/components/scene/types";

const Preview = dynamic(() => import("./Preview").then((m) => m.Preview), {
  ssr: false,
  loading: () => <Box className="h-40" />,
});

type Props = { scene: Scene };

const SceneCard = ({ scene }: Props): JSX.Element => {
  const { id, updatedAt, createdAt, name, elements, state } = scene;

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

  return (
    <Link href={`/scene/${id}`}>
      <Card className="group">
        <Inset>
          <Preview scene={scene} />
        </Inset>
        <Box className="px-4 py-2 border-t-2 border-muted">
          <TruncateWithTooltip content={name}>
            <Heading truncate size="4" className="font-medium text-lg truncate">
              {name}
            </Heading>
          </TruncateWithTooltip>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <FileTextIcon className="w-4 h-4" />
            <TruncateWithTooltip content={createdDate}>
              <Text truncate>{createdDate}</Text>
            </TruncateWithTooltip>
            <Text>·</Text>
            <TruncateWithTooltip content={relativeUpdateTime}>
              <Text truncate> {relativeUpdateTime}</Text>
            </TruncateWithTooltip>
          </div>
        </Box>
      </Card>
    </Link>
  );
};

export { SceneCard };
