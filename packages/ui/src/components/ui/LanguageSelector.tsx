'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Button } from './button'
import { GBFlag } from './icons/GBFlag'
import { RUFlag } from './icons/RUFlag'
import { ESFlag } from './icons/ESFlag'
import { FRFlag } from './icons/FRFlag'
import { DEFlag } from './icons/DEFlag'
import { ChevronDown, Check } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

// CSS styles for language selector
const languageSelectorStyles = `
  .language-selector-dropdown button {
    cursor: pointer !important;
    user-select: none;
    transition: all 0.2s ease-in-out;
    width: 100% !important;
    display: flex !important;
    align-items: center;
    border: none;
    background: transparent;
    padding: 12px 16px;
    text-align: left;
    min-width: 100% !important;
    box-sizing: border-box !important;
  }
  
  .language-selector-dropdown button:hover {
    background-color: hsl(var(--primary) / 0.1) !important;
    color: hsl(var(--primary)) !important;
  }
  
  .language-selector-dropdown button.active-language {
    color: hsl(var(--accent-foreground));
    font-weight: 500;
  }
  
  .language-selector-dropdown button span:first-child {
    margin-right: 12px !important;
  }
`

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  // Force re-render when pathname changes
  const [forceUpdate, setForceUpdate] = useState(0)
  
  // Store selected language to persist across page changes
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
    setForceUpdate(prev => prev + 1)
  }, [pathname])

  const languages = useMemo(() => [
    { code: 'ru', name: 'Русский', flag: <RUFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇷🇺' },
    { code: 'en', name: 'English', flag: <GBFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇬🇧' },
    { code: 'es', name: 'Español', flag: <ESFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: <FRFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: <DEFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇩🇪' }
  ], []);
  
  const currentLanguage = useMemo(() => {
    // Don't process during SSR
    if (!isClient) {
      return languages[0] // Default to Russian during SSR (index 0)
    }

    // First check if we have a stored selected language
    if (selectedLanguage) {
      const storedLang = languages.find(lang => lang.code === selectedLanguage)
      if (storedLang) {
        return storedLang
      }
    }
    
    // Check localStorage for stored language
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.body) {
      try {
        const storedLangCode = localStorage.getItem('selectedLanguage')
        if (storedLangCode) {
          const storedLang = languages.find(lang => lang.code === storedLangCode)
          if (storedLang) {
            setSelectedLanguage(storedLangCode)
            return storedLang
          }
        }
      } catch {
        // Ignore localStorage errors
      }
    }
    
    // Get locale from URL path
    const pathnameLocale = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1]
    
    if (pathnameLocale) {
      const currentLang = languages.find(lang => lang.code === pathnameLocale)
      if (currentLang) {
        // Store this language for future reference
        setSelectedLanguage(pathnameLocale)
        if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.body) {
          try {
            localStorage.setItem('selectedLanguage', pathnameLocale)
          } catch {
            // Ignore localStorage errors
          }
        }
        return currentLang
      }
    }
    
    // If no locale in path, check if we're on the root path
    if (!pathnameLocale) {
      // If we're on the root path, it's Russian (default)
      if (pathname === '/') {
        if (!selectedLanguage) {
          setSelectedLanguage('ru')
          if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.body) {
            try {
              localStorage.setItem('selectedLanguage', 'ru')
            } catch {
              // Ignore localStorage errors
            }
          }
        }
        return languages[0] // Russian is first in the array (index 0)
      }
    }
    
    // If no locale in path and not on root, it's Russian (default)
    if (!selectedLanguage) {
      setSelectedLanguage('ru')
      if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.body) {
        try {
          localStorage.setItem('selectedLanguage', 'ru')
        } catch {
          // Ignore localStorage errors
        }
      }
    }
    return languages[0] // Russian is first in the array (index 0)
  }, [pathname, languages, selectedLanguage, isClient])

  // Click outside component and Escape key handler
  useEffect(() => {
    if (!isClient) return

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
  }, [isOpen, isClient])

  const handleLanguageChange = (langCode: string) => {
    if (!isClient) return

    setIsOpen(false)
    
    // Store the selected language in state and localStorage
    setSelectedLanguage(langCode)
    if (typeof window !== 'undefined' && typeof document !== 'undefined' && document.body) {
      try {
        localStorage.setItem('selectedLanguage', langCode)
      } catch {
        // Ignore localStorage errors
      }
    }
    
    // Get the current path without locale
    let pathWithoutLocale = pathname.replace(/^\/[a-z]{2}(\/|$)/, '$1') || '/'
    
    // If we're on the root path, just go to the locale
    if (pathWithoutLocale === '/') {
      pathWithoutLocale = ''
    }
    
    // For Russian (default locale), don't add the locale prefix
    let newPath
    if (langCode === 'ru') {
      // For Russian, use the path without locale prefix
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

  // Don't render during SSR
  if (!isClient) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center px-2 py-0 language-selector-button hover:bg-primary/10 hover:text-primary transition-colors w-full cursor-pointer select-none"
          disabled
        >
          <RUFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />
          <span className="ml-2 text-sm font-medium">Русский</span>
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: languageSelectorStyles }} />
             <div className="relative" ref={dropdownRef} key={`language-selector-${forceUpdate}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center px-2 py-0 language-selector-button hover:bg-primary/10 hover:text-primary transition-colors w-full cursor-pointer select-none"
          style={{ 
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
          }}
        >
          <div className="py-1">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`text-sm ${
                  currentLanguage.code === language.code 
                    ? 'active-language' 
                    : ''
                }`}
              >
                <span className="flex items-center justify-center h-4" style={{ width: '24px', minWidth: '24px', marginRight: '12px' }}>
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
    </>
  )
}