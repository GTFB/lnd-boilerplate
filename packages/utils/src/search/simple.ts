import type { SearchDocument, SearchResult, SearchOptions } from './types'

// Re-export types for convenience
export type { SearchDocument, SearchResult, SearchOptions }

/**
 * Simple search implementation without external dependencies
 */
export function simpleSearch(
  documents: SearchDocument[],
  query: string,
  options: SearchOptions = {}
): SearchResult[] {
  const { limit = 10, highlight = true, fields = ['title', 'content', 'tags'] } = options
  
  if (!query.trim()) {
    return []
  }
  
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1)
  const results: Array<{ document: SearchDocument; score: number }> = []
  
  documents.forEach(document => {
    let score = 0
    
    // Search in title
    if (fields.includes('title') && document.title) {
      const titleLower = document.title.toLowerCase()
      queryTerms.forEach(term => {
        if (titleLower.includes(term)) {
          score += 3 // Title gets highest weight
        }
      })
    }
    
    // Search in content
    if (fields.includes('content') && document.content) {
      const contentLower = document.content.toLowerCase()
      queryTerms.forEach(term => {
        if (contentLower.includes(term)) {
          score += 1 // Content gets base weight
        }
      })
    }
    
    // Search in tags
    if (fields.includes('tags') && document.tags) {
      const tagsLower = document.tags.map(tag => tag.toLowerCase())
      queryTerms.forEach(term => {
        if (tagsLower.some(tag => tag.includes(term))) {
          score += 2 // Tags get medium weight
        }
      })
    }
    
    // Search in metadata
    if (fields.includes('metadata') && document.metadata) {
      const metadataText = Object.entries(document.metadata)
        .map(([key, value]) => `${key} ${value}`)
        .join(' ')
        .toLowerCase()
      
      queryTerms.forEach(term => {
        if (metadataText.includes(term)) {
          score += 0.5 // Metadata gets lowest weight
        }
      })
    }
    
    if (score > 0) {
      results.push({ document, score })
    }
  })
  
  // Sort by score and limit results
  const sortedResults = results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
  
  // Add highlights if requested
  if (highlight) {
    return sortedResults.map(result => ({
      id: result.document.id,
      score: result.score,
      document: result.document,
      highlights: generateHighlights(result.document, query)
    }))
  }
  
  return sortedResults.map(result => ({
    id: result.document.id,
    score: result.score,
    document: result.document,
    highlights: {}
  }))
}

/**
 * Generate highlights for search results
 */
function generateHighlights(document: SearchDocument, query: string): {
  title?: string[]
  content?: string[]
  tags?: string[]
} {
  const highlights: { title?: string[]; content?: string[]; tags?: string[] } = {}
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 1)
  
  // Highlight title
  if (document.title) {
    highlights.title = highlightText(document.title, queryTerms)
  }
  
  // Highlight content
  if (document.content) {
    highlights.content = highlightText(document.content, queryTerms)
  }
  
  // Highlight tags
  if (document.tags && document.tags.length > 0) {
    highlights.tags = document.tags
      .map(tag => highlightText(tag, queryTerms))
      .flat()
      .filter(Boolean)
  }
  
  return highlights
}

/**
 * Highlight matching terms in text
 */
function highlightText(text: string, queryTerms: string[]): string[] {
  const highlights: string[] = []
  
  queryTerms.forEach(term => {
    if (term.length < 2) return
    
    const regex = new RegExp(`(${escapeRegex(term)})`, 'gi')
    const matches = text.match(regex)
    
    if (matches) {
      matches.forEach(match => {
        const highlighted = text.replace(
          new RegExp(escapeRegex(match), 'gi'),
          `<mark>${match}</mark>`
        )
        highlights.push(highlighted)
      })
    }
  })
  
  return highlights.length > 0 ? highlights : [text]
}

/**
 * Escape regex special characters
 */
function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Create search suggestions
 */
export function createSearchSuggestions(
  documents: SearchDocument[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim()) {
    return []
  }
  
  const suggestions = new Set<string>()
  const queryLower = query.toLowerCase()
  
  documents.forEach(doc => {
    // Suggest from titles
    if (doc.title.toLowerCase().includes(queryLower)) {
      suggestions.add(doc.title)
    }
    
    // Suggest from tags
    if (doc.tags) {
      doc.tags.forEach(tag => {
        if (tag.toLowerCase().includes(queryLower)) {
          suggestions.add(tag)
        }
      })
    }
  })
  
  return Array.from(suggestions).slice(0, limit)
}
