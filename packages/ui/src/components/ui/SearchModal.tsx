'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from './button'
import { Input } from './input'
import { X, Search } from 'lucide-react'

export interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  documents?: any[]
  isLoading?: boolean
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, documents = [], isLoading: externalIsLoading = false }) => {
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
      // Запускаем backdrop сразу, модал появится с задержкой через CSS
      setIsAnimated(true)
    } else {
      setIsAnimated(false)
      // Delay hiding to allow close animation
      const timer = setTimeout(() => setShouldRender(false), 600)
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
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC для закрытия
      if (e.key === 'Escape') {
        onClose()
      }
      
      // Те же горячие клавиши для закрытия
      const isSearchHotkey = (
        // Английская раскладка: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // Русская раскладка: Ctrl+Л (K на русской раскладке)
        ((e.ctrlKey || e.metaKey) && e.key === 'л') ||
        // Немецкая раскладка: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // Французская раскладка: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k') ||
        // Испанская раскладка: Ctrl+K
        ((e.ctrlKey || e.metaKey) && e.key === 'k')
      )
      
      if (isSearchHotkey) {
        e.preventDefault()
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      
      // Вычисляем ширину скроллбара и сохраняем текущий padding
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      const currentPaddingRight = parseInt(window.getComputedStyle(document.body).paddingRight, 10) || 0
      
      // Устанавливаем CSS переменную для ширины скроллбара
      document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`)
      
      // Сохраняем текущий padding-right в data атрибут
      document.body.setAttribute('data-padding-right', currentPaddingRight.toString())
      
      // Cookie banner остается видимым, модал накладывается поверх него
      
      document.body.classList.add('modal-open')
    } else {
      // Восстанавливаем оригинальный padding-right
      const originalPaddingRight = document.body.getAttribute('data-padding-right')
      if (originalPaddingRight) {
        document.body.style.paddingRight = `${originalPaddingRight}px`
        document.body.removeAttribute('data-padding-right')
      }
      
      // Cookie banner остается видимым
      
      document.body.classList.remove('modal-open')
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [isOpen, onClose])

  const handleSearch = useCallback(async (searchQuery: string) => {
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
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    handleSearch(query)
  }, [handleSearch, query])

  const handleResultClick = useCallback((result: any) => {
    // Navigate to result
    window.location.href = result.url
    onClose()
  }, [onClose])

  if (!shouldRender) return null

  return (
    <div className="search-modal">
      {/* Overlay with backdrop blur and animation */}
      <div 
        className={`fixed inset-0 bg-background/20 backdrop-blur-md z-[70] transition-all ease-out ${
          isAnimated ? 'opacity-100 duration-100' : 'opacity-0 duration-100'
        }`}
        onClick={onClose}
      />
      
      {/* Modal with smooth animations */}
      <div 
        className="fixed inset-0 z-[80] flex items-start justify-center pt-16 px-4" 
        onClick={onClose}
      >
        <div 
          className={`bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden transition-all ease-out transform ${
            isAnimated 
              ? 'opacity-100 scale-100 translate-y-0 duration-500 delay-200' 
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
              <X className="w-5 h-5" />
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
              <span>Press Esc or Ctrl+K to close</span>
              <span>Use ↑↓ to navigate, Enter to select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
