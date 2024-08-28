import {Pathnames, LocalePrefix} from 'next-intl/routing';

export const defaultLocale = 'en' as const;
export const locales = ['en', 'de', 'du', 'id'] as const;

export const pathnames: Pathnames<typeof locales> = {
  '/': '/',
//   '/pathnames': {
//     en: '/pathnames',
//     de: '/pfadnamen',
//     du: '/',
//     id: '/'
//   },
  '/geography': {
    en: '/geography',
    de: '/pfadnamen',
    du: '/geografie',
    id: '/geografi'
  },
};

export const localePrefix: LocalePrefix<typeof locales> = 'always';

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;


export const SITE = {
  name: 'Identitas Orang Papua',

  origin: 'https://tailnext.vercel.app',
  basePathname: '/',
  trailingSlash: false,

  title: 'Identitas Orang Papua',
  description: 'Mengenal Papua Lebih Dekat',
};