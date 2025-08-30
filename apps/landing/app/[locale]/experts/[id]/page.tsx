'use client';

import { PublicLayout } from '@lnd/ui/templates';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface ExpertPageProps {
  params: {
    id: string;
  };
}

export default function ExpertPage({ params }: ExpertPageProps) {
  // Mock data for now since we can't use server functions in client components
  const expert = {
    id: params.id,
    name: 'Expert Name',
    title: 'Expert Title',
    bio: 'Expert bio description',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    expertise: ['JavaScript', 'React', 'Node.js'],
    joined: '2023-01-01',
    location: 'Remote',
    social: {
      twitter: 'https://twitter.com/expert',
      linkedin: 'https://linkedin.com/in/expert',
      github: 'https://github.com/expert',
      dribbble: 'https://dribbble.com/expert',
      behance: 'https://behance.net/expert',
    },
  };

  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/experts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
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
                <p className="text-xl text-blue-600 mb-4">{expert.title}</p>
                <p className="text-gray-600 mb-6">{expert.bio}</p>

                {/* Expertise */}
                {expert.expertise && expert.expertise.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Expertise
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {expert.expertise.map(skill => (
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
                    <span className="font-medium">Location:</span>{' '}
                    {expert.location}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Joined:</span>{' '}
                    {new Date(expert.joined).toLocaleDateString()}
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
  );
}
