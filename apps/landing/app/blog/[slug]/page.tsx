"use client"

import { PageLayout } from '@lnd/ui/templates'
import InfiniteScrollManager from './InfiniteScrollManager'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  // Mock data for now since we can't use server functions in client components
  const post = {
    slug: params.slug,
    frontmatter: {
      title: 'Blog Post',
      description: 'Blog post content',
      date: new Date().toISOString(),
      authorId: 'author',
      tags: [],
      category: 'general',
      coverImage: null,
      image: null,
      draft: false,
      featured: false
    },
    content: '# Blog Post\n\nThis is a blog post content.'
  }

  const frontmatter = {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    author: post.frontmatter.authorId,
    authorId: post.frontmatter.authorId,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    image: post.frontmatter.coverImage || post.frontmatter.image,
    coverImage: post.frontmatter.coverImage || post.frontmatter.image,
    draft: post.frontmatter.draft,
    featured: post.frontmatter.featured
  }

  return (
    <PageLayout
      title={frontmatter.title}
      description={frontmatter.description}
      date={frontmatter.date}
      author={frontmatter.author}
      tags={frontmatter.tags}
      category={frontmatter.category}
      coverImage={frontmatter.coverImage}
    >
      <InfiniteScrollManager
        initialPost={{
          slug: post.slug,
          title: post.frontmatter.title,
          content: post.content,
          frontmatter: post.frontmatter
        }}
        neighbors={{
          previous: null,
          next: null
        }}
      />
    </PageLayout>
  )
}
