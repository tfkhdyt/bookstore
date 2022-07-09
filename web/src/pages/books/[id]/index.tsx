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
import { useMediaQuery } from '@mantine/hooks';
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
import { fetcher } from '@/lib/fetcher';
import { Book } from '@/types/Book';

interface IFetcher {
  data: Book;
}

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [bookID] = useState(id);
  const isBreakpointSm = useMediaQuery('(max-width: 768px)');

  const { data, error } = useSWR<IFetcher>(
    bookID ? `/books/${bookID}` : null,
    bookID ? fetcher : null
  );

  // if (!data) {
  //   return (
  //     <div className='grid min-h-full min-w-full place-items-center'>
  //       <Loading />
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Error />
      </div>
    );
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
        {/* <Breadcrumb
          content={[
            {
              link: '/books',
              label: 'Manage Books',
            },
            {
              link: `/books/${book.id}`,
              label: book.title,
            },
          ]}
        /> */}
        <Title order={2}>Book Detail: {book.title}</Title>
        <Space h='md' />
        <Grid grow align='flex-start' gutter={60}>
          {/* Book Detail */}
          <Grid.Col xs={12} lg={6}>
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
          <Grid.Col xs={12} lg={6} sx={{ justifySelf: 'flex-start' }}>
            <Box
              sx={{
                justifySelf: 'flex-start',
                position: 'relative',
                width: '100%',
                height: isBreakpointSm ? 400 : 600,
              }}
            >
              {book.coverImage && (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover image`}
                  layout='fill'
                  objectFit='contain'
                  objectPosition='top'
                />
              )}
            </Box>
          </Grid.Col>
        </Grid>
        <Box sx={{ marginTop: isBreakpointSm ? '3.5rem' : '1rem' }}>
          <UpdateButton id={book.ID as number} />
          <DeleteButton
            id={book.ID as number}
            title={book.title}
            // mutate={mutate}
          />
        </Box>
        {/* <div className='grid grid-cols-2 gap-8'>
          <div className='text-lg'>
            <ul>
              <li>Title: </li>
              <p>{book.title}</p>
              <li>Author: </li>
              <p>{book.author}</p>
              <li>ISBN: </li>
              <p>{book.isbn}</p>
              <li>Description:</li>
              <p className='text-justify text-base'>{book.description}</p>
              <li>Publisher: </li>
              <p>{book.publisher}</p>
              <li>Number of pages: </li>
              <p>{book.numberOfPages}</p>
              <li>Created at: </li>
              <p>
                {' '}
                {format(new Date(book.CreatedAt), 'iiii, d MMMM y H:mm:ss')}
              </p>
              <li>Updated at: </li>
              <p>
                {' '}
                {format(new Date(book.UpdatedAt), 'iiii, d MMMM y H:mm:ss')}
              </p>
            </ul>
          </div>
          <div>
            <div className='relative h-screen w-full'>
              {book.coverImage && (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} cover image`}
                  layout='fill'
                  objectFit='contain'
                />
              )}
            </div>
          </div>
        </div> */}
      </main>
    </>
  );
};

export default Detail;
