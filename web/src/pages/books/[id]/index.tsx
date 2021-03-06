import {
  Anchor,
  Box,
  Breadcrumbs,
  Center,
  Grid,
  List,
  Loader,
  Space,
  Text,
  Title,
} from '@mantine/core';
import axios from 'axios';
import { format } from 'date-fns';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import DeleteButton from '@/components/Buttons/Delete';
import UpdateButton from '@/components/Buttons/Update';
import Error from '@/components/Error';
import useBreakpoint from '@/hooks/useBreakpoint';
import { fetcher } from '@/lib/fetcher';
import { getImageUrl } from '@/lib/supabase/storage/getImageUrl';
import { Book } from '@/types/Book';
import { ErrorData } from '@/types/FetchErrorData';

interface IFetcher {
  data: Book;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookID] = useState(id);
  const { isMd } = useBreakpoint();

  const { data, error } = useSWR<IFetcher>(
    bookID ? `/books/${bookID}` : null,
    bookID ? fetcher : null
  );

  if (error) {
    if (axios.isAxiosError(error)) {
      return (
        <Error
          message={(error.response?.data as ErrorData).message}
          status={error.response?.status}
        />
      );
    } else {
      return <Error />;
    }
  }

  if (!data)
    return (
      <Center style={{ width: '100%', height: '75vh' }}>
        <Loader />
      </Center>
    );

  const book = data.data;
  // console.log(book);

  return (
    <>
      <Head>
        <title>{book.title} | Book Detail</title>
      </Head>
      <main>
        <Breadcrumbs>
          {[
            {
              link: '/books',
              label: 'Manage Books',
            },
            {
              link: `/books/${book.ID}`,
              label: book.title,
            },
          ].map((item, index) => (
            <Link href={item.link} key={index}>
              <Anchor sx={{ fontWeight: 700 }}>{item.label}</Anchor>
            </Link>
          ))}
        </Breadcrumbs>
        <Title order={2}>Book Detail: {book.title}</Title>
        <Space h='md' />
        <Grid align='flex-start' gutter={60}>
          {/* Book Detail */}
          <Grid.Col xs={12} md={5}>
            <List spacing='sm' sx={{ listStyle: 'none' }}>
              <List.Item>
                <Text size='lg' weight={700}>
                  Title:
                </Text>
                <Text size='md'>{book.title}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Author:
                </Text>
                <Text size='md'>{book.author}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  ISBN:
                </Text>
                <Text size='md'>{book.isbn}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Description:
                </Text>
                <Text
                  size='md'
                  sx={{
                    fontStyle: 'italic',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {book.description}
                </Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Publisher:
                </Text>
                <Text size='md'>{book.publisher}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Number of pages:
                </Text>
                <Text size='md'>{book.numberOfPages}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Created at:
                </Text>
                <Text size='md'>
                  {format(new Date(book.CreatedAt), 'iiii, d MMMM y H:mm:ss')}
                </Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={700}>
                  Updated at:
                </Text>
                <Text size='md'>
                  {format(new Date(book.UpdatedAt), 'iiii, d MMMM y H:mm:ss')}
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
          {/* Book Cover */}
          <Grid.Col xs={12} md={7} p={isMd ? undefined : 0}>
            <Center
              sx={{
                position: 'relative',
                width: '100%',
                height: isMd ? '46rem' : '15rem',
              }}
            >
              <Image
                src={getImageUrl(book.coverImage) as string}
                alt={`${book.title} cover image`}
                layout='fill'
                objectFit='contain'
                objectPosition='top'
              />
            </Center>
          </Grid.Col>
        </Grid>
        <Box sx={{ marginTop: isMd ? '1rem' : '3.5rem' }}>
          <UpdateButton id={book.ID as number} />
          <DeleteButton
            id={book.ID as number}
            title={book.title}
            coverImage={book.coverImage}
            // mutate={mutate}
          />
        </Box>
      </main>
    </>
  );
};

export default Detail;
