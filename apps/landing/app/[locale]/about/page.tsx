'use client';

import React from 'react';
import { PageLayout } from '@lnd/ui/templates';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@lnd/ui/components/ui/card';
import { Badge } from '@lnd/ui/components/ui/badge';
import { LocalizedLink } from '@lnd/ui/components/ui/LocalizedLink';
import { Rocket, Code, Palette, Zap, Users, Target } from 'lucide-react';
import { NavigationTest } from '../../../components/NavigationTest';

export default function AboutPage() {
  const features = [
    {
      icon: Rocket,
      title: 'Quick Start',
      description:
        'Create professional landing pages in minutes with ready-made components and templates',
    },
    {
      icon: Code,
      title: 'Modern Stack',
      description:
        'Built on Next.js 14, TypeScript and Tailwind CSS for maximum performance',
    },
    {
      icon: Palette,
      title: 'Flexible Design',
      description:
        'Adaptive components with dark theme support and customization',
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for Core Web Vitals and fast page loading',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Active development team and open source code',
    },
    {
      icon: Target,
      title: 'Scalability',
      description: 'Monorepo architecture for easy dependency management',
    },
  ];

  const stats = [
    { label: 'Components', value: '50+' },
    { label: 'Templates', value: '15+' },
    { label: 'Utilities', value: '25+' },
    { label: 'Version', value: '1.0.0' },
  ];

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            About LND Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We create tools that help developers build modern web applications
            faster and more efficiently. LND Boilerplate is the result of years
            of experience in web development.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(stat => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(feature => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-2">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Mission */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              To democratize access to quality web development tools. We believe
              every developer deserves access to best practices and components.
            </p>
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Technology Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Next.js 14',
              'TypeScript',
              'Tailwind CSS',
              'React 18',
              'Monorepo',
              'ESLint',
              'Prettier',
              'Bun',
            ].map(tech => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-sm px-3 py-1"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Navigation Test */}
        <div className="max-w-4xl mx-auto">
          <NavigationTest />
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Join thousands of developers who are already using LND Boilerplate
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LocalizedLink href="/docs" className="inline-block">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Start Learning
              </button>
            </LocalizedLink>
            <a
              href="https://github.com/GTFB/lnd-boilerplate"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <button className="border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium transition-colors">
                GitHub
              </button>
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
