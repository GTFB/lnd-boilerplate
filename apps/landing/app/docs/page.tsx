'use client'

import React from 'react'
import { PageLayout } from '@lnd/ui/templates'
import { Button } from '@lnd/ui/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@lnd/ui/components/ui/card'
import { BookOpen, Code, Palette, Zap, Database, Smartphone } from 'lucide-react'

export default function DocsPage() {
  const docCategories = [
    {
      title: 'Getting Started',
      description: 'Quick start with LND Boilerplate',
      icon: Zap,
      href: '/docs/getting-started',
      color: 'text-blue-600'
    },
    {
      title: 'Components',
      description: 'UI component library',
      icon: Palette,
      href: '/docs/components',
      color: 'text-purple-600'
    },
    {
      title: 'Templates',
      description: 'Ready-to-use page layouts',
      icon: BookOpen,
      href: '/docs/templates',
      color: 'text-green-600'
    },
    {
      title: 'API',
      description: 'Interfaces and utilities',
      icon: Code,
      href: '/docs/api',
      color: 'text-orange-600'
    },
    {
      title: 'Configuration',
      description: 'Project setup and configuration',
      icon: Database,
      href: '/docs/configuration',
      color: 'text-red-600'
    },
    {
      title: 'Deployment',
      description: 'Deploy and host your application',
      icon: Smartphone,
      href: '/docs/deployment',
      color: 'text-indigo-600'
    }
  ]

  return (
    <PageLayout>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          LND Boilerplate Documentation
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore all the capabilities of our framework for creating modern landing pages
        </p>
      </div>
      <div className="space-y-8">


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <Card key={category.title} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href={category.href} className="block w-full">
                    <Button className="w-full">
                      Explore
                    </Button>
                  </a>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have questions or need support, contact our team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact">
              <Button variant="default">
                Contact Us
              </Button>
            </a>
            <a href="https://github.com/GTFB/lnd-boilerplate/issues" target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                Report an Issue
              </Button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
