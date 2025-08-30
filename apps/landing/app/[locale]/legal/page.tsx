'use client';

import { PublicLayout } from '@lnd/ui/templates';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function LegalIndexPage() {
  // Mock data for now since we can't use server functions in client components
  const legalPages: Array<{
    slug: string;
    frontmatter: {
      title: string;
      description: string;
    };
  }> = [];

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
            {legalPages.map(page => (
              <div
                key={page.slug}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  <Link
                    href={`/legal/${page.slug}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
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
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
