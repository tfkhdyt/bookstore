import { format } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import Breadcrumb from '../../../components/Breadcrumb';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { Book } from '../../../components/Table';
import { deleteBook } from '../../../lib/deleteBook';
import { fetcher } from '../../../lib/fetcher';

interface IFetcher {
  data: Book;
}

const Detail = () => {
  const router = useRouter();
  const query = router.query;

  const { data, error, mutate } = useSWR<IFetcher>(
    `/books/${query.id}`,
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

  const book = data.data;

  return (
    <>
      <Head>
        <title>{book.title} | Book Detail</title>
      </Head>
      <div>
        <Breadcrumb
          content={[
            {
              link: '/',
              label: 'Manage Books',
            },
            {
              link: `/books/${book.id}`,
              label: book.title,
            },
          ]}
        />
        <h1 className='mb-3 text-2xl font-semibold leading-tight'>
          Book Detail: {book.title}
        </h1>
        <div className='grid grid-cols-2 gap-4'>
          <div className='text-lg'>
            <ul>
              <li>Title: </li>
              <p>{book.title}</p>
              <li>Author: </li>
              <p>{book.author}</p>
              <li>ISBN: </li>
              <p>{book.isbn}</p>
              <li>Description:</li>
              <p className='text-base'>{book.description}</p>
              <li>Publisher: </li>
              <p>{book.publisher}</p>
              <li>Number of pages: </li>
              <p>{book.numberOfPages}</p>
              <li>Created at: </li>
              <p>
                {' '}
                {format(new Date(book.createdAt), 'iiii, d MMMM y H:mm:ss')}
              </p>
              <li>Updated at: </li>
              <p>
                {' '}
                {format(new Date(book.updatedAt), 'iiii, d MMMM y H:mm:ss')}
              </p>
            </ul>
          </div>
          <div>
            <div className='relative h-full w-full'>
              {book.coverImage && (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover image`}
                  layout='fill'
                  objectFit='contain'
                />
              )}
            </div>
          </div>
        </div>
        <div className='float-left mt-4 flex space-x-4'>
          <Link href={`/books/${book.id}/update`}>
            <a className='mx-auto rounded bg-yellow-500 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-yellow-600 active:bg-yellow-700'>
              Update
            </a>
          </Link>
          <button
            type='button'
            className='mx-auto rounded bg-red-400 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 active:bg-red-600'
            onClick={async () => {
              const { success } = await deleteBook(
                book.id as number,
                book.title,
                mutate
              );
              // await mutate();
              if (success) router.push('/');
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Detail;
