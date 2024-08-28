import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Suspense, useEffect, useState, FunctionComponent, ComponentType } from 'react';

import Nav from './nav';
import Headers from './components/headers/headers';
import Toast from './toast';
import Moralis from 'moralis'
import { Head } from 'next/document';
import bethLogo from './assets/logo/beth-logo.png';
import axios from 'axios';
import FooterHome from './components/footer/footer';
import { AppProps } from 'next/app';

import {NextIntlClientProvider} from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';
import { Provider } from 'react-redux';
// import { store } from "./redux/state/store"
// import { createContext } from 'react';
// import ThemeProvider from './providers';
// import ThemeProvider from './redux/providers';

//  createContext is not supported in Server Components
// export const ThemeContext = createContext({});

export const metadata = {
  title: 'Identitas Orang Papua',
  description:
    'Matahari terbit dari timur, Papua bersinar di timur nusantara'
};

async function RootLayout({
  children,
  // params: {locale}
  }: {
    children: React.ReactNode;
    // params: {locale: string};
  }) {
  const messages = await getMessages();
  const locale = await getLocale();
  return (
    <html lang={locale} className="h-full bg-gray-50">
      {/* <Head>
        <link rel="shortcut icon" href = "./assets/logo/beth-logo.png" />
      </Head> */}
      <body className="flex flex-col h-screen justify-between">
        {/* <Provider store={store}> */}
        <NextIntlClientProvider messages={messages} >
          <Suspense>
            <Nav />
          </Suspense>
          {children}
          <FooterHome></FooterHome>
        </NextIntlClientProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}

export default RootLayout
