'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  Cookie, 
  X, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  Info
} from 'lucide-react'

export interface CookieCategory {
  id: string
  title: string
  description: string
  required: boolean
  defaultEnabled: boolean
}

export interface CookieConsentProps {
  title?: string
  description?: string
  categories?: CookieCategory[]
  acceptAllText?: string
  acceptSelectedText?: string
  rejectAllText?: string
  settingsText?: string
  learnMoreText?: string
  learnMoreUrl?: string
  showSettings?: boolean
  position?: 'bottom' | 'top' | 'floating'
  className?: string
  onAccept?: (categories: string[]) => void
  onReject?: () => void
  onSettingsChange?: (categories: Record<string, boolean>) => void
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  title = 'We use cookies',
  description = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
  categories = [],
  acceptAllText = 'Accept All',
  acceptSelectedText = 'Accept Selected',
  rejectAllText = 'Reject All',
  settingsText = 'Settings',
  learnMoreText = 'Learn More',
  learnMoreUrl = '/cookies',
  showSettings = true,
  position = 'bottom',
  className = '',
  onAccept,
  onReject,
  onSettingsChange
}) => {
  const { currentSystem } = useDesignSystem()
  const [isVisible, setIsVisible] = useState(false)
  const [showSettingsPanel, setShowSettingsPanel] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({})

  const defaultCategories: CookieCategory[] = [
    {
      id: 'essential',
      title: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off.',
      required: true,
      defaultEnabled: true
    },
    {
      id: 'analytics',
      title: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      required: false,
      defaultEnabled: true
    },
    {
      id: 'marketing',
      title: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites for marketing purposes.',
      required: false,
      defaultEnabled: false
    },
    {
      id: 'preferences',
      title: 'Preference Cookies',
      description: 'These cookies allow the website to remember choices you make.',
      required: false,
      defaultEnabled: false
    }
  ]

  const cookieCategories = categories.length > 0 ? categories : defaultCategories

  useEffect(() => {
    // Check if user has already made a choice
    const hasConsent = localStorage.getItem('cookie-consent')
    if (!hasConsent) {
      setIsVisible(true)
      // Initialize selected categories with defaults
      const initialSelection: Record<string, boolean> = {}
      cookieCategories.forEach(category => {
        initialSelection[category.id] = category.defaultEnabled
      })
      setSelectedCategories(initialSelection)
    }
  }, [cookieCategories])

  const handleAcceptAll = () => {
    const allCategories = cookieCategories.map(cat => cat.id)
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      categories: allCategories,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
    onAccept?.(allCategories)
  }

  const handleAcceptSelected = () => {
    const acceptedCategories = Object.entries(selectedCategories)
      .filter(([_, enabled]) => enabled)
      .map(([id, _]) => id)
    
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: true,
      categories: acceptedCategories,
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
    onAccept?.(acceptedCategories)
  }

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      accepted: false,
      categories: [],
      timestamp: new Date().toISOString()
    }))
    setIsVisible(false)
    onReject?.()
  }

  const handleCategoryToggle = (categoryId: string, enabled: boolean) => {
    const newSelection = { ...selectedCategories, [categoryId]: enabled }
    setSelectedCategories(newSelection)
    onSettingsChange?.(newSelection)
  }

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'top-0 left-0 right-0 border-b'
      case 'floating':
        return 'bottom-4 right-4 max-w-sm'
      default:
        return 'bottom-0 left-0 right-0 border-t'
    }
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop for floating position */}
      {position === 'floating' && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsVisible(false)}
        />
      )}

      {/* Main Cookie Consent Banner */}
      <div 
        className={`fixed ${getPositionClasses()} bg-background z-50 shadow-lg ${className}`}
        role="banner"
        aria-label="Cookie consent"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Content */}
            <div className="flex-1 space-y-3">
              <div className="flex items-start space-x-3">
                <Cookie className="h-6 w-6 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>

              {/* Category badges */}
              <div className="flex flex-wrap gap-2">
                {cookieCategories.map((category) => (
                  <Badge 
                    key={category.id}
                    variant={category.required ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {category.required && <CheckCircle className="h-3 w-3 mr-1" />}
                    {category.title}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              {showSettings && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSettingsPanel(true)}
                  className="w-full sm:w-auto"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {settingsText}
                </Button>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="w-full sm:w-auto"
              >
                {rejectAllText}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptSelected}
                className="w-full sm:w-auto"
              >
                {acceptSelectedText}
              </Button>
              
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="w-full sm:w-auto"
              >
                {acceptAllText}
              </Button>
            </div>
          </div>

          {/* Learn More Link */}
          {learnMoreUrl && (
            <div className="mt-3 pt-3 border-t">
              <a
                href={learnMoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline inline-flex items-center"
              >
                <Info className="h-4 w-4 mr-1" />
                {learnMoreText}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettingsPanel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Cookie Settings</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettingsPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Description */}
              <p className="text-muted-foreground mb-6">
                Manage your cookie preferences. Essential cookies are always enabled as they are necessary for the website to function properly.
              </p>

              {/* Categories */}
              <div className="space-y-4">
                {cookieCategories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium">{category.title}</h3>
                          {category.required && (
                            <Badge variant="default" className="text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {category.description}
                        </p>
                      </div>
                      
                      {!category.required && (
                        <label className="flex items-center space-x-2 ml-4">
                          <input
                            type="checkbox"
                            checked={selectedCategories[category.id] || false}
                            onChange={(e) => handleCategoryToggle(category.id, e.target.checked)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <span className="text-sm">Enable</span>
                        </label>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowSettingsPanel(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleAcceptSelected()
                    setShowSettingsPanel(false)
                  }}
                >
                  Save Preferences
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
