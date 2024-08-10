"use client";

import { memo } from "react";

// Components
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@excalidraw/excalidraw";

import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/router";

const DrawingSelector = memo((): JSX.Element => {
  const router = useRouter();
  return (
    <Button
      onSelect={() => router.push("/home")}
      className="dropdown-menu-button main-menu-trigger zen-mode-transition absolute !w-9 !h-9 top-4 left-4 z-10"
    >
      <ArrowLeftToLine strokeWidth={1.5} />
    </Button>
  );
});

DrawingSelector.displayName = "DrawingSelector";

export { DrawingSelector };
