"use client"

import { PublicLayout } from '@lnd/ui/templates'
import Link from 'next/link'

export default function NotFound() {
  return (
    <PublicLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-bold text-gray-300">404</h1>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Page Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>Or try one of these popular pages:</p>
              <div className="mt-2 space-x-4">
                <Link href="/blog" className="text-blue-600 hover:text-blue-800">
                  Blog
                </Link>
                <Link href="/docs" className="text-blue-600 hover:text-blue-800">
                  Documentation
                </Link>
                <Link href="/experts" className="text-blue-600 hover:text-blue-800">
                  Experts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
