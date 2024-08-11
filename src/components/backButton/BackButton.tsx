import { memo } from "react";
import Link from "next/link";

// Components
import { Button } from "@excalidraw/excalidraw";

// Icons
import { ArrowLeftToLine } from "lucide-react";

const _noop = () => undefined;

const BackButton = memo((): JSX.Element => {
  return (
    <Link href="/home">
      <Button
        onSelect={_noop}
        className="dropdown-menu-button main-menu-trigger zen-mode-transition absolute !w-9 !h-9 top-4 left-4 z-10"
      >
        <ArrowLeftToLine strokeWidth={1.5} />
      </Button>
    </Link>
  );
});

BackButton.displayName = "BackButton";

export { BackButton };
