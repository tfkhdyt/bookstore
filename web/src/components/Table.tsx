/* eslint-disable @next/next/no-img-element */
import 'react-medium-image-zoom/dist/styles.css';

import { Box, Center, Space, Stack, Table } from '@mantine/core';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';

import { usePaginationStore } from '@/store/pagination';
import { Book } from '@/types/Book';

import DeleteButton from './Buttons/Delete';
import DetailButton from './Buttons/Detail';
import UpdateButton from './Buttons/Update';
import MyPagination from './Pagination';

// interface TableProps {
//   books: Book[];
//   totalData: number;
//   mutate: () => void;
// }

const table = {
  column: [
    'ID',
    'Cover Image',
    'Title',
    'Author',
    'ISBN',
    'Publisher',
    'Pages',
    'Actions',
  ],
};

interface MyTableProps {
  books: Book[];
  totalData: number;
  mutate: () => void;
}

function MyTable({ books, totalData, mutate }: MyTableProps) {
  const activePage = usePaginationStore((state) => state.activePage);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          flexDirection: 'column',
        }}
      >
        <Table
          fontSize='md'
          highlightOnHover
          striped
          sx={(theme) => ({
            width: '100%',
            backgroundColor: theme.colorScheme === 'dark' ? 'dark' : 'white',
          })}
        >
          <thead>
            <tr>
              {table.column.map((col, index) => (
                <th
                  key={index}
                  style={{
                    textAlign: col === 'Cover Image' ? 'center' : undefined,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {books.map((row, index) => (
              <tr key={index}>
                <td style={{ textAlign: 'center' }}>{row.ID}</td>
                <td>
                  <Center
                  // style={{
                  //   width: '6rem',
                  //   height: '8rem',
                  // }}
                  >
                    {row.coverImage ? (
                      <Zoom
                        overlayBgColorEnd='rgba(0, 0, 0, 0.5)'
                        overlayBgColorStart='rgba(0, 0, 0, 0)'
                      >
                        <img
                          src={row.coverImage}
                          alt={`${row.title} cover image`}
                          height={150}
                          width='auto'
                        />
                      </Zoom>
                    ) : (
                      // <>
                      //   <Image
                      //     src={row.coverImage}
                      //     alt={`${row.title} cover image`}
                      //     layout='fill'
                      //     objectFit='contain'
                      //     onClick={() => {
                      //       setModalImage({
                      //         url: row.coverImage,
                      //         title: row.title,
                      //       });
                      //     }}
                      //   />
                      //   {modalImage && (
                      //     <Lightbox
                      //       open={modalImage ? true : false}
                      //       close={() => setModalImage(null)}
                      //       render={{
                      //         buttonPrev: () => null,
                      //         buttonNext: () => null,
                      //       }}
                      //       slides={[
                      //         {
                      //           src: modalImage.url,
                      //           alt: modalImage.title,
                      //           title: modalImage.title,
                      //         },
                      //       ]}
                      //       plugins={[Captions]}
                      //     />
                      //   )}
                      // </>
                      <p>No image</p>
                    )}
                  </Center>
                </td>
                <td>{row.title}</td>
                <td>{row.author}</td>
                <td>{row.isbn}</td>
                <td>{row.publisher}</td>
                <td>{row.numberOfPages}</td>
                <td>
                  <Stack spacing='xs'>
                    <DetailButton id={row.ID as number} />
                    <UpdateButton id={row.ID as number} />
                    <DeleteButton
                      id={row.ID as number}
                      title={row.title}
                      mutate={mutate}
                    />
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      <Space h='lg' />
      <MyPagination
        totalData={totalData}
        numberOfCurrentPageData={books.length}
      />
    </>
  );
}

// const Table = () => {
//   const { page, limit, activePage } = usePaginationStore((state) => state);
//   const { data, error, mutate } = useSWR<IFetcher>(
//     page && limit ? `/books?limit=${limit}&page=${page}` : null,
//     page && limit ? fetcher : null
//   );

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [activePage]);

//   if (error) {
//     return (
//       <div className='grid min-h-full min-w-full place-items-center'>
//         <Error />
//       </div>
//     );
//   }

//   if (!data) return <Loading title='Loading... | Manage Books' />;

//   const books = data.data;

//   return (
//     <>
//       <h2 className='mb-3 text-2xl font-semibold leading-tight'>
//         Manage Books
//       </h2>
//       <div className='overflow-x-auto rounded-xl '>
//         <m.table
//           className='min-w-full overflow-y-hidden text-sm'
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           key={activePage}
//           transition={{ type: 'tween', ease: 'easeInOut' }}
//         >
//           <thead className='bg-slate-100 text-gray-600'>
//             <tr className='text-right'>
//               <th title='ID' className='w-2 p-3 text-left'>
//                 ID
//               </th>
//               <th title='Cover Image' className='w-24 p-3 text-center'>
//                 Cover Image
//               </th>
//               <th title='Title' className='p-3 text-left'>
//                 Title
//               </th>
//               <th title='Author' className='p-3 text-left'>
//                 Author
//               </th>
//               <th title='ISBN' className='p-3'>
//                 ISBN
//               </th>
//               {/* <th title='Description' className='w-80 p-3 text-left'>
//                 Description
//               </th> */}
//               <th title='Publisher' className='p-3 text-left'>
//                 Publisher
//               </th>
//               <th title='Number of Pages' className='p-3'>
//                 # Pages
//               </th>
//               <th title='Actions' className='w-12 p-3 text-center'>
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {books &&
//               books.map((book, index) => {
//                 return (
//                   <tr
//                     key={index}
//                     className='h-4 border-b-2 border-slate-400 border-opacity-20 bg-gray-50 text-right transition-colors duration-300 ease-in-out hover:bg-gray-200'
//                   >
//                     <td className='px-3 py-1 text-left'>
//                       <span className='font-semibold'>{book.id}</span>
//                     </td>
//                     <td className='text-center'>
//                       {book.coverImage ? (
//                         <Zoom>
//                           <img
//                             src={book.coverImage}
//                             alt={`${book.title} cover image`}
//                             width={100}
//                             height={100}
//                           />
//                         </Zoom>
//                       ) : (
//                         <p>No image</p>
//                       )}
//                     </td>
//                     <td className='px-3 py-1 text-left'>
//                       <span>{book.title}</span>
//                     </td>
//                     <td className='px-3 py-1 text-left'>
//                       <span>{book.author}</span>
//                     </td>
//                     <td className='px-3 py-1'>
//                       <span>{book.isbn}</span>
//                     </td>
//                     {/* <td className='px-3 py-1 text-left'>
//                       <span>
//                         {book.description.split(' ').slice(0, 20).join(' ')}
//                         {book.description.split(' ').length >= 20 && '...'}
//                       </span>
//                     </td> */}
//                     <td className='px-3 py-1 text-left'>
//                       <span>{book.publisher}</span>
//                     </td>
//                     <td className='px-3 py-1'>
//                       <span>{book.numberOfPages}</span>
//                     </td>
//                     <td className='grid gap-2 p-3'>
//                       <DetailButton bookID={book.id as number} />
//                       <UpdateButton bookID={book.id as number} />
//                       <DeleteButton
//                         id={book.id as number}
//                         title={book.title}
//                         mutate={mutate}
//                       />
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//           <Pagination
//             totalData={data.totalData}
//             numberOfCurrentPageData={books.length}
//           />
//         </m.table>
//       </div>
//     </>
//   );
// };

export default MyTable;
