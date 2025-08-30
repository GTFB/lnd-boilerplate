'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@lnd/ui/components/ui/button';

export function NavigationTest() {
  const pathname = usePathname();

  const pages = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Docs', href: '/docs' },
    { name: 'Contact', href: '/contact' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Experts', href: '/experts' },
    { name: 'Legal', href: '/legal' },
  ];

  return (
    <div className="p-6 bg-card border rounded-lg">
      <h2 className="text-lg font-semibold mb-4">Navigation Test</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Current page: <span className="font-mono bg-muted px-2 py-1 rounded">{pathname}</span>
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {pages.map((page) => (
          <Link key={page.href} href={page.href}>
            <Button
              variant={pathname === page.href ? 'default' : 'outline'}
              size="sm"
              className="w-full"
            >
              {page.name}
            </Button>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-muted rounded">
        <h3 className="font-medium mb-2">Theme Test</h3>
        <p className="text-sm">
          This section should change colors when switching themes.
        </p>
        <div className="mt-2 space-y-1">
          <div className="h-4 bg-primary rounded"></div>
          <div className="h-4 bg-secondary rounded"></div>
          <div className="h-4 bg-accent rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}
