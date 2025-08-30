'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { ImageGallery } from '@lnd/ui/components/ui/ImageGallery'
import { BlogCard } from '@lnd/ui/components/content/BlogCard'
import { ExpertCard } from '@lnd/ui/components/content/ExpertCard'

export default function GalleryPage() {
  // Пример изображений для галереи
  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      alt: "Код на экране",
      caption: "Разработка веб-приложений",
      link: "https://unsplash.com/photos/1461749280684"
    },
    {
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      alt: "Современный интерфейс",
      caption: "UI/UX дизайн",
      link: "https://unsplash.com/photos/1555066931"
    },
    {
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      alt: "Аналитика данных",
      caption: "Анализ производительности",
      link: "https://unsplash.com/photos/1460925895917"
    },
    {
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop",
      alt: "Деплой приложения",
      caption: "Развертывание и DevOps",
      link: "https://unsplash.com/photos/1556075798"
    },
    {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      alt: "Команда разработчиков",
      caption: "Командная работа",
      link: "https://unsplash.com/photos/1472099645785"
    },
    {
      src: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=800&h=600&fit=crop",
      alt: "Современные технологии",
      caption: "Инновации в разработке",
      link: "https://unsplash.com/photos/1592621385612"
    }
  ]

  // Пример блог-постов
  const blogPosts = [
    {
      id: "getting-started",
      title: "Работа с изображениями в LND Boilerplate",
      description: "Полное руководство по использованию системы изображений в проекте",
      coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
      tags: ["Images", "UI", "Components"],
      date: "2025-01-25",
      authorId: "john-smith",
      authorName: "John Smith",
      authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      category: "Development",
      readTime: "5 мин",
      href: "/blog/getting-started-with-images"
    },
    {
      id: "performance-tips",
      title: "Советы по оптимизации производительности",
      description: "Узнайте, как оптимизировать ваше приложение для максимальной производительности",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      tags: ["Performance", "Optimization", "Web Vitals"],
      date: "2025-01-15",
      authorId: "jane-doe",
      authorName: "Jane Doe",
      authorAvatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=100&h=100&fit=crop&crop=face",
      category: "Performance",
      readTime: "8 мин",
      href: "/blog/performance-tips"
    }
  ]

  // Пример экспертов
  const experts = [
    {
      id: "john-smith",
      name: "John Smith",
      title: "Senior UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "John is a creative UI/UX designer with 8 years of experience in creating beautiful, user-centered designs.",
      expertise: ["UI/UX Design", "Design Systems", "Figma", "Accessibility"],
      social: {
        github: '',
        linkedin: "https://linkedin.com/in/johnsmith",
        twitter: '',
        behance: "https://behance.net/johnsmith",
        dribbble: "https://dribbble.com/johnsmith",
        stackoverflow: '',
        medium: ''
      },
      location: "New York, NY",
      joined: "2021-03-20"
    },
    {
      id: "jane-doe",
      name: "Jane Doe",
      title: "Lead Frontend Architect",
      avatar: "https://images.unsplash.com/photo-1592621385612-4d7129426394?w=400&h=400&fit=crop&crop=face",
      bio: "Jane is a seasoned frontend architect with over 10 years of experience building scalable and performant web applications.",
      expertise: ["Next.js", "React", "TypeScript", "Performance", "Architecture"],
      social: {
        github: "https://github.com/janedoe",
        linkedin: "https://linkedin.com/in/janedoe",
        twitter: "https://twitter.com/janedoe_dev",
        behance: '',
        dribbble: '',
        stackoverflow: '',
        medium: ''
      },
      location: "San Francisco, CA",
      joined: "2020-01-15"
    }
  ]

  return (
    <PageLayout>
      <div className="space-y-16">
        {/* Галерея изображений */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Галерея изображений
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Демонстрация компонента ImageGallery с поддержкой lightbox и подписей
            </p>
          </div>
          
          <ImageGallery
            images={galleryImages}
            columns={3}
            showCaptions={true}
            showLightbox={true}
          />
        </section>

        {/* Блог-посты */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Блог-посты
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Демонстрация компонента BlogCard с изображениями
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>

        {/* Эксперты */}
        <section>
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Наши эксперты
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Демонстрация компонента ExpertCard с аватарами
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
