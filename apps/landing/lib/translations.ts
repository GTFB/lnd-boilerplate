import enTranslations from '../public/locales/en.json'
import ruTranslations from '../public/locales/ru.json'
import esTranslations from '../public/locales/es.json'
import frTranslations from '../public/locales/fr.json'
import deTranslations from '../public/locales/de.json'

export type SupportedLocale = 'en' | 'ru' | 'es' | 'fr' | 'de'

const translations = {
  en: enTranslations,
  ru: ruTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations
}

export function getTranslation(locale: SupportedLocale, path: string): string | string[] {
  // Check if locale is supported
  if (!['en', 'ru', 'es', 'fr', 'de'].includes(locale)) {
    locale = 'en'
  }

  const keys = path.split('.')
  let result: unknown = translations[locale]

  for (const key of keys) {
    if (result && typeof result === 'object' && result !== null && key in result) {
      result = (result as Record<string, unknown>)[key]
    } else {
      // Fallback to English if translation not found
      result = translations.en
      for (const fallbackKey of keys) {
        if (result && typeof result === 'object' && result !== null && fallbackKey in result) {
          result = (result as Record<string, unknown>)[fallbackKey]
        } else {
          return path // Return the path if translation not found
        }
      }
    }
  }

  if (typeof result === 'string') return result
  if (Array.isArray(result)) return result
  return path
}

export function getSupportedLocales(): SupportedLocale[] {
  return ['en', 'ru', 'es', 'fr', 'de']
}

export function getDefaultLocale(): SupportedLocale {
  return 'en'
}
