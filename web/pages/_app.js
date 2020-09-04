import React from 'react';
// import 'styles/global.css';

import 'typeface-open-sans';
import 'typeface-merriweather';

import 'fontsource-roboto';

import Head from 'next/head';

import ThemeProvider from 'context/ThemeContext';
import Theme from 'components/Theme';
import Layout from 'components/Layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider>
        <Theme>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Theme>
      </ThemeProvider>
    </>
  );
}
