import { memo, useCallback } from "react";

// Components
import { IconButton } from "@radix-ui/themes";

// Icons
import { MoonIcon, Sun } from "lucide-react";

// Constant
import { ThemeMode, useThemeContext } from "@/provider/ThemeProvider";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();

  const onThemeToggle = useCallback(() => {
    setTheme((prevTheme) =>
      prevTheme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark
    );
  }, []);

  return (
    <IconButton onClick={onThemeToggle}>
      {theme === ThemeMode.Dark ? <MoonIcon size={16} /> : <Sun size={16} />}
    </IconButton>
  );
};

const MemoizedThemeSwitcher = memo(ThemeSwitcher);

export { MemoizedThemeSwitcher as ThemeSwitcher };
