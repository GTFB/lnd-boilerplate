'use client';

import { useAutoTheme } from '../../hooks/useAutoTheme';
import { useEffect } from 'react';

interface ThemeInitializerProps {
  themeConfig: {
    name: 'lora' | 'alisa';
    options: ('lora' | 'alisa')[];
    autoSwitch: boolean;
    default: 'lora' | 'alisa';
  };
}

export function ThemeInitializer({ themeConfig }: ThemeInitializerProps) {
  useAutoTheme(themeConfig);
  
  // Dynamically import only the active theme CSS
  useEffect(() => {
    const importThemeCSS = async () => {
      try {
        // Remove any existing theme CSS
        const existingLinks = document.querySelectorAll('link[data-theme-css]');
        existingLinks.forEach(link => link.remove());
        
        // Import only the active theme using dynamic import
        const themeName = themeConfig.name;
        
        if (themeName === 'lora') {
          await import('../../styles/design-systems/lora.css');
        } else if (themeName === 'alisa') {
          await import('../../styles/design-systems/alisa.css');
        }
        // Note: custom.css doesn't exist yet
        
        console.log(`Theme CSS imported: ${themeName}`);
      } catch (error) {
        console.error('Failed to import theme CSS:', error);
      }
    };
    
    importThemeCSS();
  }, [themeConfig.name]);
  
  // This component doesn't render anything, only applies the theme
  return null;
}
