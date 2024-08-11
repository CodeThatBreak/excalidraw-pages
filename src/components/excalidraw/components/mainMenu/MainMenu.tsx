import { memo } from "react";

import { MainMenu } from "@excalidraw/excalidraw";
import { useThemeContext } from "@/provider/ThemeProvider";

const AppMainMenu = memo(() => {
  const { setTheme } = useThemeContext();

  return (
    <MainMenu>
      <MainMenu.DefaultItems.LoadScene />

      <MainMenu.DefaultItems.SaveAsImage />
      <MainMenu.DefaultItems.Export />
      <MainMenu.DefaultItems.Help />
      <MainMenu.DefaultItems.ClearCanvas />
      <MainMenu.Separator />
      <MainMenu.DefaultItems.ToggleTheme onSelect={setTheme as any} />
      <MainMenu.DefaultItems.ChangeCanvasBackground />
    </MainMenu>
  );
});

export { AppMainMenu };
