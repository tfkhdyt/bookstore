export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  description: string;
  publisher: string;
  number_of_pages: number;
}

interface TableProps {
  books: Book[];
}

const Table = ({ books }: TableProps) => {
  console.log(books);
  return (
    <div className='dark:text-coolGray-100 dark:bg-coolGray-900 container mx-auto rounded-md p-2 sm:p-4'>
      <h2 className='mb-3 text-2xl font-semibold leading-tight'>
        Manage Books
      </h2>
      <div className='overflow-x-auto'>
        <table className='min-w-full text-xs'>
          <thead className='dark:bg-coolGray-700 rounded-t-lg'>
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
              <th title='Description' className='p-3 text-left'>
                Description
              </th>
              <th title='Publisher' className='p-3 text-left'>
                Publisher
              </th>
              <th title='Number of Pages' className='p-3'>
                # Pages
              </th>
              <th title='Actions' className='py-3 text-center'>
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
                    className='dark:border-coolGray-700 dark:bg-coolGray-800 border-b border-opacity-20 text-right'
                  >
                    <td className='px-3 py-2 text-left'>
                      <span>{book.id}</span>
                    </td>
                    <td className='px-3 py-2 text-left'>
                      <span>{book.title}</span>
                    </td>
                    <td className='px-3 py-2 text-left'>
                      <span>{book.author}</span>
                    </td>
                    <td className='px-3 py-2'>
                      <span>{book.isbn}</span>
                    </td>
                    <td className='px-3 py-2 text-left'>
                      <span>{book.description}</span>
                    </td>
                    <td className='px-3 py-2 text-left'>
                      <span>{book.publisher}</span>
                    </td>
                    <td className='px-3 py-2'>
                      <span>{book.number_of_pages}</span>
                    </td>
                    <td className='space-x-2 py-2 text-center'>
                      <button
                        type='button'
                        className='dark:bg-coolGray-100 dark:text-coolGray-800 rounded-full bg-yellow-500 px-8 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-yellow-600 active:bg-yellow-700'
                      >
                        Update
                      </button>
                      <button
                        type='button'
                        className='dark:bg-coolGray-100 dark:text-coolGray-800 rounded-full bg-red-400 px-8 py-3 font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 active:bg-red-600'
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
    </div>
  );
};

export default Table;
