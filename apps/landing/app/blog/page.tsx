'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { BlogCard } from '@lnd/ui/components/content'

export default function BlogPage() {
  const blogPosts = [
    {
      id: '1',
      title: 'Getting Started with Images in LND Boilerplate',
      description: 'Learn how to work with images, avatars, and galleries in your landing pages.',
      coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      tags: ['images', 'tutorial', 'components'],
      date: '2025-01-28',
      authorId: 'gtfb',
      authorName: 'GTFB Team',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      category: 'Tutorials',
      readTime: '5 min read',
      href: '/blog/getting-started-with-images'
    },
    {
      id: '2',
      title: 'Building Modern Landing Pages with Next.js 14',
      description: 'Explore the latest features of Next.js 14 and how to leverage them in your landing pages.',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      tags: ['nextjs', 'landing-pages', 'modern-web'],
      date: '2025-01-27',
      authorId: 'gtfb',
      authorName: 'GTFB Team',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      category: 'Development',
      readTime: '8 min read',
      href: '/blog/nextjs-14-landing-pages'
    },
    {
      id: '3',
      title: 'Monorepo Architecture Best Practices',
      description: 'Discover how to structure your projects using monorepo architecture for better maintainability.',
      coverImage: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=400&fit=crop',
      tags: ['monorepo', 'architecture', 'best-practices'],
      date: '2025-01-26',
      authorId: 'gtfb',
      authorName: 'GTFB Team',
      authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      category: 'Architecture',
      readTime: '12 min read',
      href: '/blog/monorepo-architecture'
    }
  ]

  return (
    <PageLayout
      title="Блог"
      description="Последние статьи и руководства по разработке"
    >
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Блог LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Изучайте современные подходы к разработке, лучшие практики и полезные советы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}