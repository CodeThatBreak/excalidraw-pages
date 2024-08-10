import { useDebounceCallback } from "usehooks-ts";
import { useCallback } from "react";

// Constants
import { ActionType } from "@/components/scene/constants/actionTypes";

// Component
import { Input } from "@/components/ui/input";

// Types
import type { Scene } from "@/components/scene/types";
import type { OnAction } from "@/components/scene/types/action";

type Props = {
  scene: Scene;
  onAction: OnAction;
};

const TitleInput = ({ scene, onAction }: Props) => {
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onAction({
        type: ActionType.onNameChange,
        payload: event.target.value,
      });
    },
    [onAction]
  );

  const debouncedOnChange = useDebounceCallback(onChange, 200);

  return (
    <Input
      className="absolute z-10 mt-4 ml-28 w-64"
      defaultValue={scene.name}
      onChange={debouncedOnChange}
    />
  );
};

export { TitleInput };
