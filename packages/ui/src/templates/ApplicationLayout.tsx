import React from 'react'
import { PublicLayout } from './layouts/PublicLayout'

/**
 * ApplicationLayout - Optimized for application-driven pages
 * 
 * This layout is designed for pages that require dynamic functionality,
 * such as dashboards, forms, interactive components, and data-driven interfaces.
 * 
 * Key features:
 * - Client-side interactivity support
 * - State management ready
 * - Dynamic content loading
 * - Interactive component support
 * 
 * @param children - Page content
 * @param title - Page title
 * @param description - Page description
 * @param className - Additional CSS classes
 * @param showHeader - Whether to show the page header
 */
interface ApplicationLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  showHeader?: boolean
}

export const ApplicationLayout: React.FC<ApplicationLayoutProps> = ({ 
  children, 
  title,
  description,
  className = '',
  showHeader = true
}) => {
  return (
    <PublicLayout>
      <div className={`min-h-screen bg-gray-50 ${className}`}>
        {showHeader && (title || description) && (
          <div className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {title && (
                <h1 className="text-2xl font-semibold text-gray-900">
                  {title}
                </h1>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-600">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {children}
          </div>
        </main>
      </div>
    </PublicLayout>
  )
}
