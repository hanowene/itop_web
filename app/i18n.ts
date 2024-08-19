// import i18next from 'i18next';
// import { initReactI18next } from 'react-i18next';

import translationEnglish from "./lang/english.json"
import translationDutch from "./lang/dutch.json"

// const resources = {
//     en: {
//         translation: translationEnglish
//     },
//     du: {
//         translation: translationDutch
//     },
// }

// i18next
//     .use(initReactI18next)
//     .init({
//         resources,
//         lng: "du"
//     })

// export default i18next;

// import {notFound} from 'next/navigation';
// import {getRequestConfig} from 'next-intl/server';
 
// // export default getRequestConfig(async ({locale}) => {
// //   // Validate that the incoming `locale` parameter is valid
// //   if (!locales.includes(locale as any)) notFound();

// export default getRequestConfig(async () => {
//   // Provide a static locale, fetch a user setting,
//   // read from `cookies()`, `headers()`, etc.
//   const locale = 'en';
//   return {
//     messages: (await import(`./messages/${locale}.json`)).default,
//     resources: {
//         en: {
//             translation: translationEnglish
//         },
//         du: {
//             translation: translationDutch
//         },
//     },
//   };
// });

import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = 'id';
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});