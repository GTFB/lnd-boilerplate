'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface SidebarContextType {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: any[]
  setSearchResults: (results: any[]) => void
  isSearching: boolean
  setIsSearching: (searching: boolean) => void
  navigationItems: any[]
  setNavigationItems: (items: any[]) => void
  isTocOpen: boolean
  setIsTocOpen: (open: boolean) => void
  tableOfContents: Array<{
    id: string
    title: string
    level: number
  }>
  setTableOfContents: (toc: Array<{
    id: string
    title: string
    level: number
  }>) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [navigationItems, setNavigationItems] = useState<any[]>([
    {
      title: 'DOCUMENTATION',
      href: '/docs',
      children: [
        { title: 'Introduction', href: '/docs/introduction' },
        { title: 'Installation', href: '/docs/installation' },
        { title: 'Architecture', href: '/docs/architecture' }
      ]
    },
    {
      title: 'GETTING STARTED',
      href: '/docs/getting-started',
      children: [
        { title: 'Quick Start', href: '/docs/getting-started/quick-start' },
        { title: 'First Steps', href: '/docs/getting-started/first-steps' }
      ]
    }
  ])
  const [isTocOpen, setIsTocOpen] = useState(true)
  const [tableOfContents, setTableOfContents] = useState<Array<{
    id: string
    title: string
    level: number
  }>>([])

  // Check if current page should show sidebar
  const shouldShowSidebar = pathname.startsWith('/docs')

  // Load navigation items from config only for docs pages
  useEffect(() => {
    if (!shouldShowSidebar) return

    const loadNavigation = async () => {
      try {
        const { getDocsNavigation, docsNavigationToLayout } = await import('@lnd/utils/content')
        const navigationConfig = await getDocsNavigation()
        const layoutNavigation = docsNavigationToLayout(navigationConfig)
        
        // Merge with existing fallback navigation instead of replacing
        setNavigationItems(prev => layoutNavigation.length > 0 ? layoutNavigation : prev)
      } catch (error) {
        console.warn('Failed to load navigation:', error)
        // Keep existing fallback navigation - don't override
      }
    }
    
    loadNavigation()
  }, [shouldShowSidebar])

  const value: SidebarContextType = {
    isSidebarOpen,
    setIsSidebarOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    navigationItems,
    setNavigationItems,
    isTocOpen,
    setIsTocOpen,
    tableOfContents,
    setTableOfContents
  }

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  )
}
