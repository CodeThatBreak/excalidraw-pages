import { memo } from "react";

// Components
import { Spinner } from "@radix-ui/themes";

const FullScreenLoader = () => (
  <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <Spinner />
  </div>
);

const MemoizedFullScreenLoader = memo(FullScreenLoader);

export { MemoizedFullScreenLoader as FullScreenLoader };
