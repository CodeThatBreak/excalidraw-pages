import { Spinner, TextField } from "@radix-ui/themes";
import { SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";
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
    <div className="relative flex-1">
      <TextField.Root
        placeholder="Search scene..."
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
    </div>
  );
};

export { Search };
