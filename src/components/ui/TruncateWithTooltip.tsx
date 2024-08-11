import { ReactNode, useCallback, useRef, useState } from "react";

// Components
import { Box, Tooltip } from "@radix-ui/themes";

type Props = {
  children: ReactNode;
  content: string;
};

const TruncateWithTooltip = ({ children, content }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isTruncated, setIsTruncated] = useState<boolean>(false);

  const onMouseEnter = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    setIsTruncated(
      containerRef.current.clientWidth < containerRef.current.scrollWidth
    );
  }, []);

  return (
    <Box ref={containerRef} className="truncate" onMouseEnter={onMouseEnter}>
      {isTruncated ? (
        <Tooltip side="bottom" content={content}>
          {children}
        </Tooltip>
      ) : (
        children
      )}
    </Box>
  );
};

export { TruncateWithTooltip };
