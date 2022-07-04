import { Box, Center, Loader, Space, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import Table, { Book } from '@/components/Table';
import { fetcher } from '@/lib/fetcher';
import { usePaginationStore } from '@/store/pagination';

interface IFetcher {
  data: Book[];
  totalData: number;
}

const ManageBooks: NextPage = () => {
  // if (!data) {
  //   return (
  //     <div className='grid min-h-full min-w-full place-items-center'>
  //       <Loading />
  //     </div>
  //   );
  // }

  // console.log(data);

  const { activePage, limit } = usePaginationStore((state) => state);
  const { data, error, mutate } = useSWR<IFetcher>(
    activePage && limit ? `/books?limit=${limit}&page=${activePage}` : null,
    activePage && limit ? fetcher : null
  );

  return (
    <>
      <Head>
        <title>Manage Books | Bookstore</title>
      </Head>
      {/* <Table /> */}
      <main>
        <Title order={2}>Manage Books</Title>
        <Space h='md' />
        <Box>
          {error && (
            <Center sx={{ width: '100%' }}>
              <Text color='red' weight='bold'>
                Failed to fetch data
              </Text>
            </Center>
          )}
          {!data ? (
            <Center style={{ width: '100%', height: '75vh' }}>
              <Loader />
            </Center>
          ) : (
            <Table
              books={data.data}
              totalData={data.totalData}
              mutate={mutate}
            />
          )}
        </Box>
      </main>
    </>
  );
};

export default ManageBooks;
