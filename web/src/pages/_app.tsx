import '../styles/globals.css';

import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import type { AppProps } from 'next/app';

import { variants } from '../animations/variants';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
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
            transition={{ type: 'tween', ease: 'easeInOut' }}
          >
            <Component {...pageProps} />
          </m.div>
        </AnimatePresence>
      </LazyMotion>
    </Layout>
  );
}

export default MyApp;
