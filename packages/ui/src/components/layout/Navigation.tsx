'use client'

import Link from 'next/link'
import { LanguageSwitcher } from '../ui/LanguageSwitcher'
import { useCurrentPath } from '../../hooks/useCurrentPath'
import { isDefaultLocale, getDefaultLocale } from '../../utils/siteConfig'

interface NavigationProps {
  currentLanguage: string
  className?: string
}

export function Navigation({ currentLanguage, className = '' }: NavigationProps) {
  const currentPath = useCurrentPath()

  // Determine the actual current language based on the pathname
  const getActualCurrentLanguage = () => {
    // If we're on a path without language prefix (e.g., /about), we're on the default locale
    const hasLanguagePrefix = /^\/[a-z]{2}(\/|$)/.test(currentPath)
    if (!hasLanguagePrefix) {
      return getDefaultLocale() // Dynamic default locale
    }
    // Extract language from path
    const match = currentPath.match(/^\/([a-z]{2})/)
    return match ? match[1] : currentLanguage
  }

  const actualCurrentLanguage = getActualCurrentLanguage()

  // Generate navigation links based on current language
  const getNavLink = (path: string) => {
    // Don't add prefix for default locale
    return isDefaultLocale(actualCurrentLanguage) ? path : `/${actualCurrentLanguage}${path}`
  }

  // Get navigation text based on current language
  const getNavText = (key: string) => {
    const navTexts: Record<string, Record<string, string>> = {
      home: {
        'ru': 'Главная',
        'en': 'Home',
        'es': 'Inicio',
        'fr': 'Accueil',
        'de': 'Startseite',
        'it': 'Home',
        'pt': 'Início',
        'ja': 'ホーム',
        'ko': '홈',
        'zh': '首页'
      },
      docs: {
        'ru': 'Документация',
        'en': 'Documentation',
        'es': 'Documentación',
        'fr': 'Documentation',
        'de': 'Dokumentation',
        'it': 'Documentazione',
        'pt': 'Documentação',
        'ja': 'ドキュメント',
        'ko': '문서',
        'zh': '文档'
      },
      about: {
        'ru': 'О проекте',
        'en': 'About',
        'es': 'Acerca de',
        'fr': 'À propos',
        'de': 'Über',
        'it': 'Chi siamo',
        'pt': 'Sobre',
        'ja': 'について',
        'ko': '소개',
        'zh': '关于'
      }
    }
    
    return navTexts[key]?.[actualCurrentLanguage] || key
  }

  return (
    <nav className={`bg-white shadow-sm border-b ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={getNavLink('/')} className="text-xl font-bold text-gray-900">
              LND Boilerplate
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href={getNavLink('/')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {getNavText('home')}
              </Link>
              <Link
                href={getNavLink('/docs')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {getNavText('docs')}
              </Link>
              <Link
                href={getNavLink('/about')}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {getNavText('about')}
              </Link>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher currentLanguage={actualCurrentLanguage} currentPath={currentPath} />
          </div>
        </div>
      </div>
    </nav>
  )
}
