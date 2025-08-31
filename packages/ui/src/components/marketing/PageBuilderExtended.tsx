'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
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
  Lightbulb,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Heart,
  MessageCircle,
  Share2,
  Download,
  Play,
  Pause,
  SkipForward,
  SkipBack
} from 'lucide-react'

// Extended types for sections
export interface StatsSection {
  type: 'stats'
  title?: string
  subtitle?: string
  stats: Array<{
    label: string
    value: string | number
    icon?: 'users' | 'downloads' | 'stars' | 'awards' | 'trending' | 'clock'
    description?: string
    trend?: 'up' | 'down' | 'stable'
    trendValue?: string
  }>
  layout?: 'grid' | 'list' | 'cards'
  columns?: 1 | 2 | 3 | 4
}

export interface ContactFormSection {
  type: 'contact-form'
  title: string
  subtitle?: string
  fields: Array<{
    name: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
    label: string
    placeholder?: string
    required?: boolean
    options?: string[]
  }>
  submitButton: {
    text: string
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  }
  successMessage?: string
  errorMessage?: string
}

export interface VideoSection {
  type: 'video'
  title?: string
  subtitle?: string
  video: {
    src: string
    poster?: string
    autoplay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
  }
  description?: string
  showControls?: boolean
  layout?: 'full' | 'narrow' | 'wide'
}

export interface PricingSection {
  type: 'pricing'
  title: string
  subtitle?: string
  plans: Array<{
    name: string
    price: string
    period?: string
    description?: string
    features: string[]
    popular?: boolean
    buttonText: string
    buttonHref: string
    buttonVariant?: 'default' | 'outline'
  }>
  layout?: 'grid' | 'list' | 'cards'
  showAnnualToggle?: boolean
}

export interface TeamSection {
  type: 'team'
  title: string
  subtitle?: string
  members: Array<{
    name: string
    role: string
    avatar?: string
    bio?: string
    social?: {
      twitter?: string
      linkedin?: string
      github?: string
      email?: string
    }
  }>
  layout?: 'grid' | 'list' | 'cards'
  columns?: 1 | 2 | 3 | 4
}

export interface TimelineSection {
  type: 'timeline'
  title: string
  subtitle?: string
  events: Array<{
    date: string
    title: string
    description: string
    icon?: 'calendar' | 'star' | 'award' | 'code' | 'users' | 'rocket'
    status?: 'completed' | 'current' | 'upcoming'
  }>
  layout?: 'vertical' | 'horizontal' | 'cards'
}

export interface GallerySection {
  type: 'gallery'
  title?: string
  subtitle?: string
  images: Array<{
    src: string
    alt: string
    caption?: string
    link?: string
  }>
  layout?: 'grid' | 'masonry' | 'carousel' | 'lightbox'
  columns?: 1 | 2 | 3 | 4
  showCaptions?: boolean
  showLightbox?: boolean
}

// Updated PageSection type
export type ExtendedPageSection = 
  | HeroSection 
  | FeaturesSection 
  | CTASection 
  | TestimonialsSection 
  | FAQSection 
  | ContentSection
  | StatsSection
  | ContactFormSection
  | VideoSection
  | PricingSection
  | TeamSection
  | TimelineSection
  |   GallerySection

// Import existing types
import {  
  HeroSection, 
  FeaturesSection, 
  CTASection, 
  TestimonialsSection, 
  FAQSection, 
  ContentSection 
} from './PageBuilder'

// Components for new sections
const StatsSectionComponent: React.FC<StatsSection> = ({ 
  title, 
  subtitle, 
  stats, 
  layout = 'grid', 
  columns = 4 
}) => {
  const getIcon = (iconName?: string) => {
    const icons = {
      users: <Users className="h-6 w-6" />,
      downloads: <Download className="h-6 w-6" />,
      stars: <Star className="h-6 w-6" />,
      awards: <Award className="h-6 w-6" />,
      trending: <TrendingUp className="h-6 w-6" />,
      clock: <Clock className="h-6 w-6" />
    }
    return icons[iconName as keyof typeof icons] || <TrendingUp className="h-6 w-6" />
  }

  const getGridClasses = () => {
    switch (columns) {
      case 1: return 'grid-cols-1'
      case 2: return 'grid-cols-1 md:grid-cols-2'
      case 3: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${getGridClasses()} gap-8`}>
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                  {getIcon(stat.icon)}
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-lg font-medium">{stat.label}</div>
                  {stat.description && (
                    <p className="text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  )}
                  {stat.trend && (
                    <div className={`flex items-center justify-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className={`h-4 w-4 ${
                        stat.trend === 'down' ? 'rotate-180' : ''
                      }`} />
                      {stat.trendValue}
                    </div>
                  )}
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const ContactFormSectionComponent: React.FC<ContactFormSection> = ({ 
  title, 
  subtitle, 
  fields, 
  submitButton, 
  successMessage = 'Thank you! Your message has been sent.',
  errorMessage = 'Something went wrong. Please try again.'
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [isError, setIsError] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setIsError(false)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form
    e.currentTarget.reset()
    
    // Hide success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000)
  }

  const renderField = (field: any) => {
    switch (field.type) {
      case 'textarea':
        return (
          <Textarea
            key={field.name}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
            className="min-h-[100px]"
          />
        )
      case 'select':
        return (
          <select
            key={field.name}
            name={field.name}
            required={field.required}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option: string, index: number) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
      default:
        return (
          <Input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            required={field.required}
          />
        )
    }
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xl text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fields.map((field) => (
                <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-medium mb-2">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant={submitButton.variant || 'default'}
              size="lg"
              className="w-full"
            >
              {isSubmitting ? 'Sending...' : submitButton.text}
            </Button>
          </form>

          {/* Success/Error Messages */}
          {isSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
              {successMessage}
            </div>
          )}
          
          {isError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const VideoSectionComponent: React.FC<VideoSection> = ({ 
  title, 
  subtitle, 
  video, 
  description, 
  showControls = true,
  layout = 'wide' 
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className={getLayoutClasses()}>
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xl text-muted-foreground">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
            <video
              src={video.src}
              poster={video.poster}
              autoPlay={video.autoplay}
              controls={showControls}
              loop={video.loop}
              muted={video.muted}
              className="w-full h-full object-cover"
            />
          </div>

          {description && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const PricingSectionComponent: React.FC<PricingSection> = ({ 
  title, 
  subtitle, 
  plans, 
  layout = 'grid',
  showAnnualToggle = false 
}) => {
  const [isAnnual, setIsAnnual] = React.useState(false)

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

          {showAnnualToggle && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={`text-sm ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative"
              >
                <div className={`w-6 h-6 rounded-full bg-primary transition-transform ${
                  isAnnual ? 'translate-x-3' : '-translate-x-3'
                }`} />
              </Button>
              <span className={`text-sm ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
                <Badge variant="secondary" className="ml-2">Save 20%</Badge>
              </span>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'ring-2 ring-primary' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="space-y-2">
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.period && (
                      <span className="text-lg font-normal text-muted-foreground">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                  {plan.description && (
                    <CardDescription>{plan.description}</CardDescription>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a 
                  href={plan.buttonHref}
                  className="w-full inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {plan.buttonText}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const TeamSectionComponent: React.FC<TeamSection> = ({ 
  title, 
  subtitle, 
  members, 
  layout = 'grid', 
  columns = 3 
}) => {
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

        <div className={`grid ${getGridClasses()} gap-8`}>
          {members.map((member, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full bg-muted mb-4 overflow-hidden">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl">{member.name}</CardTitle>
                <CardDescription className="text-lg">{member.role}</CardDescription>
              </CardHeader>
              
              {member.bio && (
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {member.bio}
                  </p>
                </CardContent>
              )}

              {member.social && (
                <div className="flex justify-center gap-4 pb-4">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Users className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Code className="h-5 w-5" />
                    </a>
                  )}
                  {member.social.email && (
                    <a
                      href={`mailto:${member.social.email}`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

const TimelineSectionComponent: React.FC<TimelineSection> = ({ 
  title, 
  subtitle, 
  events, 
  layout = 'vertical' 
}) => {
  const getIcon = (iconName?: string) => {
    const icons = {
      calendar: <Calendar className="h-6 w-6" />,
      star: <Star className="h-6 w-6" />,
      award: <Award className="h-6 w-6" />,
      code: <Code className="h-6 w-6" />,
      users: <Users className="h-6 w-6" />,
      rocket: <Zap className="h-6 w-6" />
    }
    return icons[iconName as keyof typeof icons] || <Calendar className="h-6 w-6" />
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'current':
        return 'text-blue-600 bg-blue-100'
      case 'upcoming':
        return 'text-muted-foreground bg-muted'
      default:
        return 'text-muted-foreground bg-muted'
    }
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

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {events.map((event, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {getIcon(event.icon)}
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium text-muted-foreground">
                      {event.date}
                    </span>
                    {event.status && (
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${getStatusColor(event.status)}`}
                      >
                        {event.status}
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">
                    {event.title}
                  </h3>
                  
                  <p className="text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const GallerySectionComponent: React.FC<GallerySection> = ({ 
  title, 
  subtitle, 
  images, 
  layout = 'grid', 
  columns = 3,
  showCaptions = true,
  showLightbox = false
}) => {
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
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${getGridClasses()} gap-6`}>
          {images.map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              
              {showCaptions && (image.caption || image.link) && (
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center text-white p-4">
                    {image.caption && (
                      <p className="text-lg font-medium mb-2">
                        {image.caption}
                      </p>
                    )}
                    {image.link && (
                      <a 
                        href={image.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 text-sm border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      >
                        View
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Main PageBuilderExtended component
export interface PageBuilderExtendedProps {
  sections: ExtendedPageSection[]
  className?: string
}

export const PageBuilderExtended: React.FC<PageBuilderExtendedProps> = ({ 
  sections, 
  className = '' 
}) => {
  const { currentSystem } = useDesignSystem()

  const renderSection = (section: ExtendedPageSection, index: number) => {
    switch (section.type) {
      // Existing sections
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
      
      // New sections
      case 'stats':
        return <StatsSectionComponent key={index} {...section} />
      case 'contact-form':
        return <ContactFormSectionComponent key={index} {...section} />
      case 'video':
        return <VideoSectionComponent key={index} {...section} />
      case 'pricing':
        return <PricingSectionComponent key={index} {...section} />
      case 'team':
        return <TeamSectionComponent key={index} {...section} />
      case 'timeline':
        return <TimelineSectionComponent key={index} {...section} />
      case 'gallery':
        return <GallerySectionComponent key={index} {...section} />
      
      default:
        return null
    }
  }

  return (
    <div className={`page-builder-extended ${className}`}>
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  )
}

// Import existing section components
import { 
  HeroSectionComponent,
  FeaturesSectionComponent,
  CTASectionComponent,
  TestimonialsSectionComponent,
  FAQSectionComponent,
  ContentSectionComponent
} from './PageBuilder'
