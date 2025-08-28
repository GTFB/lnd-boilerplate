"use client"

import { PageLayout } from '@lnd/ui/templates'

interface LegalPageProps {
  params: {
    slug: string
  }
}

export default function LegalPage({ params }: LegalPageProps) {
  // Mock data for now since we can't use server functions in client components
  const page = {
    frontmatter: {
      title: 'Legal Page',
      description: 'Legal page content'
    },
    content: '# Legal Page\n\nThis is legal page content.'
  }

  return (
    <PageLayout
      title={page.frontmatter.title}
      description={page.frontmatter.description}
    >
      <div className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: page.content.replace(/#{1,6}\s+(.+)/g, (match, title) => {
          const level = match.match(/^#+/)[0].length
          return `<h${level}>${title}</h${level}>`
        }) }} />
      </div>
    </PageLayout>
  )
}
