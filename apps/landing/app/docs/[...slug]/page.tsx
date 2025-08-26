import { PublicLayout } from '@lnd/ui/templates'
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider'
import { getDocsPage, getDocsMeta, docsMetaToNavigation } from '@lnd/utils/content/server'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { HeadingWithLink, CodeBlock, InlineCode, EnhancedLink, TocUpdater } from '@lnd/ui'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'

interface DocsPageProps {
  params: {
    slug: string[]
  }
}

// Generate static params for all docs pages
export async function generateStaticParams() {
  const { getDocsPages } = await import('@lnd/utils/content/server')
  const pages = await getDocsPages()
  
  return pages.map((page) => ({
    slug: page.slug.split('/')
  }))
}

// Generate SEO metadata for the docs page
export async function generateMetadata({ params }: DocsPageProps) {
  const slug = params.slug.join('/')
  const page = await getDocsPage(slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested documentation page could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${page.frontmatter.title} - LND Boilerplate Docs`,
    description: page.frontmatter.description,
    keywords: ['documentation', 'guide', 'tutorial'],
    type: 'article',
    url: `https://lnd-boilerplate.com/docs/${slug}`
  }, {
    siteName: 'LND Boilerplate',
    siteUrl: 'https://lnd-boilerplate.com'
  })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// Функция для генерации ID из заголовка
function generateHeadingId(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '') // Удаляем дефисы в начале и конце
    .trim()
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = params.slug.join('/')
  
  // Skip search-results page as it's handled separately
  if (slug === 'search-results') {
    notFound()
  }
  
  const page = await getDocsPage(slug)
  
  if (!page) {
    notFound()
  }

  const meta = await getDocsMeta()
  const navigationItems = docsMetaToNavigation(meta)
  
  // Generate table of contents from content
  const toc = page.content
    .split('\n')
    .filter(line => line.startsWith('#'))
    .map(line => {
      const level = line.match(/^#+/)![0].length
      const title = line.replace(/^#+\s*/, '')
      const id = generateHeadingId(title)
      
      return { id, title, level }
    })

  return (
    <SiteConfigProvider>
      <PublicLayout>
        <TocUpdater tableOfContents={toc} />
        <div className="container mx-auto py-4 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
          <MDXRemote 
            source={page.content}
            components={{
              h1: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={1} {...props}>{children}</HeadingWithLink>
              },
              h2: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={2} {...props}>{children}</HeadingWithLink>
              },
              h3: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={3} {...props}>{children}</HeadingWithLink>
              },
              h4: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={4} {...props}>{children}</HeadingWithLink>
              },
              h5: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={5} {...props}>{children}</HeadingWithLink>
              },
              h6: ({ children, ...props }) => {
                const id = generateHeadingId(children?.toString() || '')
                return <HeadingWithLink id={id} level={6} {...props}>{children}</HeadingWithLink>
              },
              code: ({ children, className, ...props }) => {
                const isInline = !className
                if (isInline) {
                  return <InlineCode {...props}>{children}</InlineCode>
                }
                // Для блочного кода не рендерим здесь, это сделает pre
                return <code className={className} {...props}>{children}</code>
              },
              pre: ({ children, ...props }) => {
                return <CodeBlock {...props}>{children}</CodeBlock>
              },
              a: ({ children, href, ...props }) => {
                return <EnhancedLink href={href} {...props}>{children}</EnhancedLink>
              },
              input: ({ type, checked, ...props }) => {
                if (type === 'checkbox') {
                  return <input type="checkbox" checked={checked} readOnly {...props} />
                }
                return <input type={type} {...props} />
              },
              img: ({ src, alt, ...props }) => {
                return <img src={src} alt={alt} className="rounded-lg shadow-sm max-w-full h-auto mb-6" {...props} />
              }
            }}
          />
        </div>
          </div>
        </div>
      </PublicLayout>
    </SiteConfigProvider>
  )
}
