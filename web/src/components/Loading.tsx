import { m } from 'framer-motion';
import Head from 'next/head';

import { variants } from '../animations/variants';

interface LoadingProps {
  title?: string;
}

const Loading = ({ title = 'Loading...' }: LoadingProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <m.div
        variants={variants} // Pass the variant object into Framer Motion
        initial='hidden' // Set the initial state to variants.hidden
        animate='enter' // Animated state to variants.enter
        exit='exit' // Exit state (used later) to variants.exit
        transition={{
          type: 'tween',
          ease: 'easeInOut',
        }}
        className={`grid h-screen w-screen place-items-center`}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='50'
          height='50'
          viewBox='0 0 24 24'
          className='animate-spin fill-gray-200'
        >
          <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm8 12c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-19 0c0-6.065 4.935-11 11-11v2c-4.962 0-9 4.038-9 9 0 2.481 1.009 4.731 2.639 6.361l-1.414 1.414.015.014c-2-1.994-3.24-4.749-3.24-7.789z' />
        </svg>
      </m.div>
    </>
  );
};

export default Loading;
