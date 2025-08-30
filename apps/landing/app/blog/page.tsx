import { PageLayout } from '@lnd/ui/templates/layouts'
import { BlogCard } from '@lnd/ui/components/content'
import { getBlogPosts } from '@lnd/utils/content/server'

export default async function BlogPage() {
  const blogPosts = await getBlogPosts()
  
  // Transform MDX files to BlogCard format
  const normalizedPosts = blogPosts.map(post => ({
    id: post.slug,
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    coverImage: post.frontmatter.coverImage || post.frontmatter.image || 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
    tags: post.frontmatter.tags || [],
    date: post.frontmatter.date,
    authorId: post.frontmatter.author || 'lnd-team',
    authorName: post.frontmatter.author || 'LND Team',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    category: post.frontmatter.category || 'general',
    readTime: '5 min read',
    href: `/blog/${post.slug}`
  }))

  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Блог LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Изучайте современные подходы к разработке, лучшие практики и полезные советы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normalizedPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}