/* eslint-disable @next/next/no-img-element */
import { Box, Center, Space, Stack, Table } from '@mantine/core';
import { useEffect } from 'react';
import Zoom from 'react-medium-image-zoom';

import { getImageUrl } from '@/lib/supabase/storage/getImageUrl';
import { usePaginationStore } from '@/store/pagination';
import { Book } from '@/types/Book';

import DeleteButton from './Buttons/Delete';
import DetailButton from './Buttons/Detail';
import UpdateButton from './Buttons/Update';
import MyPagination from './Pagination';

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
                    textAlign: ['Cover Image', 'ID', 'Actions'].includes(col)
                      ? 'center'
                      : undefined,
                    width: ['Cover Image', 'Actions'].includes(col)
                      ? 150
                      : col === 'ID'
                      ? 20
                      : undefined,
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
                  <Center>
                    {row.coverImage ? (
                      <Zoom
                        overlayBgColorEnd='rgba(0, 0, 0, 0.5)'
                        overlayBgColorStart='rgba(0, 0, 0, 0)'
                      >
                        <img
                          src={getImageUrl(row.coverImage) as string}
                          alt={`${row.title} cover image`}
                          height={150}
                          width='auto'
                        />
                      </Zoom>
                    ) : (
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
                      coverImage={row.coverImage}
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

export default MyTable;
