import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import Error from '../components/Error';
import Loading from '../components/Loading';
import Table, { Book } from '../components/Table';
import { fetcher } from '../lib/fetcher';
import { usePaginationStore } from '../store/pagination';

interface IFetcher {
  data: Book[];
  totalData: number;
}

const Home: NextPage = () => {
  const { page, limit } = usePaginationStore((state) => state);
  // const [page, setPage] = useState(1);
  // const limit = 5;
  const { data, error } = useSWR<IFetcher>(
    `/books?limit=${limit}&page=${page}`,
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
      <Table books={data.data} totalData={data.totalData} />
    </>
  );
};

export default Home;
