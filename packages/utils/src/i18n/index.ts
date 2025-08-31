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

// Dynamic translation loading function
function loadTranslationFile(locale: SupportedLocale): any {
  // Check cache first
  if (translationCache[locale]) {
    return translationCache[locale];
  }

  try {
    // Try to load the translation file dynamically
    const translation = require(`../../../../apps/landing/public/locales/${locale}.json`);
    translationCache[locale] = translation;
    return translation;
  } catch (error) {
    // If file doesn't exist, try to load default locale
    const defaultLocale = getDefaultLocale();
    if (locale !== defaultLocale) {
      console.warn(`Warning: ${locale}.json translation file not found, falling back to ${defaultLocale}`);
      return loadTranslationFile(defaultLocale);
    }
    
    // If even default locale file doesn't exist, return empty object
    console.warn(`Warning: ${locale}.json translation file not found, using empty object`);
    translationCache[locale] = {};
    return {};
  }
}

export function getTranslationSync(locale: SupportedLocale, path: string): string {
  const localeTranslations = loadTranslationFile(locale);
  
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
