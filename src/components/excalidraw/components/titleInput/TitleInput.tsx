import { useDebounceCallback } from "usehooks-ts";
import { useCallback } from "react";

// Constants
import { ActionType } from "@/components/scene/constants/actionTypes";

// Component
import { TextField } from "@radix-ui/themes";

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
    <TextField.Root
      className="absolute z-10   mt-4 ml-28 w-52 h-9 outline-none opacity-30 focus-within:opacity-100"
      defaultValue={scene.name}
      onChange={debouncedOnChange}
      variant="soft"
    />
  );
};

export { TitleInput };
