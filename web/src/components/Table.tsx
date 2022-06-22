import Link from 'next/link';

export interface Book {
  id?: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publisher: string;
  numberOfPages: number;
  coverImage: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface TableProps {
  books: Book[];
}

const Table = ({ books }: TableProps) => {
  console.log(books);
  return (
    <>
      <h2 className='mb-3 text-2xl font-semibold leading-tight'>
        Manage Books
      </h2>
      <div className='overflow-x-auto rounded-xl '>
        <table className='min-w-full text-sm'>
          <thead className='bg-slate-100 text-gray-600'>
            <tr className='text-right'>
              <th title='ID' className='p-3 text-left'>
                ID
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
              <th title='Description' className='w-80 p-3 text-left'>
                Description
              </th>
              <th title='Publisher' className='p-3 text-left'>
                Publisher
              </th>
              <th title='Number of Pages' className='p-3'>
                # Pages
              </th>
              <th title='Actions' className='p-3 text-center'>
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
                    className='border-b-2 border-slate-400 border-opacity-20 bg-gray-50 text-right transition-colors duration-300 ease-in-out hover:bg-gray-200'
                  >
                    <td className='px-3 py-1 text-left'>
                      <span>{book.id}</span>
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
                    <td className='px-3 py-1 text-left'>
                      <span>
                        {book.description.split(' ').slice(0, 20).join(' ')}
                        {book.description.split(' ').length >= 20 && '...'}
                      </span>
                    </td>
                    <td className='px-3 py-1 text-left'>
                      <span>{book.publisher}</span>
                    </td>
                    <td className='px-3 py-1'>
                      <span>{book.numberOfPages}</span>
                    </td>
                    <td className='grid gap-2 p-3'>
                      <Link href={`/books/${book.id}`}>
                        <a className='mx-auto w-full rounded bg-blue-500 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-blue-600 active:bg-blue-700'>
                          Detail
                        </a>
                      </Link>
                      <Link href={`/books/${book.id}/update`}>
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
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
