import React from 'react'
import { PublicLayout } from './layouts/PublicLayout'

interface CollectionLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
}

export const CollectionLayout: React.FC<CollectionLayoutProps> = ({ 
  children, 
  title, 
  description 
}) => {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            {description && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </header>
          
          <div className="space-y-8">
            {children}
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
