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

  // Функция для получения текущей темы из DOM
  const getCurrentTheme = () => {
    if (typeof window === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  }

  useEffect(() => {
    // Получаем сохраненную тему из localStorage
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    
    let initialTheme: 'light' | 'dark'
    
    if (savedTheme) {
      initialTheme = savedTheme
      // Убеждаемся что DOM соответствует сохраненной теме
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      // Если тема не сохранена, используем системную
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      initialTheme = prefersDark ? 'dark' : 'light'
      document.documentElement.classList.toggle('dark', prefersDark)
      // Сохраняем системную тему в localStorage
      localStorage.setItem('theme', initialTheme)
    }
    
    // Устанавливаем состояние только после определения темы
    setThemeState(initialTheme)
    setMounted(true)
  }, [])



  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    
    // Дополнительно устанавливаем стили для предотвращения мигания
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
    
    // Убеждаемся что состояние синхронизировано
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
