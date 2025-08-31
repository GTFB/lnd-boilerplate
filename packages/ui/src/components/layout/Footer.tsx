'use client'

import React, { useState, useEffect } from 'react'
import { useDesignSystem } from '../../design-systems'
import { Button, Input } from '../ui'
import { CookieConsent } from '../ui/CookieConsent'
import { TwitterIcon, GitHubIcon, LinkedInIcon } from '../ui/icons'
import { LocalizedLink } from '../ui/LocalizedLink'
import { MapPin, Mail, Phone, ArrowUp } from 'lucide-react'

export interface FooterProps {
  showLogo?: boolean
  showMenuSections?: boolean
  showContactInfo?: boolean
  showSubscription?: boolean
  showCookieConsent?: boolean
  showBackToTop?: boolean
  showScrollProgress?: boolean
  className?: string
}

export const Footer: React.FC<FooterProps> = ({
  showLogo = true,
  showMenuSections = true,
  showContactInfo = true,
  showSubscription = true,
  showCookieConsent = true,
  showBackToTop = true,
  showScrollProgress = true,
  className = ''
}) => {
  const { currentSystem } = useDesignSystem()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTopButton, setShowBackToTopButton] = useState(false)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.max(0, Math.min(100, (scrollTop / docHeight) * 100))
      setScrollProgress(progress)
      setShowBackToTopButton(scrollTop > 400)
      // Debug
      if (showScrollProgress) {
        console.log('ScrollProgress:', progress, '%')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial call
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showScrollProgress])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscription = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log('Subscription email:', email)
    setEmail('')
  }



  return (
    <>
      {/* Scroll Progress Bar */}
      {showScrollProgress && (
        <div 
          className="scroll-progress-container"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            backgroundColor: 'hsl(var(--muted))',
            zIndex: 60,
            transform: 'none',
            contain: 'none'
          }}
        >
          <div 
            className="scroll-progress-bar"
            style={{ 
              width: `${scrollProgress}%`,
              height: '100%',
              backgroundColor: 'hsl(var(--primary))',
              transition: 'width 0.3s ease-out',
              transform: 'none',
              contain: 'none'
            }}
          />
        </div>
      )}

      {/* Footer */}
      <footer className={`bg-background border-t ${className}`}>
        <div className="mx-auto max-w-[1480px] px-5 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo and Description */}
            {showLogo && (
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">L</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading">LND Boilerplate</h3>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  A modern, performant web platform built with Next.js, TypeScript, and Tailwind CSS.
                </p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">Design System:</span>
                  <span className="text-xs font-medium bg-accent px-2 py-1 rounded">{currentSystem}</span>
                </div>
              </div>
            )}

            {/* Menu Sections */}
            {showMenuSections && (
              <>
                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Product</h4>
                  <ul className="space-y-2">
                    <li><LocalizedLink href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</LocalizedLink></li>
                    <li><LocalizedLink href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</LocalizedLink></li>
                    <li><LocalizedLink href="/examples" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Examples</LocalizedLink></li>
                    <li><LocalizedLink href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Templates</LocalizedLink></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Company</h4>
                  <ul className="space-y-2">
                    <li><LocalizedLink href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</LocalizedLink></li>
                    <li><LocalizedLink href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</LocalizedLink></li>
                    <li><LocalizedLink href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</LocalizedLink></li>
                    <li><LocalizedLink href="/press" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Press</LocalizedLink></li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 text-foreground">Support</h4>
                  <ul className="space-y-2">
                    <li><a href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</a></li>
                    <li><a href="/community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</a></li>
                    <li><a href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Status</a></li>
                    <li><a href="/security" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Security</a></li>
                  </ul>
                </div>
              </>
            )}
          </div>

          {/* Contact Info Block */}
          {showContactInfo && (
            <div className="mt-8 pt-8 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Contact Info</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-muted-foreground flex-shrink-0" />
                      <span>123 Developer Street, Tech City</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-muted-foreground flex-shrink-0" />
                      <span>support@altrp.org</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-muted-foreground flex-shrink-0" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Office Hours</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a 
                      href="https://twitter.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors group"
                      aria-label="Follow us on Twitter"
                    >
                      <TwitterIcon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a 
                      href="https://github.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors group"
                      aria-label="Follow us on GitHub"
                    >
                      <GitHubIcon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                    <a 
                      href="https://linkedin.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors group"
                      aria-label="Follow us on LinkedIn"
                    >
                      <LinkedInIcon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Form */}
          {showSubscription && (
            <div className="mt-8 pt-8 border-t">
              <div className="max-w-md">
                <h4 className="font-semibold mb-3 text-foreground">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest updates, news, and insights delivered to your inbox.
                </p>
                <form onSubmit={handleSubscription} className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 h-9"
                    required
                  />
                  <Button type="submit" size="sm">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Copyright Block */}
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © 2024 LND Boilerplate. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
                <a href="/cookies" className="hover:text-foreground transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Consent Banner */}
      {showCookieConsent && (
        <CookieConsent />
      )}

      {/* Back to Top Button with smooth animations */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 bg-background border border-border text-foreground rounded-full shadow-lg z-40 transition-all duration-500 ease-out transform hover:bg-accent hover:text-accent-foreground ${
            showBackToTopButton 
              ? 'opacity-100 scale-100 translate-y-0 hover:scale-110 hover:shadow-xl' 
              : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
          }`}
          aria-label="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  )
}
