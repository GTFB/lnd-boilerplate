'use client'

import React from 'react'
import { codeToHtml } from 'shiki'

interface SyntaxHighlighterProps {
  code: string
  language?: string
  className?: string
}

export async function SyntaxHighlighter({ code, language = 'text', className = '' }: SyntaxHighlighterProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-light',
    defaultColor: false,
    transformers: [
      {
        name: 'remove-extra-newlines',
        code(node) {
          if (node.children && node.children.length > 0) {
            // Remove leading and trailing newlines
            const firstChild = node.children[0]
            const lastChild = node.children[node.children.length - 1]
            
            if (firstChild?.type === 'text' && firstChild.value.startsWith('\n')) {
              firstChild.value = firstChild.value.replace(/^\n+/, '')
            }
            
            if (lastChild?.type === 'text' && lastChild.value.endsWith('\n')) {
              lastChild.value = lastChild.value.replace(/\n+$/, '')
            }
          }
        }
      }
    ]
  })

  return (
    <div 
      className={`shiki ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

// Client component wrapper for async component
export function SyntaxHighlighterClient({ code, language = 'text', className = '' }: SyntaxHighlighterProps) {
  const [html, setHtml] = React.useState<string>('')
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    const highlightCode = async () => {
      try {
        const result = await codeToHtml(code, {
          lang: language,
          theme: 'github-light',
          defaultColor: false,
          transformers: [
            {
              name: 'remove-extra-newlines',
              code(node) {
                if (node.children && node.children.length > 0) {
                  // Remove leading and trailing newlines
                  const firstChild = node.children[0]
                  const lastChild = node.children[node.children.length - 1]
                  
                  if (firstChild?.type === 'text' && firstChild.value.startsWith('\n')) {
                    firstChild.value = firstChild.value.replace(/^\n+/, '')
                  }
                  
                  if (lastChild?.type === 'text' && lastChild.value.endsWith('\n')) {
                    lastChild.value = lastChild.value.replace(/\n+$/, '')
                  }
                }
              }
            }
          ]
        })
        setHtml(result)
      } catch (error) {
        console.error('Syntax highlighting error:', error)
        setHtml(`<pre><code>${code}</code></pre>`)
      } finally {
        setIsLoading(false)
      }
    }

    highlightCode()
  }, [code, language])

  if (isLoading) {
    return (
      <div className={`bg-muted text-foreground rounded-lg p-4 overflow-x-auto ${className}`}>
        <pre className="text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    )
  }

  return (
    <div 
      className={`shiki ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
