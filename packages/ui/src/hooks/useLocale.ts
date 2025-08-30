'use client'

import { useState, useEffect } from 'react'

export interface LocaleConfig {
  defaultLocale: string
  locales: string[]
  fallbackLocale?: string
}

export interface UseLocaleOptions {
  config?: LocaleConfig
  storageKey?: string
}

export function useLocale(options: UseLocaleOptions = {}) {
  const {
    config = {
      defaultLocale: 'en',
      locales: ['en', 'ru'],
      fallbackLocale: 'en'
    },
    storageKey = 'locale'
  } = options

  const [locale, setLocale] = useState<string>(config.defaultLocale)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load locale from localStorage or use default
    const savedLocale = localStorage.getItem(storageKey)
    if (savedLocale && config.locales.includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      setLocale(config.defaultLocale)
    }
    setIsLoading(false)
  }, [config.defaultLocale, config.locales, storageKey])

  const changeLocale = (newLocale: string) => {
    if (config.locales.includes(newLocale)) {
      setLocale(newLocale)
      localStorage.setItem(storageKey, newLocale)
      
      // Update document attributes
      document.documentElement.lang = newLocale
      document.documentElement.setAttribute('data-locale', newLocale)
    }
  }

  const getLocale = () => locale
  const getAvailableLocales = () => config.locales
  const isLocaleSupported = (localeToCheck: string) => config.locales.includes(localeToCheck)

  return {
    locale,
    changeLocale,
    getLocale,
    getAvailableLocales,
    isLocaleSupported,
    isLoading,
    config
  }
}
