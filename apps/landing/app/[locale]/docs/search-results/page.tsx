import { PublicLayout } from '@lnd/ui/templates';
import { generateMetadata } from '@lnd/utils/seo/metadata';
import type { Viewport } from 'next';

// Generate SEO metadata for the search results page
export const metadata = generateMetadata(
  {
    title: 'Search Results - LND Boilerplate Documentation',
    description: 'Search results for LND Boilerplate documentation.',
    keywords: ['search', 'documentation', 'results', 'LND Boilerplate'],
    type: 'website',
    url: 'https://lnd-boilerplate.com/docs/search-results',
  },
  {
    siteName: 'LND Boilerplate',
    siteUrl: 'https://lnd-boilerplate.com',
  }
);

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function SearchResultsPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <header className="mb-12 text-left">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
              Search Results
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Search results for LND Boilerplate documentation
            </p>
          </header>
          <div className="prose prose-lg max-w-none">
            <p>
              Use the search bar in the sidebar to find documentation articles.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
