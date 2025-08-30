import { notFound } from 'next/navigation'
import { PublicLayout } from '@lnd/ui/templates'
import { SiteConfigProvider } from '@lnd/ui/providers/SiteConfigProvider'
import { TocUpdater } from '@lnd/ui/components/content/TocUpdater'
import { getDocsPage } from '@lnd/utils/content/readers'
import { MDXRemote } from 'next-mdx-remote/rsc'


interface DocsPageProps {
  params: {
    slug: string[]
  }
}

function extractHeadings(mdx: string): Array<{ id: string; title: string; level: number }> {
  const lines = mdx.split('\n')
  const headings: Array<{ id: string; title: string; level: number }> = []
  for (const line of lines) {
    const match = line.match(/^(#{1,6})\s+(.+)/)
    if (match) {
      const level = match[1].length
      const title = match[2].trim()
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
      headings.push({ id, title, level })
    }
  }

  return headings
}

export default async function DocsPage({ params }: DocsPageProps) {
  const slug = params.slug.join('/')
  const page = await getDocsPage(slug)
  if (!page) return notFound()

  const headings = extractHeadings(page.content)

  return (
    <SiteConfigProvider>
      <PublicLayout>
        <TocUpdater headings={headings} />
        <div className="w-full prose prose-lg max-w-none" style={{ width: '100%', maxWidth: 'none' }}>
          <MDXRemote source={page.content} />
        </div>
      </PublicLayout>
    </SiteConfigProvider>
  )
}
