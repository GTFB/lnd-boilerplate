'use client'

import { useEffect } from 'react'
import { useCookie } from '../contexts/CookieContext'

export function useMarketing() {
  const { hasConsent } = useCookie()

  useEffect(() => {
    // Проверяем согласие на маркетинговые куки
    if (hasConsent('marketing')) {
      // Загружаем маркетинговые скрипты только при согласии
      loadMarketingScripts()
    }
  }, [hasConsent])

  const loadMarketingScripts = () => {
    // Здесь можно загрузить Facebook Pixel, Google Ads и другие маркетинговые скрипты
    console.log('Marketing scripts loaded with user consent')
    
    // Пример загрузки Facebook Pixel
    // if (typeof window !== 'undefined' && window.fbq) {
    //   window.fbq('consent', 'grant')
    // }
  }

  return {
    isEnabled: hasConsent('marketing')
  }
}
