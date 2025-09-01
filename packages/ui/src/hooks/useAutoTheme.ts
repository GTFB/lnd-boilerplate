'use client';

import { useEffect } from 'react';

export type Theme = 'lora' | 'alisa';

interface ThemeConfig {
  name: Theme;
  options: Theme[];
  autoSwitch: boolean;
  default: Theme;
}

export function useAutoTheme(themeConfig: ThemeConfig) {
  useEffect(() => {
    // Apply theme from configuration
    console.log(`Initializing theme: ${themeConfig.name}`);
    applyTheme(themeConfig.name);
  }, [themeConfig.name]);

  const applyTheme = (theme: Theme) => {
    // Get current classes
    const currentClasses = document.documentElement.className.split(' ');
    
    // Remove all theme classes
    const themeClasses = ['theme-lora', 'theme-alisa'];
    const filteredClasses = currentClasses.filter(cls => !themeClasses.includes(cls));
    
    // Set filtered classes + new theme
    document.documentElement.className = filteredClasses.join(' ') + ` theme-${theme}`;
    
    // Save to localStorage for fast loading
    localStorage.setItem('selected-theme', theme);
    
    // Debug log
    console.log(`Theme applied: ${theme}`);
    console.log(`Current classes: ${document.documentElement.className}`);
  };

  return {
    currentTheme: themeConfig.name,
    applyTheme
  };
}
