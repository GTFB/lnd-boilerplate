'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { Sun, Moon } from 'lucide-react'
import { Button } from '../ui/button'

export interface MinimalHeaderProps {
  logo?: React.ReactNode
  showThemeToggle?: boolean
  className?: string
}

export const MinimalHeader: React.FC<MinimalHeaderProps> = ({
  logo,
  showThemeToggle = true,
  className = ''
}) => {
  const { currentSystem, switchSystem } = useDesignSystem()

  const toggleTheme = () => {
    const newTheme = currentSystem === 'lora' ? 'alisa' : 'lora'
    switchSystem(newTheme)
  }

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          {logo || (
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
              <span className="text-xl font-bold">LND</span>
            </div>
          )}

          {/* Right side - Theme Toggle */}
          {showThemeToggle && (
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
            >
              {currentSystem === 'lora' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
