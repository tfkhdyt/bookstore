import {
  Box,
  Center,
  Grid,
  Loader,
  Select,
  SimpleGrid,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import axios from 'axios';
import { m } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMemo, useState } from 'react';
import useSWR from 'swr';
import { Category, Search } from 'tabler-icons-react';

import { variants } from '@/animations/variants';
import AddButton from '@/components/Buttons/Add';
import Error from '@/components/Error';
import Table from '@/components/Table';
import useBreakpoint from '@/hooks/useBreakpoint';
import { fetcher } from '@/lib/fetcher';
import { usePaginationStore } from '@/store/pagination';
import { Book } from '@/types/Book';
import { ErrorData } from '@/types/FetchErrorData';

interface IFetcher {
  data: Book[];
  totalData: number;
}

const ManageBooks: NextPage = () => {
  const activePage = usePaginationStore((state) => state.activePage);
  const limit = usePaginationStore((state) => state.limit);
  const { isMd } = useBreakpoint();
  const [searchCategory] = useState([
    { value: 'title', label: 'Title' },
    { value: 'author', label: 'Author' },
    { value: 'isbn', label: 'ISBN' },
    { value: 'publisher', label: 'Publisher' },
  ]);
  const [activeSearchCategory, setActiveSearchCategory] = useState<
    string | null
  >('title');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debounced] = useDebouncedValue(searchQuery, 1000, { leading: true });

  const { data, error, mutate } = useSWR<IFetcher>(
    activePage && limit && debounced !== ''
      ? `/books?limit=${limit}&page=${activePage}&${activeSearchCategory}=${debounced}`
      : activePage && limit
      ? `/books?limit=${limit}&page=${activePage}`
      : null,
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
        <Grid>
          <Grid.Col xs={12} md={6}>
            <AddButton />
          </Grid.Col>
          <Grid.Col
            sx={{ display: 'flex', justifyContent: 'flex-end' }}
            xs={12}
            md={6}
          >
            <Select
              placeholder='Search by'
              sx={{ width: 140 }}
              icon={<Category />}
              defaultValue='title'
              value={activeSearchCategory}
              onChange={setActiveSearchCategory}
              data={searchCategory}
              withinPortal={false}
            />
            <Space w={8} />
            <TextInput
              placeholder='Example: Bumi Manusia'
              sx={{
                width: 400,
                flexGrow: isMd ? undefined : 1,
              }}
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.currentTarget.value)}
              icon={<Search />}
            />
          </Grid.Col>
        </Grid>
        <Space h='sm' />
        <Box>
          {error ||
            (axios.isAxiosError(error) && (
              <Error
                message={(error.response?.data as ErrorData).message}
                status={error.response?.status}
              />
            ))}
          {!data ? (
            <Center
              style={{ width: '100%', height: '75vh' }}
              component={m.div}
              variants={variants}
              initial='hidden'
              animate='enter'
              exit='exit'
              key='loader'
            >
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
