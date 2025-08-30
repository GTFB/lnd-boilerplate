'use client'

import React, { useState } from 'react'
import { useDesignSystem } from '../../design-systems'
import { 
  Tag, 
  Calendar, 
  TrendingUp, 
  Star, 
  Clock, 
  BookOpen,
  Filter,
  Search
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'

export interface BlogCategoriesProps {
  title?: string
  description?: string
  categories?: Array<{
    title: string
    href: string
    count: number
    icon?: React.ReactNode
  }>
  tags?: Array<{
    title: string
    href: string
    count: number
  }>
  showSearch?: boolean
  showFilter?: boolean
  className?: string
}

export const BlogCategories: React.FC<BlogCategoriesProps> = ({
  title = 'Categories',
  description = 'Browse by category',
  categories = [],
  tags = [],
  showSearch = true,
  showFilter = true,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'categories' | 'tags'>('categories')

  const defaultCategories = [
    {
      title: 'Getting Started',
      href: '/blog/category/getting-started',
      count: 12,
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'Tutorials',
      href: '/blog/category/tutorials',
      count: 28,
      icon: <BookOpen className="h-4 w-4" />
    },
    {
      title: 'Best Practices',
      href: '/blog/category/best-practices',
      count: 15,
      icon: <Star className="h-4 w-4" />
    },
    {
      title: 'Case Studies',
      href: '/blog/category/case-studies',
      count: 8,
      icon: <TrendingUp className="h-4 w-4" />
    },
    {
      title: 'News & Updates',
      href: '/blog/category/news',
      count: 22,
      icon: <Clock className="h-4 w-4" />
    },
    {
      title: 'Tips & Tricks',
      href: '/blog/category/tips',
      count: 19,
      icon: <Tag className="h-4 w-4" />
    }
  ]

  const defaultTags = [
    { title: 'React', href: '/blog/tag/react', count: 45 },
    { title: 'TypeScript', href: '/blog/tag/typescript', count: 38 },
    { title: 'Next.js', href: '/blog/tag/nextjs', count: 32 },
    { title: 'Tailwind CSS', href: '/blog/tag/tailwind', count: 28 },
    { title: 'Performance', href: '/blog/tag/performance', count: 25 },
    { title: 'Accessibility', href: '/blog/tag/accessibility', count: 18 },
    { title: 'Testing', href: '/blog/tag/testing', count: 22 },
    { title: 'Deployment', href: '/blog/tag/deployment', count: 15 }
  ]

  const sidebarCategories = categories.length > 0 ? categories : defaultCategories
  const sidebarTags = tags.length > 0 ? tags : defaultTags

  const filteredCategories = sidebarCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredTags = sidebarTags.filter(tag =>
    tag.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const currentItems = filterType === 'categories' ? filteredCategories : filteredTags

  return (
    <aside className={`bg-sidebar-background rounded-lg border ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Search */}
        {showSearch && (
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Filter Toggle */}
        {showFilter && (
          <div className="mb-4">
            <div className="flex gap-2">
              <Button
                variant={filterType === 'categories' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('categories')}
                className="flex-1"
              >
                <Tag className="mr-2 h-3 w-3" />
                Categories
              </Button>
              <Button
                variant={filterType === 'tags' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterType('tags')}
                className="flex-1"
              >
                <Filter className="mr-2 h-3 w-3" />
                Tags
              </Button>
            </div>
          </div>
        )}

        {/* Content */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {currentItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                <div className="flex items-center space-x-3">
                  {'icon' in item && item.icon ? (item.icon as React.ReactNode) : null}
                  <span>{item.title}</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {item.count}
                </Badge>
              </a>
            ))}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t">
          <div className="text-xs text-muted-foreground">
            <p>Total {filterType === 'categories' ? 'categories' : 'tags'}</p>
            <p className="text-primary">
              {filterType === 'categories' ? filteredCategories.length : filteredTags.length} items
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
