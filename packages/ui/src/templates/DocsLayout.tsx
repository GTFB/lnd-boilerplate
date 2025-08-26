'use client'

import React, { useState, useEffect } from 'react'
import { PublicLayout } from './PublicLayout'
import { DocumentationConfig } from '@lnd/utils/config/site-config.types'
import { DocsTOC } from '../components/docs'

/**
 * DocsLayout - Optimized for documentation pages
 * 
 * This layout is designed for documentation pages with advanced features:
 * - Configurable navigation sidebar
 * - Built-in search functionality
 * - Breadcrumb navigation
 * - Reading progress indicator
 * - Table of contents
 * - Mobile-responsive design
 * 
 * All features are configurable through site.config.json
 * 
 * @param children - Page content
 * @param title - Page title
 * @param description - Page description
 * @param className - Additional CSS classes
 * @param showHeader - Whether to show the page header
 */
interface DocsLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  showHeader?: boolean
  tableOfContents?: Array<{
    id: string
    title: string
    level: number
  }>
}

export const DocsLayout: React.FC<DocsLayoutProps> = ({ 
  children, 
  title,
  description,
  className = '',
  showHeader = true,
  tableOfContents = []
}) => {
  const [config, setConfig] = useState<DocumentationConfig | null>(null)
  const [isTocOpen, setIsTocOpen] = useState(true)

  // Load configuration
  useEffect(() => {
    // Simplified configuration without complex features
    setConfig({
      enabled: true,
      path: '/docs',
      navigation: {
        enabled: true,
        position: 'left',
        showProgress: true,
        showBreadcrumbs: true
      },
      search: {
        enabled: false,
        provider: 'local',
        placeholder: 'Search documentation...'
      },
      layout: {
        sidebar: false,
        toc: true,
        footer: true
      }
    })
  }, [])





  if (!config) {
    return (
      <PublicLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </PublicLayout>
    )
  }





  const renderTableOfContents = () => {
    if (!config.layout.toc || tableOfContents.length === 0) return null

    const tocData = tableOfContents.map(item => ({
      title: item.title,
      url: `#${item.id}`,
      depth: item.level
    }))

    return (
      <div className={`hidden xl:block transition-all duration-300 ${isTocOpen ? 'opacity-100 w-full' : 'opacity-0 w-0 overflow-hidden'}`}>
        <div className="sticky top-24 h-[calc(100vh-14rem)] px-4 w-full">
          <DocsTOC toc={tocData} variant="list" />
        </div>
      </div>
    )
  }

  const renderBreadcrumbs = () => {
    if (!config.navigation.showBreadcrumbs) return null

    // Get current path to determine section
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
    const pathSegments = currentPath.split('/').filter(Boolean)
    const section = pathSegments[0] || 'docs' // Default to docs if no section
    
    // Map section to display name
    const sectionNames: Record<string, string> = {
      'docs': 'Documentation',
      'whitepaper': 'White Paper',
      'blog': 'Blog',
      'legal': 'Legal',
      'experts': 'Experts'
    }
    
    const sectionName = sectionNames[section] || section.charAt(0).toUpperCase() + section.slice(1)
    const sectionUrl = `/${section}`

    return (
      <div className="flex items-center gap-4 mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</a>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {title && title !== sectionName ? (
            <>
              <a href={sectionUrl} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{sectionName}</a>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{title}</span>
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">{sectionName}</span>
          )}
        </nav>
      </div>
    )
  }



  return (
    <PublicLayout>
      {/* TOC toggle button - only show when TOC is hidden */}
      {tableOfContents.length > 0 && !isTocOpen && (
        <button
          onClick={() => setIsTocOpen(true)}
          className="fixed top-20 end-4 z-40 p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent"
          title="Show TOC"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Main content */}
      <div className="container mx-auto">
        <div className={`grid gap-8 transition-all duration-300 ${
          isTocOpen 
            ? 'grid-cols-1 lg:grid-cols-[1fr_280px]'
            : 'grid-cols-1'
        }`}>
          
          <div className="py-8 w-full" style={{ paddingLeft: '1rem', paddingRight: '1.5rem' }}>
            {showHeader && (title || description) && (
              <header className="mb-12 text-left">
                {renderBreadcrumbs()}
                {title && (
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                    {description}
                  </p>
                )}
              </header>
            )}

            {/* Regular content */}
            <article className={`prose prose-gray dark:prose-invert max-w-none prose-headings:text-left prose-p:text-left prose-li:text-left ${className}`}>
              <div className="max-w-4xl mx-auto">
                {children}
              </div>
            </article>
          </div>

          {isTocOpen && renderTableOfContents()}

        </div>
      </div>
    </PublicLayout>
  )
}
