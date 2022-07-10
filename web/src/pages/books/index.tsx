import { Box, Center, Loader, Space, Title } from '@mantine/core';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

import AddButton from '@/components/Buttons/Add';
import Error from '@/components/Error';
import Table from '@/components/Table';
import { fetcher } from '@/lib/fetcher';
import { usePaginationStore } from '@/store/pagination';
import { Book } from '@/types/Book';

interface IFetcher {
  data: Book[];
  totalData: number;
}

const ManageBooks: NextPage = () => {
  const activePage = usePaginationStore((state) => state.activePage);
  const limit = usePaginationStore((state) => state.limit);

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
        <AddButton />
        <Space h='sm' />
        <Box>
          {error && <Error />}
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
