'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { TableOfContentsItem } from '../../types/navigation'
import { List, ChevronRight, ExternalLink } from 'lucide-react'
import { Badge } from '../ui/badge'
import { ScrollArea } from '../ui/scroll-area'

export interface TableOfContentsProps {
  title?: string
  description?: string
  items?: TableOfContentsItem[]
  autoGenerate?: boolean
  className?: string
}

export interface HeadingItem {
  id: string
  title: string
  level: number
  element: HTMLElement
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  title = 'Table of Contents',
  description = 'Jump to section',
  items = [],
  autoGenerate = true,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()
  const [activeSection, setActiveSection] = useState<string>('')
  const [headings, setHeadings] = useState<HeadingItem[]>([])

  // Automatically generate TOC from page headings
  useEffect(() => {
    if (!autoGenerate) return

    const generateTOC = () => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      const headingItems: HeadingItem[] = []

      headingElements.forEach((element, index) => {
        const level = parseInt(element.tagName.charAt(1))
        const title = element.textContent || `Section ${index + 1}`
        const id = element.id || `heading-${index + 1}`

        // Add id if it doesn't exist
        if (!element.id) {
          element.id = id
        }

        headingItems.push({
          id,
          title,
          level,
          element: element as HTMLElement
        })
      })

      setHeadings(headingItems)
    }

    // Generate TOC after render
    const timer = setTimeout(generateTOC, 100)
    return () => clearTimeout(timer)
  }, [autoGenerate])

  // Track active section on scroll
  useEffect(() => {
    if (!autoGenerate || headings.length === 0) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i]
        if (heading.element.offsetTop <= scrollPosition) {
          setActiveSection(heading.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check immediately

    return () => window.removeEventListener('scroll', handleScroll)
  }, [autoGenerate, headings])

  const tocItems = items.length > 0 ? items : headings.map(h => ({
    title: h.title,
    href: `#${h.id}`,
    level: h.level
  })) as TableOfContentsItem[]

  const scrollToSection = (href: string) => {
    const id = href.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getTocPadding = (level: number) => {
    switch (level) {
      case 1: return 'pl-4'
      case 2: return 'pl-8'
      case 3: return 'pl-12'
      case 4: return 'pl-16'
      case 5: return 'pl-20'
      case 6: return 'pl-24'
      default: return 'pl-4'
    }
  }

  const getTocHoverPadding = (level: number) => {
    switch (level) {
      case 1: return 'hover:pl-6'
      case 2: return 'hover:pl-10'
      case 3: return 'hover:pl-14'
      case 4: return 'hover:pl-18'
      case 5: return 'hover:pl-22'
      case 6: return 'hover:pl-26'
      default: return 'hover:pl-6'
    }
  }

  if (tocItems.length === 0) {
    return (
      <aside className={`bg-sidebar-background rounded-lg border p-6 ${className}`}>
        <div className="text-center text-muted-foreground">
          <List className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No sections found</p>
        </div>
      </aside>
    )
  }

  return (
    <aside className={`bg-sidebar-background rounded-lg border ${className}`}>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Table of Contents */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <nav className="space-y-2">
            {tocItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '')
              const isExternal = !item.href.startsWith('#')
              
              return (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => {
                    if (!isExternal) {
                      e.preventDefault()
                      scrollToSection(item.href)
                    }
                  }}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    getTocPadding(item.level)
                  } ${
                    getTocHoverPadding(item.level)
                  } ${
                    isActive
                      ? 'bg-primary text-primary-foreground border-l-2 border-l-black'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="truncate">{item.title}</span>
                    <div className="flex items-center space-x-2 ml-2">
                      {item.badge && (
                        <Badge variant="outline" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      {isExternal && (
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      )}
                    </div>
                  </div>
                </a>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t">
          <div className="text-xs text-muted-foreground">
            <p>On this page</p>
            <p className="text-primary">{tocItems.length} sections</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
