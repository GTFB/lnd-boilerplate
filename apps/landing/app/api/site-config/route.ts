import { NextResponse } from 'next/server';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

/**
 * API endpoint to serve site.config.json
 * This allows client-side components to load the configuration
 */
export async function GET() {
  try {
    // Dynamic import to avoid issues during static generation
    const { readFileSync, existsSync } = await import('fs');
    const { join } = await import('path');

    // Try to read from the landing app's site.config.json
    const configPath = join(process.cwd(), 'site.config.json');

    if (!existsSync(configPath)) {
      return NextResponse.json(
        { error: 'Site configuration not found' },
        { status: 404 }
      );
    }

    const configContent = readFileSync(configPath, 'utf-8');
    const config = JSON.parse(configContent);

    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300', // Cache for 5 minutes
      },
    });
  } catch (error) {
    console.error('Error loading site configuration:', error);
    return NextResponse.json(
      { error: 'Failed to load site configuration' },
      { status: 500 }
    );
  }
}
