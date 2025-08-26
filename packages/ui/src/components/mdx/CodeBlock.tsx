'use client'

import React from 'react'
import { SyntaxHighlighterClient } from './SyntaxHighlighter'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  title?: string
}

/**
 * CodeBlock - Enhanced code block component
 * 
 * Features:
 * - Syntax highlighting support
 * - Copy to clipboard functionality
 * - Optional title display
 * - Next.js style design
 */
export function CodeBlock({ children, className = '', title }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  // Extract language from className (e.g., "language-javascript" -> "javascript")
  const language = className?.match(/language-(\w+)/)?.[1] || 'text'
  
  // Properly extract code from children
  const extractCodeFromChildren = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return children
    }
    if (typeof children === 'number') {
      return children.toString()
    }
    if (Array.isArray(children)) {
      return children.map(extractCodeFromChildren).join('')
    }
    if (children && typeof children === 'object' && 'props' in children) {
      // Handle React elements
      if (children.props && children.props.children) {
        return extractCodeFromChildren(children.props.children)
      }
    }
    return ''
  }
  
  const code = extractCodeFromChildren(children)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <div className="relative group">
      {title && (
        <div className="flex items-center justify-between px-4 py-2 bg-muted border-b border-border rounded-t-lg">
          <span className="text-sm font-medium text-foreground">{title}</span>
        </div>
      )}
      <div className="relative">
        <div className={`
          rounded-lg overflow-x-auto mb-6 text-left
          ${title ? 'rounded-t-none' : ''}
          ${className}
        `}>
          <SyntaxHighlighterClient 
            code={code} 
            language={language}
            className="text-sm font-mono leading-relaxed"
          />
        </div>
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-background hover:bg-accent text-foreground hover:text-accent-foreground rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-border"
          title="Copy code"
        >
          {copied ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
