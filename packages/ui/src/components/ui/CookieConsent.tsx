'use client'

import React from 'react'
import { Button } from './button'
import { useCookie } from '../../contexts/CookieContext'

interface CookieConsentProps {
  className?: string
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  className = ''
}) => {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render on server
  if (!mounted) return null

  try {
    const { showBanner, acceptAll, decline } = useCookie()

    if (!showBanner) return null

    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-20 transition-all duration-300 ${className}`} data-cookie-banner suppressHydrationWarning>
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
              <Button variant="outline" size="sm" onClick={decline}>
                Decline
              </Button>
              <Button size="sm" onClick={acceptAll}>
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    // If context unavailable, use local state
    const [showBanner, setShowBanner] = React.useState(false)

    React.useEffect(() => {
      const cookiesAccepted = localStorage.getItem('cookiesAccepted')
      if (!cookiesAccepted) {
        setShowBanner(true)
      }
    }, [])

    const handleAcceptAll = () => {
      localStorage.setItem('cookiesAccepted', 'true')
      localStorage.setItem('cookiePreferences', JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
        functional: true
      }))
      setShowBanner(false)
    }

    const handleDecline = () => {
      localStorage.setItem('cookiesAccepted', 'true')
      localStorage.setItem('cookiePreferences', JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
        functional: false
      }))
      setShowBanner(false)
    }

    if (!showBanner) return null

    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-20 transition-all duration-300 ${className}`} data-cookie-banner suppressHydrationWarning>
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
}
