import { PageLayout } from '@lnd/ui/templates'
import { getBlogPost, getBlogPosts } from '@lnd/utils/content/server'
import { notFound } from 'next/navigation'
import { BlogCategories } from '@lnd/ui/components/sidebar/BlogCategories'
import { BlogContent } from '../../../components/BlogContent'

interface BlogPostPageProps {
  params: {
    slug: string
  }
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

  const frontmatter = {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    date: post.frontmatter.date,
    author: post.frontmatter.author || 'LND Team',
    authorId: post.frontmatter.author || 'lnd-team',
    tags: post.frontmatter.tags || [],
    category: post.frontmatter.category || 'general',
    image: post.frontmatter.coverImage || post.frontmatter.image,
    coverImage: post.frontmatter.coverImage || post.frontmatter.image,
    draft: post.frontmatter.draft || false,
    featured: post.frontmatter.featured || false
  }

  return (
    <PageLayout>
      <div className="w-full px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-4">
            {/* Meta Information */}
            <div className="mb-8 space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                {frontmatter.title}
              </h1>
              
              {frontmatter.description && (
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  {frontmatter.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                {frontmatter.author && (
                  <span>By {frontmatter.author}</span>
                )}
                
                {frontmatter.date && (
                  <span>{new Date(frontmatter.date).toLocaleDateString()}</span>
                )}
                
                {frontmatter.category && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md">
                    {frontmatter.category}
                  </span>
                )}
                
                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <div className="flex gap-2">
                    {frontmatter.tags.map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <BlogContent content={post.content} />
            </div>
            
            {/* Navigation */}
            {(previousPost || nextPost) && (
              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  {previousPost && (
                    <a
                      href={`/blog/${previousPost.slug}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      ← {previousPost.frontmatter.title}
                    </a>
                  )}
                  {nextPost && (
                    <a
                      href={`/blog/${nextPost.slug}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      {nextPost.frontmatter.title} →
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BlogCategories 
                title="Рубрики"
                description="Просмотр по категориям"
                showSearch={true}
                showFilter={true}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}


