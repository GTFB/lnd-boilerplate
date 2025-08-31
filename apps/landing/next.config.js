/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Rewrites to serve default locale content without prefix
  // These will be handled by middleware for dynamic locale support
  async rewrites() {
    return [
      // Note: Dynamic rewrites are handled by middleware.ts
      // This ensures the default locale can be changed without rebuilding
    ];
  },
  // Settings to eliminate Fast Refresh warnings
  webpack: (config, { dev, isServer }) => {
    // MDX loader
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: '@mdx-js/loader',
          options: {
            jsxImportSource: 'react',
          },
        },
      ],
    });

    return config;
  },
  // Settings to eliminate port warnings
  devIndicators: {
    buildActivity: false,
  },
};

module.exports = nextConfig;
