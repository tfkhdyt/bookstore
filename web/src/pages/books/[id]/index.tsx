import { format } from 'date-fns';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { Book } from '../../../components/Table';
import { fetcher } from '../../../lib/fetcher';

const Detail = () => {
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

  console.log(data);

  return (
    <>
      <Head>
        <title>{data.title} | Book Detail</title>
      </Head>
      <div className='container mx-auto rounded-md p-2 sm:p-4'>
        <h1 className='mb-3 text-2xl font-semibold leading-tight'>
          Book Detail: {data.title}
        </h1>
        <div className='grid grid-cols-2 gap-4'>
          <div className='ml-8 text-lg'>
            <ul className='list-disc'>
              <li>Title : {data.title}</li>
              <li>Author : {data.author}</li>
              <li>ISBN : {data.isbn}</li>
              <li>Description :</li>
              <p className='text-base'>{data.description}</p>
              <li>Publisher : {data.publisher}</li>
              <li>Number of pages : {data.number_of_pages}</li>
              <li>
                Created at :{' '}
                {format(
                  new Date(data.created_at as Date),
                  'iiii, d MMMM y H:mm:ss'
                )}
              </li>
              <li>
                Updated at :{' '}
                {format(
                  new Date(data.updated_at as Date),
                  'iiii, d MMMM y H:mm:ss'
                )}
              </li>
            </ul>
          </div>
          <div className='flex w-2/12 flex-col space-y-4'>
            <Link href={`/books/${data.id}/update`}>
              <a className='mx-auto w-full rounded bg-yellow-500 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-yellow-600 active:bg-yellow-700'>
                Update
              </a>
            </Link>
            <button
              type='button'
              className='mx-auto w-full rounded bg-red-400 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 active:bg-red-600'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
