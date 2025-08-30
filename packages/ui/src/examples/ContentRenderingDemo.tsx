'use client'

import React, { useState } from 'react'
import { LayoutRenderer } from '../templates'
import { MdxRenderer, PageBuilderExtended } from '../components/content'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  FileText, 
  Code, 
  Settings, 
  Play,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

// Пример MDX контента
const sampleMdxContent = (
  <div>
    <h1>Welcome to LND Boilerplate</h1>
    <p>This is a sample MDX content that demonstrates the MdxRenderer component.</p>
    
    <h2>Features</h2>
    <ul>
      <li>TypeScript support</li>
      <li>Next.js 14 integration</li>
      <li>Design system switching</li>
      <li>Component library</li>
    </ul>
    
    <h2>Code Example</h2>
    <pre><code>npm install lnd-boilerplate</code></pre>
    
    <h2>Getting Started</h2>
    <p>Follow our documentation to get started with LND Boilerplate.</p>
  </div>
)

// Пример JSON конфигурации
const samplePageConfig: {
  meta: {
    title: string
    description: string
    author: string
    date: string
  }
  sections: Array<{
    type: 'hero'
    title: string
    subtitle?: string
    description?: string
    primaryButton?: {
      text: string
      href: string
      variant?: "default" | "outline" | "link" | "secondary" | "destructive" | "ghost"
    }
    secondaryButton?: {
      text: string
      href: string
      variant?: "default" | "outline" | "link" | "secondary" | "destructive" | "ghost"
    }
    background?: "default" | "gradient" | "image"
  } | {
    type: 'stats'
    title: string
    stats: Array<{
      label: string
      value: string | number
      icon?: "users" | "downloads" | "stars" | "awards" | "trending" | "clock"
      description?: string
      trend?: "up" | "down" | "stable"
      trendValue?: string
    }>
  } | {
    type: 'features'
    title: string
    columns?: 1 | 2 | 3 | 4
    features: Array<{
      title: string
      description: string
      icon?: "users" | "code" | "shield" | "star" | "zap" | "globe" | "book" | "lightbulb"
      badge?: string
    }>
  }>
} = {
  meta: {
    title: "Demo Page - LND Boilerplate",
    description: "A demonstration of the Content Rendering System",
    author: "LND Team",
    date: "2025-01-15"
  },
  sections: [
    {
      type: "hero",
      title: "Content Rendering System Demo",
      subtitle: "Powerful & Flexible",
      description: "See how easy it is to create dynamic pages with JSON configuration and MDX content.",
      primaryButton: {
        text: "Get Started",
        href: "/docs",
        variant: "default"
      },
      secondaryButton: {
        text: "View Examples",
        href: "/examples",
        variant: "outline"
      },
      background: "gradient"
    },
    {
      type: "stats",
      title: "System Capabilities",
      stats: [
        {
          label: "Section Types",
          value: "13+",
          icon: "stars",
          description: "Pre-built sections"
        },
        {
          label: "Layout Templates",
          value: 4,
          icon: "trending",
          description: "Flexible layouts"
        },
        {
          label: "Design Systems",
          value: "2+",
          icon: "awards",
          description: "Easy switching"
        }
      ]
    },
    {
      type: "features",
      title: "Key Benefits",
      // subtitle: "Why choose our system?", // Removed as it's not part of features type
      features: [
        {
          title: "JSON-Driven",
          description: "Configure pages with simple JSON files",
          icon: "code",
          badge: "Flexible"
        },
        {
          title: "MDX Support",
          description: "Rich content with React components",
          icon: "book",
          badge: "Powerful"
        },
        {
          title: "Type Safe",
          description: "Full TypeScript support with validation",
          icon: "shield",
          badge: "Reliable"
        }
      ],
      columns: 3
    }
  ]
}

const ContentRenderingDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [currentLayout, setCurrentLayout] = useState<'single-column' | 'sidebar-left' | 'sidebar-right' | 'sidebar-both'>('sidebar-both')

  return (
    <LayoutRenderer layout={currentLayout} pageType="documentation">
      <div className="space-y-8">
        {/* Header */}
        <div className="border-b pb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Content Rendering System</h1>
              <p className="text-muted-foreground mt-2">
                A comprehensive system for rendering dynamic content with JSON configuration and MDX support
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Demo</Badge>
              <Button size="sm" variant="outline">
                <Code className="h-4 w-4 mr-2" />
                View Source
              </Button>
            </div>
          </div>
        </div>

        {/* Layout Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Layout Configuration
            </CardTitle>
            <CardDescription>
              Switch between different layout templates to see how content adapts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {(['single-column', 'sidebar-left', 'sidebar-right', 'sidebar-both'] as const).map((layout) => (
                <Button
                  key={layout}
                  variant={currentLayout === layout ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentLayout(layout)}
                >
                  {layout.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="mdx" className="flex items-center gap-2">
              <Code className="h-4 w-4" />
              MDX Rendering
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              JSON Builder
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Architecture</CardTitle>
                <CardDescription>
                  Understanding how the Content Rendering System works
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      MdxRenderer
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Renders MDX content with metadata, breadcrumbs, and progress tracking.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Content rendering</li>
                      <li>• Meta information</li>
                      <li>• Breadcrumb navigation</li>
                      <li>• Scroll progress</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      PageBuilderExtended
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Creates pages from JSON configuration with 13+ section types.
                    </p>
                    <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                      <li>• Hero sections</li>
                      <li>• Feature grids</li>
                      <li>• Contact forms</li>
                      <li>• Pricing tables</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Code className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Type Safe</h4>
                    <p className="text-sm text-muted-foreground">
                      Full TypeScript support with Zod validation schemas
                    </p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Configurable</h4>
                    <p className="text-sm text-muted-foreground">
                      JSON-driven configuration for easy content management
                    </p>
                  </div>
                  
                  <div className="text-center p-4 border rounded-lg">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Play className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">Extensible</h4>
                    <p className="text-sm text-muted-foreground">
                      Easy to add new section types and components
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MDX Tab */}
          <TabsContent value="mdx" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>MDX Content Rendering</CardTitle>
                <CardDescription>
                  See how MDX content is rendered with the MdxRenderer component
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MdxRenderer
                  content={sampleMdxContent}
                  meta={{
                    title: "Sample MDX Content",
                    description: "This demonstrates the MdxRenderer capabilities",
                    author: "Demo User",
                    date: "2025-01-15"
                  }}
                  breadcrumbs={[
                    { title: "Home", href: "/" },
                    { title: "Demos", href: "/demos" },
                    { title: "Content Rendering", href: "/demos/content-rendering" }
                  ]}
                  showProgressBar={true}
                  showTableOfContents={true}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* JSON Builder Tab */}
          <TabsContent value="json" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>JSON Page Builder</CardTitle>
                <CardDescription>
                  Pages built from JSON configuration using PageBuilderExtended
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PageBuilderExtended sections={samplePageConfig.sections} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuration Example</CardTitle>
                <CardDescription>
                  The JSON configuration that powers the page above
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
                    <code>{JSON.stringify(samplePageConfig, null, 2)}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold">Ready to Get Started?</h3>
              <p className="text-muted-foreground">
                Explore the documentation and start building with our Content Rendering System
              </p>
              <div className="flex justify-center gap-4">
                <Button>
                  <FileText className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline">
                  <Code className="h-4 w-4 mr-2" />
                  View Examples
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutRenderer>
  )
}

export default ContentRenderingDemo
