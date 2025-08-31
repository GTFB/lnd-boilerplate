'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  getDefaultLocale, 
  isDefaultLocale, 
  getSupportedLocales,
  getLocaleDisplayName,
  getLocaleFlag
} from '../../utils/siteConfig'

interface Language {
  code: string
  name: string
  flag: string
}

interface LanguageSwitcherProps {
  currentLanguage: string
  currentPath?: string
  className?: string
}

export function LanguageSwitcher({ currentLanguage, currentPath = '', className = '' }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const defaultLocale = getDefaultLocale()
  const supportedLocales = getSupportedLocales()

  // Dynamically generate languages list from configuration
  const languages: Language[] = supportedLocales.map(locale => ({
    code: locale,
    name: getLocaleDisplayName(locale),
    flag: getLocaleFlag(locale)
  }))

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]

  // Generate the target path for each language
  const getLanguagePath = (languageCode: string) => {
    if (!currentPath) {
      // If no current path, return the appropriate URL for the language
      return isDefaultLocale(languageCode) ? '/' : `/${languageCode}`
    }
    
    // Check if the current path already has a language prefix
    const hasLanguagePrefix = supportedLocales.some(locale => 
      currentPath.startsWith(`/${locale}/`) || currentPath === `/${locale}`
    )
    
    if (hasLanguagePrefix) {
      // Remove the current language prefix from the path
      const pathWithoutLanguage = currentPath.replace(/^\/[a-z]{2}/, '')
      
      // If we're on the root path, return appropriate URL
      if (pathWithoutLanguage === '' || pathWithoutLanguage === '/') {
        return isDefaultLocale(languageCode) ? '/' : `/${languageCode}`
      }
      
      // Otherwise, return the language + the current path
      return isDefaultLocale(languageCode) ? pathWithoutLanguage : `/${languageCode}${pathWithoutLanguage}`
    } else {
      // Current path doesn't have a language prefix (e.g., /about)
      // For default locale, keep the path as is
      // For other locales, add the language prefix
      return isDefaultLocale(languageCode) ? currentPath : `/${languageCode}${currentPath}`
    }
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <span className="text-lg">{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            {languages.map((language) => (
              <Link
                key={language.code}
                href={getLanguagePath(language.code)}
                className={`flex items-center space-x-3 px-4 py-2 text-sm hover:bg-gray-100 ${
                  language.code === currentLanguage ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
                {language.code === currentLanguage && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
