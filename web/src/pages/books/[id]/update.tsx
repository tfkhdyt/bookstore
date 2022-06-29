/* eslint-disable react-hooks/rules-of-hooks */
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useSWR from 'swr';

import Breadcrumb from '../../../components/Breadcrumb';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { Book } from '../../../components/Table';
import { axiosInstance } from '../../../lib/axios';
import { fetcher } from '../../../lib/fetcher';
import { uploadImage } from '../../../lib/uploadImage';

interface IFetcher {
  data: Book;
}

const Update = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Book>();
  const router = useRouter();
  const { id } = router.query;

  const { data, error, mutate } = useSWR<IFetcher>(
    id ? `/books/${id}` : null,
    id ? fetcher : null
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

  if (!data) return <Loading title='Update Book' />;

  const book = data.data;

  const onSubmit = async (values: Book) => {
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    if (coverImage) {
      const newCoverImage = await uploadImage(coverImage as File);
      const result = await axiosInstance
        .patch(`/books/${book.id}`, {
          ...values,
          numberOfPages: Number(values.numberOfPages),
          coverImage: newCoverImage.secure_url,
        })
        .catch((err) => {
          console.error(err);
        });

      if (result?.data) {
        Swal.close();
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: `"${book.title}" updated successfully`,
        });
      }
    } else {
      const result = await axiosInstance
        .patch(`/books/${book.id}`, {
          ...values,
          numberOfPages: Number(values.numberOfPages),
        })
        .catch((err) => {
          console.error(err);
        });

      if (result?.data) {
        Swal.close();
        mutate();
        Swal.fire({
          title: 'Success!',
          icon: 'success',
          text: `"${book.title}" updated successfully`,
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>{book.title} | Update Book</title>
      </Head>
      <main>
        <Breadcrumb
          content={[
            {
              link: '/manage-books',
              label: 'Manage Books',
            },
            {
              link: `/books/${book.id}`,
              label: book.title,
            },
            {
              link: `/books/${book.id}/update`,
              label: 'Update',
            },
          ]}
        />
        <h2 className='mb-3 text-2xl font-semibold leading-tight'>
          Update {book.title}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={book.title}
                {...register('title', {
                  required: true,
                })}
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
                defaultValue={book.author}
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
                defaultValue={book.isbn}
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
                defaultValue={book.publisher}
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
                defaultValue={book.numberOfPages}
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
                defaultValue={book.description}
                {...register('description', { required: true })}
                className='mt-2 block h-32 w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
            <div className='w-fit'>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='coverImage'
              >
                Cover Image
              </label>
              <div className='relative h-32 w-32'>
                <Image
                  src={
                    coverImage
                      ? URL.createObjectURL(coverImage as File)
                      : book.coverImage
                  }
                  alt={`${book.title} cover image`}
                  layout='fill'
                  objectFit='contain'
                />
              </div>
              <input
                id='coverImage'
                type='file'
                name='coverImage'
                className='mt-2 block'
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
            <button
              className='flex transform items-center justify-center space-x-2 rounded-md bg-gray-700 px-6 py-2 leading-5 text-white transition duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none disabled:cursor-not-allowed'
              type='submit'
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  className='h-4 w-4 animate-spin'
                >
                  <path d='M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z' />
                </svg>
              )}
              <span>Save</span>
            </button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Update;
