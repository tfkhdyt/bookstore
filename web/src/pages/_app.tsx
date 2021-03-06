import '@/styles/globals.css';
import 'react-medium-image-zoom/dist/styles.css';

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { useHotkeys, useLocalStorage } from '@mantine/hooks';
import { ModalsProvider } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { variants } from '@/animations/variants';
import Layout from '@/components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  useHotkeys([['mod+J', () => toggleColorScheme()]]);

  return (
    <>
      <Head>
        <title>Bookstore</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <link rel='shortcut icon' href='/favicon.ico' />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ fontFamily: 'Fira Sans, sans-serif', colorScheme }}
          withGlobalStyles
          withNormalizeCSS
        >
          <ModalsProvider>
            <NotificationsProvider>
              <Layout>
                <style>
                  {`html {
                color-scheme: ${colorScheme}
              }`}
                </style>
                <LazyMotion features={domAnimation}>
                  <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                  >
                    <m.div
                      key={router.asPath}
                      variants={variants}
                      initial='hidden'
                      animate='enter'
                      exit='exit'
                    >
                      <Component {...pageProps} />
                    </m.div>
                  </AnimatePresence>
                </LazyMotion>
              </Layout>
            </NotificationsProvider>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

export default MyApp;
