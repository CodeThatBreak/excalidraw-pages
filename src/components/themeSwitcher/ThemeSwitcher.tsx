import { memo, useCallback } from "react";

// Components
import { IconButton } from "@radix-ui/themes";

// Icons
import { MoonIcon, Sun } from "lucide-react";

// Constant
import { ThemeMode, useThemeContext } from "@/provider/ThemeProvider";
import { INITIAL_PREFERENCE } from "@/constants/preferenceKey";

// Hooks
import { useUpdatePreference } from "@/hooks/useUpdatePreference";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeContext();
  const updatePreference = useUpdatePreference();

  const onThemeToggle = useCallback(() => {
    const newTheme =
      theme === ThemeMode.Dark ? ThemeMode.Light : ThemeMode.Dark;
    updatePreference(INITIAL_PREFERENCE, {
      theme: newTheme,
    });
    setTheme(newTheme);
  }, [setTheme, theme, updatePreference]);

  return (
    <IconButton onClick={onThemeToggle}>
      {theme === ThemeMode.Dark ? <MoonIcon size={16} /> : <Sun size={16} />}
    </IconButton>
  );
};

const MemoizedThemeSwitcher = memo(ThemeSwitcher);

export { MemoizedThemeSwitcher as ThemeSwitcher };
