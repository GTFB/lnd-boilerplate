import { CollectionLayout } from '@lnd/ui/templates'
import { ProductList } from '@lnd/ui/components/ecommerce'
import { getExperts } from '@lnd/utils/content/server'
import { generateMetadata } from '@lnd/utils/seo/metadata'
import type { Viewport } from 'next'

// Generate SEO metadata for the experts page
export const metadata = generateMetadata({
  title: 'Our Experts - LND Boilerplate',
  description: 'Meet our team of experienced developers, designers, and architects who built LND Boilerplate.',
  keywords: ['experts', 'team', 'developers', 'designers', 'architects'],
  type: 'website',
  url: 'https://lnd-boilerplate.com/experts'
}, {
  siteName: 'LND Boilerplate',
  siteUrl: 'https://lnd-boilerplate.com'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function ExpertsPage() {
  const experts = await getExperts()
  
  // Transform expert data to ProductList format
  const normalizedExperts = experts.map(expert => ({
    id: expert.id,
    title: expert.name,
    description: expert.bio,
    image: {
      src: expert.avatar,
      alt: expert.name
    },
    tags: expert.expertise,
    date: expert.joined,
    author: expert.name,
    href: `/experts/${expert.id}`,
    subtitle: expert.title,
    location: expert.location
  }))

  return (
    <CollectionLayout
      title="Our Experts"
      description="Meet our team of experienced developers, designers, and architects who built LND Boilerplate."
    >
      <ProductList
        items={normalizedExperts}
        columns={2}
      />
    </CollectionLayout>
  )
}
