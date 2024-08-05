// pages/_app.js
import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../src/createEmotionCache';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '../styles/globals.css';  // Ensure this file exists or remove this line if not needed

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
