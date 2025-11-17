/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nologin.tuaf.vn',
        pathname: '/wp-content/uploads/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384],
    minimumCacheTTL: 31536000,
  },
  compress: true,

  poweredByHeader: false,

  generateEtags: true,

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value:
              '<https://nologin.tuaf.vn>; rel="preconnect", <https://nologin.tuaf.vn>; rel="dns-prefetch"',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        minimize: !dev,
        minimizer: [...(config.optimization.minimizer || [])],
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: 25,
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            vendor: {
              name: 'vendor',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]/,
              priority: 20,
              reuseExistingChunk: true,
              enforce: true,
              minChunks: 1,
            },
            react: {
              name: 'react',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true,
            },
            chakra: {
              name: 'chakra',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]@chakra-ui[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            apollo: {
              name: 'apollo',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]@apollo[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            nextjs: {
              name: 'nextjs',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]next[\\/]/,
              priority: 30,
              reuseExistingChunk: true,
              enforce: true,
            },
            framerMotion: {
              name: 'framer-motion',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            swiper: {
              name: 'swiper',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]swiper[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            emotion: {
              name: 'emotion',
              chunks: 'async',
              test: /[\\/]node_modules[\\/]@emotion[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            icons: {
              name: 'icons',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](react-icons|lucide-react|@heroicons)[\\/]/,
              priority: 25,
              reuseExistingChunk: true,
              enforce: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'async',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
      '@apollo/client',
      'framer-motion',
      'swiper',
      'lucide-react',
      '@heroicons/react',
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  transpilePackages: [],
  modularizeImports: {
    '@chakra-ui/react': {
      transform: '@chakra-ui/react/{{member}}',
    },
  },
};

module.exports = nextConfig;
