export type SupportedLocale = 'en' | 'ru' | 'es' | 'fr' | 'de';

export function getSupportedLocales(): SupportedLocale[] {
  return ['en', 'ru', 'es', 'fr', 'de'];
}

export function getDefaultLocale(): SupportedLocale {
  // Use the proper utility from config
  const { getDefaultLocaleClient } = require('../config');
  return getDefaultLocaleClient() as SupportedLocale;
}

// Cache for loaded translations
const translationCache: Record<string, any> = {};

// Import translations statically for Next.js
import enTranslations from '../../../../apps/landing/public/locales/en.json';
import ruTranslations from '../../../../apps/landing/public/locales/ru.json';
import esTranslations from '../../../../apps/landing/public/locales/es.json';
import frTranslations from '../../../../apps/landing/public/locales/fr.json';
import deTranslations from '../../../../apps/landing/public/locales/de.json';

const translations = {
  en: enTranslations,
  ru: ruTranslations,
  es: esTranslations,
  fr: frTranslations,
  de: deTranslations
};

export function getTranslationSync(locale: SupportedLocale, path: string): string {
  const localeTranslations = translations[locale] || translations.en;
  
  // Navigate through the nested object using the path
  const keys = path.split('.');
  let result: any = localeTranslations;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return path; // Return the path if translation not found
    }
  }
  
  return typeof result === 'string' ? result : path;
}

// Async version for compatibility
export async function getTranslation(locale: SupportedLocale, path: string): Promise<string> {
  return getTranslationSync(locale, path);
}
