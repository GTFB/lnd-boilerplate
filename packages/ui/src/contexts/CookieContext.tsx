'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  functional: boolean
}

interface CookieContextType {
  showBanner: boolean
  setShowBanner: (show: boolean) => void
  acceptAll: () => void
  decline: () => void
  savePreferences: (preferences: CookiePreferences) => void
  preferences: CookiePreferences | null
  hasConsent: (type: keyof CookiePreferences) => boolean
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

export function CookieProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Проверяем localStorage после монтирования
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    const savedPreferences = localStorage.getItem('cookiePreferences')
    
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences))
    }
    
    if (!cookiesAccepted) {
      setShowBanner(true)
    }
  }, [])

  const acceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      functional: true
    }
    
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    localStorage.setItem('cookiesAccepted', 'true')
    setPreferences(allAccepted)
    setShowBanner(false)
  }

  const decline = () => {
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      functional: false
    }

    localStorage.setItem('cookiePreferences', JSON.stringify(minimalPreferences))
    localStorage.setItem('cookiesAccepted', 'true')
    setPreferences(minimalPreferences)
    setShowBanner(false)
  }

  const savePreferences = (newPreferences: CookiePreferences) => {
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences))
    localStorage.setItem('cookiesAccepted', 'true')
    setPreferences(newPreferences)
    setShowBanner(false)
  }

  const hasConsent = (type: keyof CookiePreferences) => {
    if (!preferences) {
      return false;
    }
    return preferences[type];
  };

  // Не рендерим контекст на сервере
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <CookieContext.Provider value={{
      showBanner,
      setShowBanner,
      acceptAll,
      decline,
      savePreferences,
      preferences,
      hasConsent
    }}>
      {children}
    </CookieContext.Provider>
  )
}

export function useCookie() {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider')
  }
  return context
}
