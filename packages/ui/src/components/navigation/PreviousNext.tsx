'use client'

import { cn } from '../../lib/utils'

export interface NavigationItem {
  id: string
  title: string
  href: string
  excerpt?: string
  image?: string
}

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
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm text-gray-500 dark:text-gray-400">Предыдущая статья</span>
            </div>
            
            <a
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
            </a>
          </div>
        )}

        {/* Next Article */}
        {next && (
          <div className="group">
            <div className="flex items-center justify-end space-x-2 mb-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Следующая статья</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            <a
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
