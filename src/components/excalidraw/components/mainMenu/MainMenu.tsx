import { memo } from "react";

// Compoennts
import { MainMenu } from "@excalidraw/excalidraw";

// Context
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

AppMainMenu.displayName = "MainMenu";

export { AppMainMenu };
