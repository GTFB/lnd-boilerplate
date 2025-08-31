import { describe, it, expect } from 'bun:test'
import { 
  getDefaultLocale, 
  getSupportedLocales, 
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '../../src/config/locale-client'

describe('Client-side Locale Utils', () => {
  describe('getDefaultLocale', () => {
    it('should return fallback default locale', () => {
      const defaultLocale = getDefaultLocale()
      expect(typeof defaultLocale).toBe('string')
      expect(defaultLocale.length).toBeGreaterThan(0)
    })
  })

  describe('getSupportedLocales', () => {
    it('should return fallback supported locales', () => {
      const supportedLocales = getSupportedLocales()
      expect(Array.isArray(supportedLocales)).toBe(true)
      expect(supportedLocales).toContain('ru')
      expect(supportedLocales).toContain('en')
      expect(supportedLocales).toContain('es')
      expect(supportedLocales).toContain('fr')
      expect(supportedLocales).toContain('de')
    })
  })

  describe('isDefaultLocale', () => {
    it('should return true for default locale', () => {
      const defaultLocale = getDefaultLocale()
      const result = isDefaultLocale(defaultLocale)
      expect(result).toBe(true)
    })

    it('should return false for non-default locale', () => {
      const defaultLocale = getDefaultLocale()
      const nonDefaultLocale = defaultLocale === 'ru' ? 'en' : 'ru'
      const result = isDefaultLocale(nonDefaultLocale)
      expect(result).toBe(false)
    })

    it('should handle case sensitivity', () => {
      const defaultLocale = getDefaultLocale()
      const upperCaseLocale = defaultLocale.toUpperCase()
      const result = isDefaultLocale(upperCaseLocale)
      expect(result).toBe(false)
    })
  })

  describe('getLocaleDisplayName', () => {
    it('should return correct display names for known locales', () => {
      expect(getLocaleDisplayName('ru')).toBe('Русский')
      expect(getLocaleDisplayName('en')).toBe('English')
      expect(getLocaleDisplayName('es')).toBe('Español')
      expect(getLocaleDisplayName('fr')).toBe('Français')
      expect(getLocaleDisplayName('de')).toBe('Deutsch')
      expect(getLocaleDisplayName('it')).toBe('Italiano')
      expect(getLocaleDisplayName('pt')).toBe('Português')
      expect(getLocaleDisplayName('ja')).toBe('日本語')
      expect(getLocaleDisplayName('ko')).toBe('한국어')
      expect(getLocaleDisplayName('zh')).toBe('中文')
    })

    it('should return locale code for unknown locales', () => {
      expect(getLocaleDisplayName('unknown')).toBe('unknown')
      expect(getLocaleDisplayName('xx')).toBe('xx')
    })

    it('should handle empty string', () => {
      expect(getLocaleDisplayName('')).toBe('')
    })
  })

  describe('getLocaleFlag', () => {
    it('should return correct flags for known locales', () => {
      expect(getLocaleFlag('ru')).toBe('🇷🇺')
      expect(getLocaleFlag('en')).toBe('🇺🇸')
      expect(getLocaleFlag('es')).toBe('🇪🇸')
      expect(getLocaleFlag('fr')).toBe('🇫🇷')
      expect(getLocaleFlag('de')).toBe('🇩🇪')
      expect(getLocaleFlag('it')).toBe('🇮🇹')
      expect(getLocaleFlag('pt')).toBe('🇵🇹')
      expect(getLocaleFlag('ja')).toBe('🇯🇵')
      expect(getLocaleFlag('ko')).toBe('🇰🇷')
      expect(getLocaleFlag('zh')).toBe('🇨🇳')
    })

    it('should return default flag for unknown locales', () => {
      expect(getLocaleFlag('unknown')).toBe('🌐')
      expect(getLocaleFlag('xx')).toBe('🌐')
    })

    it('should handle empty string', () => {
      expect(getLocaleFlag('')).toBe('🌐')
    })
  })

  describe('Integration', () => {
    it('should work together for a complete locale setup', () => {
      const defaultLocale = getDefaultLocale()
      const supportedLocales = getSupportedLocales()
      
      // Default locale should be in supported locales
      expect(supportedLocales).toContain(defaultLocale)
      
      // Default locale should be identified as default
      expect(isDefaultLocale(defaultLocale)).toBe(true)
      
      // Should have display name and flag
      expect(getLocaleDisplayName(defaultLocale)).toBeTruthy()
      expect(getLocaleFlag(defaultLocale)).toBeTruthy()
    })

    it('should handle all supported locales', () => {
      const supportedLocales = getSupportedLocales()
      
      supportedLocales.forEach(locale => {
        expect(getLocaleDisplayName(locale)).toBeTruthy()
        expect(getLocaleFlag(locale)).toBeTruthy()
      })
    })

    it('should handle edge cases gracefully', () => {
      expect(() => getLocaleDisplayName('')).not.toThrow()
      expect(() => getLocaleFlag('')).not.toThrow()
      expect(() => isDefaultLocale('')).not.toThrow()
    })

    it('should handle empty string specifically', () => {
      expect(getLocaleDisplayName('')).toBe('')
      expect(getLocaleFlag('')).toBe('🌐')
      expect(isDefaultLocale('')).toBe(false)
    })
  })
})
