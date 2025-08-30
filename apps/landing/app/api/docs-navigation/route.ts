import { NextResponse } from 'next/server';
import { readJSONFile } from '@lnd/utils/content/readers';
import path from 'path';

export async function GET() {
  try {
    const configPath = path.join(
      process.cwd(),
      '_content/docs/navigation.json'
    );
    const navigation = readJSONFile(configPath);

    return NextResponse.json(navigation);
  } catch (error) {
    console.error('Failed to load docs navigation config:', error);

    // Return default navigation structure
    const defaultNavigation = {
      sections: [
        {
          title: 'DOCUMENTATION',
          items: [
            {
              title: 'Introduction',
              href: '/docs/introduction',
              file: 'introduction.mdx',
            },
            {
              title: 'Installation Guide',
              href: '/docs/installation',
              file: 'installation.mdx',
            },
            {
              title: 'System Architecture',
              href: '/docs/architecture',
              file: 'architecture.mdx',
            },
          ],
        },
        {
          title: 'GETTING STARTED',
          items: [
            {
              title: 'Quick Start Guide',
              href: '/docs/getting-started/quick-start',
              file: 'getting-started/quick-start.mdx',
            },
            {
              title: 'First Steps',
              href: '/docs/getting-started/first-steps',
              file: 'getting-started/first-steps.mdx',
            },
          ],
        },
        {
          title: 'ADVANCED TOPICS',
          items: [
            {
              title: 'Customization Guide',
              href: '/docs/advanced/customization',
              file: 'advanced/customization.mdx',
            },
            {
              title: 'Performance Optimization',
              href: '/docs/advanced/performance',
              file: 'advanced/performance.mdx',
            },
          ],
        },
      ],
    };

    return NextResponse.json(defaultNavigation);
  }
}
