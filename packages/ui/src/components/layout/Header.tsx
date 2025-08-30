'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useDesignSystem } from '../../design-systems'
import { ThemeToggle } from '../ui'
import { SearchModal } from '../ui'
import { LanguageSelector } from '../ui/LanguageSelector'
import { Search, Menu, X } from 'lucide-react'

export interface HeaderProps {
  showLogo?: boolean
  showMenu?: boolean
  showControls?: boolean
  showOffCanvas?: boolean
  className?: string
}

export const Header: React.FC<HeaderProps> = ({
  showLogo = true,
  showMenu = true,
  showControls = true,
  showOffCanvas = true,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const burgerButtonRef = useRef<HTMLButtonElement>(null)
  const offcanvasRef = useRef<HTMLDivElement>(null)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleOffCanvas = useCallback(() => {
    const newState = !isOffCanvasOpen
    setIsOffCanvasOpen(newState)
    
    // Update aria-expanded for burger button
    if (burgerButtonRef.current) {
      burgerButtonRef.current.setAttribute('aria-expanded', newState.toString())
    }
  }, [isOffCanvasOpen])

  const closeOffCanvas = useCallback(() => {
    setIsOffCanvasOpen(false)
    
    // Return focus to burger button
    setTimeout(() => {
      burgerButtonRef.current?.focus()
    }, 100)
    
    // Update aria-expanded
    if (burgerButtonRef.current) {
      burgerButtonRef.current.setAttribute('aria-expanded', 'false')
    }
  }, [])

  const toggleSearch = useCallback(() => {
    // Prevent rapid clicking that could cause issues
    if (isSearchOpen) {
      // If already open, just close it
      setIsSearchOpen(false)
    } else {
      // If closed, open it
      setIsSearchOpen(true)
    }
  }, [isSearchOpen])

  const handleSearchClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleSearch()
  }, [toggleSearch])

  // Detect OS for keyboard shortcut display
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    setIsMac(userAgent.includes('mac'))
  }, [])

  // Hotkey support for search (Ctrl+K / Cmd+K and other layouts)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check different keyboard layouts
      const isSearchHotkey = (
        // English layout: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // Russian layout: Ctrl+Л (K on Russian layout)
        ((e.ctrlKey || e.metaKey) && e.key === 'л') ||
        // German layout: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // French layout: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // Spanish layout: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k')
      )
      
      if (isSearchHotkey) {
        e.preventDefault()
        toggleSearch()
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleSearch])

  // ESC key support and focus management
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOffCanvasOpen) {
        closeOffCanvas()
      }
    }

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (!isOffCanvasOpen || e.key !== 'Tab') return

      const offcanvas = offcanvasRef.current
      if (!offcanvas) return

      const focusableElements = offcanvas.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    if (isOffCanvasOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('keydown', handleFocusTrap)
      document.body.classList.add('modal-open')
      
      // Focus first element in offcanvas
      setTimeout(() => {
        const firstFocusable = offcanvasRef.current?.querySelector('button') as HTMLElement
        firstFocusable?.focus()
      }, 100)
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleFocusTrap)
      document.body.classList.remove('modal-open')
    }
  }, [isOffCanvasOpen, closeOffCanvas])

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        } ${className}`}
      >
        <div className="max-w-1480 px-5 py-4 ml-0" style={{ margin: '0 auto' }}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            {showLogo && (
              <div className="flex items-center space-x-2 h-10">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <h1 className="text-xl font-bold font-heading">LND Boilerplate</h1>
              </div>
            )}

            {/* Main Menu - Desktop */}
            {showMenu && (
              <nav className="hidden lg:flex items-center space-x-8 h-10" aria-label="Main Navigation">
                <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
                  Home
                </a>
                <a href="/docs" className="text-sm font-medium hover:text-primary transition-colors">
                  Documentation
                </a>
                <a href="/blog" className="text-sm font-medium hover:text-primary transition-colors">
                  Blog
                </a>
                <a href="/experts" className="text-sm font-medium hover:text-primary transition-colors">
                  Experts
                </a>
                <a href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                  Contact
                </a>
              </nav>
            )}

            {/* Controls - Desktop only */}
            {showControls && (
              <div className="hidden lg:flex items-center space-x-2 h-10">
                <button 
                  onClick={handleSearchClick} 
                  className="flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground bg-muted/50 hover:bg-muted rounded-md border transition-colors" 
                  aria-label="Open search"
                >
                  <Search className="w-4 h-4" />
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                    <span className="text-xs">{isMac ? '⌘' : 'Ctrl'}</span>K
                  </kbd>
                </button>
                <LanguageSelector />
                <ThemeToggle />
                <a href="/docs" className="hidden md:inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors h-10">
                  Get Started
                </a>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              ref={burgerButtonRef}
              onClick={toggleOffCanvas}
              className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors h-10 flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded="false"
              aria-haspopup="true"
              aria-controls="offcanvas-menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={toggleSearch} />

      {/* Off-canvas Overlay */}
      {showOffCanvas && (
        <div 
          className={`offcanvas-overlay ${isOffCanvasOpen ? 'is-open' : ''}`}
          onClick={closeOffCanvas}
          aria-hidden={!isOffCanvasOpen}
        />
      )}

      {/* Off-canvas Menu */}
      {showOffCanvas && (
        <div 
          ref={offcanvasRef}
          id="offcanvas-menu"
          className={`offcanvas-menu ${isOffCanvasOpen ? 'is-open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="offcanvas-title"
          aria-hidden={!isOffCanvasOpen}
        >
          <div className="offcanvas-header">
            <button 
              onClick={closeOffCanvas} 
              className="p-2 rounded-md hover:bg-accent transition-colors" 
              aria-label="Close menu"
            >
                              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="offcanvas-content">
            <h2 id="offcanvas-title" className="text-lg font-semibold mb-4">Mobile Navigation</h2>
            
            <nav aria-label="Mobile Navigation">
              <ul className="space-y-3 list-none p-0 m-0">
                <li><a href="/" className="block text-sm font-medium hover:text-primary transition-colors">Home</a></li>
                <li><a href="/docs" className="block text-sm font-medium hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="/blog" className="block text-sm font-medium hover:text-primary transition-colors">Blog</a></li>
                <li><a href="/experts" className="block text-sm font-medium hover:text-primary transition-colors">Experts</a></li>
                <li><a href="/contact" className="block text-sm font-medium hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </nav>
            
            <div className="mt-6 space-y-4">
                             {/* Search Button for Mobile */}
               <button 
                 onClick={(e) => { 
                   e.preventDefault();
                   e.stopPropagation();
                   handleSearchClick(e); 
                   // Delay for smooth transition between modals
                   setTimeout(() => closeOffCanvas(), 100);
                 }} 
                 className="w-full flex items-center space-x-2 py-1 px-1 rounded-md hover:bg-accent transition-colors text-left" 
                 aria-label="Open search"
               >
                <Search className="w-5 h-5" />
                <span className="text-sm font-medium">Search</span>
              </button>
              
              {/* Get Started Button for Mobile */}
              <a href="/docs" className="block w-full text-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
                Get Started
              </a>
              
              {/* Theme and Language Controls */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t">
                <LanguageSelector />
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
