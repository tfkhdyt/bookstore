/* eslint-disable react/display-name */
import {
  Anchor,
  Box,
  Breadcrumbs,
  Button,
  Center,
  Grid,
  NumberInput,
  Space,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

import MyDropzone from '@/components/Dropzone';
import { PreviewImage } from '@/components/PreviewImage';
import { axiosInstance } from '@/lib/axios';
import {
  showCreateNotif,
  updateCreateNotif,
} from '@/lib/notifications/create.notification';
import { uploadImage } from '@/lib/uploadImage';
import { ErrorData } from '@/types/FetchErrorData';

interface IForm {
  title: string;
  author: string;
  isbn: number | undefined;
  publisher: string;
  numberOfPages: number | undefined;
  description: string;
}

const AddBook = () => {
  const [coverImage, setCoverImage] = useState<File>();

  const form = useForm<IForm>({
    initialValues: {
      title: '',
      author: '',
      isbn: undefined,
      publisher: '',
      numberOfPages: undefined,
      description: '',
    },
    validate: {
      title: (value) => (value !== '' ? null : 'Title is required'),
      author: (value) => (value !== '' ? null : 'Author is required'),
      isbn: (value) => (value !== undefined ? null : 'ISBN is required'),
      publisher: (value) => (value !== '' ? null : 'Publisher is required'),
      numberOfPages: (value) => {
        if (value === undefined) return 'Number of pages is required';
        if (value === 0) return 'Number of pages should be larger than 0';
        return null;
      },
      description: (value) => (value !== '' ? null : 'Description is required'),
    },
  });
  const isBreakpointXs = useMediaQuery('(min-width: 576px)');
  const isBreakpointMd = useMediaQuery('(min-width: 992px)');

  const handleSubmit = async (values: IForm) => {
    showCreateNotif();

    try {
      const { secure_url } = await uploadImage(coverImage as File);
      await axiosInstance.post('/books', {
        ...values,
        isbn: String(values.isbn),
        numberOfPages: Number(values.numberOfPages),
        coverImage: secure_url,
      });

      form.reset();
      setCoverImage(undefined);

      updateCreateNotif({
        color: 'green',
        title: 'Success',
        message: `${values.title} added successfully`,
      });
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        const message = err.response?.data as ErrorData;
        updateCreateNotif({
          color: 'red',
          title: 'Failed',
          message: `${message} | Error Code: ${err.response?.status}`,
        });
      } else {
        updateCreateNotif({
          color: 'red',
          title: 'Failed',
          message: `${values.title} failed to add`,
        });
      }
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors, isSubmitting, isSubmitSuccessful },
  // } = useForm<Book>();

  // const onSubmit = async (data: Book) => {
  //   Swal.fire({
  //     title: 'Loading...',
  //     allowOutsideClick: false,
  //     allowEscapeKey: false,
  //     didOpen: () => {
  //       Swal.showLoading();
  //     },
  //   });

  //   try {
  //     const { secure_url } = await uploadImage(coverImage as File);
  //     await axiosInstance.post('/books', {
  //       ...data,
  //       numberOfPages: Number(data.numberOfPages),
  //       coverImage: secure_url,
  //     });

  //     Swal.close();
  //     Swal.fire({
  //       title: 'Success!',
  //       icon: 'success',
  //       text: `"${data.title}" added successfully`,
  //     });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   form.reset();
  //   setCoverImage(undefined);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isSubmitSuccessful]);

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
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid align='flex-start' gutter='md'>
            <Grid.Col xs={12} md={4}>
              <Stack>
                <TextInput
                  placeholder='Example: Cara Berternak Lele'
                  label='Title'
                  required
                  {...form.getInputProps('title')}
                />
                <TextInput
                  placeholder='Example: Taufik Hidayat'
                  label='Author'
                  required
                  {...form.getInputProps('author')}
                />
                <NumberInput
                  description='Without hyphen'
                  min={0}
                  placeholder='Example: 9799769420'
                  label='ISBN'
                  required
                  hideControls
                  {...form.getInputProps('isbn')}
                />
                <TextInput
                  placeholder='Example: Gramedia Pustaka Utama'
                  label='Publisher'
                  required
                  {...form.getInputProps('publisher')}
                />
                <NumberInput
                  min={0}
                  placeholder='Example: 420'
                  label='Number of pages'
                  required
                  {...form.getInputProps('numberOfPages')}
                />
              </Stack>
            </Grid.Col>
            <Grid.Col xs={12} md={8}>
              <Textarea
                placeholder='Example: This book explains about how to become a catfish farmer'
                label='Description'
                autosize
                minRows={2}
                maxRows={2}
                required
                {...form.getInputProps('description')}
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
                    // p={isBreakpointMd ? undefined : 0}
                    sx={{ display: coverImage ? undefined : 'none' }}
                  >
                    <Center
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: isBreakpointMd
                          ? '100%'
                          : isBreakpointXs
                          ? '15rem'
                          : '15rem',
                      }}
                    >
                      <PreviewImage coverImage={coverImage} />
                    </Center>
                  </Grid.Col>
                )}
              </Grid>
            </Grid.Col>
          </Grid>
          <Space h='lg' />
          <Button type='submit'>Submit</Button>
        </form>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-4 grid grid-cols-2 gap-6'>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='title'
              >
                Title
              </label>
              {errors.title && (
                <label className='float-right font-bold italic text-red-500'>
                  Title is required
                </label>
              )}
              <input
                type='text'
                {...register('title', {
                  required: true,
                })}
                autoFocus={true}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='author'
              >
                Author
              </label>
              {errors.author && (
                <label className='float-right font-bold italic text-red-500'>
                  Author is required
                </label>
              )}
              <input
                type='text'
                {...register('author', { required: true })}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='isbn'
              >
                ISBN
              </label>
              {errors.isbn && (
                <label className='float-right font-bold italic text-red-500'>
                  ISBN is required
                </label>
              )}
              <input
                type='text'
                {...register('isbn', { required: true })}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>

            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='publisher'
              >
                Publisher
              </label>
              {errors.publisher && (
                <label className='float-right font-bold italic text-red-500'>
                  Publisher is required
                </label>
              )}
              <input
                type='text'
                {...register('publisher', { required: true })}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='numberOfPages'
              >
                Number of Pages
              </label>
              {errors.numberOfPages?.type === 'min' && (
                <label className='float-right font-bold italic text-red-500'>
                  Number of pages should be more than 0
                </label>
              )}
              {errors.numberOfPages?.type === 'required' && (
                <label className='float-right font-bold italic text-red-500'>
                  Number of pages is required
                </label>
              )}
              <input
                type='number'
                min={0}
                {...register('numberOfPages', { required: true, min: 0 })}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='description'
              >
                Description
              </label>
              {errors.description && (
                <label className='float-right font-bold italic text-red-500'>
                  Description is required
                </label>
              )}
              <textarea
                id='description'
                {...register('description', { required: true })}
                className='mt-2 block h-32 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='coverImage'
              >
                Cover Image
              </label>
              {coverImage && (
                <div className='relative h-32 w-32'>
                  <Image
                    src={URL.createObjectURL(coverImage as File)}
                    alt='cover image'
                    layout='fill'
                    objectFit='contain'
                  />
                </div>
              )}
              <input
                id='coverImage'
                type='file'
                name='coverImage'
                className='mt-2 block'
                required
                accept='image/*'
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (!event.target.files) return;
                  const image = event.target.files[0];
                  setCoverImage(image);
                }}
              />
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <SaveButton isSubmitting={isSubmitting} />
          </div>
        </form> */}
      </main>
    </>
  );
};

export default AddBook;
