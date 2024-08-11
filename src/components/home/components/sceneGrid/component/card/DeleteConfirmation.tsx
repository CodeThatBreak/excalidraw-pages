// Components
import { IconButton, DropdownMenu } from "@radix-ui/themes";

// Icons
import { EllipsisVertical, PencilIcon, Trash2Icon } from "lucide-react";
import { MouseEventHandler } from "react";

type Props = {
  onDelete: MouseEventHandler<HTMLDivElement>;
  onEdit: MouseEventHandler<HTMLDivElement>;
};

const DeleteConfirmation = ({ onDelete, onEdit }: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton radius="full" size="1" variant="soft">
          <EllipsisVertical size={12} />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={onEdit}>
          <PencilIcon size={10} />
          Edit
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={onDelete} color="red">
          <Trash2Icon size={10} />
          Delete
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export { DeleteConfirmation };
