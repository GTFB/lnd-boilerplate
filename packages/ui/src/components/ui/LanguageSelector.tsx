'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from './button'
import { GBFlag } from './icons/GBFlag'
import { RUFlag } from './icons/RUFlag'
import { ESFlag } from './icons/ESFlag'
import { FRFlag } from './icons/FRFlag'
import { DEFlag } from './icons/DEFlag'
import { ChevronDown, Check } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

// Safe useLocale hook that doesn't throw error if context is not found
const useSafeLocale = () => {
  // Always get locale from URL path first for immediate updates
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
    if (localeMatch) {
      return localeMatch[1]
    }
  }
  
  // Fallback to next-intl useLocale
  try {
    const { useLocale } = require('next-intl')
    const locale = useLocale()
    return locale
  } catch (error) {
    // Return default locale if context is not available
    return 'en'
  }
}

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const locale = useSafeLocale()
  
  // Force re-render when pathname changes
  const [forceUpdate, setForceUpdate] = useState(0)
  
  useEffect(() => {
    setForceUpdate(prev => prev + 1)
  }, [pathname])

  const languages = [
    { code: 'en', name: 'English', flag: <GBFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇬🇧' },
    { code: 'ru', name: 'Русский', flag: <RUFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇷🇺' },
    { code: 'es', name: 'Español', flag: <ESFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: <FRFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: <DEFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇩🇪' }
  ]

  // Click outside component and Escape key handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleLanguageChange = (langCode: string) => {
    setIsOpen(false)
    
    // Get the current path without locale
    let pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '$1') || '/'
    
    // If we're on the root path, just go to the locale
    if (pathWithoutLocale === '/') {
      pathWithoutLocale = ''
    }
    
    // For English (default locale), don't add the locale prefix
    let newPath
    if (langCode === 'en') {
      // For English, use the path without locale prefix
      newPath = pathWithoutLocale || '/'
    } else {
      // For other languages, add the locale prefix
      newPath = `/${langCode}${pathWithoutLocale}`
    }
    
    // Use router.replace to avoid adding to history stack
    router.replace(newPath)
    
    // Force re-render after navigation
    setTimeout(() => {
      setForceUpdate(prev => prev + 1)
    }, 100)
  }

  // Get current language directly from URL for immediate updates
  const getCurrentLanguage = () => {
    // Get locale from URL path
    const pathnameLocale = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1]
    
    if (pathnameLocale) {
      const currentLang = languages.find(lang => lang.code === pathnameLocale)
      if (currentLang) {
        return currentLang
      }
    }
    
    // If no locale in path, it's English (default)
    return languages[0] // English is first in the array
  }
  
  const currentLanguage = getCurrentLanguage()

  return (
    <div className="relative" ref={dropdownRef} key={`language-selector-${forceUpdate}`}>
             <Button
         variant="ghost"
         size="sm"
         onClick={() => {
           setIsOpen(!isOpen)
         }}
         className="flex items-center justify-center px-2 py-0 language-selector-button hover:bg-primary/10 hover:text-primary transition-colors w-full cursor-pointer select-none"
         style={{ 
           width: '80px', 
           minWidth: '80px',
           backgroundColor: 'hsl(var(--card))',
           border: '1px solid hsl(var(--border))',
           color: 'hsl(var(--foreground))'
         }}
       >
        <span className="flex items-center justify-center mr-1" style={{ width: '24px', minWidth: '24px' }}>
          {currentLanguage?.flag || currentLanguage?.fallback}
        </span>
        <span className="hidden sm:inline mr-1">{currentLanguage?.code.toUpperCase()}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-150 ease-out language-chevron-icon ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

      {/* Overlay - only covers the dropdown area, not the entire offcanvas */}
      <div 
        className={`absolute inset-0 z-30 transition-opacity duration-100 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        style={{
          zIndex: isOpen ? 2002 : 30,
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          bottom: 'auto',
          height: '100vh'
        }}
      />
    
             {/* Dropdown */}
      <div
        className={`absolute mt-2 bg-background border rounded-md shadow-lg z-40 transition-all duration-100 ease-out transform language-selector-dropdown ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
        style={{ 
          backgroundColor: 'hsl(var(--card))',
          border: '1px solid hsl(var(--border))',
          color: 'hsl(var(--foreground))',
          minWidth: '200px',
          width: 'max-content',
          maxWidth: 'calc(100vw - 40px)',
          display: isOpen ? 'block' : 'none' // Принудительно показываем/скрываем
        }}
      >
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
                             className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center space-x-3 language-selector-item cursor-pointer ${
                 currentLanguage.code === language.code 
                   ? '' 
                   : 'hover:bg-primary/20 hover:text-primary hover:shadow-sm'
               }`}
                             style={{
                 color: currentLanguage.code === language.code ? 'hsl(var(--accent-foreground))' : 'hsl(var(--foreground))',
                 backgroundColor: 'transparent',
                 cursor: 'pointer',
                 userSelect: 'none'
               }}
            >
              <span className="flex items-center justify-center h-4" style={{ width: '24px', minWidth: '24px' }}>
                {language.flag || language.fallback}
              </span>
              <span className="flex-1">{language.name}</span>
              {currentLanguage.code === language.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
