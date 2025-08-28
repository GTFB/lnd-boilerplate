'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { Badge } from '@lnd/ui/components/ui/badge'
import { Rocket, Code, Palette, Zap, Users, Target } from 'lucide-react'

export default function AboutPage() {
  const features = [
    {
      icon: Rocket,
      title: 'Быстрый старт',
      description: 'Создавайте профессиональные лендинги за считанные минуты с готовыми компонентами и шаблонами'
    },
    {
      icon: Code,
      title: 'Современный стек',
      description: 'Построен на Next.js 14, TypeScript и Tailwind CSS для максимальной производительности'
    },
    {
      icon: Palette,
      title: 'Гибкий дизайн',
      description: 'Адаптивные компоненты с поддержкой темной темы и кастомизации'
    },
    {
      icon: Zap,
      title: 'Высокая производительность',
      description: 'Оптимизирован для Core Web Vitals и быстрой загрузки страниц'
    },
    {
      icon: Users,
      title: 'Комьюнити',
      description: 'Активная команда разработчиков и открытый исходный код'
    },
    {
      icon: Target,
      title: 'Масштабируемость',
      description: 'Monorepo архитектура для легкого управления зависимостями'
    }
  ]

  const stats = [
    { label: 'Компонентов', value: '50+' },
    { label: 'Шаблонов', value: '15+' },
    { label: 'Утилит', value: '25+' },
    { label: 'Версия', value: '1.0.0' }
  ]

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            О LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Мы создаем инструменты, которые помогают разработчикам строить современные веб-приложения быстрее и эффективнее. 
            LND Boilerplate — это результат многолетнего опыта в веб-разработке.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Почему выбирают нас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Наша миссия
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Демократизировать доступ к качественным инструментам веб-разработки. 
              Мы верим, что каждый разработчик заслуживает иметь доступ к лучшим практикам и компонентам.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Технологический стек
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js 14', 'TypeScript', 'Tailwind CSS', 'React 18', 
              'Monorepo', 'ESLint', 'Prettier', 'Bun'
            ].map((tech) => (
              <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Готовы начать?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Присоединяйтесь к тысячам разработчиков, которые уже используют LND Boilerplate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/docs" className="inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Начать изучение
              </button>
            </a>
            <a href="https://github.com/GTFB/lnd-boilerplate" target="_blank" rel="noopener noreferrer" className="inline-block">
              <button className="border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors">
                GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
