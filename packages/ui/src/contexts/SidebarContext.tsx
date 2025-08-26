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
  const [navigationItems, setNavigationItems] = useState<any[]>([])
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
        const { getDocsNavigation, docsNavigationToLayout, defaultDocsNavigation } = await import('@lnd/utils/content')
        const navigationConfig = await getDocsNavigation()
        const layoutNavigation = docsNavigationToLayout(navigationConfig)
        setNavigationItems(layoutNavigation)
      } catch (error) {
        console.warn('Failed to load navigation:', error)
        // Use default navigation as fallback
        const { docsNavigationToLayout, defaultDocsNavigation } = await import('@lnd/utils/content')
        const layoutNavigation = docsNavigationToLayout(defaultDocsNavigation)
        setNavigationItems(layoutNavigation)
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
