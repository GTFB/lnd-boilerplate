'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from './button'
import { Input } from './input'

export interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimated, setIsAnimated] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Handle delayed rendering for smooth animations
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true)
      // Запускаем анимацию через микротаск для правильного рендера
      const timer = setTimeout(() => setIsAnimated(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsAnimated(false)
      // Delay hiding to allow close animation
      const timer = setTimeout(() => setShouldRender(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Delay focus to allow animation to start
      const timer = setTimeout(() => {
        inputRef.current?.focus()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.classList.remove('modal-open')
    }
  }, [isOpen, onClose])

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    
    // Mock search results - replace with actual search implementation
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: 'Getting Started', url: '/docs/getting-started', type: 'Documentation', excerpt: 'Quick start guide for LND Boilerplate...' },
        { id: 2, title: 'Installation Guide', url: '/docs/installation', type: 'Documentation', excerpt: 'Step-by-step installation instructions...' },
        { id: 3, title: 'Configuration', url: '/docs/configuration', type: 'Documentation', excerpt: 'Configure your project settings...' },
        { id: 4, title: 'Blog Post Example', url: '/blog/example', type: 'Blog', excerpt: 'An example blog post about web development...' }
      ].filter(result => 
        result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      )
      
      setResults(mockResults)
      setIsLoading(false)
    }, 300)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleResultClick = (result: any) => {
    // Navigate to result
    window.location.href = result.url
    onClose()
  }

  if (!shouldRender) return null

  return (
    <div className="search-modal">
      {/* Overlay with backdrop blur and animation */}
      <div 
        className={`fixed inset-0 bg-background/20 backdrop-blur-md z-50 transition-all ease-out ${
          isAnimated ? 'opacity-100 duration-500' : 'opacity-0 duration-300'
        }`}
        onClick={onClose}
      />
      
      {/* Modal with smooth animations */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
        <div 
          className={`bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden transition-all ease-out transform ${
            isAnimated 
              ? 'opacity-100 scale-100 translate-y-0 duration-500 delay-100' 
              : 'opacity-0 scale-90 -translate-y-8 duration-300'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Search</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>

          {/* Search Input */}
          <div className="p-4 border-b">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search documentation, blog posts, and more..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value)
                    handleSearch(e.target.value)
                  }}
                  className="w-full pl-10"
                />
                <svg 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto max-h-96">
            {isLoading ? (
              <div className="p-4 text-center text-muted-foreground">
                <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-4 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {result.type}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {result.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {result.excerpt}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {result.url}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="p-4 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                Start typing to search...
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t bg-muted/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Press Esc to close</span>
              <span>Use ↑↓ to navigate, Enter to select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
