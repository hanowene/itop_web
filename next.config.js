// const SITE = require('./app/config.ts').SITE;
// /** @type {import('next').NextConfig} */
// const createNextIntlPlugin = require('next-intl/plugin');
// const withNextIntl = createNextIntlPlugin(
//   './app/i18n.ts'
// );

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'avatars.githubusercontent.com'
//       },
//       {
//         protocol: 'https',
//         hostname: 'avatar.vercel.sh'
//       }
//     ]
//   },
// };

const port = process.env.PORT || 3000;
const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;


const SITE = {
  name: 'Identitas Orang Papua',

  origin: 'https://tailnext.vercel.app',
  basePathname: '/',
  trailingSlash: false,

  title: 'Identitas Orang Papua',
  description: 'Mengenal Papua Lebih Dekat',
};

// module.exports = withNextIntl(nextConfig);

const createNextIntlPlugin = require('next-intl/plugin');
 
// const withNextIntl = createNextIntlPlugin();
const withNextIntl = createNextIntlPlugin(
    './app/i18n.ts'
  );
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  // output: 'export',

  trailingSlash: SITE.trailingSlash,
  basePath: SITE.basePathname !== '/' ? SITE.basePathname : '',

  swcMinify: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
    ],
    domains: ['www.themealdb.com'],
  },
  async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'https://themealdb.com/:path*',
        },
      ]
    },
};
 
module.exports = withNextIntl(nextConfig);