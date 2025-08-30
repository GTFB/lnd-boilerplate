'use client'

import { useEffect } from 'react'
import { useCookie } from '../contexts/CookieContext'

export function useAnalytics() {
  const { hasConsent } = useCookie()

  useEffect(() => {
    // Проверяем согласие на аналитику
    if (hasConsent('analytics')) {
      // Загружаем аналитику только при согласии
      loadAnalytics()
    }
  }, [hasConsent])

  const loadAnalytics = () => {
    // Здесь можно загрузить Google Analytics, Plausible или другую аналитику
    console.log('Analytics loaded with user consent')
    
    // Пример загрузки Google Analytics
    // if (typeof window !== 'undefined' && window.gtag) {
    //   window.gtag('consent', 'update', {
    //     'analytics_storage': 'granted'
    //   })
    // }
  }

  return {
    isEnabled: hasConsent('analytics')
  }
}
