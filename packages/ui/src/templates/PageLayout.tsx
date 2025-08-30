import React from 'react'
import { PublicLayout } from './layouts/PublicLayout'
import { Heading, Text } from '../primitives'
import { TableOfContents } from '../components/navigation'

export interface PageLayoutProps {
  title: string
  description?: string
  date?: string
  author?: string
  coverImage?: string
  tags?: string[]
  category?: string
  children: React.ReactNode
  showToc?: boolean
  tocItems?: Array<{
    id: string
    title: string
    level: number
    children?: Array<{
      id: string
      title: string
      level: number
    }>
  }>
}

export function PageLayout({
  title,
  description,
  date,
  author,
  coverImage,
  tags,
  category,
  children,
  showToc = false,
  tocItems = []
}: PageLayoutProps) {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {category && (
              <div className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 rounded-full mb-4">
                {category}
              </div>
            )}
            
            <Heading level={1} className="mb-4">
              {title}
            </Heading>
            
            {description && (
              <Text className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                {description}
              </Text>
            )}
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {date && (
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString('ru-RU', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              )}
              
              {author && (
                <span>Автор: {author}</span>
              )}
            </div>
            
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-300 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          {coverImage && (
            <div className="mb-8">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-64 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Content with optional TOC */}
          <div className="flex gap-8">
            <main className="flex-1 prose prose-lg dark:prose-invert max-w-none">
              {children}
            </main>
            
            {showToc && tocItems.length > 0 && (
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <TableOfContents toc={tocItems} />
              </aside>
            )}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
