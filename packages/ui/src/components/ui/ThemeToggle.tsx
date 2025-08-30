'use client'

import React from 'react'
import { cn } from '../../lib/utils'
import { useTheme } from '../../contexts/ThemeContext'


// Custom theme toggle icon
function ThemeToggleIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
      <path d="M12 3l0 18"></path>
      <path d="M12 9l4.65 -4.65"></path>
      <path d="M12 14.3l7.37 -7.37"></path>
      <path d="M12 19.6l8.85 -8.85"></path>
    </svg>
  )
}

export interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { toggleTheme } = useTheme()

  // State to prevent hydration
  const [isDark, setIsDark] = React.useState(false)

  // Update state after mounting
  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors',
        'focus:outline-none',
        className
      )}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      suppressHydrationWarning
    >
             <div className="w-5 h-5 flex items-center justify-center" suppressHydrationWarning>
         <ThemeToggleIcon className="w-5 h-5 text-foreground" />
       </div>
    </button>
  )
}
