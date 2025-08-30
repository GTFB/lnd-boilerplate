'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { Button } from '@lnd/ui/components/ui/button'

import { Mail, MessageSquare, Phone, MapPin, Clock, Globe } from 'lucide-react'

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Напишите нам на почту',
      value: 'contact@gtfb.dev',
      href: 'mailto:contact@gtfb.dev'
    },
    {
      icon: MessageSquare,
      title: 'Telegram',
      description: 'Быстрая связь в мессенджере',
      value: '@gtfb_dev',
      href: 'https://t.me/gtfb_dev'
    },
    {
      icon: Globe,
      title: 'GitHub',
      description: 'Исходный код и issues',
      value: 'github.com/GTFB',
      href: 'https://github.com/GTFB'
    }
  ]

  const officeInfo = [
    {
      icon: MapPin,
      title: 'Адрес',
      description: 'Москва, Россия'
    },
    {
      icon: Clock,
      title: 'Время работы',
      description: 'Пн-Пт: 9:00 - 18:00 (МСК)'
    },
    {
      icon: Phone,
      title: 'Телефон',
      description: '+7 (XXX) XXX-XX-XX'
    }
  ]

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Свяжитесь с нами
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            У вас есть вопросы или предложения? Мы всегда рады помочь и обсудить возможности сотрудничества.
          </p>
        </div>

        {/* Contact Methods */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Способы связи
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => {
              const IconComponent = method.icon
              return (
                <Card key={method.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {method.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <a 
                      href={method.href} 
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      {method.value}
                    </a>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Office Information */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Информация о компании
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {officeInfo.map((info) => {
              const IconComponent = info.icon
              return (
                <Card key={info.title} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Отправить сообщение</CardTitle>
              <CardDescription className="text-center">
                Заполните форму ниже, и мы свяжемся с вами в ближайшее время
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Имя *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Ваше имя"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Фамилия
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Ваша фамилия"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Тема *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="">Выберите тему</option>
                    <option value="general">Общий вопрос</option>
                    <option value="support">Техническая поддержка</option>
                    <option value="partnership">Сотрудничество</option>
                    <option value="feature">Предложение функции</option>
                    <option value="bug">Сообщение об ошибке</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Опишите ваш вопрос или предложение..."
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" className="px-8 py-3">
                    Отправить сообщение
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Часто задаваемые вопросы
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Как начать использовать LND Boilerplate?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Клонируйте репозиторий, установите зависимости командой <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bun install</code> и запустите проект командой <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">bun run dev</code>.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Поддерживается ли TypeScript?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Да, проект полностью написан на TypeScript с типизацией всех компонентов и утилит.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Можно ли использовать в коммерческих проектах?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  LND Boilerplate распространяется под MIT лицензией, что позволяет использовать его в любых проектах, включая коммерческие.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
