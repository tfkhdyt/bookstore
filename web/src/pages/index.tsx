import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import Error from '../components/Error';
import Loading from '../components/Loading';
import Table, { Book } from '../components/Table';
import { fetcher } from '../lib/fetcher';

const Home: NextPage = () => {
  const { data, error } = useSWR<Book[]>('/books', fetcher);

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
      <Table books={data} />
    </>
  );
};

export default Home;
