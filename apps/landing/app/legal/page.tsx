import { PublicLayout } from '@lnd/ui/templates'
import { getLegalPages } from '@lnd/utils/content/server'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import Link from 'next/link'
import type { Viewport } from 'next'

// Generate SEO metadata for the legal index page
export const metadata = generateMetadata({
  title: 'Legal - LND Boilerplate',
  description: 'Legal documents and policies for LND Boilerplate.',
  keywords: ['legal', 'terms', 'privacy', 'policy'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/legal'
}, {
  siteName: 'LND Boilerplate',
  siteUrl: 'https://lnd-boilerplate.com'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function LegalIndexPage() {
  const legalPages = await getLegalPages()
  
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Legal Documents
            </h1>
            <p className="text-xl text-gray-600">
              Important legal information and policies for LND Boilerplate.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {legalPages.map((page) => (
              <div key={page.slug} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link href={`/legal/${page.slug}`} className="text-blue-600 hover:text-blue-800">
                    {page.frontmatter.title || page.slug}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4">
                  {page.frontmatter.description || 'Legal document'}
                </p>
                <Link
                  href={`/legal/${page.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                >
                  Read more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
