import {locales, pathnames, /* ... */} from './config';

// const locales = ["en", "du", "de"]
// const pathnames = {
//     home: "/",
//     geography: "/geography"
// }

// import {createLocalizedPathnamesNavigation} from 'next-intl/navigation';
// export const {Link, redirect, usePathname, useRouter, getPathname} =
//   createLocalizedPathnamesNavigation({locales, pathnames, /* ... */});


import {createSharedPathnamesNavigation} from 'next-intl/navigation'; 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, /* ... */});