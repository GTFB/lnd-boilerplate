'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { ChevronRight, Home, FolderOpen } from 'lucide-react'
import { Button } from '../ui/button'

export interface BreadcrumbItem {
  title: string
  href?: string
  icon?: React.ReactNode
}

export interface BreadcrumbsProps {
  items?: BreadcrumbItem[]
  showHome?: boolean
  homeHref?: string
  separator?: React.ReactNode
  maxItems?: number
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items = [],
  showHome = true,
  homeHref = '/',
  separator = <ChevronRight className="h-4 w-4 text-muted-foreground" />,
  maxItems = 5,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()

  // Добавляем домашнюю страницу если нужно
  const allItems = showHome 
    ? [{ title: 'Home', href: homeHref, icon: <Home className="h-4 w-4" /> }, ...items]
    : items

  // Ограничиваем количество элементов
  const displayItems = allItems.slice(-maxItems)

  // Если элементов больше максимума, добавляем "..." в начало
  const hasOverflow = allItems.length > maxItems
  const overflowItems = hasOverflow ? allItems.slice(0, -maxItems + 1) : []

  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      {hasOverflow && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs text-muted-foreground hover:text-foreground"
            onClick={() => {
              // Показать все элементы или открыть выпадающее меню
              console.log('Show all breadcrumbs')
            }}
          >
            <FolderOpen className="h-3 w-3 mr-1" />
            ...
          </Button>
          {separator}
        </>
      )}

      {displayItems.map((item, index) => {
        const isLast = index === displayItems.length - 1
        const isFirst = index === 0

        return (
          <React.Fragment key={index}>
            {!isFirst && separator}
            
            {item.href && !isLast ? (
              <a 
                href={item.href} 
                className="flex items-center space-x-1 h-6 px-2 text-xs text-muted-foreground hover:text-foreground rounded-md hover:bg-accent transition-colors"
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="truncate max-w-24">{item.title}</span>
              </a>
            ) : (
              <span className="flex items-center space-x-1 px-2 text-xs font-medium text-foreground">
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="truncate max-w-24">{item.title}</span>
              </span>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
