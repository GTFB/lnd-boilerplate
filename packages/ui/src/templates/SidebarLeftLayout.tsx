import React from 'react';
import Header from '../components/common/Header';
import { SupportedLocale } from '@lnd/utils/i18n';

interface SidebarLeftLayoutProps {
  locale: SupportedLocale;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  sidebarClassName?: string;
  contentClassName?: string;
}

export function SidebarLeftLayout({ 
  locale, 
  sidebar, 
  children, 
  className = '',
  sidebarClassName = '',
  contentClassName = ''
}: SidebarLeftLayoutProps) {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <Header locale={locale} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          {sidebar && (
            <aside className={`lg:w-64 flex-shrink-0 ${sidebarClassName}`}>
              <div className="sticky top-8">
                {sidebar}
              </div>
            </aside>
          )}
          
          {/* Main Content */}
          <main className={`flex-1 ${contentClassName}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
