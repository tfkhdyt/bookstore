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
import { uploadImage } from '@/lib/uploadImage';
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
      const { secure_url } = await uploadImage(coverImage as File);
      await axiosInstance.post('/books', {
        ...values,
        isbn: values.isbn as string,
        numberOfPages: Number(values.numberOfPages),
        coverImage: secure_url,
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
                minRows={2}
                maxRows={2}
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
