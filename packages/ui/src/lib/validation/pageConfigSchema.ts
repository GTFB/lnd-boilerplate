import { z } from 'zod'

// Base schemas for common elements
const ButtonSchema = z.object({
  text: z.string(),
  href: z.string().url().or(z.string().startsWith('/')),
  variant: z.enum(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']).optional()
})

const ImageSchema = z.object({
  src: z.string().url().or(z.string().startsWith('/')),
  alt: z.string()
})

const BadgeSchema = z.object({
  text: z.string(),
  variant: z.enum(['default', 'secondary', 'destructive', 'outline']).optional()
})

// Schemas for sections
const HeroSectionSchema = z.object({
  type: z.literal('hero'),
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  primaryButton: ButtonSchema.optional(),
  secondaryButton: ButtonSchema.optional(),
  image: ImageSchema.optional(),
  background: z.enum(['default', 'gradient', 'image']).optional()
})

const FeatureSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.enum(['star', 'users', 'zap', 'shield', 'globe', 'code', 'book', 'lightbulb']).optional(),
  badge: z.string().optional()
})

const FeaturesSectionSchema = z.object({
  type: z.literal('features'),
  title: z.string(),
  subtitle: z.string().optional(),
  features: z.array(FeatureSchema),
  layout: z.enum(['grid', 'list', 'cards']).optional(),
  columns: z.enum(['1', '2', '3', '4']).optional()
})

const CTASectionSchema = z.object({
  type: z.literal('cta'),
  title: z.string(),
  description: z.string().optional(),
  primaryButton: ButtonSchema,
  secondaryButton: ButtonSchema.optional(),
  background: z.enum(['default', 'gradient', 'muted']).optional(),
  centered: z.boolean().optional()
})

const TestimonialSchema = z.object({
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  content: z.string(),
  avatar: z.string().url().optional(),
  rating: z.number().min(1).max(5).optional()
})

const TestimonialsSectionSchema = z.object({
  type: z.literal('testimonials'),
  title: z.string(),
  subtitle: z.string().optional(),
  testimonials: z.array(TestimonialSchema),
  layout: z.enum(['grid', 'carousel', 'list']).optional()
})

const FAQItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
  category: z.string().optional()
})

const FAQSectionSchema = z.object({
  type: z.literal('faq'),
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(FAQItemSchema),
  layout: z.enum(['accordion', 'list', 'grid']).optional()
})

const ContentSectionSchema = z.object({
  type: z.literal('content'),
  title: z.string().optional(),
  content: z.string(),
  layout: z.enum(['full', 'narrow', 'wide']).optional(),
  background: z.enum(['default', 'muted']).optional()
})

const StatSchema = z.object({
  label: z.string(),
  value: z.union([z.string(), z.number()]),
  icon: z.enum(['users', 'downloads', 'stars', 'awards', 'trending', 'clock']).optional(),
  description: z.string().optional(),
  trend: z.enum(['up', 'down', 'stable']).optional(),
  trendValue: z.string().optional()
})

const StatsSectionSchema = z.object({
  type: z.literal('stats'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  stats: z.array(StatSchema),
  layout: z.enum(['grid', 'list', 'cards']).optional(),
  columns: z.enum(['1', '2', '3', '4']).optional()
})

const FormFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['text', 'email', 'tel', 'textarea', 'select']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional()
})

const ContactFormSectionSchema = z.object({
  type: z.literal('contact-form'),
  title: z.string(),
  subtitle: z.string().optional(),
  fields: z.array(FormFieldSchema),
  submitButton: ButtonSchema,
  successMessage: z.string().optional(),
  errorMessage: z.string().optional()
})

const VideoSchema = z.object({
  src: z.string().url(),
  poster: z.string().url().optional(),
  autoplay: z.boolean().optional(),
  controls: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional()
})

const VideoSectionSchema = z.object({
  type: z.literal('video'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  video: VideoSchema,
  description: z.string().optional(),
  showControls: z.boolean().optional(),
  layout: z.enum(['full', 'narrow', 'wide']).optional()
})

const PricingPlanSchema = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()),
  popular: z.boolean().optional(),
  buttonText: z.string(),
  buttonHref: z.string().url().or(z.string().startsWith('/')),
  buttonVariant: z.enum(['default', 'outline']).optional()
})

const PricingSectionSchema = z.object({
  type: z.literal('pricing'),
  title: z.string(),
  subtitle: z.string().optional(),
  plans: z.array(PricingPlanSchema),
  layout: z.enum(['grid', 'list', 'cards']).optional(),
  showAnnualToggle: z.boolean().optional()
})

const SocialLinksSchema = z.object({
  twitter: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  github: z.string().url().optional(),
  email: z.string().email().optional()
})

const TeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  avatar: z.string().url().optional(),
  bio: z.string().optional(),
  social: SocialLinksSchema.optional()
})

const TeamSectionSchema = z.object({
  type: z.literal('team'),
  title: z.string(),
  subtitle: z.string().optional(),
  members: z.array(TeamMemberSchema),
  layout: z.enum(['grid', 'list', 'cards']).optional(),
  columns: z.enum(['1', '2', '3', '4']).optional()
})

const TimelineEventSchema = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.enum(['calendar', 'star', 'award', 'code', 'users', 'rocket']).optional(),
  status: z.enum(['completed', 'current', 'upcoming']).optional()
})

const TimelineSectionSchema = z.object({
  type: z.literal('timeline'),
  title: z.string(),
  subtitle: z.string().optional(),
  events: z.array(TimelineEventSchema),
  layout: z.enum(['vertical', 'horizontal', 'cards']).optional()
})

const GalleryImageSchema = z.object({
  src: z.string().url().or(z.string().startsWith('/')),
  alt: z.string(),
  caption: z.string().optional(),
  link: z.string().url().optional()
})

const GallerySectionSchema = z.object({
  type: z.literal('gallery'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  images: z.array(GalleryImageSchema),
  layout: z.enum(['grid', 'masonry', 'carousel', 'lightbox']).optional(),
  columns: z.enum(['1', '2', '3', '4']).optional(),
  showCaptions: z.boolean().optional(),
  showLightbox: z.boolean().optional()
})

// Combined schema for all sections
const SectionSchema = z.union([
  HeroSectionSchema,
  FeaturesSectionSchema,
  CTASectionSchema,
  TestimonialsSectionSchema,
  FAQSectionSchema,
  ContentSectionSchema,
  StatsSectionSchema,
  ContactFormSectionSchema,
  VideoSectionSchema,
  PricingSectionSchema,
  TeamSectionSchema,
  TimelineSectionSchema,
  GallerySectionSchema
])

// Schema for meta information
const MetaSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  author: z.string().optional(),
  date: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional()
})

// Schema for breadcrumbs
const BreadcrumbItemSchema = z.object({
  title: z.string(),
  href: z.string().url().or(z.string().startsWith('/'))
})

// Main page configuration schema
export const PageConfigSchema = z.object({
  meta: MetaSchema.optional(),
  breadcrumbs: z.array(BreadcrumbItemSchema).optional(),
  sections: z.array(SectionSchema).min(1, 'At least one section is required')
})

// TypeScript types
export type PageConfig = z.infer<typeof PageConfigSchema>
export type PageSection = z.infer<typeof SectionSchema>
export type PageMeta = z.infer<typeof MetaSchema>

// Validation function
export function validatePageConfig(config: unknown): { success: true; data: PageConfig } | { success: false; errors: string[] } {
  try {
    const validated = PageConfigSchema.parse(config)
    return { success: true, data: validated }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const zodError = error as any
      const errors = zodError.errors.map((err: any) => {
        const path = err.path.join('.')
        return `${path}: ${err.message}`
      })
      return { success: false, errors }
    }
    return { success: false, errors: ['Unknown validation error'] }
  }
}

// Function to get validation errors
export function getValidationErrors(config: unknown): string[] {
  const result = validatePageConfig(config)
  return result.success ? [] : result.errors
}

// Function to check validity
export function isValidPageConfig(config: unknown): config is PageConfig {
  return validatePageConfig(config).success
}
