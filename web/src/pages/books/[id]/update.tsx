/* eslint-disable react-hooks/rules-of-hooks */
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
  Loader,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import axios from 'axios';
import useBreakpoint from 'hooks/useBreakpoint';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import { Check, DeviceFloppy, X } from 'tabler-icons-react';

import MyDropzone from '@/components/Dropzone';
import Error from '@/components/Error';
import { PreviewImage } from '@/components/PreviewImage';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import {
  mutateUpdateNotif,
  showUpdateNotif,
} from '@/lib/notifications/update.notification';
import { deleteImage } from '@/lib/supabase/storage/delete';
import { getImageUrl } from '@/lib/supabase/storage/getImageUrl';
import { uploadImage } from '@/lib/supabase/storage/upload';
import { Book } from '@/types/Book';
import { ErrorData } from '@/types/FetchErrorData';

interface IFetcher {
  data: Book;
}

const Update = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const router = useRouter();
  const { id } = router.query;
  const [bookID] = useState(id);

  const { data, error, mutate } = useSWR<IFetcher>(
    bookID ? `/books/${bookID}` : null,
    bookID ? fetcher : null
  );

  const { register, handleSubmit } = useForm<Book>();
  const { isXs, isMd } = useBreakpoint();

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

  const onSubmit = async (values: Book) => {
    showUpdateNotif();

    if (coverImage) {
      try {
        const oldFileName = book.coverImage;
        await deleteImage(oldFileName);
        // console.log(fileName, coverImage);

        const newFileName = `books/${Date.now()}-${
          coverImage?.name
        }`.replaceAll(' ', '-');
        await uploadImage(coverImage as File, newFileName);
        await axiosInstance.patch(`/books/${book.ID}`, {
          ...values,
          numberOfPages: Number(values.numberOfPages),
          coverImage: newFileName,
        });

        mutate();
        mutateUpdateNotif({
          color: 'green',
          title: 'Success!',
          icon: <Check />,
          message: `${values.title} updated successfully`,
        });
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          const { message } = err.response?.data as ErrorData;
          mutateUpdateNotif({
            color: 'red',
            title: 'Failed!',
            icon: <X />,
            message: `${message} | Error Code: ${err.response?.status}`,
          });
        } else {
          mutateUpdateNotif({
            color: 'red',
            title: 'Failed!',
            icon: <X />,
            message: `${values.title} failed to update`,
          });
        }
      }
    } else {
      try {
        await axiosInstance.patch(`/books/${book.ID}`, {
          ...values,
          numberOfPages: Number(values.numberOfPages),
        });

        mutate();
        mutateUpdateNotif({
          color: 'green',
          title: 'Success!',
          icon: <Check />,
          message: `${values.title} updated successfully`,
        });
      } catch (err) {
        console.error(err);
        if (axios.isAxiosError(err)) {
          const { message } = err.response?.data as ErrorData;
          mutateUpdateNotif({
            color: 'red',
            title: 'Failed!',
            icon: <X />,
            message: `${message} | Error Code: ${err.response?.status}`,
          });
        } else {
          mutateUpdateNotif({
            color: 'red',
            title: 'Failed!',
            icon: <X />,
            message: `${values.title} failed to update`,
          });
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>{book.title} | Update Book</title>
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
            {
              link: `/books/${book.ID}/update`,
              label: 'Update',
            },
          ].map((item, index) => (
            <Link href={item.link} key={index}>
              <Anchor sx={{ fontWeight: 700 }}>{item.label}</Anchor>
            </Link>
          ))}
        </Breadcrumbs>

        <Title order={2}>Update Book: {book.title}</Title>
        <Space h='md' />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid align='flex-start' gutter='md'>
            <Grid.Col xs={12} md={4}>
              <Stack>
                <TextInput
                  placeholder='Example: Cara Berternak Lele'
                  label='Title'
                  required
                  {...register('title', { required: true })}
                  defaultValue={book.title}
                />
                <TextInput
                  placeholder='Example: Taufik Hidayat'
                  label='Author'
                  required
                  {...register('author', { required: true })}
                  defaultValue={book.author}
                />
                <TextInput
                  placeholder='Example: 9799769420'
                  label='ISBN'
                  required
                  {...register('isbn', { required: true })}
                  defaultValue={book.isbn}
                />
                <TextInput
                  placeholder='Example: Gramedia Pustaka Utama'
                  label='Publisher'
                  required
                  {...register('publisher', { required: true })}
                  defaultValue={book.publisher}
                />
                <TextInput
                  type='number'
                  min={0}
                  placeholder='Example: 420'
                  label='Number of pages'
                  required
                  {...register('numberOfPages', { required: true, min: 0 })}
                  defaultValue={book.numberOfPages}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col xs={12} md={8}>
              <Textarea
                placeholder='Example: This book explains about how to become a catfish farmer'
                label='Description'
                autosize
                minRows={3}
                maxRows={4}
                required
                {...register('description', { required: true })}
                defaultValue={book.description}
              />
              <Space h='lg' />
              <Box sx={{ display: 'flex' }}>
                <Text weight={500} size='sm' mb={4}>
                  Cover Image
                </Text>
                <Text ml={2} color='red'>
                  *
                </Text>
              </Box>
              <Grid gutter='md' grow>
                <Grid.Col xs={12} md={8}>
                  <MyDropzone setCoverImage={setCoverImage} />
                </Grid.Col>
                <Grid.Col
                  xs={12}
                  md={4}
                  // p={isMd ? undefined : 0}
                >
                  <Center
                    sx={{
                      position: 'relative',
                      width: '100%',
                      height: isMd ? '100%' : isXs ? '15rem' : '15rem',
                    }}
                  >
                    <PreviewImage
                      coverImage={
                        coverImage
                          ? URL.createObjectURL(coverImage as File)
                          : (getImageUrl(book.coverImage) as string)
                      }
                      title={
                        coverImage
                          ? URL.createObjectURL(coverImage as File)
                          : undefined
                      }
                    />
                  </Center>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
          <Space h='lg' />
          <Button type='submit' leftIcon={<DeviceFloppy />} variant='light'>
            Save
          </Button>
        </form>
      </main>
    </>
  );
};

export default Update;
