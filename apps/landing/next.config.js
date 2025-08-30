const withNextIntl = require('next-intl/plugin')('./i18n.ts');

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

module.exports = withNextIntl(nextConfig);
