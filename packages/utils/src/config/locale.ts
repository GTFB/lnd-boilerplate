import { getSiteConfig } from './site-config.utils'

export function getDefaultLocale(): string {
  // Clear cache to ensure fresh config
  getSiteConfig().clearCache()
  
  const config = getSiteConfig().load()
  const defaultLocale = config.features?.i18n?.defaultLocale
  
  // Debug: log what we're reading
  console.log('getDefaultLocale: config.features?.i18n =', config.features?.i18n)
  console.log('getDefaultLocale: returning =', defaultLocale)
  
  if (!defaultLocale) {
    throw new Error('defaultLocale is not configured in site.config.json')
  }
  
  return defaultLocale
}

export function getSupportedLocales(): string[] {
  const config = getSiteConfig().load()
  const locales = config.features?.i18n?.locales
  
  if (!locales || locales.length === 0) {
    throw new Error('locales are not configured in site.config.json')
  }
  
  return locales
}

export function isDefaultLocale(locale: string): boolean {
  return locale === getDefaultLocale()
}

export function getLocaleDisplayName(locale: string): string {
  const localeNames: Record<string, string> = {
    'ru': 'Русский',
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'it': 'Italiano',
    'pt': 'Português',
    'ja': '日本語',
    'ko': '한국어',
    'zh': '中文'
  }
  return localeNames[locale] || locale
}

export function getLocaleFlag(locale: string): string {
  const localeFlags: Record<string, string> = {
    'ru': '🇷🇺',
    'en': '🇺🇸',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'ja': '🇯🇵',
    'ko': '🇰🇷',
    'zh': '🇨🇳'
  }
  return localeFlags[locale] || '🌐'
}
