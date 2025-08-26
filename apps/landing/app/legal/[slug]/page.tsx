import { PageLayout } from '@lnd/ui/templates'
import { getLegalPage, getLegalPages } from '@lnd/utils/content/server'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'

interface LegalPageProps {
  params: {
    slug: string
  }
}

// Generate static params for all legal pages
export async function generateStaticParams() {
  const legalPages = await getLegalPages()
  return legalPages.map((page) => ({
    slug: page.slug,
  }))
}

// Generate SEO metadata for the legal page
export async function generateMetadata({ params }: LegalPageProps) {
  const page = await getLegalPage(params.slug)
  
  if (!page) {
    return {
      title: 'Page Not Found',
      description: 'The requested legal page could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${page.frontmatter.title} - LND Boilerplate`,
    description: page.frontmatter.description,
    keywords: ['legal', 'terms', 'privacy', 'policy'],
    type: 'article',
    url: `https://lnd-boilerplate.com/legal/${params.slug}`
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

export default async function LegalPage({ params }: LegalPageProps) {
  const page = await getLegalPage(params.slug)
  
  if (!page) {
    notFound()
  }

  return (
    <PageLayout
      title={page.frontmatter.title}
      description={page.frontmatter.description}
    >
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={page.content} />
      </div>
    </PageLayout>
  )
}
