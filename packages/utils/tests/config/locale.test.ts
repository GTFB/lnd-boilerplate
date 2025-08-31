import { describe, it, expect } from 'bun:test'
import { 
  getLocaleDisplayName,
  getLocaleFlag
} from '../../src/config/locale'

describe('Locale Utils', () => {
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
    it('should handle all supported locales consistently', () => {
      const testLocales = ['ru', 'en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'zh']
      
      testLocales.forEach(locale => {
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
