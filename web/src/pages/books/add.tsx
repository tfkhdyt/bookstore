/* eslint-disable react/display-name */
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Check, DeviceFloppy, X } from 'tabler-icons-react';

import MyDropzone from '@/components/Dropzone';
import { PreviewImage } from '@/components/PreviewImage';
import { axiosInstance } from '@/lib/axios';
import {
  showCreateNotif,
  updateCreateNotif,
} from '@/lib/notifications/create.notification';
import { uploadImage } from '@/lib/supabase/storage/upload';
import { Book } from '@/types/Book';
import { ErrorData } from '@/types/FetchErrorData';

const AddBook = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Book>();

  const { isXs, isMd } = useBreakpoint();

  const onSubmit = async (values: Book) => {
    showCreateNotif();

    try {
      // const { secure_url } = await uploadImage(coverImage as File);
      const fileName = `books/${Date.now()}-${coverImage?.name}`.replaceAll(
        ' ',
        '-'
      );
      await uploadImage(coverImage as File, fileName);
      await axiosInstance.post('/books', {
        ...values,
        isbn: values.isbn,
        numberOfPages: Number(values.numberOfPages),
        coverImage: fileName,
      });

      reset();
      setCoverImage(undefined);

      updateCreateNotif({
        color: 'green',
        title: 'Success!',
        icon: <Check />,
        message: `${values.title} added successfully`,
      });
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const { message } = err.response?.data as ErrorData;
        updateCreateNotif({
          color: 'red',
          title: 'Failed!',
          icon: <X />,
          message: `${message} | Error Code: ${err.response?.status}`,
        });
      } else {
        updateCreateNotif({
          color: 'red',
          title: 'Failed!',
          icon: <X />,
          message: `${values.title} failed to add`,
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Add book | Bookstore</title>
      </Head>
      <main>
        <Breadcrumbs>
          {[
            {
              link: '/books',
              label: 'Manage Books',
            },
            {
              link: `/books/add`,
              label: 'Add Book',
            },
          ].map((item, index) => (
            <Link href={item.link} key={index}>
              <Anchor sx={{ fontWeight: 700 }}>{item.label}</Anchor>
            </Link>
          ))}
        </Breadcrumbs>
        <Title order={2}>Add Book</Title>
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
                />
                <TextInput
                  placeholder='Example: Taufik Hidayat'
                  label='Author'
                  required
                  {...register('author', { required: true })}
                />
                <TextInput
                  placeholder='Example: 9799769420'
                  label='ISBN'
                  required
                  {...register('isbn', { required: true })}
                />
                <TextInput
                  placeholder='Example: Gramedia Pustaka Utama'
                  label='Publisher'
                  required
                  {...register('publisher', { required: true })}
                />
                <TextInput
                  type='number'
                  min={0}
                  placeholder='Example: 420'
                  label='Number of pages'
                  required
                  {...register('numberOfPages', { required: true, min: 50 })}
                  error={
                    errors.numberOfPages?.type === 'min' &&
                    'Number of pages should be larger than 50'
                  }
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
                <Grid.Col xs={12} md={coverImage ? 8 : 12}>
                  <MyDropzone setCoverImage={setCoverImage} />
                </Grid.Col>
                {coverImage && (
                  <Grid.Col
                    xs={12}
                    md={4}
                    sx={{ display: coverImage ? undefined : 'none' }}
                  >
                    <Center
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: isMd ? '100%' : isXs ? '15rem' : '15rem',
                      }}
                    >
                      <PreviewImage
                        coverImage={URL.createObjectURL(coverImage)}
                        title={coverImage.name}
                      />
                    </Center>
                  </Grid.Col>
                )}
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

export default AddBook;
