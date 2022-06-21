import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Breadcrumb from '../../../components/Breadcrumb';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { Book } from '../../../components/Table';
import { fetcher } from '../../../lib/fetcher';

const Update = () => {
  const router = useRouter();
  const query = router.query;

  const { data, error } = useSWR<Book>(`/books/${query.id}`, fetcher);

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

  return (
    <>
      <Head>
        <title>{data.title} | Update Book</title>
      </Head>
      <main>
        <Breadcrumb
          content={[
            {
              link: '/',
              label: 'Manage Books',
            },
            {
              link: `/books/${data.id}`,
              label: data.title,
            },
            {
              link: `/books/${data.id}/update`,
              label: 'Update',
            },
          ]}
        />
      </main>
    </>
  );
};

export default Update;
