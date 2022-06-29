import { motion } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import { variants } from '../animations/variants';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Table, { Book } from '../components/Table';
import { fetcher } from '../lib/fetcher';
import { usePaginationStore } from '../store/pagination';

interface IFetcher {
  data: Book[];
  totalData: number;
}

const ManageBooks: NextPage = () => {
  const { page, limit } = usePaginationStore((state) => state);
  const { data, error, mutate } = useSWR<IFetcher>(
    page && limit ? `/books?limit=${limit}&page=${page}` : null,
    fetcher
  );

  if (!data) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Error />
      </div>
    );
  }

  // console.log(data);

  return (
    <>
      <Head>
        <title>Manage Books | Bookstore</title>
      </Head>
      <motion.main
        variants={variants}
        initial='hidden'
        animate='enter'
        exit='exit'
        transition={{ type: 'tween', ease: 'easeInOut' }}
      >
        <Table books={data.data} totalData={data.totalData} mutate={mutate} />
      </motion.main>
    </>
  );
};

export default ManageBooks;
