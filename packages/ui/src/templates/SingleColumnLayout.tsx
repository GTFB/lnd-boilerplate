import React from 'react';
import Header from '../components/common/Header';
import { SupportedLocale } from '@lnd/utils/i18n';

interface SingleColumnLayoutProps {
  locale: SupportedLocale;
  title?: string;
  subtitle?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

export function SingleColumnLayout({ 
  locale, 
  title, 
  subtitle, 
  description, 
  children, 
  className = '' 
}: SingleColumnLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Header locale={locale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {title && (
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xl text-gray-600 mb-8">
              {subtitle}
            </p>
          )}
          <div className="space-y-4">
            {description && (
              <p className="text-lg text-gray-700">
                {description}
              </p>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
