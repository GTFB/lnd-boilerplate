'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { MDXRemote } from 'next-mdx-remote/rsc'

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
  onUrlChange: (slug: string) => void
}

export default function InfiniteScrollManager({
  initialPost,
  neighbors,
  onUrlChange
}: InfiniteScrollManagerProps) {
  const [state, setState] = useState<ScrollState>({
    posts: [initialPost],
    loading: false,
    hasNext: !!neighbors.next,
    hasPrevious: !!neighbors.previous,
    currentIndex: 0
  })

  const stateManager = useRef(new ScrollStateManager())
  const [topRef, topInView] = useInView({ threshold: 0.1 })
  const [bottomRef, bottomInView] = useInView({ threshold: 0.1 })

  // Subscribe to state changes
  useEffect(() => {
    const unsubscribe = stateManager.current.subscribe(setState)
    return unsubscribe
  }, [])

  const loadPost = useCallback(async (slug: string, direction: 'next' | 'previous') => {
    if (state.loading) return

    stateManager.current.updateState({ loading: true })

    try {
      const response = await fetch(`/api/blog/${slug}`)
      if (!response.ok) throw new Error('Failed to fetch post')
      
      const data = await response.json()
      const newPost = data.post

      const currentState = stateManager.current.getState()
      let newPosts = [...currentState.posts]
      let newIndex = currentState.currentIndex

      if (direction === 'next') {
        newPosts.push(newPost)
        newIndex = newPosts.length - 1
      } else {
        newPosts.unshift(newPost)
        newIndex = 0
      }

      stateManager.current.updateState({
        posts: newPosts,
        loading: false,
        hasNext: !!data.neighbors.next,
        hasPrevious: !!data.neighbors.previous,
        currentIndex: newIndex
      })

      // Update URL without page reload
      onUrlChange(slug)
    } catch (error) {
      console.error('Failed to load post:', error)
      stateManager.current.updateState({ loading: false })
    }
  }, [state.loading, onUrlChange])

  // Handle scroll triggers
  useEffect(() => {
    if (bottomInView && state.hasNext && neighbors.next) {
      loadPost(neighbors.next.slug, 'next')
    }
  }, [bottomInView, state.hasNext, neighbors.next, loadPost])

  useEffect(() => {
    if (topInView && state.hasPrevious && neighbors.previous) {
      loadPost(neighbors.previous.slug, 'previous')
    }
  }, [topInView, state.hasPrevious, neighbors.previous, loadPost])

  return (
    <div className="space-y-8">
      {/* Top trigger for loading previous posts */}
      <div ref={topRef} className="h-4" />
      
      {/* Render all loaded posts */}
      {state.posts.map((post, index) => (
        <div key={post.slug} className="post-container">
          <article className="prose prose-lg max-w-none">
            <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
        </div>
      ))}
      
      {/* Bottom trigger for loading next posts */}
      <div ref={bottomRef} className="h-4" />
      
      {/* Loading indicator */}
      {state.loading && (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
    </div>
  )
}
