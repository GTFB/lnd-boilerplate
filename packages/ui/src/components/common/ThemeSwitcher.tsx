'use client';

import { useState } from 'react';
import { useTheme, type Theme } from '../../hooks/useTheme';

const themes: Theme[] = ['lora', 'alisa'];

export function ThemeSwitcher() {
  const { currentTheme, switchTheme, getThemeInfo } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSwitch = (theme: Theme) => {
    switchTheme(theme);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="theme-switcher relative">
      <button
        onClick={toggleDropdown}
        className="theme-switcher-trigger flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-md hover:bg-muted transition-colors"
        aria-label="Switch design system"
      >
        <div className="theme-preview flex items-center gap-1">
          {getThemeInfo(currentTheme).colors.map((color, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <span className="text-sm font-medium">
          {getThemeInfo(currentTheme).name}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="theme-dropdown absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <h3 className="text-sm font-semibold text-popover-foreground">
              Choose design system
            </h3>
          </div>
          
          <div className="p-2 space-y-1">
            {themes.map((theme) => {
              const themeInfo = getThemeInfo(theme);
              return (
                <button
                  key={theme}
                  onClick={() => handleThemeSwitch(theme)}
                  className={`w-full p-3 rounded-md text-left transition-colors ${
                    currentTheme === theme
                      ? 'bg-accent text-accent-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="theme-preview flex items-center gap-1">
                      {themeInfo.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">
                        {themeInfo.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {themeInfo.description}
                      </div>
                    </div>
                    {currentTheme === theme && (
                      <svg className="w-4 h-4 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
