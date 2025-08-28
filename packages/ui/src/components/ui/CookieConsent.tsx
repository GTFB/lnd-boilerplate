'use client'

import React, { useState, useEffect } from 'react'
import { Button } from './button'

interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  functional: boolean
}

interface CookieConsentProps {
  onAccept?: (preferences: CookiePreferences) => void
  onDecline?: () => void
  className?: string
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  onAccept,
  onDecline,
  className = ''
}) => {
  const [showBanner, setShowBanner] = useState(false)

    useEffect(() => {
    // Check localStorage for existing preferences
    const cookiesAccepted = localStorage.getItem('cookiesAccepted')
    
    // Show banner if cookies haven't been accepted yet
    if (!cookiesAccepted) {
      setShowBanner(true)
    }
  }, [])

    const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      functional: true
    }
    
    localStorage.setItem('cookiePreferences', JSON.stringify(allAccepted))
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
    onAccept?.(allAccepted)
  }

  const handleDecline = () => {
    // Only accept necessary cookies
    const minimalPreferences: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      functional: false
    }

    localStorage.setItem('cookiePreferences', JSON.stringify(minimalPreferences))
    localStorage.setItem('cookiesAccepted', 'true')
    setShowBanner(false)
    onDecline?.()
  }

  if (!showBanner) return null

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-50 ${className}`}>
            <div className="mx-auto max-w-[1480px]" style={{ padding: '0 0.25rem' }}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              We use cookies to enhance your experience
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies to analyze site traffic, personalize content, and provide social media features.
              By continuing to visit this site you agree to our use of cookies.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleDecline}>
              Decline
            </Button>
            <Button size="sm" onClick={handleAcceptAll}>
              Accept All
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
