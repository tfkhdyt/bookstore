import {
  Box,
  Center,
  Grid,
  Group,
  Loader,
  MediaQuery,
  Select,
  Space,
  TextInput,
  Title,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import axios from 'axios';
import { m } from 'framer-motion';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
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
        <MediaQuery largerThan='md' styles={{ display: 'none' }}>
          <Space h='md' />
        </MediaQuery>
        <Grid justify='space-between' align='flex-end'>
          <Grid.Col xs={12} lg={6}>
            <AddButton />
          </Grid.Col>
          <Grid.Col xs={12} lg={6}>
            <Grid justify='flex-end' gutter='xs'>
              <Grid.Col xs={6} lg={6}>
                <TextInput
                  label='Search data'
                  placeholder='Example: Bumi Manusia'
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  icon={<Search />}
                />
              </Grid.Col>
              <Grid.Col xs={6} lg={4} xl={3}>
                <Select
                  label='Search by'
                  placeholder='Search by'
                  icon={<Category />}
                  defaultValue='title'
                  value={activeSearchCategory}
                  onChange={setActiveSearchCategory}
                  data={searchCategory}
                  withinPortal={false}
                />
              </Grid.Col>
            </Grid>
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
