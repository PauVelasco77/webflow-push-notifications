import {useEffect, useState} from "react";

type Theme = "light" | "dark";

/**
 * Custom hook to automatically detect theme based on user's browser preferences
 */
export const useTheme = (): {
  readonly theme: Theme;
} => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Use browser preference on initial load
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      // Automatically update theme when system preference changes
      setTheme(e.matches ? "dark" : "light");
    };

    // Listen for system theme changes
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return {
    theme,
  };
};
