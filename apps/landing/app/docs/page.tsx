"use client"

import { BaseLayout } from '@lnd/ui/templates/base/BaseLayout'
import Link from 'next/link'

// Mock data for documentation pages
const mockDocsPages = [
  {
    slug: 'getting-started',
    frontmatter: {
      title: 'Getting Started',
      description: 'Quick start guide for LND Boilerplate'
    }
  },
  {
    slug: 'installation',
    frontmatter: {
      title: 'Installation',
      description: 'Step-by-step installation instructions'
    }
  },
  {
    slug: 'configuration',
    frontmatter: {
      title: 'Configuration',
      description: 'Configure your project settings'
    }
  },
  {
    slug: 'advanced/architecture',
    frontmatter: {
      title: 'Architecture',
      description: 'Understanding the project structure'
    }
  },
  {
    slug: 'advanced/deployment',
    frontmatter: {
      title: 'Deployment',
      description: 'Deploy your application'
    }
  }
]

export default function DocsIndexPage() {
  // Group pages by section
  const sections: Record<string, Array<{
    slug: string;
    frontmatter: {
      title: string;
      description: string;
    };
  }>> = {}
  const rootPages: Array<{
    slug: string;
    frontmatter: {
      title: string;
      description: string;
    };
  }> = []
  
  mockDocsPages.forEach(page => {
    if (page.slug.includes('/')) {
      const [section] = page.slug.split('/')
      if (!sections[section]) {
        sections[section] = []
      }
      sections[section].push(page)
    } else {
      rootPages.push(page)
    }
  })
  
  return (
    <BaseLayout layout="single-column" pageType="documentation">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-12 text-left">
          <h1 className="font-heading text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
            Documentation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
            Complete documentation for LND Boilerplate
          </p>
        </header>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="font-heading">Welcome to LND Boilerplate</h2>
          <p>Here you&apos;ll find everything you need to get started and build amazing web applications.</p>
          
          {/* Root level pages */}
          {rootPages.length > 0 && (
            <>
              <h3 className="font-heading">Getting Started</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {rootPages.map((page) => (
                  <div key={page.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                    <h4 className="text-lg font-semibold mb-3 font-heading">
                      <Link href={`/docs/${page.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        {page.frontmatter.title || page.slug}
                      </Link>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {page.frontmatter.description || 'No description available'}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {/* Section pages */}
          {Object.entries(sections).map(([sectionName, pages]) => (
            <div key={sectionName} className="mt-12">
              <h3 className="font-heading capitalize text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 tracking-tight">
                {sectionName.replace('-', ' ')}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                {pages.map((page) => (
                  <div key={page.slug} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
                    <h4 className="text-lg font-semibold mb-3 font-heading">
                      <Link href={`/docs/${page.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                        {page.frontmatter.title || page.slug.split('/').pop()}
                      </Link>
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {page.frontmatter.description || 'No description available'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
