'use client'

import React from 'react'
import { Button } from './button'
import { Checkbox } from './checkbox'
import { useCookie } from '../../contexts/CookieContext'

interface CookieConsentProps {
  className?: string
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  className = ''
}) => {
  const [mounted, setMounted] = React.useState(false)
  const [showSettings, setShowSettings] = React.useState(false)
  const [localPreferences, setLocalPreferences] = React.useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    functional: false
  })

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Не рендерим на сервере
  if (!mounted) return null

  try {
    const { showBanner, acceptAll, decline, savePreferences } = useCookie()

    if (!showBanner) return null

    const handleSavePreferences = () => {
      savePreferences(localPreferences)
    }

    const handlePreferenceChange = (key: keyof typeof localPreferences, value: boolean) => {
      setLocalPreferences(prev => ({ ...prev, [key]: value }))
    }

    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-20 transition-all duration-300 ${className}`} data-cookie-banner suppressHydrationWarning>
        <div className="mx-auto max-w-[1480px] px-4">
          {!showSettings ? (
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
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={decline}>
                  Decline
                </Button>
                <Button size="sm" onClick={acceptAll}>
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Cookie Settings
                </h3>
                <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                  Back
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.necessary}
                        onCheckedChange={(checked) => handlePreferenceChange('necessary', checked)}
                        disabled
                      />
                      <span className="text-sm font-medium text-foreground">Necessary</span>
                      <span className="text-xs text-muted-foreground">(Always active)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Essential cookies for website functionality
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.analytics}
                        onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Analytics</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Help us understand how visitors interact with our website
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.marketing}
                        onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Marketing</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Used to deliver personalized advertisements
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.preferences}
                        onCheckedChange={(checked) => handlePreferenceChange('preferences', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Preferences</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Remember your settings and preferences
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.functional}
                        onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Functional</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Enable enhanced functionality and personalization
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={decline}>
                  Decline All
                </Button>
                <Button size="sm" onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  } catch (error) {
    // Если контекст недоступен, используем локальное состояние
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

    const handleSavePreferences = () => {
      localStorage.setItem('cookiesAccepted', 'true')
      localStorage.setItem('cookiePreferences', JSON.stringify(localPreferences))
      setShowBanner(false)
    }

    if (!showBanner) return null

    return (
      <div className={`fixed bottom-0 left-0 right-0 bg-background border-t p-4 z-20 transition-all duration-300 ${className}`} data-cookie-banner suppressHydrationWarning>
        <div className="mx-auto max-w-[1480px] px-4">
          {!showSettings ? (
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
                <Button variant="outline" size="sm" onClick={() => setShowSettings(true)}>
                  Settings
                </Button>
                <Button variant="outline" size="sm" onClick={handleDecline}>
                  Decline
                </Button>
                <Button size="sm" onClick={handleAcceptAll}>
                  Accept All
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">
                  Cookie Settings
                </h3>
                <Button variant="outline" size="sm" onClick={() => setShowSettings(false)}>
                  Back
                </Button>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.necessary}
                        onCheckedChange={(checked) => handlePreferenceChange('necessary', checked)}
                        disabled
                      />
                      <span className="text-sm font-medium text-foreground">Necessary</span>
                      <span className="text-xs text-muted-foreground">(Always active)</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Essential cookies for website functionality
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.analytics}
                        onCheckedChange={(checked) => handlePreferenceChange('analytics', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Analytics</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Help us understand how visitors interact with our website
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.marketing}
                        onCheckedChange={(checked) => handlePreferenceChange('marketing', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Marketing</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Used to deliver personalized advertisements
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.preferences}
                        onCheckedChange={(checked) => handlePreferenceChange('preferences', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Preferences</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Remember your settings and preferences
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={localPreferences.functional}
                        onCheckedChange={(checked) => handlePreferenceChange('functional', checked)}
                      />
                      <span className="text-sm font-medium text-foreground">Functional</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-6">
                      Enable enhanced functionality and personalization
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" onClick={handleDecline}>
                  Decline All
                </Button>
                <Button size="sm" onClick={handleSavePreferences}>
                  Save Preferences
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
