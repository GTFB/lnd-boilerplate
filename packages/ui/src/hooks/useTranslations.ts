'use client'

import { useState, useEffect } from 'react'

export type Locale = 'en' | 'ru'

interface Translations {
  [key: string]: any
}

interface UseTranslationsReturn {
  t: (key: string, params?: Record<string, string>) => string
  locale: Locale
  setLocale: (locale: Locale) => void
  isLoading: boolean
}

export function useTranslations(): UseTranslationsReturn {
  const [locale, setLocale] = useState<Locale>('en')
  const [translations, setTranslations] = useState<Translations>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/locales/${locale}.json`)
        if (response.ok) {
          const data = await response.json()
          setTranslations(data)
        } else {
          console.warn(`Failed to load translations for locale: ${locale}`)
          // Fallback to English
          if (locale !== 'en') {
            const enResponse = await fetch('/locales/en.json')
            if (enResponse.ok) {
              const enData = await enResponse.json()
              setTranslations(enData)
            }
          }
        }
      } catch (error) {
        console.error('Error loading translations:', error)
        // Fallback to empty translations
        setTranslations({})
      } finally {
        setIsLoading(false)
      }
    }

    loadTranslations()
  }, [locale])

  const t = (key: string, params?: Record<string, string>): string => {
    if (isLoading || !translations) {
      return key
    }

    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key
      }
    }

    if (typeof value !== 'string') {
      return key
    }

    // Replace parameters if provided
    if (params) {
      return Object.entries(params).reduce((str, [param, replacement]) => {
        return str.replace(new RegExp(`{${param}}`, 'g'), replacement)
      }, value)
    }

    return value
  }

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale)
    }
  }

  // Load saved locale from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && ['en', 'ru'].includes(savedLocale)) {
        setLocale(savedLocale)
      }
    }
  }, [])

  return {
    t,
    locale,
    setLocale: handleSetLocale,
    isLoading
  }
}

// Hook for getting current locale without translations
export function useLocale(): Locale {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale
      if (savedLocale && ['en', 'ru'].includes(savedLocale)) {
        setLocale(savedLocale)
      }
    }
  }, [])

  return locale
}
