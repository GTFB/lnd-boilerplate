'use client'

import { cn } from '../../lib/utils'
import { useTheme } from '../../contexts/ThemeContext'

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
        <svg
          className={`w-5 h-5 absolute transition-opacity duration-200 ${
            displayTheme === 'light' 
              ? 'opacity-100 text-gray-700 dark:text-gray-300' 
              : 'opacity-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ display: 'block' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
        <svg
          className={`w-5 h-5 absolute transition-opacity duration-200 ${
            displayTheme === 'dark' 
              ? 'opacity-100 text-white' 
              : 'opacity-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ display: 'block' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      </div>
    </button>
  )
}
