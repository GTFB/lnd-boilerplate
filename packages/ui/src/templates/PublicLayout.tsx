'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'

import { DocsSidebar } from '../components/docs'
import { useSidebar } from '../contexts/SidebarContext'
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react'

interface PublicLayoutProps {
  children: React.ReactNode
}

// Inner component that uses the sidebar context
const PublicLayoutInner: React.FC<PublicLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [readingProgress, setReadingProgress] = useState(0)
  
  // FORCE RENDER DEBUG
  console.log('🔥 PublicLayout RENDERED with pathname:', pathname)
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
  
  // Debug log
  console.log('PublicLayout Debug:', { 
    pathname, 
    shouldShowSidebar, 
    navigationItemsLength: navigationItems.length,
    tableOfContentsLength: tableOfContents.length,
    navigationItems: navigationItems.slice(0, 2), // Show first 2 items
    tableOfContents: tableOfContents.slice(0, 3) // Show first 3 headings
  })

  // Real-time search on input change
  useEffect(() => {
    if (!shouldShowSidebar) return

    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery)
    }, 300) // Debounce search by 300ms

    return () => clearTimeout(timeoutId)
  }, [searchQuery, shouldShowSidebar])

  // Reading progress calculation for docs pages
  useEffect(() => {
    if (!shouldShowSidebar) return

    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [shouldShowSidebar])

  const renderBreadcrumbs = () => {
    if (!shouldShowSidebar) return null

    // Get current path to determine section
    const pathSegments = pathname.split('/').filter(Boolean)
    const section = pathSegments[0] || 'docs' // Default to docs if no section
    
    // Map section to display name
    const sectionNames: Record<string, string> = {
      'docs': 'Documentation',
      'whitepaper': 'White Paper',
      'blog': 'Blog',
      'legal': 'Legal',
      'experts': 'Experts'
    }
    
    const sectionName = sectionNames[section] || section.charAt(0).toUpperCase() + section.slice(1)
    const sectionUrl = `/${section}`

    // Get page title from document title or path
    const pageTitle = typeof document !== 'undefined' ? document.title.split(' - ')[0] : ''
    const isHomePage = pathname === '/docs'

    return (
      <div className="flex items-center gap-4 mb-4">
        {/* Sidebar toggle button - only show when sidebar is closed */}
        <div className={`transition-all duration-300 ease-in-out ${
          !isSidebarOpen 
            ? 'opacity-100 translate-x-0' 
            : 'opacity-0 -translate-x-4 pointer-events-none'
        }`}>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
            title="Show sidebar"
          >
            <PanelLeftOpen className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Home</a>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
          {!isHomePage && pageTitle && pageTitle !== sectionName ? (
            <>
              <a href={sectionUrl} className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors">{sectionName}</a>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 dark:text-gray-100 font-medium">{pageTitle}</span>
            </>
          ) : (
            <span className="text-gray-900 dark:text-gray-100 font-medium">{sectionName}</span>
          )}
        </nav>
      </div>
    )
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      const response = await fetch('/api/search-documents')
      if (response.ok) {
        const data = await response.json()
        const documents = data.documents || []
        
        // Filter only docs documents and search in them
        const docsDocuments = documents.filter((doc: any) => 
          doc.url?.startsWith('/docs/') || doc.url === '/docs' || doc.category === 'documentation'
        )
        
        // More precise text search within docs only
        const queryLower = query.toLowerCase().trim()
        const results = docsDocuments.filter((doc: any) => {
          const title = doc.title?.toLowerCase() || ''
          const content = doc.content?.toLowerCase() || ''
          const description = doc.description?.toLowerCase() || ''
          const excerpt = doc.excerpt?.toLowerCase() || ''
          
          // Search in title (highest priority)
          if (title.includes(queryLower)) return true
          
          // Search in description/excerpt
          if (description.includes(queryLower) || excerpt.includes(queryLower)) return true
          
          // Search in content (lower priority)
          if (content.includes(queryLower)) return true
          
          return false
        })
        
        setSearchResults(results)
      }
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
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
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        {/* Show sidebar toggle button when search is empty, show clear button when search has text */}
        {!searchQuery ? (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
            title={isSidebarOpen ? "Hide sidebar" : "Show sidebar"}
          >
            {isSidebarOpen ? (
              <PanelLeftClose className="w-4 h-4" />
            ) : (
              <PanelLeftOpen className="w-4 h-4" />
            )}
          </button>
        ) : (
          <button
            onClick={() => {
              setSearchQuery('')
              setSearchResults([])
            }}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-accent"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      
      {/* Search Results */}
      <div className={`max-h-64 overflow-y-auto transition-all duration-300 ease-in-out ${
        searchQuery ? 'opacity-100 max-h-64' : 'opacity-0 max-h-0 overflow-hidden'
      }`}>
        {searchQuery && (
          <>
            {isSearching ? (
              <div className="text-sm text-muted-foreground p-2">Searching...</div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground px-2 py-1">Search Results</div>
                {searchResults.map((result, index) => (
                  <a
                    key={index}
                    href={result.url}
                    className="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded transition-colors"
                  >
                    {result.title}
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground p-2">No results found</div>
            )}
          </>
        )}
      </div>
    </div>
  )

  // Scroll spy logic moved to component level
  const [activeTocId, setActiveTocId] = useState<string | null>(null)
  
  useEffect(() => {
    if (!shouldShowSidebar) return

    const updateActiveItem = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header
      
      // Find all headings on the page dynamically
      const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
        .filter(heading => heading.id)
        .map(heading => heading as HTMLElement)
        .sort((a, b) => a.offsetTop - b.offsetTop)
      
      // Find active heading
      let current = null
      for (const heading of headings) {
        if (heading.offsetTop <= scrollPosition) {
          current = heading.id
        } else {
          break
        }
      }
      
      setActiveTocId(current)
    }

    // Update on scroll
    const handleScroll = () => {
      requestAnimationFrame(updateActiveItem)
    }

    // Initialize
    updateActiveItem()
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldShowSidebar])

  const renderTableOfContents = () => {
    // Use TOC from context (set by TocUpdater) or fallback to DOM scanning
    const headings = tableOfContents.length > 0
      ? tableOfContents.map(h => ({
          title: h.title,
          url: `#${h.id}`,
          depth: h.level
        }))
      : (typeof document !== 'undefined'
          ? Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
              .filter(heading => heading.id) // Only headings with IDs
              .map(heading => ({
                title: heading.textContent || '',
                url: `#${heading.id}`,
                depth: parseInt(heading.tagName.charAt(1)) // h1=1, h2=2, etc.
              }))
          : [])

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
          {headings.map((item, index) => {
            const elementId = item.url.replace('#', '')
            const isActive = activeTocId === elementId

            return (
              <a
                key={index}
                href={item.url}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.getElementById(elementId)
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                }}
                className={`block text-[0.8rem] no-underline transition-all duration-200 cursor-pointer text-left relative h-7 border-l border-muted-foreground/20 flex items-center whitespace-nowrap ${
                  isActive
                    ? 'text-foreground font-medium border-black'
                    : 'text-muted-foreground hover:text-foreground'
                } ${
                  item.depth === 1 ? 'pl-4 hover:pl-6' : item.depth === 2 ? 'pl-6 hover:pl-8' : 'pl-8 hover:pl-10'
                }`}
              >
                {item.title}
              </a>
            )
          })}
        </nav>
      </div>
    )
  }

    // Always force show sidebar for debugging
    if (true) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Reading progress bar */}
        <div className="fixed bottom-0 start-0 w-full h-1 bg-muted z-50">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out rounded-r-full"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        
        <Header />
        
        {/* Main content area - Fixed container with 3-column grid */}
        <div className="flex-1">
          <div className="mx-auto max-w-1480 px-5 py-5">
            <div className="grid grid-cols-12 gap-5">
              
              {/* Left Sidebar - Column 1-3 */}
              <aside className="col-span-3" style={{backgroundColor: 'red', minHeight: '200px'}}>
                <div className="sticky top-24 bg-white rounded-lg p-4 shadow-sm">
                  <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
                    {navigationItems.length > 0 ? (
                      <DocsSidebar 
                        tree={sidebarTree} 
                        searchComponent={searchComponent}
                      />
                    ) : (
                      <div>
                        <h3 className="font-semibold text-sm text-gray-900 mb-4">Documentation</h3>
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
              
              {/* Main Content - Column 4-9 */}
              <main className="col-span-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  {renderBreadcrumbs()}
                  <div className="prose prose-lg max-w-none">
                    {children}
                  </div>
                </div>
              </main>
              
              {/* Right Sidebar (TOC) - Column 10-12 */}
              <aside className="col-span-3" style={{backgroundColor: 'blue', minHeight: '200px'}}>
                <div className="sticky top-24 bg-white rounded-lg p-4 shadow-sm">
                  <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
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
        
        <Footer />
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
      <Footer />
    </div>
  )
}

// Main component that uses the sidebar context
export const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  return <PublicLayoutInner>{children}</PublicLayoutInner>
}
