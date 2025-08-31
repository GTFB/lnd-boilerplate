'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '../../primitives/Button'
import { Heading } from '../../primitives/Heading'
import { Text } from '../../primitives/Text'

interface CTAButton {
  text: string
  variant?: 'default' | 'outline' | 'secondary'
  href?: string
  onClick?: () => void
}

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  ctaButtons?: CTAButton[]
  image?: {
    src: string
    alt: string
    width?: number
    height?: number
  }
  className?: string
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  ctaButtons = [],
  image,
  className = ''
}) => {
  return (
    <section className={`relative overflow-hidden bg-background py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          {subtitle && (
            <Text variant="small" className="mb-4 text-primary">
              {subtitle}
            </Text>
          )}
          
          <Heading level={1} className="mb-6">
            {title}
          </Heading>
          
          {description && (
            <Text variant="large" className="mb-8 text-muted-foreground">
              {description}
            </Text>
          )}
          
          {ctaButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {ctaButtons.map((button, index) => {
                const buttonElement = (
                  <Button
                    key={index}
                    variant={button.variant || 'default'}
                    size="lg"
                    onClick={button.onClick}
                    className="min-w-[140px]"
                  >
                    {button.text}
                  </Button>
                );

                return button.href ? (
                  <Link key={index} href={button.href}>
                    {buttonElement}
                  </Link>
                ) : (
                  buttonElement
                );
              })}
            </div>
          )}
        </div>
        
        {image && (
          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                src={image.src}
                alt={image.alt}
                width={image.width || 2432}
                height={image.height || 1442}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
