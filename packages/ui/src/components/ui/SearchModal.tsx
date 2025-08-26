'use client'

import { useState, useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'
import { simpleSearch, type SearchDocument } from '@lnd/utils/search/client'

export interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  documents: SearchDocument[]
  isLoading?: boolean
}

export function SearchModal({ isOpen, onClose, documents, isLoading = false }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<ReturnType<typeof simpleSearch>>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      setQuery('')
      setResults([])
      setSelectedIndex(0)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => Math.max(prev - 1, 0))
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].document.url || '/'
            onClose()
          }
          break
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose, results, selectedIndex])

  useEffect(() => {
    if (query.trim()) {
      console.log('Searching for:', query)
      console.log('Available documents:', documents)
      const searchResults = simpleSearch(documents, query, { limit: 10, highlight: true })
      console.log('Search results:', searchResults)
      setResults(searchResults)
      setSelectedIndex(0)
    } else {
      setResults([])
    }
  }, [query, documents])

  const handleResultClick = (result: typeof results[0]) => {
    if (result.document.url) {
      window.location.href = result.document.url
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-start justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className="relative w-full max-w-2xl bg-background border border-border rounded-lg shadow-xl"
        >
          {/* Search Input */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search the site... (Ctrl+K)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-lg border-0 focus:ring-0 focus:outline-none bg-transparent text-foreground placeholder-muted-foreground"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-accent rounded"
                >
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query && results.length > 0 ? (
              <div className="p-2">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={cn(
                      'p-3 rounded-lg cursor-pointer transition-colors',
                      'hover:bg-accent',
                      index === selectedIndex && 'bg-accent'
                    )}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-foreground mb-1">
                          {result.document.title}
                        </h4>
                        {result.document.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.document.excerpt}
                          </p>
                        )}
                        {result.document.url && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {result.document.url}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isLoading ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-lg font-medium">Loading content...</p>
                <p className="text-sm">Indexing MDX files for search</p>
              </div>
            ) : query ? (
              <div className="p-8 text-center text-muted-foreground">
                <svg className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                </svg>
                <p className="text-lg font-medium">No results found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="p-8 text-center text-muted-foreground">
                <svg className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-lg font-medium">Search the site</p>
                <p className="text-sm">Type to start searching through {documents.length} documents...</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border text-xs text-muted-foreground">
            <div className="flex justify-between items-center">
              <span>Use ↑↓ to navigate, Enter to select, Esc to close</span>
              <span>Ctrl+K to open</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
