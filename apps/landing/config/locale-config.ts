// Build-time locale configuration
// This file reads from site.config.json at build time

import siteConfig from '../site.config.json'

export const localeConfig = {
  defaultLocale: siteConfig.features.i18n.defaultLocale,
  supportedLocales: siteConfig.features.i18n.locales
}

export function getDefaultLocale(): string {
  return localeConfig.defaultLocale
}

export function getSupportedLocales(): string[] {
  return localeConfig.supportedLocales
}

export function isDefaultLocale(locale: string): boolean {
  return locale === getDefaultLocale()
}
