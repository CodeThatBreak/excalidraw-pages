import type { ChangeEvent } from "react";

// Components
import { Box, Spinner, TextField } from "@radix-ui/themes";

// Icons
import { SearchIcon } from "lucide-react";

// Hooks
import { useDebounceCallback } from "usehooks-ts";

type Props = {
  onSearch: (searchQuery: string) => void;
  loading: boolean;
};

const Search = ({ onSearch, loading }: Props) => {
  const debouncedOnChange = useDebounceCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    200
  );

  return (
    <Box className="flex-1">
      <TextField.Root
        placeholder="Search drawing..."
        className="w-full"
        onChange={debouncedOnChange}
      >
        <TextField.Slot>
          <SearchIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Slot>
          <Spinner loading={loading} />
        </TextField.Slot>
      </TextField.Root>
    </Box>
  );
};

export { Search };
