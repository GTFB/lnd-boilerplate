// Edge Runtime compatible locale utilities
// These functions work with build-time configuration

// Import build-time config (this will be resolved at build time)
import { getDefaultLocale as getDefaultLocaleFromConfig, getSupportedLocales as getSupportedLocalesFromConfig } from '../../../../apps/landing/config/locale-config'

export function getDefaultLocale(): string {
  // Use build-time config or fallback to environment variable
  return getDefaultLocaleFromConfig() || process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en'
}

export function getSupportedLocales(): string[] {
  // Use build-time config or fallback to environment variable
  const configLocales = getSupportedLocalesFromConfig()
  if (configLocales && configLocales.length > 0) {
    return configLocales
  }
  
  const locales = process.env.NEXT_PUBLIC_SUPPORTED_LOCALES
  if (locales) {
    return locales.split(',').map(locale => locale.trim())
  }
  return ['en', 'es', 'fr', 'de', 'ru', 'it', 'pt', 'ja', 'ko', 'zh']
}

export function isDefaultLocale(locale: string): boolean {
  return locale === getDefaultLocale()
}

export function getLocaleDisplayName(locale: string): string {
  const localeNames: Record<string, string> = {
    'en': 'English',
    'es': 'Español',
    'fr': 'Français',
    'de': 'Deutsch',
    'ru': 'Русский',
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
    'en': '🇺🇸',
    'es': '🇪🇸',
    'fr': '🇫🇷',
    'de': '🇩🇪',
    'ru': '🇷🇺',
    'it': '🇮🇹',
    'pt': '🇵🇹',
    'ja': '🇯🇵',
    'ko': '🇰🇷',
    'zh': '🇨🇳'
  }
  return localeFlags[locale] || '🌐'
}
