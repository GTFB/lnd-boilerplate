'use client'

import React from 'react';
import { MainHeader } from '../components/common/MainHeader';
import { SupportedLocale, getSupportedLocales } from '@lnd/utils/i18n';
import { useRouter, usePathname } from 'next/navigation';

interface SingleColumnLayoutProps {
  locale: SupportedLocale;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function SingleColumnLayout({ 
  locale, 
  title, 
  subtitle, 
  description, 
  children, 
  className = '' 
}: SingleColumnLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const supportedLocales = getSupportedLocales();
  
  const handleLocaleChange = (newLocale: string) => {
    // Get current path without locale prefix
    let currentPath = pathname;
    
    // Remove current locale prefix if it exists
    if (locale !== 'en') { // Assuming 'en' is default
      currentPath = pathname.replace(`/${locale}`, '') || '/';
    }
    
    // Navigate to new locale
    if (newLocale === 'en') {
      // For default locale, don't add prefix
      router.push(currentPath);
    } else {
      // For non-default locale, add prefix
      router.push(`/${newLocale}${currentPath}`);
    }
  };

  const t = (key: string) => {
    // Simple translation mapping
    const translations: Record<string, Record<string, string>> = {
      en: {
        'common.search': 'Search',
        'common.selectLanguage': 'Select Language',
        'navigation.home': 'Home',
        'navigation.docs': 'Documentation',
        'navigation.about': 'About',
        'navigation.blog': 'Blog'
      },
      ru: {
        'common.search': 'Поиск',
        'common.selectLanguage': 'Выбрать язык',
        'navigation.home': 'Главная',
        'navigation.docs': 'Документация',
        'navigation.about': 'О нас',
        'navigation.blog': 'Блог'
      },
      es: {
        'common.search': 'Buscar',
        'common.selectLanguage': 'Seleccionar idioma',
        'navigation.home': 'Inicio',
        'navigation.docs': 'Documentación',
        'navigation.about': 'Acerca de',
        'navigation.blog': 'Blog'
      },
      fr: {
        'common.search': 'Rechercher',
        'common.selectLanguage': 'Sélectionner la langue',
        'navigation.home': 'Accueil',
        'navigation.docs': 'Documentation',
        'navigation.about': 'À propos',
        'navigation.blog': 'Blog'
      },
      de: {
        'common.search': 'Suchen',
        'common.selectLanguage': 'Sprache auswählen',
        'navigation.home': 'Startseite',
        'navigation.docs': 'Dokumentation',
        'navigation.about': 'Über uns',
        'navigation.blog': 'Blog'
      }
    };
    
    return translations[locale]?.[key] || key;
  };

  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <MainHeader 
        currentLocale={locale}
        availableLocales={supportedLocales}
        onLocaleChange={handleLocaleChange}
        t={t}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {title && (
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
          )}
          <div className="space-y-4">
            {description && (
              <p className="text-lg text-gray-700">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
