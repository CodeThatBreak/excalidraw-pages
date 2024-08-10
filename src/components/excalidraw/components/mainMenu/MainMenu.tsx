"use client";
import { memo } from "react";

import { MainMenu } from "@excalidraw/excalidraw";

const AppMainMenu = memo(() => {
  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />

      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
});

export { AppMainMenu };
