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

// module.exports = withNextIntl(nextConfig);

const createNextIntlPlugin = require('next-intl/plugin');
 
// const withNextIntl = createNextIntlPlugin();
const withNextIntl = createNextIntlPlugin(
    './app/i18n.ts'
  );
 
/** @type {import('next').NextConfig} */
const nextConfig = {};
 
module.exports = withNextIntl(nextConfig);