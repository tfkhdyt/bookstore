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
import { format } from 'date-fns';
import useBreakpoint from 'hooks/useBreakpoint';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useSWR from 'swr';

import DeleteButton from '@/components/Buttons/Delete';
import UpdateButton from '@/components/Buttons/Update';
import Error from '@/components/Error';
import { FetchError } from '@/lib/error/FetchError';
import { fetcher } from '@/lib/fetcher';
import { Book } from '@/types/Book';

interface IFetcher {
  data: Book;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookID] = useState(id);
  const { isXs, isMd } = useBreakpoint();

  const { data, error } = useSWR<IFetcher>(
    bookID ? `/books/${bookID}` : null,
    bookID ? fetcher : null
  );

  if (error) {
    if (error instanceof FetchError) {
      return <Error message={error.message} status={error.status as number} />;
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
        <Grid grow align='flex-start' gutter={60}>
          {/* Book Detail */}
          <Grid.Col xs={12} md={6}>
            <List spacing='sm'>
              <List.Item>
                <Text size='lg' weight={600}>
                  Title:
                </Text>
                <Text size='md'>{book.title}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Author:
                </Text>
                <Text size='md'>{book.author}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  ISBN:
                </Text>
                <Text size='md'>{book.isbn}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Description:
                </Text>
                <Text size='md' sx={{ fontStyle: 'italic' }} align='justify'>
                  {book.description}
                </Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Publisher:
                </Text>
                <Text size='md'>{book.publisher}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Number of pages:
                </Text>
                <Text size='md'>{book.numberOfPages}</Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Created at:
                </Text>
                <Text size='md'>
                  {format(new Date(book.CreatedAt), 'iiii, d MMMM y H:mm:ss')}
                </Text>
              </List.Item>
              <List.Item>
                <Text size='lg' weight={600}>
                  Updated at:
                </Text>
                <Text size='md'>
                  {format(new Date(book.UpdatedAt), 'iiii, d MMMM y H:mm:ss')}
                </Text>
              </List.Item>
            </List>
          </Grid.Col>
          {/* Book Cover */}
          <Grid.Col xs={12} md={6} p={isMd ? undefined : 0}>
            <Center
              sx={{
                position: 'relative',
                width: '100%',
                height: isMd ? '32rem' : isXs ? '15rem' : '15rem',
              }}
            >
              <Image
                src={book.coverImage}
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
            // mutate={mutate}
          />
        </Box>
      </main>
    </>
  );
};

export default Detail;
