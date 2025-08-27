'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../components/navigation'
import { Footer } from '../components/navigation'
import { UISidebarProvider } from '../components/ui/index'
import { DocsSidebar } from '../components/docs'
import { useSidebar } from '../contexts/SidebarContext'

interface PublicLayoutProps {
  children: React.ReactNode
}

// Inner component that uses the sidebar context
const PublicLayoutInner: React.FC<PublicLayoutProps> = ({ children }) => {
  const pathname = usePathname()
  const [readingProgress, setReadingProgress] = useState(0)
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
        {!isSidebarOpen && (
          <button
            onClick={() => {
              console.log('3 dots clicked, showing sidebar')
              setIsSidebarOpen(true)
            }}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Show sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
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
        <button
          onClick={() => {
            console.log('X clicked, hiding sidebar')
            setSearchQuery('')
            setSearchResults([])
            setIsSidebarOpen(false)
          }}
          className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
          title="Clear search and hide sidebar"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Search Results */}
      {searchQuery && (
        <div className="max-h-64 overflow-y-auto">
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
        </div>
      )}
    </div>
  )

  // Scroll spy logic moved to component level
  const [activeTocId, setActiveTocId] = useState<string | null>(null)
  
  useEffect(() => {
    if (!shouldShowSidebar || tableOfContents.length === 0) return

    const updateActiveItem = () => {
      const scrollPosition = window.scrollY + 100 // Offset for header
      
      // Find all headings on the page
      const headings = tableOfContents
        .map(item => document.getElementById(item.id))
        .filter(Boolean)
        .sort((a, b) => a!.offsetTop - b!.offsetTop)
      
      // Find active heading
      let current = null
      for (const heading of headings) {
        if (heading && heading.offsetTop <= scrollPosition) {
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
  }, [shouldShowSidebar, tableOfContents])

  const renderTableOfContents = () => {
    if (!shouldShowSidebar || tableOfContents.length === 0) return null

    const tocData = tableOfContents.map(item => ({
      title: item.title,
      url: `#${item.id}`,
      depth: item.level
    }))

    return (
      <div className={`hidden xl:block transition-all duration-300 ${isTocOpen ? 'opacity-100 w-full' : 'opacity-0 w-0 overflow-hidden'}`}>
        <div className="sticky top-8 h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide bg-sidebar-background pl-4 pr-2">
          <div className="space-y-2 pt-0">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">On this page</h3>
            <nav className="">
              {tocData.map((item, index) => {
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
                    className={`block text-[0.8rem] no-underline transition-colors cursor-pointer text-left relative pl-4 h-7 border-l border-muted-foreground/20 flex items-center ${
                      isActive 
                        ? 'text-foreground font-medium border-foreground' 
                        : 'text-muted-foreground hover:text-foreground'
                    } ${
                      item.depth === 1 ? '' : item.depth === 2 ? 'pl-8' : 'pl-12'
                    }`}
                  >
                    {item.title}
                  </a>
                )
              })}
            </nav>
          </div>
          {/* Gradient at bottom */}
          <div className="sticky bottom-0 h-8 bg-gradient-to-t from-sidebar-background to-transparent pointer-events-none" />
        </div>
      </div>
    )
  }

  if (shouldShowSidebar) {
    return (
      <div className="min-h-screen flex flex-col">
        {/* Reading progress bar */}
        <div className="fixed top-0 start-0 w-full h-1 bg-muted z-50">
          <div 
            className="h-full bg-primary transition-all duration-150 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
        
        <Header />
        
        {/* TOC toggle button - only show when TOC is hidden */}
        {tableOfContents.length > 0 && !isTocOpen && (
          <button
            onClick={() => setIsTocOpen(true)}
            className="fixed top-20 end-4 z-40 p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent"
            title="Show TOC"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        
        {/* Main content area with proper spacing */}
        <div className="flex-1 container mx-auto px-2 lg:px-4 py-8">
          <UISidebarProvider>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Sidebar Column - Left */}
              <aside className="lg:col-span-3">
                <div className="sticky top-24 w-full max-w-80 max-h-[400px] lg:max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide bg-sidebar-background rounded-lg pb-4 pl-0 relative">
                  <DocsSidebar 
                    tree={sidebarTree} 
                    searchComponent={searchComponent}
                  />
                  {/* Horizontal gradient overlay at right */}
                  <div className="absolute top-0 right-0 w-12 h-full bg-gradient-to-l from-sidebar-background via-sidebar-background/90 to-transparent pointer-events-none" />
                  {/* Gradient at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-sidebar-background via-sidebar-background/90 to-transparent pointer-events-none" />
                </div>
              </aside>
              
              {/* Main Content Column - Center */}
              <main className={`px-4 ${!isTocOpen ? 'lg:col-span-9' : 'lg:col-span-7'}`}>
                {renderBreadcrumbs()}
                {children}
              </main>

              {/* TOC Column - Right */}
              <aside className={`${isTocOpen ? 'lg:col-span-2' : 'hidden'}`}>
                {isTocOpen && (
                  <div className="sticky top-24 h-fit flex flex-col">
                    {/* TOC Content with scrollable area */}
                    <div className="max-w-80 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide pb-6 relative">
                      <div className="whitespace-nowrap">
                        {renderTableOfContents()}
                      </div>
                      {/* Horizontal gradient overlay at right */}
                      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none" />
                    </div>
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
                  </div>
                )}
              </aside>

            </div>
          </UISidebarProvider>
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
