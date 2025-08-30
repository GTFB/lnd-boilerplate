"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

// Safe useTheme hook
const useSafeTheme = () => {
  // Only run on client side
  if (typeof window === 'undefined') {
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {},
      systemTheme: 'light'
    };
  }

  try {
    const theme = useTheme();
    // Check if theme is properly initialized
    if (theme && typeof theme.setTheme === 'function') {
      return theme;
    }
    throw new Error('Theme not properly initialized');
  } catch (error) {
    // Return default theme values if context is not available
    return {
      theme: 'system',
      resolvedTheme: 'light',
      setTheme: () => {},
      systemTheme: 'light'
    };
  }
};

export function ThemeToggle() {
  const { setTheme, resolvedTheme, theme } = useSafeTheme();

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Don't render on server side to avoid hydration mismatch
  if (typeof window === 'undefined') {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        data-theme-toggle
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-theme-toggle
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
