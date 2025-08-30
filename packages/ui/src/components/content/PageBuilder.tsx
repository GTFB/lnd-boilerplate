'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  Users, 
  Zap, 
  Shield,
  Globe,
  Code,
  BookOpen,
  Lightbulb
} from 'lucide-react'

// Types for page sections
export interface HeroSection {
  type: 'hero'
  title: string
  subtitle?: string
  description?: string
  primaryButton?: {
    text: string
    href: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  secondaryButton?: {
    text: string
    href: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  image?: {
    src: string
    alt: string
  }
  background?: 'default' | 'gradient' | 'image'
}

export interface FeaturesSection {
  type: 'features'
  title: string
  subtitle?: string
  features: Array<{
    title: string
    description: string
    icon?: 'star' | 'users' | 'zap' | 'shield' | 'globe' | 'code' | 'book' | 'lightbulb'
    badge?: string
  }>
  layout?: 'grid' | 'list' | 'cards'
  columns?: 1 | 2 | 3 | 4
}

export interface CTASection {
  type: 'cta'
  title: string
  description?: string
  primaryButton: {
    text: string
    href: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  secondaryButton?: {
    text: string
    href: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  background?: 'default' | 'gradient' | 'muted'
  centered?: boolean
}

export interface TestimonialsSection {
  type: 'testimonials'
  title: string
  subtitle?: string
  testimonials: Array<{
    name: string
    role?: string
    company?: string
    content: string
    avatar?: string
    rating?: number
  }>
  layout?: 'grid' | 'carousel' | 'list'
}

export interface FAQSection {
  type: 'faq'
  title: string
  subtitle?: string
  items: Array<{
    question: string
    answer: string
    category?: string
  }>
  layout?: 'accordion' | 'list' | 'grid'
}

export interface ContentSection {
  type: 'content'
  title?: string
  content: string | React.ReactNode
  layout?: 'full' | 'narrow' | 'wide'
  background?: 'default' | 'muted'
}

export type PageSection = 
  | HeroSection 
  | FeaturesSection 
  | CTASection 
  | TestimonialsSection 
  | FAQSection 
  | ContentSection

export interface PageBuilderProps {
  sections: PageSection[]
  className?: string
}

// Components for sections
const HeroSectionComponent: React.FC<HeroSection> = ({ 
  title, 
  subtitle, 
  description, 
  primaryButton, 
  secondaryButton, 
  image, 
  background = 'default' 
}) => {
  const getBackgroundClasses = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10'
      case 'image':
        return 'bg-cover bg-center bg-no-repeat'
      default:
        return 'bg-background'
    }
  }

  return (
    <section className={`py-20 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {subtitle && (
              <Badge variant="secondary" className="text-sm">
                {subtitle}
              </Badge>
            )}
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-xl text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {primaryButton && (
                <a 
                  href={primaryButton.href}
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {primaryButton.text}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              )}
              {secondaryButton && (
                <a 
                  href={secondaryButton.href}
                  className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {secondaryButton.text}
                </a>
              )}
            </div>
          </div>
          {image && (
            <div className="relative">
              <img
                src={image.src}
                alt={image.alt}
                className="rounded-lg shadow-2xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const FeaturesSectionComponent: React.FC<FeaturesSection> = ({ 
  title, 
  subtitle, 
  features, 
  layout = 'grid', 
  columns = 3 
}) => {
  const getIcon = (iconName?: string) => {
    const icons = {
      star: <Star className="h-6 w-6" />,
      users: <Users className="h-6 w-6" />,
      zap: <Zap className="h-6 w-6" />,
      shield: <Shield className="h-6 w-6" />,
      globe: <Globe className="h-6 w-6" />,
      code: <Code className="h-6 w-6" />,
      book: <BookOpen className="h-6 w-6" />,
      lightbulb: <Lightbulb className="h-6 w-6" />
    }
    return icons[iconName as keyof typeof icons] || <Star className="h-6 w-6" />
  }

  const getGridClasses = () => {
    switch (columns) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className={`grid ${getGridClasses()} gap-8`}>
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {getIcon(feature.icon)}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                {feature.badge && (
                  <Badge variant="outline" className="mx-auto">
                    {feature.badge}
                  </Badge>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const CTASectionComponent: React.FC<CTASection> = ({ 
  title, 
  description, 
  primaryButton, 
  secondaryButton, 
  background = 'default',
  centered = true 
}) => {
  const getBackgroundClasses = () => {
    switch (background) {
      case 'gradient':
        return 'bg-gradient-to-r from-primary to-accent text-primary-foreground'
      case 'muted':
        return 'bg-muted'
      default:
        return 'bg-background border-t'
    }
  }

  return (
    <section className={`py-20 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        <div className={`text-center max-w-3xl mx-auto ${centered ? '' : 'text-left'}`}>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-muted-foreground mb-8">
              {description}
            </p>
          )}
          <div className="flex flex-wrap gap-4 justify-center">
            {primaryButton && (
              <a 
                href={primaryButton.href}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {primaryButton.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            )}
            {secondaryButton && (
              <a 
                href={secondaryButton.href}
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {secondaryButton.text}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const TestimonialsSectionComponent: React.FC<TestimonialsSection> = ({ 
  title, 
  subtitle, 
  testimonials, 
  layout = 'grid' 
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <CardContent className="pt-6">
                {testimonial.rating && (
                  <div className="flex justify-center mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                )}
                <blockquote className="text-lg text-center mb-6">
                  "{testimonial.content}"
                </blockquote>
                <div className="text-center">
                  <div className="font-semibold">{testimonial.name}</div>
                  {testimonial.role && (
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQSectionComponent: React.FC<FAQSection> = ({ 
  title, 
  subtitle, 
  items, 
  layout = 'accordion' 
}) => {
  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newOpen = new Set(openItems)
    if (newOpen.has(index)) {
      newOpen.delete(index)
    } else {
      newOpen.add(index)
    }
    setOpenItems(newOpen)
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {items.map((item, index) => (
            <Card key={index}>
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleItem(index)}
              >
                <CardTitle className="text-lg flex items-center justify-between">
                  {item.question}
                  <CheckCircle 
                    className={`h-5 w-5 transition-transform ${
                      openItems.has(index) ? 'rotate-180' : ''
                    }`} 
                  />
                </CardTitle>
              </CardHeader>
              {openItems.has(index) && (
                <CardContent>
                  <p className="text-muted-foreground">
                    {item.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContentSectionComponent: React.FC<ContentSection> = ({ 
  title, 
  content, 
  layout = 'full', 
  background = 'default' 
}) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case 'narrow':
        return 'max-w-3xl mx-auto'
      case 'wide':
        return 'max-w-6xl mx-auto'
      default:
        return 'max-w-4xl mx-auto'
    }
  }

  const getBackgroundClasses = () => {
    switch (background) {
      case 'muted':
        return 'bg-muted/30'
      default:
        return 'bg-background'
    }
  }

  return (
    <section className={`py-20 ${getBackgroundClasses()}`}>
      <div className="container mx-auto px-4">
        <div className={getLayoutClasses()}>
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold mb-8 text-center">
              {title}
            </h2>
          )}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            {typeof content === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: content }} />
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ 
  sections, 
  className = '' 
}) => {
  const { currentSystem } = useDesignSystem()

  const renderSection = (section: PageSection, index: number) => {
    switch (section.type) {
      case 'hero':
        return <HeroSectionComponent key={index} {...section} />
      case 'features':
        return <FeaturesSectionComponent key={index} {...section} />
      case 'cta':
        return <CTASectionComponent key={index} {...section} />
      case 'testimonials':
        return <TestimonialsSectionComponent key={index} {...section} />
      case 'faq':
        return <FAQSectionComponent key={index} {...section} />
      case 'content':
        return <ContentSectionComponent key={index} {...section} />
      default:
        return null
    }
  }

  return (
    <div className={`page-builder ${className}`}>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}

// Export individual components for use in PageBuilderExtended
export {
  HeroSectionComponent,
  FeaturesSectionComponent,
  CTASectionComponent,
  TestimonialsSectionComponent,
  FAQSectionComponent,
  ContentSectionComponent
}
