'use client'

import React from 'react'
import { cn } from '../../lib/utils'
import { NavigationItem } from '../../types/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export interface PreviousNextProps {
  previous?: NavigationItem
  next?: NavigationItem
  className?: string
  showExcerpts?: boolean
  showImages?: boolean
}

export function PreviousNext({
  previous,
  next,
  className,
  showExcerpts = true,
  showImages = true
}: PreviousNextProps) {

  if (!previous && !next) {
    return null
  }

  return (
    <div className={cn('border-t border-gray-200 dark:border-gray-700 pt-8 mt-12', className)}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Навигация по статьям
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Previous Article */}
        {previous && (
          <div className="group">
            <div className="flex items-center space-x-2 mb-2">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Предыдущая статья</span>
            </div>
            
            <Link
              href={previous.href}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex space-x-4">
                {showImages && previous.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={previous.image}
                      alt={previous.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {previous.title}
                  </h4>
                  
                  {showExcerpts && previous.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {previous.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Next Article */}
        {next && (
          <div className="group">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Следующая статья</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            
            <Link
              href={next.href}
              className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
            >
              <div className="flex space-x-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {next.title}
                  </h4>
                  
                  {showExcerpts && next.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {next.excerpt}
                    </p>
                  )}
                </div>
                
                {showImages && next.image && (
                  <div className="flex-shrink-0">
                    <img
                      src={next.image}
                      alt={next.title}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
