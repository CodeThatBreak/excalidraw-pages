import { Spinner } from "@radix-ui/themes";
import { memo } from "react";

const Loading = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <Spinner />
    </div>
  );
};

const MemoizedLoading = memo(Loading);

export { MemoizedLoading as Loading };
