'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
  toggleTheme: () => void
  mounted: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  // Function to get current theme from DOM
  const getCurrentTheme = () => {
    if (typeof window === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    
    let initialTheme: 'light' | 'dark'
    
    if (savedTheme) {
      initialTheme = savedTheme
      // Ensure DOM matches saved theme
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // If theme not saved, use system theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      initialTheme = prefersDark ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', prefersDark)
      // Save system theme to localStorage
      localStorage.setItem('theme', initialTheme)
    }
    
    // Set state only after theme determination
    setThemeState(initialTheme)
    setMounted(true)
  }, [])



  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    
    // Additionally set styles to prevent flickering
    if (newTheme === 'dark') {
      document.documentElement.style.backgroundColor = 'hsl(0 0% 0%)'
      document.documentElement.style.color = 'hsl(0 0% 98%)'
      document.body.style.backgroundColor = 'hsl(0 0% 0%)'
      document.body.style.color = 'hsl(0 0% 98%)'
    } else {
      document.documentElement.style.backgroundColor = 'hsl(0 0% 100%)'
      document.documentElement.style.color = 'hsl(222.2 84% 4.9%)'
      document.body.style.backgroundColor = 'hsl(0 0% 100%)'
      document.body.style.color = 'hsl(222.2 84% 4.9%)'
    }
    
    // Ensure state is synchronized
    setTimeout(() => {
      const currentDarkClass = document.documentElement.classList.contains('dark')
      if (currentDarkClass !== (newTheme === 'dark')) {
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
      }
    }, 0)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    setTheme,
    toggleTheme,
    mounted
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
