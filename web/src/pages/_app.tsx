import '../styles/globals.css';

import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';

import Layout from '../components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <AnimatePresence
        exitBeforeEnter
        // initial={false}
        // onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} key={router.pathname} />
      </AnimatePresence>
    </Layout>
  );
}

export default MyApp;
