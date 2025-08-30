'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from './button'
import { GBFlag } from './icons/GBFlag'
import { RUFlag } from './icons/RUFlag'
import { ESFlag } from './icons/ESFlag'
import { FRFlag } from './icons/FRFlag'
import { DEFlag } from './icons/DEFlag'
import { useTranslations, useLocale } from '../../hooks/useTranslations'
import { ChevronDown, Check } from 'lucide-react'

export const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState('EN')
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  const languages = [
    { code: 'EN', name: 'English', flag: <GBFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇬🇧' },
    { code: 'RU', name: 'Russian', flag: <RUFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇷🇺' },
    { code: 'ES', name: 'Español', flag: <ESFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇪🇸' },
    { code: 'FR', name: 'Français', flag: <FRFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇫🇷' },
    { code: 'DE', name: 'Deutsch', flag: <DEFlag className="w-6 h-4" style={{ minWidth: '24px', width: '24px' }} />, fallback: '🇩🇪' }
  ]

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    setIsOpen(false)
    // Here you would implement actual language change logic
    console.log('Language changed to:', langCode)
  }

  const currentLanguage = languages.find(lang => lang.code === currentLang)

  return (
    <div className="relative" ref={dropdownRef}>
                     <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center px-2 py-0 language-selector-button"
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
         <span className="hidden sm:inline mr-1">{currentLanguage?.code}</span>
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
         className={`absolute left-0 mt-2 w-[200px] bg-background border rounded-md shadow-lg z-40 transition-all duration-100 ease-out transform language-selector-dropdown ${
           isOpen 
             ? 'opacity-100 scale-100 translate-y-0' 
             : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
         }`}
         style={{ 
           minWidth: '200px', 
           maxWidth: '250px',
           transform: isOpen ? 'translateX(100px)' : 'translateX(100px) scale(0.95) translateY(-8px)',
           backgroundColor: 'hsl(var(--card))',
           border: '1px solid hsl(var(--border))',
           color: 'hsl(var(--foreground))'
         }}
       >
        <div className="py-1">
          {languages.map((language) => (
                         <button
               key={language.code}
               onClick={() => handleLanguageChange(language.code)}
               className={`w-full text-left px-4 py-3 text-sm hover:bg-accent transition-colors flex items-center space-x-3 language-selector-item ${
                 currentLang === language.code ? 'bg-accent text-accent-foreground' : ''
               }`}
               style={{
                 color: 'hsl(var(--foreground))',
                 backgroundColor: currentLang === language.code ? 'hsl(var(--accent))' : 'transparent'
               }}
             >
              <span className="flex items-center justify-center h-4" style={{ width: '24px', minWidth: '24px' }}>
                {language.flag || language.fallback}
              </span>
              <span className="flex-1">{language.name}</span>
              {currentLang === language.code && (
                <Check className="w-4 h-4 text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
