"use client"

import { CollectionLayout } from '@lnd/ui/templates'
import { ProductList } from '@lnd/ui/components/ecommerce'

export default function BlogPage() {
  // Mock data for now since we can't use server functions in client components
  const blogPosts: Array<{
    slug: string;
    frontmatter: {
      title: string;
      description: string;
      coverImage?: string;
      image?: string;
      tags?: string[];
      date: string;
      authorId: string;
    };
  }> = []
  
  // Transform MDX files to ProductList format
  const normalizedPosts = blogPosts.map(post => ({
    id: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    image: {
      src: post.frontmatter.coverImage || post.frontmatter.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop',
      alt: post.frontmatter.title
    },
    tags: post.frontmatter.tags || [],
    date: post.frontmatter.date,
    author: post.frontmatter.authorId,
    href: `/blog/${post.slug}`
  }))

  return (
    <CollectionLayout
      title="Blog"
      description="Latest articles, tutorials, and insights about web development and the LND Boilerplate."
    >
      <ProductList
        items={normalizedPosts}
        columns={2}
      />
    </CollectionLayout>
  )
}