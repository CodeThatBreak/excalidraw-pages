import { memo } from "react";

// Components
import { IconButton } from "@radix-ui/themes";

// Icons
import { MoonIcon, Sun } from "lucide-react";

// Constant
import { ThemeMode, useThemeContext } from "@/provider/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  return (
    <IconButton>
      {theme === ThemeMode.Dark ? (
        <MoonIcon size={16} onClick={() => setTheme(ThemeMode.Light)} />
      ) : (
        <Sun size={16} onClick={() => setTheme(ThemeMode.Dark)} />
      )}
    </IconButton>
  );
};

const MemoizedThemeSwitcher = memo(ThemeSwitcher);

export { MemoizedThemeSwitcher as ThemeSwitcher };
