'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle,
  Copy,
  ExternalLink
} from 'lucide-react'

export interface MdxContentProps {
  children: React.ReactNode
  className?: string
  showTableOfContents?: boolean
  showProgressBar?: boolean
}

// Компоненты для MDX
const MdxComponents = {
  // Заголовки
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 mt-8 first:mt-0" 
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4" 
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-4" 
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-3" 
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 
      className="scroll-m-20 text-lg font-semibold tracking-tight mt-4 mb-2" 
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 
      className="scroll-m-20 text-base font-semibold tracking-tight mt-4 mb-2" 
      {...props}
    >
      {children}
    </h6>
  ),

  // Параграфы
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4" {...props}>
      {children}
    </p>
  ),

  // Списки
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  // Ссылки
  a: ({ children, href, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith('http')
    return (
      <a
        href={href}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80 transition-colors inline-flex items-center gap-1"
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
        {isExternal && <ExternalLink className="h-3 w-3" />}
      </a>
    )
  },

  // Код
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className?.includes('language-')
    if (isInline) {
      return (
        <code 
          className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold" 
          {...props}
        >
          {children}
        </code>
      )
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },

  // Блоки кода
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="relative group">
      <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4" {...props}>
        {children}
      </pre>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => {
          const codeElement = (children as any)?.props?.children
          if (codeElement) {
            navigator.clipboard.writeText(codeElement)
          }
        }}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  ),

  // Блоки
  blockquote: ({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),

  // Таблицы
  table: ({ children, ...props }: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className="border-b bg-muted/50" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className="divide-y" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="hover:bg-muted/50 transition-colors" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className="p-2 text-left font-medium" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className="p-2" {...props}>
      {children}
    </td>
  ),

  // Горизонтальная линия
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-8 border-muted" {...props} />
  ),

  // Изображения
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      src={src}
      alt={alt}
      className="rounded-lg border bg-muted"
      {...props}
    />
  ),

  // Алерты
  Alert: ({ 
    children, 
    variant = 'info',
    title,
    ...props 
  }: {
    children: React.ReactNode
    variant?: 'info' | 'warning' | 'success' | 'error'
    title?: string
  }) => {
    const variants = {
      info: { icon: <Info className="h-4 w-4" />, className: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200' },
      warning: { icon: <AlertTriangle className="h-4 w-4" />, className: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-800 dark:text-yellow-200' },
      success: { icon: <CheckCircle className="h-4 w-4" />, className: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200' },
      error: { icon: <XCircle className="h-4 w-4" />, className: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200' }
    }

    const { icon, className } = variants[variant]

    return (
      <div className={`border rounded-lg p-4 ${className}`} {...props}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-0.5">
            {icon}
          </div>
          <div className="flex-1">
            {title && (
              <h4 className="font-medium mb-2">{title}</h4>
            )}
            <div className="text-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  },

  // Карточки
  Card: ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
    <Card {...props}>
      <CardContent className="p-6">
        {children}
      </CardContent>
    </Card>
  ),

  // Бейджи
  Badge: ({ children, variant = 'default', ...props }: {
    children: React.ReactNode
    variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  }) => (
    <Badge variant={variant} {...props}>
      {children}
    </Badge>
  ),

  // Кнопки
  Button: ({ children, variant = 'default', size = 'default', ...props }: {
    children: React.ReactNode
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }) => (
    <Button variant={variant} size={size} {...props}>
      {children}
    </Button>
  )
}

export const MdxContent: React.FC<MdxContentProps> = ({
  children,
  className = '',
  showTableOfContents = false,
  showProgressBar = false
}) => {
  const { currentSystem } = useDesignSystem()

  return (
    <div className={`prose prose-gray dark:prose-invert max-w-none ${className}`}>
      {/* Прогресс бар */}
      {showProgressBar && (
        <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
          <div 
            className="h-full bg-primary transition-all duration-200"
            style={{ width: '0%' }}
            id="mdx-progress-bar"
          />
        </div>
      )}

      {/* Основной контент */}
      <div className="mdx-content">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              ...child.props,
              ...MdxComponents
            })
          }
          return child
        })}
      </div>

      {/* Скрипт для прогресс бара */}
      {showProgressBar && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('scroll', () => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop
                const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
                const scrollPercent = (scrollTop / scrollHeight) * 100
                
                const progressBar = document.getElementById('mdx-progress-bar')
                if (progressBar) {
                  progressBar.style.width = scrollPercent + '%'
                }
              })
            `
          }}
        />
      )}
    </div>
  )
}
