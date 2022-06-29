import 'react-medium-image-zoom/dist/styles.css';

import { m } from 'framer-motion';
import Image from 'next/image';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';
import useSWR from 'swr';

import { variants } from '../animations/variants';
import Error from '../components/Error';
import { fetcher } from '../lib/fetcher';
import { usePaginationStore } from '../store/pagination';
import DeleteButton from './Buttons/Delete';
import DetailButton from './Buttons/Detail';
import UpdateButton from './Buttons/Update';
import Loading from './Loading';
import Pagination from './Pagination';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publisher: string;
  numberOfPages: number;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

// interface TableProps {
//   books: Book[];
//   totalData: number;
//   mutate: () => void;
// }

interface IFetcher {
  data: Book[];
  totalData: number;
}

const Table = () => {
  const { page, limit, activePage } = usePaginationStore((state) => state);
  const { data, error, mutate } = useSWR<IFetcher>(
    page && limit ? `/books?limit=${limit}&page=${page}` : null,
    page && limit ? fetcher : null
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  if (error) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Error />
      </div>
    );
  }

  if (!data) return <Loading title='Loading... | Manage Books' />;

  const books = data.data;

  return (
    <>
      <h2 className='mb-3 text-2xl font-semibold leading-tight'>
        Manage Books
      </h2>
      <div className='overflow-x-auto rounded-xl '>
        <m.table
          className='min-w-full text-sm'
          variants={variants}
          initial='hidden'
          animate='enter'
          exit='exit'
          key={activePage}
        >
          <thead className='bg-slate-100 text-gray-600'>
            <tr className='text-right'>
              <th title='ID' className='w-2 p-3 text-left'>
                ID
              </th>
              <th title='Cover Image' className='w-24 p-3 text-center'>
                Cover Image
              </th>
              <th title='Title' className='p-3 text-left'>
                Title
              </th>
              <th title='Author' className='p-3 text-left'>
                Author
              </th>
              <th title='ISBN' className='p-3'>
                ISBN
              </th>
              {/* <th title='Description' className='w-80 p-3 text-left'>
                Description
              </th> */}
              <th title='Publisher' className='p-3 text-left'>
                Publisher
              </th>
              <th title='Number of Pages' className='p-3'>
                # Pages
              </th>
              <th title='Actions' className='w-12 p-3 text-center'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {books &&
              books.map((book, index) => {
                return (
                  <tr
                    key={index}
                    className='h-4 border-b-2 border-slate-400 border-opacity-20 bg-gray-50 text-right transition-colors duration-300 ease-in-out hover:bg-gray-200'
                  >
                    <td className='px-3 py-1 text-left'>
                      <span className='font-semibold'>{book.id}</span>
                    </td>
                    <td className='text-center'>
                      {book.coverImage ? (
                        <Zoom>
                          <img
                            src={book.coverImage}
                            alt={`${book.title} cover image`}
                            width={100}
                            height={100}
                          />
                        </Zoom>
                      ) : (
                        <p>No image</p>
                      )}
                    </td>
                    <td className='px-3 py-1 text-left'>
                      <span>{book.title}</span>
                    </td>
                    <td className='px-3 py-1 text-left'>
                      <span>{book.author}</span>
                    </td>
                    <td className='px-3 py-1'>
                      <span>{book.isbn}</span>
                    </td>
                    {/* <td className='px-3 py-1 text-left'>
                      <span>
                        {book.description.split(' ').slice(0, 20).join(' ')}
                        {book.description.split(' ').length >= 20 && '...'}
                      </span>
                    </td> */}
                    <td className='px-3 py-1 text-left'>
                      <span>{book.publisher}</span>
                    </td>
                    <td className='px-3 py-1'>
                      <span>{book.numberOfPages}</span>
                    </td>
                    <td className='grid gap-2 p-3'>
                      <DetailButton bookID={book.id as number} />
                      <UpdateButton bookID={book.id as number} />
                      <DeleteButton
                        id={book.id as number}
                        title={book.title}
                        mutate={mutate}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <Pagination
            totalData={data.totalData}
            numberOfCurrentPageData={books.length}
          />
        </m.table>
      </div>
    </>
  );
};

export default Table;
