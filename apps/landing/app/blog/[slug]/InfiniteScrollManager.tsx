'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { normalizeFrontmatter } from '@lnd/utils/content/frontmatter'

// Observer pattern implementation for infinite scroll
class ScrollStateManager {
  private observers: Array<(state: ScrollState) => void> = []
  private state: ScrollState = {
    posts: [],
    loading: false,
    hasNext: false,
    hasPrevious: false,
    currentIndex: 0
  }

  subscribe(observer: (state: ScrollState) => void) {
    this.observers.push(observer)
    return () => {
      this.observers = this.observers.filter(obs => obs !== observer)
    }
  }

  private notify() {
    this.observers.forEach(observer => observer(this.state))
  }

  updateState(updates: Partial<ScrollState>) {
    this.state = { ...this.state, ...updates }
    this.notify()
  }

  getState() {
    return this.state
  }
}

interface ScrollState {
  posts: Array<{
    slug: string
    title: string
    content: string
    frontmatter: any
  }>
  loading: boolean
  hasNext: boolean
  hasPrevious: boolean
  currentIndex: number
}

interface InfiniteScrollManagerProps {
  initialPost: {
    slug: string
    title: string
    content: string
    frontmatter: any
  }
  neighbors: {
    previous: { slug: string; title: string; date: string } | null
    next: { slug: string; title: string; date: string } | null
  }
}

export default function InfiniteScrollManager({
  initialPost,
  neighbors: initialNeighbors
}: InfiniteScrollManagerProps) {
  const [state, setState] = useState<ScrollState>({
    posts: [initialPost],
    loading: false,
    hasNext: !!initialNeighbors.next,
    hasPrevious: !!initialNeighbors.previous,
    currentIndex: 0
  })

  const stateManager = useRef(new ScrollStateManager())
  const neighborsRef = useRef(initialNeighbors)
  const [topRef, topInView] = useInView({ threshold: 0.1 })
  const [bottomRef, bottomInView] = useInView({ threshold: 0.1 })
  const [hasUserScrolled, setHasUserScrolled] = useState(false)

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = stateManager.current.subscribe(setState)
    return unsubscribe
  }, [])

  // Track user scroll to prevent automatic loading
  useEffect(() => {
    const handleScroll = () => {
      setHasUserScrolled(true)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadPost = useCallback(async (slug: string, direction: 'next' | 'previous') => {
    if (state.loading) {
      console.log('Already loading, skipping...')
      return
    }

    console.log(`Starting to load ${direction} post:`, slug)
    stateManager.current.updateState({ loading: true })

    try {
      console.log('Fetching post from API...')
      const response = await fetch(`/api/blog/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      
      const data = await response.json()
      console.log('Post data received:', data)
      const newPost = data.post

      const currentState = stateManager.current.getState()
      
      // Check if post already exists to prevent duplicates
      const postExists = currentState.posts.some(post => post.slug === newPost.slug)
      if (postExists) {
        console.log('Post already exists, skipping...')
        stateManager.current.updateState({ loading: false })
        return
      }

      let newPosts = [...currentState.posts]
      let newIndex = currentState.currentIndex

      if (direction === 'next') {
        newPosts.push(newPost)
        newIndex = newPosts.length - 1
      } else {
        newPosts.unshift(newPost)
        newIndex = 0
      }

      // Update neighbors for next load
      neighborsRef.current = data.neighbors
      console.log('Updated neighbors:', data.neighbors)

      stateManager.current.updateState({
        posts: newPosts,
        loading: false,
        hasNext: !!data.neighbors.next,
        hasPrevious: !!data.neighbors.previous,
        currentIndex: newIndex
      })

      console.log('Post loaded successfully')

      // Don't update URL automatically - let user navigate normally
      // URL should only change when user explicitly navigates to a post
    } catch (error) {
      console.error('Failed to load post:', error)
      stateManager.current.updateState({ loading: false })
    }
  }, [state.loading])

  // Handle scroll triggers - only load when user scrolls
  useEffect(() => {
    if (bottomInView && state.hasNext && !state.loading && hasUserScrolled) {
      // Load next post when user scrolls to bottom
      const nextSlug = neighborsRef.current.next?.slug
      if (nextSlug) {
        console.log('Loading next post:', nextSlug)
        loadPost(nextSlug, 'next')
      } else {
        console.log('No next post to load')
      }
    }
  }, [bottomInView, state.hasNext, state.loading, hasUserScrolled, loadPost])

  useEffect(() => {
    if (topInView && state.hasPrevious && !state.loading && hasUserScrolled) {
      // Load previous post when user scrolls to top
      const prevSlug = neighborsRef.current.previous?.slug
      if (prevSlug) {
        console.log('Loading previous post:', prevSlug)
        loadPost(prevSlug, 'previous')
      } else {
        console.log('No previous post to load')
      }
    }
  }, [topInView, state.hasPrevious, state.loading, hasUserScrolled, loadPost])

  return (
    <div className="space-y-8">
      {/* Top trigger for loading previous posts */}
      <div ref={topRef} className="h-4" />
      
      {/* Render all loaded posts */}
      {state.posts.map((post, index) => {
        const frontmatter = normalizeFrontmatter({
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
        })

        return (
          <div key={`${post.slug}-${index}`} id={`post-${post.slug}`} className="mb-12">
            {/* Post header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {frontmatter.title}
              </h1>
              {frontmatter.description && (
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                  {frontmatter.description}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span>{frontmatter.date}</span>
                {frontmatter.author && <span>by {frontmatter.author}</span>}
                {frontmatter.category && (
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                    {frontmatter.category}
                  </span>
                )}
              </div>
              {frontmatter.tags && frontmatter.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {frontmatter.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* Post content only */}
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </div>
        )
      })}
      
      {/* Bottom trigger for loading next posts */}
      <div ref={bottomRef} className="h-4">
        {state.hasNext && !state.loading && (
          <div className="text-center py-4 text-gray-500">
            Scroll down to load more posts...
          </div>
        )}
      </div>
      
      {/* Loading indicator */}
      {state.loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <span className="ml-2">Loading post...</span>
        </div>
      )}
      
      {/* End of posts indicator */}
      {!state.hasNext && !state.hasPrevious && state.posts.length > 1 && (
        <div className="text-center py-8 text-gray-500">
          You've reached the end of the blog posts
        </div>
      )}
    </div>
  )
}
