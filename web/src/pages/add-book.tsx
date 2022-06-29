import Head from 'next/head';
import Image from 'next/image';
import { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import SaveButton from '../components/Buttons/Save';
import { Book } from '../components/Table';
import { axiosInstance } from '../lib/axios';
import { uploadImage } from '../lib/uploadImage';

const AddBook = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<Book>();

  const onSubmit = async (data: Book) => {
    Swal.fire({
      title: 'Loading...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const { secure_url } = await uploadImage(coverImage as File);

    const result = await axiosInstance
      .post('/books', {
        ...data,
        numberOfPages: Number(data.numberOfPages),
        coverImage: secure_url,
      })
      .catch((err) => {
        console.error(err);
      });

    if (result?.data) {
      Swal.close();
      Swal.fire({
        title: 'Success!',
        icon: 'success',
        text: `"${data.title}" added successfully`,
      });
    }
  };

  useEffect(() => {
    reset();
    setCoverImage(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  return (
    <>
      <Head>
        <title>Add Book | Bookstore</title>
      </Head>
      <main>
        <h2 className='mb-3 text-2xl font-semibold leading-tight'>Add Book</h2>
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
        </form>
      </main>
    </>
  );
};

export default AddBook;
