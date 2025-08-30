'use client'

import React, { useState, useEffect } from 'react'
import { Menu, X, Search } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '../../lib/utils'
import { ThemeToggle } from '../ui/ThemeToggle'
import { SearchModal } from '../ui/SearchModal'
import { useSearchDocuments } from '../../hooks/useSearchDocuments'
import { useSiteConfig } from '../../providers/SiteConfigProvider'
import { useSidebar } from '../../contexts/SidebarContext'

export interface HeaderProps {
  className?: string
}

export function Header({ className }: HeaderProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { documents: searchDocuments, isLoading: isSearchLoading, error: searchError } = useSearchDocuments()
  const { config: siteConfig } = useSiteConfig()
  
  // Get search state from sidebar context for docs pages
  const sidebarContext = pathname.startsWith('/docs') ? useSidebar() : null

  // Navigation items from site.config.json (simple menu)
  const navigationItems = (() => {
    if (!siteConfig) {
      // Fallback navigation items when siteConfig is not loaded yet
      return [
        { name: 'Home', href: '/' },
        { name: 'Blog', href: '/blog' },
        { name: 'Docs', href: '/docs' },
        { name: 'Experts', href: '/experts' },
        { name: 'Legal', href: '/legal' },
        { name: 'Contacts', href: '/contact' }
      ]
    }
    
    const blogPath = siteConfig.getFeatureConfig('blog')?.path ?? '/blog'
    const docsPath = siteConfig.getFeatureConfig('documentation')?.path ?? '/docs'
    return [
      { name: 'Home', href: '/' },
      { name: 'Blog', href: blogPath },
      { name: 'Docs', href: docsPath },
      { name: 'Experts', href: '/experts' },
      { name: 'Legal', href: '/legal' },
      { name: 'Contacts', href: '/contact' }
    ]
  })() || []

  // Log search loading state for debugging
  useEffect(() => {
    if (searchError) {
      console.error('Search documents loading error:', searchError)
    }
    if (!isSearchLoading && searchDocuments.length > 0) {
      console.log('Search documents loaded:', searchDocuments.length, 'documents')
    }
  }, [isSearchLoading, searchDocuments, searchError])

  // Handle Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <header className={cn('sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40', className)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold text-foreground">
                  LND
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navigationItems?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-sans text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>



            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="py-1 px-1 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                aria-label="Toggle mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-border/40">
              <nav className="py-4 space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 font-sans text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        documents={searchDocuments}
        isLoading={isSearchLoading}
      />
    </>
  )
}
