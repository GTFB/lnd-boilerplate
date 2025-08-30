'use client'

import React from 'react'
import { cn } from '@lnd/ui/lib/utils'
import { Image } from '../ui/Image'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader } from '../ui/card'
import { ArrowRight } from 'lucide-react'

export interface BlogPost {
  id: string
  title: string
  description: string
  coverImage?: string
  image?: string
  tags?: string[]
  date: string
  authorId: string
  authorName?: string
  authorAvatar?: string
  category?: string
  readTime?: string
  href: string
}

export interface BlogCardProps {
  post: BlogPost
  variant?: 'default' | 'featured' | 'compact'
  className?: string
}

export function BlogCard({ post, variant = 'default', className }: BlogCardProps) {
  const imageSrc = post.coverImage || post.image || '/images/blog-placeholder.jpg'
  
  const variants = {
    default: 'h-full',
    featured: 'h-full',
    compact: 'h-auto'
  }

  const imageVariants = {
    default: 'h-48',
    featured: 'h-64',
    compact: 'h-32'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Card className={cn('group overflow-hidden transition-all duration-300 hover:shadow-lg', variants[variant], className)}>
      <div className="relative overflow-hidden">
        <Image
          src={imageSrc}
          alt={post.title}
          className={cn(
            'w-full object-cover transition-transform duration-300 group-hover:scale-105',
            imageVariants[variant]
          )}
          fallbackSrc="/images/blog-placeholder.jpg"
        />
        
        {post.category && (
          <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 hover:bg-white">
            {post.category}
          </Badge>
        )}
        
        {post.readTime && (
          <Badge variant="secondary" className="absolute top-3 right-3 bg-black/70 text-white">
            {post.readTime}
          </Badge>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          {post.authorAvatar && (
            <Avatar
              src={post.authorAvatar}
              alt={post.authorName || post.authorId}
              size="sm"
            />
          )}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <span>{post.authorName || post.authorId}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(post.date)}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">
          {post.description}
        </p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <a
          href={post.href}
          className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
        >
          Читать далее
          <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </CardContent>
    </Card>
  )
}
