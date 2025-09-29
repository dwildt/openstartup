import { createContext, useContext, useState, useEffect } from 'react';

const THEMES = {
  light: 'light',
  dark: 'dark',
};

const DEFAULT_THEME = 'light';
const STORAGE_KEY = 'openstartup-theme';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES[stored]) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.dark;
    }

    return DEFAULT_THEME;
  });

  const toggleTheme = () => {
    const newTheme = currentTheme === THEMES.light ? THEMES.dark : THEMES.light;
    setCurrentTheme(newTheme);
  };

  const setTheme = (theme) => {
    if (THEMES[theme]) {
      setCurrentTheme(theme);
    }
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const value = {
    currentTheme,
    toggleTheme,
    setTheme,
    themes: THEMES,
    isDark: currentTheme === THEMES.dark,
    isLight: currentTheme === THEMES.light,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}