'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { ExpertCard } from '@lnd/ui/components/content'

export default function ExpertsPage() {
  const experts = [
    {
      id: '1',
      name: 'Александр Петров',
      title: 'Lead Frontend Developer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
      bio: 'Эксперт по React, Next.js и современным веб-технологиям. Специализируется на создании высокопроизводительных пользовательских интерфейсов.',
      expertise: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      social: {
        github: 'https://github.com/alexpetrov',
        linkedin: 'https://linkedin.com/in/alexpetrov',
        twitter: 'https://twitter.com/alexpetrov',
        behance: '',
        dribbble: '',
        stackoverflow: '',
        medium: ''
      },
      location: 'Москва, Россия',
      joined: '2023-01-15'
    },
    {
      id: '2',
      name: 'Мария Сидорова',
      title: 'UI/UX Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
      bio: 'Креативный дизайнер с 8-летним опытом создания интуитивных и красивых пользовательских интерфейсов для веб и мобильных приложений.',
      expertise: ['UI Design', 'UX Research', 'Figma', 'Design Systems'],
      social: {
        github: '',
        linkedin: 'https://linkedin.com/in/mariasidorova',
        twitter: '',
        behance: 'https://behance.net/mariasidorova',
        dribbble: 'https://dribbble.com/mariasidorova',
        stackoverflow: '',
        medium: ''
      },
      location: 'Санкт-Петербург, Россия',
      joined: '2022-08-20'
    },
    {
      id: '3',
      name: 'Дмитрий Козлов',
      title: 'Backend Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
      bio: 'Опытный backend разработчик, специализирующийся на Node.js, Python и микросервисной архитектуре. Создает масштабируемые API и сервисы.',
      expertise: ['Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS'],
      social: {
        github: 'https://github.com/dmitrykozlov',
        linkedin: 'https://linkedin.com/in/dmitrykozlov',
        twitter: '',
        behance: '',
        dribbble: '',
        stackoverflow: 'https://stackoverflow.com/users/dmitrykozlov',
        medium: ''
      },
      location: 'Екатеринбург, Россия',
      joined: '2023-03-10'
    },
    {
      id: '4',
      name: 'Анна Волкова',
      title: 'Product Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
      bio: 'Стратегический product manager с глубоким пониманием пользовательских потребностей. Управляет разработкой продуктов от идеи до запуска.',
      expertise: ['Product Strategy', 'User Research', 'Agile', 'Analytics'],
      social: {
        github: '',
        linkedin: 'https://linkedin.com/in/annavolkova',
        twitter: 'https://twitter.com/annavolkova',
        behance: '',
        dribbble: '',
        stackoverflow: '',
        medium: 'https://medium.com/@annavolkova'
      },
      location: 'Казань, Россия',
      joined: '2022-11-05'
    }
  ]

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Наша команда экспертов
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Профессионалы с многолетним опытом в веб-разработке, дизайне и управлении продуктами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {experts.map((expert) => (
            <ExpertCard key={expert.id} expert={expert} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
