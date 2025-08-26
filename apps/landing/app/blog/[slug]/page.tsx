import { PageLayout } from '@lnd/ui/templates'
import { getBlogPost, getExpert, getBlogPosts } from '@lnd/utils/content'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'
import InfiniteScrollManager from './InfiniteScrollManager'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate SEO metadata for the blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${post.frontmatter.title} - LND Boilerplate Blog`,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags || [],
    type: 'article',
    url: `https://lnd-boilerplate.com/blog/${params.slug}`,
    publishedTime: post.frontmatter.date,
    author: post.frontmatter.authorId,
    section: post.frontmatter.category,
    tags: post.frontmatter.tags
  }, {
    siteName: 'LND Boilerplate',
    siteUrl: 'https://lnd-boilerplate.com'
  })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }

  // Get all posts to find neighbors
  const allPosts = await getBlogPosts()
  const sortedPosts = allPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
  
  const currentIndex = sortedPosts.findIndex(p => p.slug === params.slug)
  const previousPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null

  const author = post.frontmatter.authorId ? await getExpert(post.frontmatter.authorId) : null
  const frontmatter = normalizeFrontmatter({
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    author: author?.name || post.frontmatter.authorId,
    authorId: post.frontmatter.authorId,
    tags: post.frontmatter.tags,
    category: post.frontmatter.category,
    image: post.frontmatter.coverImage || post.frontmatter.image,
    coverImage: post.frontmatter.coverImage || post.frontmatter.image,
    draft: post.frontmatter.draft,
    featured: post.frontmatter.featured
  })

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
          previous: previousPost ? {
            slug: previousPost.slug,
            title: previousPost.frontmatter.title,
            date: previousPost.frontmatter.date
          } : null,
          next: nextPost ? {
            slug: nextPost.slug,
            title: nextPost.frontmatter.title,
            date: nextPost.frontmatter.date
          } : null
        }}
        onUrlChange={(slug) => {
          // Update URL without page reload
          if (typeof window !== 'undefined') {
            window.history.pushState(null, '', `/blog/${slug}`)
          }
        }}
      />
    </PageLayout>
  )
}
