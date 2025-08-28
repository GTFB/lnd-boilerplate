"use client"

import { CollectionLayout } from '@lnd/ui/templates'
import { ProductList } from '@lnd/ui/components/ecommerce'

export default function ExpertsPage() {
  // Mock data for now since we can't use server functions in client components
  const experts: Array<{
    id: string;
    name: string;
    bio: string;
    avatar: string;
    expertise: string[];
    joined: string;
    title: string;
    location: string;
  }> = []
  
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
