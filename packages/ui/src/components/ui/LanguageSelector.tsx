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

  // Обработчик клика вне компонента и клавиши Escape
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
    { code: 'EN', name: 'English', flag: <GBFlag className="w-5 h-4" /> },
    { code: 'RU', name: 'Русский', flag: <RUFlag className="w-5 h-4" /> },
    { code: 'ES', name: 'Español', flag: <ESFlag className="w-5 h-4" /> },
    { code: 'FR', name: 'Français', flag: <FRFlag className="w-5 h-4" /> },
    { code: 'DE', name: 'Deutsch', flag: <DEFlag className="w-5 h-4" /> }
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
        className="flex items-center space-x-1.5 px-3"
      >
        <span className="flex items-center mr-1">{currentLanguage?.flag}</span>
        <span className="hidden sm:inline mr-1">{currentLanguage?.code}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </Button>

            {/* Overlay - всегда присутствует, но видимый только при открытом дропдауне */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-out ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Dropdown */}
      <div 
        className={`absolute right-2 mt-2 w-[224px] bg-background border rounded-md shadow-lg z-50 transition-all duration-300 ease-out transform ${
          isOpen 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-1">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={`w-full text-left px-4 py-3 text-sm hover:bg-accent transition-colors flex items-center space-x-3 ${
                currentLang === language.code ? 'bg-accent text-accent-foreground' : ''
              }`}
            >
              <span className="flex items-center">{language.flag}</span>
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
