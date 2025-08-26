import { CollectionLayout } from '@lnd/ui/templates'
import { ProductList } from '@lnd/ui/components/ecommerce'
import { getBlogPosts } from '@lnd/utils/content/server'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'
import type { Viewport } from 'next'

// Generate SEO metadata for the blog page
export const metadata = generateMetadata({
  title: 'Blog - LND Boilerplate',
  description: 'Latest articles, tutorials, and insights about web development and the LND Boilerplate.',
  keywords: ['blog', 'web development', 'tutorials', 'insights', 'LND Boilerplate'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/blog'
}, {
  siteName: 'LND Boilerplate',
  siteUrl: 'https://lnd-boilerplate.com'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  
  // Transform MDX files to ProductList format
  const normalizedPosts = blogPosts.map(post => {
    return normalizeFrontmatter({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      date: post.frontmatter.date,
      author: post.frontmatter.authorId,
      tags: post.frontmatter.tags,
      image: post.frontmatter.coverImage || post.frontmatter.image
    })
    
    return {
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
    }
  })

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