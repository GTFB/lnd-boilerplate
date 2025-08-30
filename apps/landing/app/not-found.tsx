"use client"

import { PublicLayout } from '@lnd/ui/templates'
import { Button } from '@lnd/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { Home, Search, BookOpen, Users } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  const popularPages = [
    {
      title: 'Documentation',
      description: 'Learn how to use LND Boilerplate',
      href: '/docs',
      icon: BookOpen
    },
    {
      title: 'Blog',
      description: 'Read our latest articles and tutorials',
      href: '/blog',
      icon: Search
    },
    {
      title: 'Experts',
      description: 'Find experienced developers',
      href: '/experts',
      icon: Users
    }
  ]

  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-2xl w-full px-4">
          <Card className="text-center border-0 shadow-none">
            <CardHeader className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-8xl font-bold text-muted-foreground/20">404</h1>
                <CardTitle className="text-3xl font-bold text-foreground">
                  Page Not Found
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
                  Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
                </CardDescription>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              <div className="flex justify-center">
                <Link href="/" className="flex items-center gap-2">
                  <Button size="lg">
                    <Home className="w-4 h-4" />
                    Go Home
                  </Button>
                </Link>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground font-medium">
                  Or try one of these popular pages:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {popularPages.map((page) => {
                    const IconComponent = page.icon
                    return (
                      <Card key={page.title} className="hover:shadow-md transition-all duration-200">
                        <CardContent className="p-4">
                          <Link href={page.href} className="block">
                            <div className="flex items-center space-x-3">
                              <IconComponent className="w-5 h-5 text-primary" />
                              <div className="text-left">
                                <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                                  {page.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {page.description}
                                </p>
                              </div>
                            </div>
                          </Link>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PublicLayout>
  )
}
