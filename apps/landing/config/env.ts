// Environment configuration for language settings
// This file can be modified to change language settings without rebuilding

export const envConfig = {
  // Default locale for the application
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
  
  // Supported locales (comma-separated string)
  supportedLocales: process.env.NEXT_PUBLIC_SUPPORTED_LOCALES || 'en,es,fr,de,ru,it,pt,ja,ko,zh'
}

// Helper function to get supported locales as array
export function getSupportedLocalesArray(): string[] {
  return envConfig.supportedLocales.split(',').map(locale => locale.trim())
}
