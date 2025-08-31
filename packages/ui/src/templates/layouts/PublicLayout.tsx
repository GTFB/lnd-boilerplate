'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../../components/common/Header'
import { Footer } from '../../components/common/Footer'
import { DocsSidebar } from '../../components/docs'
import { useSidebar } from '../../contexts/SidebarContext'
import { PanelLeftClose, ChevronDown, ChevronRight, Search } from 'lucide-react'

export interface PublicLayoutProps {
  children: React.ReactNode
}

// Inner component that uses the sidebar context
const PublicLayoutInner: React.FC<PublicLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [readingProgress, setReadingProgress] = useState(0)
  
  // DEBUG
  console.log('PublicLayout rendered for:', pathname)
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    setSearchResults,
    isSearching,
    setIsSearching,
    navigationItems,
    isTocOpen,
    setIsTocOpen,
    tableOfContents
  } = useSidebar()

  // Check if current page should show sidebar
  const shouldShowSidebar = pathname.startsWith('/docs')
  
  // Check if this is home page and should use single column layout
  const isHomePage = pathname === '/'
  const shouldUseSingleColumn = isHomePage || pathname === '/home'
  
  // Force single column for home page
  if (isHomePage) {
    console.log('Forcing single column layout for home page')
  }
  
  // DEBUG: Log layout decisions
  console.log('PublicLayout layout decision:', {
    pathname,
    isHomePage,
    shouldUseSingleColumn,
    shouldShowSidebar
  })
  
  // Log sidebar status
  if (navigationItems.length === 0) {
    console.log('Navigation items not loaded yet for:', pathname)
  }

  const renderTableOfContents = () => {
    const headings = tableOfContents.length > 0
      ? tableOfContents.map(h => ({
          title: h.title,
          url: `#${h.id}`,
          depth: h.level
        }))
      : []

    if (headings.length === 0) {
      return (
        <div className="space-y-2 pt-0">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">On this page</h3>
          <p className="text-xs text-muted-foreground">No headings found</p>
        </div>
      )
    }

    return (
      <div className="space-y-2 pt-0">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">On this page</h3>
        <nav>
          {headings.map((item, index) => (
            <a
              key={index}
              href={item.url}
              className={`block text-[0.8rem] no-underline transition-all duration-200 cursor-pointer text-left relative h-7 border-l border-muted-foreground/20 flex items-center text-muted-foreground hover:text-foreground ${
                item.depth === 1 ? 'pl-4 hover:pl-6' : item.depth === 2 ? 'pl-6 hover:pl-8' : 'pl-8 hover:pl-10'
              }`}
            >
              {item.title}
            </a>
          ))}
        </nav>
      </div>
    )
  }

  const renderBreadcrumbs = () => {
    const parts = pathname.split('/').filter(Boolean)
    const crumbs: Array<{ href: string; label: string }> = []
    let acc = ''
    for (const part of parts) {
      acc += `/${part}`
      const navItem = navigationItems
        .flatMap(s => [s, ...(s.children || [])])
        .find((i: any) => i.href === acc)
      crumbs.push({ href: acc, label: navItem?.title || part.replace(/-/g, ' ') })
    }
    return (
      <nav className="text-sm text-muted-foreground">
        <a href="/" className="hover:text-foreground">Home</a>
        {crumbs.map((c, i) => (
          <span key={c.href}>
            <span className="mx-2">/</span>
            {i < crumbs.length - 1 ? (
              <a href={c.href} className="hover:text-foreground capitalize">{c.label}</a>
            ) : (
              <span className="text-foreground font-medium capitalize">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    )
  }

  // Create sidebar tree structure
  const sidebarTree = {
    children: navigationItems.map(item => ({
      $id: item.href,
      name: item.title,
      type: 'folder' as const,
      children: item.children?.map((child: { href: string; title: string }) => ({
        $id: child.href,
        name: child.title,
        type: 'page' as const,
        url: child.href
      }))
    }))
  }

  const searchComponent = (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documentation..."
              className="w-full ps-10 pe-4 py-2 border border-input rounded-md focus:border-ring bg-background text-sm"
            />
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Add effects for DOM-based sidebar control
  useEffect(() => {
    const gridContainer = document.getElementById('grid-container')
    const leftSidebar = document.querySelector('.left-sidebar')
    
    const hideSidebar = () => {
      if (window.innerWidth <= 1023) {
        // On mobile use class for smooth animation
        leftSidebar?.classList.remove('mobile-expanded')
      } else {
        // On desktop use grid class
        gridContainer?.classList.add('sidebar-hidden')
      }
    }
    
    const showSidebar = () => {
      if (window.innerWidth <= 1023) {
        // On mobile use class for smooth animation
        leftSidebar?.classList.add('mobile-expanded')
      } else {
        // On desktop use grid class
        gridContainer?.classList.remove('sidebar-hidden')
      }
    }
    
    // Use event delegation - listen for clicks on entire document
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('#hide-sidebar-btn')) {
        hideSidebar()
      } else if (target.closest('#show-sidebar-btn')) {
        showSidebar()
      }
    }
    
    document.addEventListener('click', handleClick)
    
    // Auto-hide on mobile
    if (window.innerWidth <= 1023) {
      hideSidebar()
    }
    
    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Render docs grid layout only for docs pages
  if (shouldShowSidebar) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        {/* Main content area - Fixed container with 3-column grid */}
        <div className="flex-1">
          <div className="mx-auto max-w-1480 px-5">
            <div 
              id="grid-container"
              className="grid-container transition-all duration-400"
            >
              
              {/* Left Sidebar */}
              <aside className="left-sidebar"> 
                <div className="sticky top-24 rounded-lg p-0 shadow-none">
                  <div className="max-h-[calc(100vh-12rem)] overflow-y-auto  scrollbar-hide">
                    {navigationItems.length > 0 ? (
                      <DocsSidebar
                        items={navigationItems}
                      />
                    ) : (
                      <div>
                        {/* fallback items */}
                        <div className="space-y-2">
                          <a href="/docs/introduction" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Introduction</a>
                          <a href="/docs/installation" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Installation</a>
                          <a href="/docs/getting-started/quick-start" className="block px-3 py-2 text-sm text-gray-600 hover:text-gray-900">Quick Start</a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
              
              {/* Main Content */}
              <main className="content">
                <div className="p-0">
                  {/* Content header: show-sidebar button + breadcrumbs */}
                  <div className="content-header flex items-center gap-4 mb-6">
                    {!isSidebarOpen && (
                      <button
                        id="show-sidebar-btn"
                        className="flex-shrink-0 text-gray-500 hover:text-black transition-colors"
                        title="Open Menu"
                      >
                        <PanelLeftClose size={16} className="mobile-hide" />
                        <ChevronDown size={16} className="mobile-show" />
                      </button>
                    )}
                    <div className="breadcrumbs flex-1 flex items-center">
                      {renderBreadcrumbs()}
                    </div>
                  </div>
                  <div className="max-w-none w-full" style={{ width: '100%', maxWidth: 'none' }}>
                    {children}
                  </div>
                </div>
              </main>
              
              {/* Right Sidebar (TOC) */}
              <aside className="right-sidebar" style={{ order: 3 }}>
                <div className="sticky top-24 rounded-lg p-0 shadow-none">
                  <div className="max-h-[calc(100vh-12rem)] overflow-y-auto  scrollbar-hide">
                    {tableOfContents.length > 0 ? (
                      renderTableOfContents()
                    ) : (
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 mb-4">On this page</h3>
                        <div className="space-y-2">
                          <div className="text-xs text-gray-500">Table of contents will appear here</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </aside>
              
            </div>
          </div>
        </div>
        
        <Footer showScrollProgress={true} showBackToTop={true} />
      </div>
    )
  }

  // Single column layout for home page
  if (shouldUseSingleColumn) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <div className="mx-auto max-w-[1480px] px-4 py-8">
            {children}
          </div>
        </main>
        <Footer showScrollProgress={true} showBackToTop={true} />
      </div>
    )
  }
  
  // Regular layout for non-docs pages
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer showScrollProgress={true} showBackToTop={true} />
    </div>
  )
}

// Main component that uses the sidebar context
export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return <PublicLayoutInner>{children}</PublicLayoutInner>
}