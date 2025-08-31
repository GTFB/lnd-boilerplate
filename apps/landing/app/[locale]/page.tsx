import { getTranslationSync, SupportedLocale } from '@lnd/utils/i18n'
import { MainHeader } from '@lnd/ui/components/common/MainHeader'
import { MainFooter } from '@lnd/ui/components/common/MainFooter'
import { getValidatedSiteConfig } from '@lnd/utils/config/config-validator'
import configJson from '../../site.config.json'
import { ArrowRight, Code, Zap, Globe, Shield, Users, Rocket } from 'lucide-react'
import { Button } from '@lnd/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { HomePageClient } from './HomePageClient'

interface PageProps {
  params: {
    locale: SupportedLocale
  }
}

export default function HomePage({ params }: PageProps) {
  const { locale } = params
  
  const t = (path: string) => getTranslationSync(locale, path)

  const features = [
    {
      icon: 'Code',
      title: t('home.features.typescript.title'),
      description: t('home.features.typescript.description'),
      color: 'text-blue-600'
    },
    {
      icon: 'Zap',
      title: t('home.features.nextjs.title'),
      description: t('home.features.nextjs.description'),
      color: 'text-green-600'
    },
    {
      icon: 'Globe',
      title: t('home.features.monorepo.title'),
      description: t('home.features.monorepo.description'),
      color: 'text-purple-600'
    },
    {
      icon: 'Shield',
      title: t('home.features.typeSafety.title'),
      description: t('home.features.typeSafety.description'),
      color: 'text-red-600'
    },
    {
      icon: 'Users',
      title: t('home.features.teamReady.title'),
      description: t('home.features.teamReady.description'),
      color: 'text-orange-600'
    },
    {
      icon: 'Rocket',
      title: t('home.features.performance.title'),
      description: t('home.features.performance.description'),
      color: 'text-indigo-600'
    }
  ]

  // Prepare all translated strings for client component
  const translations = {
    home: {
      badge: t('home.badge'),
      title: t('home.title'),
      description: t('home.description'),
      features: {
        title: t('home.features.title'),
        subtitle: t('home.features.subtitle')
      },
      cta: {
        primary: t('home.cta.primary'),
        secondary: t('home.cta.secondary'),
        title: t('home.cta.title'),
        description: t('home.cta.description'),
        button: t('home.cta.button')
      }
    },
    common: {
      selectLanguage: t('common.selectLanguage'),
      search: t('common.search')
    }
  }

  // Get navigation from site config and translate it
  const config = getValidatedSiteConfig(configJson)
  const navigation = config.navigation.main.map(item => ({
    ...item,
    title: t(item.title),
    children: item.children?.map(child => ({
      ...child,
      title: t(child.title),
      description: child.description ? t(child.description) : undefined
    })),
    badge: item.badge ? t(item.badge) : undefined
  }))

  return (
    <HomePageClient 
      locale={locale}
      navigation={navigation}
      headerConfig={config.header}
      globalConfig={config.global}
      availableLocales={config.features.i18n.locales}
      features={features}
      translations={translations}
    />
  )
}

export async function generateStaticParams() {
  const config = getValidatedSiteConfig(configJson)
  const locales = config.features.i18n.locales
  
  return locales.map((locale) => ({
    locale: locale as SupportedLocale,
  }))
}
