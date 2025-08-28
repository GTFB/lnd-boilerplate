'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { Button } from '@lnd/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { BookOpen, Code, Palette, Zap, Database, Smartphone } from 'lucide-react'

export default function DocsPage() {
  const docCategories = [
    {
      title: 'Начало работы',
      description: 'Быстрый старт с LND Boilerplate',
      icon: Zap,
      href: '/docs/getting-started',
      color: 'text-blue-600'
    },
    {
      title: 'Компоненты',
      description: 'Библиотека UI компонентов',
      icon: Palette,
      href: '/docs/components',
      color: 'text-purple-600'
    },
    {
      title: 'Шаблоны',
      description: 'Готовые макеты страниц',
      icon: BookOpen,
      href: '/docs/templates',
      color: 'text-green-600'
    },
    {
      title: 'API',
      description: 'Интерфейсы и утилиты',
      icon: Code,
      href: '/docs/api',
      color: 'text-orange-600'
    },
    {
      title: 'Конфигурация',
      description: 'Настройка проекта',
      icon: Database,
      href: '/docs/configuration',
      color: 'text-red-600'
    },
    {
      title: 'Развертывание',
      description: 'Деплой и хостинг',
      icon: Smartphone,
      href: '/docs/deployment',
      color: 'text-indigo-600'
    }
  ]

  return (
    <PageLayout>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Документация LND Boilerplate
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Изучите все возможности нашего фреймворка для создания современных лендингов
        </p>
      </div>
      <div className="space-y-8">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.title} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={category.href} className="block w-full">
                    <Button className="w-full">
                      Изучить
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Нужна помощь?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Если у вас есть вопросы или нужна поддержка, свяжитесь с нашей командой
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button variant="default">
                Связаться с нами
              </Button>
            </a>
            <a href="https://github.com/GTFB/lnd-boilerplate/issues" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Сообщить о проблеме
              </Button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
