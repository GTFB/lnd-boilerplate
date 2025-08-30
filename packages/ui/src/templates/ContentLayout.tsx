import React from 'react'
import { PublicLayout } from './layouts/PublicLayout'

/**
 * ContentLayout - Optimized for content-driven pages
 * 
 * This layout is designed for pages that are primarily content-focused,
 * such as blog posts, documentation, marketing pages, and static content.
 * 
 * Key features:
 * - SEO-optimized structure
 * - Fast loading with minimal JavaScript
 * - Content-first approach
 * - Static generation friendly
 * 
 * @param children - Page content
 * @param title - Page title for SEO
 * @param description - Page description for SEO
 * @param className - Additional CSS classes
 */
interface ContentLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({ 
  children, 
  title,
  description,
  className = ''
}) => {
  return (
    <PublicLayout>
      <article className={`prose prose-lg max-w-none ${className}`}>
        {title && (
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </header>
        )}
        
        <div className="content">
          {children}
        </div>
      </article>
    </PublicLayout>
  )
}
