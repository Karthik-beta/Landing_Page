import { createContext, useContext, useEffect, useState } from "react";

/**
 * The available themes.
 * @typedef {"dark" | "light" | "system"} Theme
 */
type Theme = "dark" | "light" | "system";

/**
 * Props for the ThemeProvider component.
 * @interface ThemeProviderProps
 */
type ThemeProviderProps = {
  /** The child components to be rendered within the provider. */
  children: React.ReactNode;
  /** The default theme to use. */
  defaultTheme?: Theme;
  /** The key to use for storing the theme in local storage. */
  storageKey?: string;
};

/**
 * The state of the theme provider.
 * @interface ThemeProviderState
 */
type ThemeProviderState = {
  /** The current theme. */
  theme: Theme;
  /** A function to set the theme. */
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

/**
 * A component that provides theme-switching functionality to its children.
 *
 * This component manages the theme state and applies the appropriate classes
 * to the root element. It also persists the theme in local storage.
 *
 * @param {ThemeProviderProps} props The props for the component.
 * @returns {JSX.Element} The rendered theme provider.
 */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      // Set initial theme based on current preference
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      root.classList.add(systemTheme);

      // Add listener for theme changes
      const handleChange = () => {
        root.classList.remove("light", "dark");
        root.classList.add(mediaQuery.matches ? "dark" : "light");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

/**
 * A custom hook for accessing the theme context.
 *
 * This hook provides access to the current theme and a function to set the
 * theme. It must be used within a `ThemeProvider`.
 *
 * @returns {ThemeProviderState} The theme context.
 */
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
