'use client'

import React from 'react'
import { useDesignSystem } from '../../design-systems'
import { 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Github, 
  Linkedin, 
  Facebook,
  Instagram,
  Youtube,
  ArrowUp
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'

export interface FooterLink {
  title: string
  href: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export interface SocialLink {
  platform: 'twitter' | 'github' | 'linkedin' | 'facebook' | 'instagram' | 'youtube'
  href: string
  label: string
}

export interface ContactInfo {
  email?: string
  phone?: string
  address?: string
}

export interface MainFooterProps {
  logo?: React.ReactNode
  description?: string
  sections?: FooterSection[]
  socialLinks?: SocialLink[]
  contactInfo?: ContactInfo
  showNewsletter?: boolean
  showBackToTop?: boolean
  copyright?: string
  className?: string
}

export const MainFooter: React.FC<MainFooterProps> = ({
  logo,
  description = 'Building the future of web development with modern tools and best practices.',
  sections = [],
  socialLinks = [],
  contactInfo = {},
  showNewsletter = true,
  showBackToTop = true,
  copyright = '© 2025 LND Boilerplate. All rights reserved.',
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()

  const defaultSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { title: 'Features', href: '/features' },
        { title: 'Pricing', href: '/pricing' },
        { title: 'Documentation', href: '/docs' },
        { title: 'API Reference', href: '/api' }
      ]
    },
    {
      title: 'Company',
      links: [
        { title: 'About', href: '/about' },
        { title: 'Blog', href: '/blog' },
        { title: 'Careers', href: '/careers' },
        { title: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { title: 'Help Center', href: '/help' },
        { title: 'Community', href: '/community' },
        { title: 'Status', href: '/status' },
        { title: 'Changelog', href: '/changelog' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { title: 'Privacy Policy', href: '/privacy' },
        { title: 'Terms of Service', href: '/terms' },
        { title: 'Cookie Policy', href: '/cookies' },
        { title: 'GDPR', href: '/gdpr' }
      ]
    }
  ]

  const defaultSocialLinks: SocialLink[] = [
    { platform: 'twitter', href: 'https://twitter.com/lndboilerplate', label: 'Follow us on Twitter' },
    { platform: 'github', href: 'https://github.com/lnd-boilerplate', label: 'View on GitHub' },
    { platform: 'linkedin', href: 'https://linkedin.com/company/lnd-boilerplate', label: 'Connect on LinkedIn' }
  ]

  const defaultContactInfo: ContactInfo = {
    email: 'hello@lndboilerplate.com',
    phone: '+1 (555) 123-4567',
    address: '123 Innovation Street, Tech City, TC 12345'
  }

  const footerSections = sections.length > 0 ? sections : defaultSections
  const footerSocialLinks = socialLinks.length > 0 ? socialLinks : defaultSocialLinks
  const footerContactInfo = Object.keys(contactInfo).length > 0 ? contactInfo : defaultContactInfo

  const getSocialIcon = (platform: string) => {
    const icons = {
      twitter: <Twitter className="h-5 w-5" />,
      github: <Github className="h-5 w-5" />,
      linkedin: <Linkedin className="h-5 w-5" />,
      facebook: <Facebook className="h-5 w-5" />,
      instagram: <Instagram className="h-5 w-5" />,
      youtube: <Youtube className="h-5 w-5" />
    }
    return icons[platform as keyof typeof icons] || <Twitter className="h-5 w-5" />
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement newsletter subscription logic
    console.log('Newsletter subscription')
  }

  return (
    <footer className={`bg-background border-t ${className}`}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2 space-y-4">
            {logo || (
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent" />
                <span className="text-xl font-bold">LND</span>
              </div>
            )}
            <p className="text-muted-foreground max-w-md">
              {description}
            </p>
            
            {/* Social Links */}
            {footerSocialLinks.length > 0 && (
              <div className="flex space-x-4">
                {footerSocialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.label}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="font-semibold text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="mt-12 pt-8 border-t">
            <div className="max-w-md">
              <h3 className="font-semibold text-foreground mb-2">
                Stay updated
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest updates, news and product offerings sent straight to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex space-x-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  required
                />
                <Button type="submit" size="sm">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        )}

        {/* Contact Information */}
        {(footerContactInfo.email || footerContactInfo.phone || footerContactInfo.address) && (
          <div className="mt-8 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {footerContactInfo.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a 
                      href={`mailto:${footerContactInfo.email}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {footerContactInfo.email}
                    </a>
                  </div>
                </div>
              )}
              
              {footerContactInfo.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a 
                      href={`tel:${footerContactInfo.phone}`}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {footerContactInfo.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {footerContactInfo.address && (
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {footerContactInfo.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{copyright}</span>
              <span>•</span>
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              <span>by LND Team</span>
            </div>

            {/* Back to Top Button */}
            {showBackToTop && (
              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowUp className="h-4 w-4 mr-2" />
                Back to top
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
