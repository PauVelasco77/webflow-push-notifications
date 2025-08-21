import {createContext, useContext, useEffect} from "react";
import {useTheme} from "@/hooks/use-theme";

type Theme = "light" | "dark";

interface ThemeContextType {
  readonly theme: Theme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  readonly children: React.ReactNode;
}

/**
 * Theme provider component that handles automatic theme detection and application
 */
export const ThemeProvider = ({children}: ThemeProviderProps) => {
  const themeHook = useTheme();

  // Apply initial theme detection on mount
  useEffect(() => {
    // This ensures the theme is applied immediately on page load
    const root = document.documentElement;
    const initialTheme = themeHook.theme;

    if (initialTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [themeHook.theme]);

  return <ThemeContext.Provider value={themeHook}>{children}</ThemeContext.Provider>;
};

/**
 * Hook to access theme context (read-only)
 */
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
