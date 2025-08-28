'use client'

import React, { useState } from 'react'
import { useDesignSystem } from '../../design-systems'
import { NavigationItem } from '../../types/navigation'
import { 
  BookOpen, 
  FileText, 
  Tag, 
  Calendar, 
  ChevronRight, 
  ChevronDown,
  Search,
  Filter
} from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'

export interface DocsSidebarProps {
  title?: string
  description?: string
  items?: NavigationItem[]
  showSearch?: boolean
  showFilter?: boolean
  className?: string
}

export const DocsSidebar: React.FC<DocsSidebarProps> = ({
  title = 'Documentation',
  description = 'Navigate through the documentation',
  items = [],
  showSearch = true,
  showFilter = true,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const defaultItems = [
    {
      title: 'Getting Started',
      href: '/docs/getting-started',
      icon: <BookOpen className="h-4 w-4" />,
      children: [
        { title: 'Introduction', href: '/docs/getting-started/introduction' },
        { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
        { title: 'Installation', href: '/docs/getting-started/installation' },
        { title: 'Configuration', href: '/docs/getting-started/configuration' }
      ]
    },
    {
      title: 'Core Concepts',
      href: '/docs/core-concepts',
      icon: <FileText className="h-4 w-4" />,
      children: [
        { title: 'Architecture', href: '/docs/core-concepts/architecture' },
        { title: 'Components', href: '/docs/core-concepts/components' },
        { title: 'State Management', href: '/docs/core-concepts/state' },
        { title: 'Routing', href: '/docs/core-concepts/routing' }
      ]
    },
    {
      title: 'Components',
      href: '/docs/components',
      icon: <FileText className="h-4 w-4" />,
      children: [
        { title: 'UI Components', href: '/docs/components/ui' },
        { title: 'Layout Components', href: '/docs/components/layout' },
        { title: 'Form Components', href: '/docs/components/forms' },
        { title: 'Data Components', href: '/docs/components/data' }
      ]
    },
    {
      title: 'API Reference',
      href: '/docs/api',
      icon: <FileText className="h-4 w-4" />,
      badge: 'Updated'
    },
    {
      title: 'Examples',
      href: '/docs/examples',
      icon: <FileText className="h-4 w-4" />
    },
    {
      title: 'Blog',
      href: '/blog',
      icon: <Tag className="h-4 w-4" />
    },
    {
      title: 'Changelog',
      href: '/changelog',
      icon: <Calendar className="h-4 w-4" />
    }
  ] as NavigationItem[]

  const sidebarItems = items.length > 0 ? items : defaultItems

  const toggleExpandedItem = (title: string) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(title)) {
      newExpanded.delete(title)
    } else {
      newExpanded.add(title)
    }
    setExpandedItems(newExpanded)
  }

  const filteredItems = sidebarItems.filter(item => {
    if (filterCategory === 'all') return true
    if (filterCategory === 'getting-started' && item.title.toLowerCase().includes('getting started')) return true
    if (filterCategory === 'core' && item.title.toLowerCase().includes('core')) return true
    if (filterCategory === 'components' && item.title.toLowerCase().includes('components')) return true
    if (filterCategory === 'api' && item.title.toLowerCase().includes('api')) return true
    return false
  })

  const searchFilteredItems = filteredItems.filter(item => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      item.title.toLowerCase().includes(query) ||
      item.children?.some(child => child.title.toLowerCase().includes(query))
    )
  })

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
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        )}

        {/* Filter */}
        {showFilter && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {['all', 'getting-started', 'core', 'components', 'api'].map((category) => (
                <Button
                  key={category}
                  variant={filterCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterCategory(category)}
                  className="text-xs capitalize"
                >
                  {category === 'all' ? 'All' : category.replace('-', ' ')}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <nav className="space-y-2">
            {searchFilteredItems.map((item, index) => (
              <div key={index}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  {item.icon}
                  <span className="flex-1">{item.title}</span>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.children && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleExpandedItem(item.title)
                        }}
                      >
                        {expandedItems.has(item.title) ? (
                          <ChevronDown className="h-3 w-3" />
                        ) : (
                          <ChevronRight className="h-3 w-3" />
                        )}
                      </Button>
                    )}
                  </div>
                </a>
                
                {/* Nested items */}
                {item.children && expandedItems.has(item.title) && (
                  <div className="ml-6 mt-2 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <a
                        key={childIndex}
                        href={child.href}
                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                      >
                        <span className="flex-1">{child.title}</span>
                        {child.badge && (
                          <Badge variant="outline" className="text-xs">
                            {child.badge}
                          </Badge>
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t">
          <div className="text-xs text-muted-foreground">
            <p>Need help? Check our</p>
            <a href="/docs/support" className="text-primary hover:underline">
              support documentation
            </a>
          </div>
        </div>
      </div>
    </aside>
  )
}
