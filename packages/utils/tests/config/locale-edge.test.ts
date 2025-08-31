import { describe, it, expect } from 'bun:test'
import { 
  getDefaultLocale, 
  getSupportedLocales, 
  isDefaultLocale,
  getLocaleDisplayName,
  getLocaleFlag
} from '../../src/config/locale-edge'

describe('Edge Runtime Locale Utils', () => {
  describe('getDefaultLocale', () => {
    it('should return fallback default locale', () => {
      const defaultLocale = getDefaultLocale()
      expect(defaultLocale).toBe('ru')
      expect(typeof defaultLocale).toBe('string')
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
      const result = isDefaultLocale('ru')
      expect(result).toBe(true)
    })

    it('should return false for non-default locale', () => {
      const result = isDefaultLocale('en')
      expect(result).toBe(false)
    })

    it('should handle case sensitivity', () => {
      const result = isDefaultLocale('RU')
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
        expect(typeof getLocaleDisplayName(locale)).toBe('string')
        expect(typeof getLocaleFlag(locale)).toBe('string')
      })
    })

    it('should handle edge cases gracefully', () => {
      const edgeCases = ['unknown', 'XX', '123', 'test-locale']
      
      edgeCases.forEach(locale => {
        expect(getLocaleDisplayName(locale)).toBeTruthy()
        expect(getLocaleFlag(locale)).toBeTruthy()
        expect(typeof getLocaleDisplayName(locale)).toBe('string')
        expect(typeof getLocaleFlag(locale)).toBe('string')
      })
    })

    it('should handle empty string specifically', () => {
      expect(getLocaleDisplayName('')).toBe('')
      expect(getLocaleFlag('')).toBe('🌐')
      expect(typeof getLocaleDisplayName('')).toBe('string')
      expect(typeof getLocaleFlag('')).toBe('string')
    })
  })
})
