'use client'

import React from 'react'
import { MainHeader } from '@lnd/ui/components/common/MainHeader'
import { MainFooter } from '@lnd/ui/components/common/MainFooter'
import { ArrowRight, Code, Zap, Globe, Shield, Users, Rocket } from 'lucide-react'
import { Button } from '@lnd/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'

interface Feature {
  icon: string
  title: string
  description: string
  color: string
}

interface HomePageClientProps {
  locale: string
  navigation: Array<{
    title: string
    href: string
    badge?: string
    children?: Array<{
      title: string
      href: string
      description?: string
      badge?: string
    }>
  }>
  headerConfig: {
    layout: {
      left: string[]
      center: string[]
      right: string[]
    }
    logo: {
      enabled: boolean
      text: string
      image: string | null
      href: string
    }
    mobileMenu: {
      enabled: boolean
    }
    search: {
      enabled: boolean
      placeholder: string
    }
    language: {
      enabled: boolean
      showFlag: boolean
      showName: boolean
    }
    theme: {
      enabled: boolean
      default: string
    }
    notifications: {
      enabled: boolean
      count: number
    }
    userMenu: {
      enabled: boolean
      showAvatar: boolean
      showName: boolean
    }
  }
  globalConfig?: {
    maxWidth?: string
    primaryColor?: string
    secondaryColor?: string
    accentColor?: string
  }
  availableLocales: string[]
  features: Feature[]
  translations: {
    home: {
      badge: string
      title: string
      description: string
      features: {
        title: string
        subtitle: string
      }
      cta: {
        primary: string
        secondary: string
        title: string
        description: string
        button: string
      }
    }
    common: {
      selectLanguage: string
      search: string
    }
  }
}

export function HomePageClient({
  locale,
  navigation,
  headerConfig,
  globalConfig,
  availableLocales,
  features,
  translations
}: HomePageClientProps) {
  // Handle locale change
  const handleLocaleChange = (newLocale: string) => {
    // Redirect to the new locale
    window.location.href = `/${newLocale}`
  }

  // Function to get icon component by name
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Code,
      Zap,
      Globe,
      Shield,
      Users,
      Rocket
    }
    return iconMap[iconName] || Code
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <MainHeader 
        navigation={navigation}
        headerConfig={headerConfig}
        globalConfig={globalConfig}
        currentLocale={locale}
        availableLocales={availableLocales}
        onLocaleChange={handleLocaleChange}
        t={(key: string) => {
          const keys = key.split('.')
          let value: any = translations
          for (const k of keys) {
            value = value?.[k]
          }
          return value || key
        }}
        className="border-b border-gray-200"
      />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              {translations.home.badge}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {translations.home.title}
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
              {translations.home.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                {translations.home.cta.primary}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                {translations.home.cta.secondary}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translations.home.features.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {translations.home.features.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                                   <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center mb-4`}>
                   {React.createElement(getIconComponent(feature.icon), {
                     className: `w-6 h-6 ${feature.color}`
                   })}
                 </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {translations.home.cta.title}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {translations.home.cta.description}
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3">
            {translations.home.cta.button}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      <MainFooter />
    </div>
  )
}
