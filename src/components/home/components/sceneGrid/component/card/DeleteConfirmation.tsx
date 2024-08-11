import { MouseEventHandler, useCallback, useState } from "react";

// Components
import { Dialog, IconButton, Flex, Button } from "@radix-ui/themes";

// Icons
import { Trash2Icon } from "lucide-react";

type Props = { onDelete: (event: any) => void; loading: boolean };

const DeleteConfirmation = ({ onDelete, loading }: Props) => {
  const [visible, setVisible] = useState(false);

  const show = useCallback((e: any) => {
    e.preventDefault();
    setVisible(true);
  }, []);

  const hide = useCallback((e: any) => {
    e.preventDefault();
    setVisible(false);
  }, []);

  return (
    <Dialog.Root open={visible}>
      <Dialog.Trigger className="pointer-events-none" onClick={show}>
        <IconButton loading={loading} size="2" color="crimson">
          <Trash2Icon size={16} color="white" />
        </IconButton>
      </Dialog.Trigger>

      <Dialog.Content
        onCloseAutoFocus={hide}
        onPointerDownOutside={hide}
        onInteractOutside={hide}
        maxWidth="450px"
      >
        <Dialog.Title>Delete drawing</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete this drawing? This action cannot be
          undone. Once deleted, the drawing will be permanently removed.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={hide} variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              onClick={(e) => {
                onDelete(e);
                hide(e);
              }}
              color="red"
            >
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export { DeleteConfirmation };
