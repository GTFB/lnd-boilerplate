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
  preferences: CookiePreferences | null
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

export function CookieProvider({ children }: { children: ReactNode }) {
  const [showBanner, setShowBanner] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage after mounting
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

  // Don't render context on server
  if (!mounted) {
    return <>{children}</>
  }

  return (
    <CookieContext.Provider value={{
      showBanner,
      setShowBanner,
      acceptAll,
      decline,
      preferences
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
