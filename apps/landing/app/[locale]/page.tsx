'use client';

import { Hero } from '@lnd/ui/components/marketing';
import { FeatureGrid } from '@lnd/ui/components/marketing';
import { PricingTable } from '@lnd/ui/components/marketing';
import { PublicLayout } from '@lnd/ui/templates';

export default function HomePage() {
  const features = [
    {
      title: 'Modern Architecture',
      text: 'Built with Next.js 14, TypeScript, and Tailwind CSS for optimal performance and developer experience.',
    },
    {
      title: 'Component Library',
      text: 'Reusable UI components organized in tiers: primitives, compositions, and templates.',
    },
    {
      title: 'MDX Support',
      text: 'Full MDX support for content management with custom components and frontmatter.',
    },
    {
      title: 'Monorepo Structure',
      text: 'Organized packages for UI components and utilities with workspace management.',
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$0',
      period: 'month',
      description: 'Perfect for small projects and experiments.',
      features: [
        { text: 'Basic components', included: true },
        { text: 'Community support', included: true },
        { text: 'Documentation', included: true },
        { text: 'Premium components', included: false },
      ],
      cta: { text: 'Get Started' },
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'month',
      description: 'For professional developers and teams.',
      popular: true,
      features: [
        { text: 'All Starter features', included: true },
        { text: 'Premium components', included: true },
        { text: 'Priority support', included: true },
        { text: 'Custom themes', included: true },
      ],
      cta: { text: 'Start Pro Trial' },
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large organizations with custom needs.',
      features: [
        { text: 'All Pro features', included: true },
        { text: 'Custom development', included: true },
        { text: 'Dedicated support', included: true },
        { text: 'SLA guarantee', included: true },
      ],
      cta: { text: 'Contact Sales' },
    },
  ];

  return (
    <PublicLayout>
      <Hero
        title="Build Modern Landing Pages Faster"
        subtitle="LND Boilerplate"
        description="A comprehensive landing page boilerplate with monorepo architecture, built with Next.js, TypeScript, and Tailwind CSS. Start building beautiful, performant websites in minutes."
        ctaButtons={[
          { text: 'Get Started', variant: 'default', href: '/docs' },
          { text: 'View Blog', variant: 'outline', href: '/blog' },
        ]}
        image={{
          src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
          alt: 'Modern web development workspace',
        }}
      />

      <FeatureGrid
        title="Why Choose LND Boilerplate?"
        description="Built with modern best practices and designed for developer productivity."
        features={features}
        columns={2}
      />

      <PricingTable
        title="Simple, Transparent Pricing"
        description="Choose the plan that fits your needs. All plans include core features and updates."
        plans={pricingPlans}
      />
    </PublicLayout>
  );
}
