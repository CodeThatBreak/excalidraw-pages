import { Dispatch, SetStateAction, createContext, useContext } from "react";

export enum ThemeMode {
  Dark = "dark",
  Light = "light",
  Inherit = "inherit",
}

interface ThemeContextType {
  theme: string;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeContext };
