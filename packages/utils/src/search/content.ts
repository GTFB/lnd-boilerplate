import { getBlogPosts, getDocsPages, getLegalPages, getExperts } from '../content/readers'
import type { SearchDocument } from './types'

/**
 * Load all content for search indexing
 */
export async function loadSearchDocuments(): Promise<SearchDocument[]> {
  const documents: SearchDocument[] = []

  try {
    // Load blog posts
    const blogPosts = await getBlogPosts()
    for (const post of blogPosts) {
      documents.push({
        id: `blog-${post.slug}`,
        title: post.frontmatter.title || post.slug,
        content: post.content,
        excerpt: post.frontmatter.description || post.content.substring(0, 200) + '...',
        url: `/blog/${post.slug}`,
        tags: post.frontmatter.tags || [],
        category: 'blog',
        author: post.frontmatter.authorId,
        date: post.frontmatter.date,
        metadata: {
          type: 'blog',
          slug: post.slug,
          ...post.frontmatter
        }
      })
    }

    // Load documentation pages
    const docsPages = await getDocsPages()
    for (const page of docsPages) {
      documents.push({
        id: `docs-${page.slug}`,
        title: page.frontmatter.title || page.slug,
        content: page.content,
        excerpt: page.frontmatter.description || page.content.substring(0, 200) + '...',
        url: `/docs/${page.slug}`,
        tags: ['documentation', 'docs'],
        category: 'documentation',
        date: page.frontmatter.date,
        metadata: {
          type: 'docs',
          slug: page.slug,
          ...page.frontmatter
        }
      })
    }

    // Load legal pages
    const legalPages = await getLegalPages()
    for (const page of legalPages) {
      documents.push({
        id: `legal-${page.slug}`,
        title: page.frontmatter.title || page.slug,
        content: page.content,
        excerpt: page.frontmatter.description || page.content.substring(0, 200) + '...',
        url: `/legal/${page.slug}`,
        tags: ['legal', 'policy'],
        category: 'legal',
        date: page.frontmatter.date,
        metadata: {
          type: 'legal',
          slug: page.slug,
          ...page.frontmatter
        }
      })
    }

    // Load experts
    const experts = await getExperts()
    for (const expert of experts) {
      documents.push({
        id: `expert-${expert.slug}`,
        title: expert.frontmatter.name || expert.frontmatter.title,
        content: expert.frontmatter.bio || expert.content,
        excerpt: `${expert.frontmatter.title || expert.frontmatter.name} - ${(expert.frontmatter.bio || expert.content).substring(0, 100)}...`,
        url: `/experts/${expert.slug}`,
        tags: expert.frontmatter.expertise || [],
        category: 'experts',
        metadata: {
          type: 'expert',
          id: expert.slug,
          title: expert.frontmatter.title,
          location: expert.frontmatter.location,
          joined: expert.frontmatter.joined,
          social: expert.frontmatter.social
        }
      })
    }

    // Add static pages
    documents.push(
      {
        id: 'home',
        title: 'Home Page',
        content: 'Welcome to LND Boilerplate - modern web development platform',
        excerpt: 'Modern web development platform built with Next.js 14, TypeScript and Tailwind CSS',
        url: '/',
        tags: ['home', 'platform'],
        category: 'main'
      },
      {
        id: 'blog-index',
        title: 'Blog',
        content: 'Read latest articles about web development and technologies',
        excerpt: 'Articles about web development, technologies and best practices',
        url: '/blog',
        tags: ['blog', 'articles'],
        category: 'content'
      },
      {
        id: 'docs-index',
        title: 'Documentation',
        content: 'Complete documentation for LND Boilerplate - learn how to build modern web applications',
        excerpt: 'Learn how to build modern web applications with LND Boilerplate',
        url: '/docs',
        tags: ['documentation', 'guide'],
        category: 'content'
      },
      {
        id: 'experts-index',
        title: 'Experts',
        content: 'Meet our team of experts and professionals',
        excerpt: 'Meet our team of experts and professionals',
        url: '/experts',
        tags: ['experts', 'team'],
        category: 'content'
      },
      {
        id: 'legal-index',
        title: 'Legal',
        content: 'Legal documents and policies for LND Boilerplate',
        excerpt: 'Legal documents and policies for LND Boilerplate',
        url: '/legal',
        tags: ['legal', 'policy'],
        category: 'content'
      },
      {
        id: 'contact',
        title: 'Contact',
        content: 'Contact us for additional information',
        excerpt: 'Contact form and contact information',
        url: '/contact',
        tags: ['contact', 'support'],
        category: 'company'
      }
    )

  } catch (error) {
    console.error('Error loading search documents:', error)
  }

  return documents
}
