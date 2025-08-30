'use client'

import { cn } from '../../lib/utils'
import { useTheme } from '../../contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme()

  // Prevent hydration mismatch by using the same initial state
  const displayTheme = mounted ? theme : 'light'

  return (
    <button
      onClick={mounted ? toggleTheme : undefined}
      disabled={!mounted}
      className={cn(
        'p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors',
        'focus:outline-none',
        !mounted && 'cursor-not-allowed opacity-50',
        className
      )}
      aria-label={mounted ? `Switch to ${theme === 'light' ? 'dark' : 'light'} theme` : 'Loading theme toggle'}
    >
      <div className="w-5 h-5 flex items-center justify-center relative">
        <Sun
          className={`w-5 h-5 absolute transition-opacity duration-200 ${
            displayTheme === 'light' 
              ? 'opacity-100 text-gray-700 dark:text-gray-300' 
              : 'opacity-0'
          }`}
        />
        <Moon
          className={`w-5 h-5 absolute transition-opacity duration-200 ${
            displayTheme === 'dark' 
              ? 'opacity-100 text-white' 
              : 'opacity-0'
          }`}
        />
      </div>
    </button>
  )
}
