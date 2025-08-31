export type SupportedLocale = 
  | 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ar' | 'bn' | 'ru' | 'pt' | 'ur'
  | 'id' | 'de' | 'ja' | 'pcm' | 'mr' | 'te' | 'tr' | 'ta' | 'pa' | 'yue'
  | 'vi' | 'tl' | 'wuu' | 'ko' | 'fa' | 'ha' | 'arz' | 'jv' | 'it' | 'gu'
  | 'th' | 'bho' | 'kn' | 'ms' | 'pl' | 'or' | 'mai' | 'my' | 'hak' | 'uk'
  | 'su' | 'sw' | 'ro' | 'uz' | 'am' | 'ff' | 'om' | 'ig' | 'mg' | 'cs'
  | 'nl' | 'si' | 'az' | 'yo' | 'ne' | 'as' | 'ku' | 'hu' | 'el' | 'ctg'
  | 'kk' | 'km' | 'za' | 'so' | 'mad' | 'sv' | 'decc' | 'ny' | 'zu' | 'rw'
  | 'be' | 'tg' | 'bg' | 'ca' | 'ht' | 'tk' | 'nap' | 'sr' | 'nan' | 'af'
  | 'ky' | 'sn' | 'tt' | 'fi' | 'sk' | 'no' | 'da' | 'sat' | 'he' | 'hmn'
  | 'mos' | 'ug' | 'hr' | 'kok' | 'ti' | 'lua' | 'ba' | 'ka' | 'lt' | 'hy';

export function getSupportedLocales(): SupportedLocale[] {
  return [
    'en', 'zh', 'hi', 'es', 'fr', 'ar', 'bn', 'ru', 'pt', 'ur',
    'id', 'de', 'ja', 'pcm', 'mr', 'te', 'tr', 'ta', 'pa', 'yue',
    'vi', 'tl', 'wuu', 'ko', 'fa', 'ha', 'arz', 'jv', 'it', 'gu',
    'th', 'bho', 'kn', 'ms', 'pl', 'or', 'mai', 'my', 'hak', 'uk',
    'su', 'sw', 'ro', 'uz', 'am', 'ff', 'om', 'ig', 'mg', 'cs',
    'nl', 'si', 'az', 'yo', 'ne', 'as', 'ku', 'hu', 'el', 'ctg',
    'kk', 'km', 'za', 'so', 'mad', 'sv', 'decc', 'ny', 'zu', 'rw',
    'be', 'tg', 'bg', 'ca', 'ht', 'tk', 'nap', 'sr', 'nan', 'af',
    'ky', 'sn', 'tt', 'fi', 'sk', 'no', 'da', 'sat', 'he', 'hmn',
    'mos', 'ug', 'hr', 'kok', 'ti', 'lua', 'ba', 'ka', 'lt', 'hy'
  ];
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
