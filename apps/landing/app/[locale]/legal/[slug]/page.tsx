'use client';

import { PageLayout } from '@lnd/ui/templates';

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export default function LegalPage({ params: { slug } }: LegalPageProps) {
  // Mock data for now since we can't use server functions in client components
  const page = {
    frontmatter: {
      title: `Legal Page - ${slug}`,
      description: 'Legal page content',
    },
    content: `# Legal Page - ${slug}\n\nThis is legal page content for ${slug}.`,
  };

  return (
    <PageLayout>
      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: page.content.replace(/#{1,6}\s+(.+)/g, (match, title) => {
              const levelMatch = match.match(/^#+/);
              const level = levelMatch ? levelMatch[0].length : 1;
              return `<h${level}>${title}</h${level}>`;
            }),
          }}
        />
      </div>
    </PageLayout>
  );
}
