'use client';

import { useState, useEffect } from 'react';

export type Theme = 'lora' | 'alisa' | 'custom';

export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('lora');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load saved theme on initialization
    const savedTheme = localStorage.getItem('selected-theme') as Theme || 'lora';
    applyTheme(savedTheme);
    setIsLoaded(true);
  }, []);

  const applyTheme = (theme: Theme) => {
    // Remove all previous themes
    document.documentElement.classList.remove('theme-lora', 'theme-alisa', 'theme-custom');
    
    // Add new theme
    document.documentElement.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem('selected-theme', theme);
    setCurrentTheme(theme);
  };

  const switchTheme = (theme: Theme) => {
    applyTheme(theme);
  };

  const getThemeInfo = (theme: Theme) => {
    const themeInfo = {
      lora: {
        name: 'Lora',
        description: 'Modern and minimalistic',
        colors: ['#3b82f6', '#64748b', '#f59e0b']
      },
      alisa: {
        name: 'Alisa',
        description: 'Bright and creative',
        colors: ['#E3FF04', '#0A0C00', '#FFB539']
      },
      custom: {
        name: 'Custom',
        description: 'Custom theme',
        colors: ['#8b5cf6', '#6b7280', '#ec4899']
      }
    };

    return themeInfo[theme];
  };

  return {
    currentTheme,
    switchTheme,
    getThemeInfo,
    isLoaded
  };
}
