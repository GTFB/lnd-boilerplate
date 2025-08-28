'use client'

import React, { useState } from 'react'
import { LayoutRenderer } from '../templates'
import { LayoutName, PageTypeName } from '../types'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'

const LayoutDemo: React.FC = () => {
  const [currentLayout, setCurrentLayout] = useState<LayoutName>('single-column')
  const [currentPageType, setCurrentPageType] = useState<PageTypeName>('landingPage')

  const layouts: Array<{ name: LayoutName; label: string; description: string }> = [
    { name: 'single-column', label: 'Single Column', description: 'Header, Content, Footer' },
    { name: 'sidebar-left', label: 'Sidebar Left', description: 'Header, Left Sidebar, Content, Footer' },
    { name: 'sidebar-right', label: 'Sidebar Right', description: 'Header, Content, Right Sidebar, Footer' },
    { name: 'sidebar-both', label: 'Sidebar Both', description: 'Header, Left Sidebar, Content, Right Sidebar, Footer' }
  ]

  const pageTypes: Array<{ name: PageTypeName; label: string; description: string }> = [
    { name: 'landingPage', label: 'Landing Page', description: 'Marketing landing page with hero section' },
    { name: 'blogPost', label: 'Blog Post', description: 'Article with content and metadata' },
    { name: 'documentation', label: 'Documentation', description: 'Technical documentation with navigation' }
  ]

  const demoContent = (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Layout System Demo</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Explore different layout templates and see how they adapt to different content types
        </p>
        
        {/* Layout Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {layouts.map((layout) => (
            <Button
              key={layout.name}
              variant={currentLayout === layout.name ? 'default' : 'outline'}
              onClick={() => setCurrentLayout(layout.name)}
              className="min-w-[140px]"
            >
              {layout.label}
            </Button>
          ))}
        </div>

        {/* Page Type Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {pageTypes.map((type) => (
            <Button
              key={type.name}
              variant={currentPageType === type.name ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setCurrentPageType(type.name)}
            >
              {type.label}
            </Button>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Badge variant="outline">Current Layout: {currentLayout}</Badge>
          <Badge variant="outline">Page Type: {currentPageType}</Badge>
        </div>
      </section>

      {/* Content Sections */}
      <section className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>
              Learn how to use the new layout system in your projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This demo showcases the flexible, component-based layout system that supports
              multiple design systems and responsive behaviors. Each layout template is
              designed to work seamlessly across different screen sizes and content types.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
            <CardDescription>
              Key capabilities of the layout system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Responsive Design</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically adapts to different screen sizes with configurable breakpoints
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Design Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Support for multiple design systems (Lora, Alisa) with dynamic styling
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Component Library</h4>
                <p className="text-sm text-muted-foreground">
                  Built with Shadcn/ui components and Lucide React icons
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Configuration Driven</h4>
                <p className="text-sm text-muted-foreground">
                  Centralized configuration via site.config.json for easy customization
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage Examples</CardTitle>
            <CardDescription>
              How to implement different layouts in your application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Basic Usage</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<LayoutRenderer layout="single-column" pageType="landingPage">
  <YourContent />
</LayoutRenderer>`}
                </pre>
              </div>
              <div>
                <h4 className="font-semibold mb-2">With Custom Props</h4>
                <pre className="bg-muted p-3 rounded text-sm overflow-x-auto">
{`<LayoutRenderer 
  layout="sidebar-both" 
  pageType="documentation"
  leftSidebarTitle="Navigation"
  rightSidebarTitle="TOC"
>
  <YourContent />
</LayoutRenderer>`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Long content to test scrolling */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Additional Content</h2>
          {Array.from({ length: 10 }, (_, i) => (
            <Card key={i}>
              <CardHeader>
                <CardTitle>Section {i + 1}</CardTitle>
                <CardDescription>
                  This is additional content to demonstrate scrolling behavior
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                  commodo consequat.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )

  return (
    <LayoutRenderer
      layout={currentLayout}
      pageType={currentPageType}
      className="min-h-screen"
    >
      {demoContent}
    </LayoutRenderer>
  )
}

export default LayoutDemo
