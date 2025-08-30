'use client'

import React from 'react'
import { cn } from '@lnd/ui/lib/utils'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/badge'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'
import { ExternalLink, MapPin, Calendar } from 'lucide-react'

export interface Expert {
  id: string
  name: string
  title: string
  avatar: string
  bio: string
  expertise: string[]
  social: Record<string, string>
  location: string
  joined: string
}

export interface ExpertCardProps {
  expert: Expert
  variant?: 'default' | 'compact' | 'featured'
  className?: string
}

export function ExpertCard({ expert, variant = 'default', className }: ExpertCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long'
    })
  }

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin':
        return '💼'
      case 'twitter':
        return '🐦'
      case 'github':
        return '🐙'
      case 'behance':
        return '🎨'
      case 'dribbble':
        return '🏀'
      default:
        return '🔗'
    }
  }

  return (
    <Card className={cn('group overflow-hidden transition-all duration-300 hover:shadow-lg', className)}>
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar
            src={expert.avatar}
            alt={expert.name}
            size={variant === 'featured' ? 'xl' : 'lg'}
            fallbackSrc="/images/avatar-placeholder.jpg"
          />
        </div>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {expert.name}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          {expert.title}
        </p>
        
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{expert.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>С {formatDate(expert.joined)}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 dark:text-gray-300 text-center mb-4 line-clamp-3">
          {expert.bio}
        </p>
        
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {expert.expertise.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
          {expert.expertise.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{expert.expertise.length - 4}
            </Badge>
          )}
        </div>
        
        <div className="flex justify-center gap-2">
          {Object.entries(expert.social).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${platform} профиль ${expert.name}`}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
            >
              <span>{getSocialIcon(platform)}</span>
              <span className="hidden sm:inline capitalize">{platform}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
