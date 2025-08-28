'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Header } from '../components/navigation'
import { Footer } from '../components/navigation'
import { UISidebarProvider } from '../components/ui/index'
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
    // Dynamically get headings from the page instead of relying on context
    const headings = typeof document !== 'undefined' 
      ? Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
          .filter(heading => heading.id) // Only headings with IDs
          .map(heading => ({
            title: heading.textContent || '',
            url: `#${heading.id}`,
            depth: parseInt(heading.tagName.charAt(1)) // h1=1, h2=2, etc.
          }))
      : []
    
    if (headings.length === 0) {
      return null
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

  if (shouldShowSidebar) {
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
        

        
         {/* Main content area with proper spacing */}
         <div className="flex-1 container mx-auto px-2 lg:px-4 py-8">
           <UISidebarProvider>
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
               
                               {/* Sidebar Column - Left */}
                <aside className={`${
                  isSidebarOpen 
                    ? 'lg:col-span-3' 
                    : 'lg:col-span-0 overflow-hidden'
                } transition-all duration-300 ease-in-out`}>
                  <div className="sticky top-24 w-full max-w-80 h-fit flex flex-col">
                    {/* Sidebar Content with scrollable area */}
                    <div className="max-h-[300px] lg:max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide bg-sidebar-background rounded-lg pb-4 pl-0 relative">
                      <DocsSidebar 
                        tree={sidebarTree} 
                        searchComponent={searchComponent}
                      />
                      {/* Horizontal gradient overlay at right */}
                      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white via-white/95 to-transparent pointer-events-none z-10" />
                    </div>
                    {/* Gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none z-10" />
                  </div>
                </aside>
               
                               {/* Main Content Column - Center */}
                <main className={`transition-all duration-300 ease-in-out ${
                  !isSidebarOpen 
                    ? 'lg:col-span-12 pl-0 ml-0 pr-80' 
                    : 'px-4 lg:col-span-9 xl:col-span-9 2xl:col-span-9 pr-80'
                }`}>
                  {renderBreadcrumbs()}
                  <div 
                    className="[&>*]:!max-w-none [&>*]:!mx-0 [&_.max-w-4xl]:!max-w-none [&_.mx-auto]:!mx-0"
                    style={{
                      '--tw-max-w': 'none',
                      '--tw-mx': '0'
                    } as React.CSSProperties}
                  >
                    {children}
                  </div>
                </main>



             </div>
           </UISidebarProvider>
           
           {/* TOC - Fixed position outside grid, independent of sidebar */}
           <aside className="hidden xl:block fixed right-4 top-24 w-80 z-40">
             <div className="sticky top-24 h-fit flex flex-col">
               {/* TOC Content with scrollable area */}
               <div className="w-full max-w-80 max-h-[calc(100vh-12rem)] overflow-y-auto scrollbar-hide pb-6 relative bg-sidebar-background rounded-lg">
                 {renderTableOfContents()}
                 {/* Horizontal gradient overlay at right */}
                 <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
               </div>
               {/* Gradient overlay at bottom */}
               <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
             </div>
           </aside>
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
