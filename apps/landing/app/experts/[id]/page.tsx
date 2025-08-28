import { PublicLayout } from '@lnd/ui/templates'
import { getExpert } from '@lnd/utils/content/server'
import { generateMetadata as generateSEOMetadata } from '@lnd/utils/seo/metadata'
import type { Viewport } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

interface ExpertPageProps {
  params: {
    id: string
  }
}

// Generate SEO metadata for the expert page
export async function generateMetadata({ params }: ExpertPageProps) {
  const expert = await getExpert(params.id)
  
  if (!expert) {
    return {
      title: 'Expert Not Found',
      description: 'The requested expert profile could not be found.'
    }
  }

  return generateSEOMetadata({
    title: `${expert.name} - ${expert.title} - LND Boilerplate`,
    description: expert.bio,
    keywords: expert.expertise,
    type: 'article',
    url: `https://lnd-boilerplate.com/experts/${params.id}`
  }, {
    siteName: 'LND Boilerplate',
    siteUrl: 'https://lnd-boilerplate.com'
  })
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function ExpertPage({ params }: ExpertPageProps) {
  const expert = await getExpert(params.id)
  
  if (!expert) {
    notFound()
  }

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link 
            href="/experts" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Experts
          </Link>

          {/* Expert Profile */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              {/* Avatar */}
              <div className="md:w-1/3 p-8 flex justify-center">
                <div className="relative w-48 h-48">
                  <Image
                    src={expert.avatar}
                    alt={expert.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="md:w-2/3 p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {expert.name}
                </h1>
                <p className="text-xl text-blue-600 mb-4">
                  {expert.title}
                </p>
                <p className="text-gray-600 mb-6">
                  {expert.bio}
                </p>

                {/* Expertise */}
                {expert.expertise && expert.expertise.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="mb-6">
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {expert.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Joined:</span> {new Date(expert.joined).toLocaleDateString()}
                  </p>
                </div>

                {/* Social Links */}
                {expert.social && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Connect
                    </h3>
                    <div className="flex space-x-4">
                      {expert.social.linkedin && (
                        <a
                          href={expert.social.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          LinkedIn
                        </a>
                      )}
                      {expert.social.twitter && (
                        <a
                          href={expert.social.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Twitter
                        </a>
                      )}
                      {expert.social.github && (
                        <a
                          href={expert.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          GitHub
                        </a>
                      )}
                      {expert.social.dribbble && (
                        <a
                          href={expert.social.dribbble}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Dribbble
                        </a>
                      )}
                      {expert.social.behance && (
                        <a
                          href={expert.social.behance}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Behance
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
