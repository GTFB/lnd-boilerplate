'use client'

import React from 'react'
import { Text } from '../../primitives/Text'
import { cn } from '../../lib'
import { Heart } from 'lucide-react'

interface FooterLink {
  label: string
  href: string
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

interface FooterProps {
  logo?: React.ReactNode
  description?: string
  sections?: FooterSection[]
  socialLinks?: FooterLink[]
  copyright?: string
  className?: string
}

export const Footer: React.FC<FooterProps> = ({
  logo,
  description,
  sections = [],
  socialLinks = [],
  copyright = '© 2025 LND Boilerplate. All rights reserved.',
  className = ''
}) => {
  return (
    <footer className={cn('bg-muted/50 border-t', className)}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            {logo || (
              <div className="text-2xl font-bold text-primary mb-4">
                LND
              </div>
            )}
            {description && (
              <Text variant="muted" className="mb-4">
                {description}
              </Text>
            )}
            {socialLinks.length > 0 && (
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Heart className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t mt-8 pt-8 text-center">
          <Text variant="small" className="text-muted-foreground">
            {copyright}
          </Text>
        </div>
      </div>
    </footer>
  )
}
