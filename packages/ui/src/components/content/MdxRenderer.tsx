'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { MdxContent } from './MdxContent'
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs'
import { ScrollProgress } from '../footer/ScrollProgress'

export interface MdxRendererProps {
  content: React.ReactNode
  breadcrumbs?: BreadcrumbItem[]
  showBreadcrumbs?: boolean
  showProgressBar?: boolean
  showTableOfContents?: boolean
  className?: string
  meta?: {
    title?: string
    description?: string
    author?: string
    date?: string
    tags?: string[]
    category?: string
  }
}

export const MdxRenderer: React.FC<MdxRendererProps> = ({
  content,
  breadcrumbs = [],
  showBreadcrumbs = true,
  showProgressBar = true,
  showTableOfContents = false,
  className = '',
  meta
}) => {
  const { currentSystem } = useDesignSystem()

  return (
    <div className={`mdx-renderer ${className}`}>
      {/* Breadcrumbs */}
      {showBreadcrumbs && breadcrumbs.length > 0 && (
        <div className="mb-6">
          <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      {/* Meta Information */}
      {meta && (
        <div className="mb-8 space-y-4">
          {meta.title && (
            <h1 className="text-4xl font-bold tracking-tight">
              {meta.title}
            </h1>
          )}
          
          {meta.description && (
            <p className="text-xl text-muted-foreground">
              {meta.description}
            </p>
          )}
          
          {(meta.author || meta.date || meta.tags || meta.category) && (
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {meta.author && (
                <span>By {meta.author}</span>
              )}
              
              {meta.date && (
                <span>{new Date(meta.date).toLocaleDateString()}</span>
              )}
              
              {meta.category && (
                <span className="px-2 py-1 bg-muted rounded-md">
                  {meta.category}
                </span>
              )}
              
              {meta.tags && meta.tags.length > 0 && (
                <div className="flex gap-2">
                  {meta.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-muted rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Main Content */}
      <MdxContent 
        showProgressBar={showProgressBar}
        showTableOfContents={showTableOfContents}
      >
        {content}
      </MdxContent>

      {/* Scroll Progress */}
      {showProgressBar && (
        <ScrollProgress 
          position="bottom"
          thickness="thick"
          color="gradient"
          showScrollButtons={false}
          showScrollInfo={false}
        />
      )}
    </div>
  )
}
