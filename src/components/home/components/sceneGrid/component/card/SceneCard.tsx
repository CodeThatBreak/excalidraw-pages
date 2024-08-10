import { useCallback, useMemo, useRef } from "react";
import { getRelativeTime } from "@/app/utils/dateTime/getRelativeTime";
import { Card, CardContent } from "@/components/ui/card";
//import { Card } from "@radix-ui/themes";

import { FileTextIcon } from "lucide-react";
import { DateTime } from "luxon";
import Link from "next/link";
import { Scene } from "@/components/scene/types";

import { Typography } from "@/components/ui/typography";
import dynamic from "next/dynamic";
import { Box, Heading, Text } from "@radix-ui/themes";
import { TruncateWithTooltip } from "@/components/ui/TruncateWithTooltip";

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
        <Preview scene={scene} />
        <CardContent className="px-4 py-2 border-t-2 border-muted">
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
        </CardContent>
      </Card>
    </Link>
  );
};

export { SceneCard };
