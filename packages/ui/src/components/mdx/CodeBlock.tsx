'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
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
  const [copied, setCopied] = useState(false)

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
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  )
}
