'use client'

import { usePathname } from 'next/navigation'
import { useMemo, useEffect } from 'react'

export function useLocalizedLink() {
  const pathname = usePathname()

  const getCurrentLocale = () => {
    const pathnameLocale = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1]
    return pathnameLocale || 'en'
  }

  const getStoredLocale = () => {
    if (typeof window === 'undefined') return 'en'
    try {
      return localStorage.getItem('selectedLanguage') || 'en'
    } catch {
      return 'en'
    }
  }

  const createLocalizedHref = (path: string) => {
    const currentLocale = getCurrentLocale()
    const storedLocale = getStoredLocale()
    
    // Use stored locale if no locale in current path
    const localeToUse = currentLocale === 'en' && storedLocale !== 'en' ? storedLocale : currentLocale
    
    // If it's English (default), don't add locale prefix
    if (localeToUse === 'en') {
      return path
    }
    
    // For other languages, add the locale prefix
    return `/${localeToUse}${path}`
  }

  // Check if we need to redirect based on stored language
  const shouldRedirect = () => {
    // Don't redirect during SSR
    if (typeof window === 'undefined') return null
    
    // Don't redirect if we're still in the process of hydration
    if (typeof document !== 'undefined' && !document.body) return null
    
    const pathnameLocale = pathname.match(/^\/([a-z]{2})(\/|$)/)?.[1]
    const storedLocale = getStoredLocale()
    
    // If no locale in path and we have a stored non-English locale
    if (!pathnameLocale && storedLocale !== 'en') {
      return storedLocale
    }
    
    return null
  }

  return {
    getCurrentLocale,
    getStoredLocale,
    createLocalizedHref,
    shouldRedirect
  }
}
