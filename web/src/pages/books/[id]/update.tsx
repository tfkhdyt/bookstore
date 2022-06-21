/* eslint-disable react-hooks/rules-of-hooks */
import { Field, Form, Formik } from 'formik';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import useSWR from 'swr';
import * as Yup from 'yup';

import Breadcrumb from '../../../components/Breadcrumb';
import Error from '../../../components/Error';
import Loading from '../../../components/Loading';
import { Book } from '../../../components/Table';
import { axiosInstance } from '../../../lib/axios';
import { fetcher } from '../../../lib/fetcher';
import { uploadImage } from '../../../lib/uploadImage';

const Update = () => {
  const [coverImage, setCoverImage] = useState<File>();
  const router = useRouter();
  const query = router.query;

  const { data, error } = useSWR<Book>(`/books/${query.id}`, fetcher);

  if (!data) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='grid min-h-full min-w-full place-items-center'>
        <Error />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{data.title} | Update Book</title>
      </Head>
      <main>
        <Breadcrumb
          content={[
            {
              link: '/',
              label: 'Manage Books',
            },
            {
              link: `/books/${data.id}`,
              label: data.title,
            },
            {
              link: `/books/${data.id}/update`,
              label: 'Update',
            },
          ]}
        />
        <h2 className='mb-3 text-2xl font-semibold leading-tight'>
          Update {data.title}
        </h2>
        <Formik
          initialValues={{
            title: data.title,
            author: data.author,
            isbn: data.isbn,
            description: data.description,
            publisher: data.publisher,
            numberOfPages: data.numberOfPages,
            coverImage: data.coverImage,
          }}
          validationSchema={Yup.object({
            title: Yup.string().required('Required'),
            author: Yup.string().required('Required'),
            isbn: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            publisher: Yup.string().required('Required'),
            numberOfPages: Yup.number()
              .required('Required')
              .min(1, 'Must be more than 0'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            // console.log(values);

            if (coverImage) {
              const newCoverImage = await uploadImage(coverImage as File);
              const result = await axiosInstance
                .patch(`/books/${data.id}`, {
                  ...values,
                  coverImage: newCoverImage.secure_url,
                })
                .catch((err) => {
                  console.error(err);
                });

              if (result?.data) {
                alert(`${values.title} updated successfully!`);
              }
            } else {
              const result = await axiosInstance
                .patch(`/books/${data.id}`, {
                  ...values,
                })
                .catch((err) => {
                  console.error(err);
                });

              if (result?.data) {
                alert(`${values.title} updated successfully!`);
              }
            }
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form>
              <div className='mt-4 grid grid-cols-2 gap-6'>
                <div>
                  <label
                    className='text-gray-700 dark:text-gray-200'
                    htmlFor='title'
                  >
                    Title
                  </label>
                  {formik.touched.title && formik.errors.title && (
                    <label className='float-right font-bold italic text-red-500'>
                      {formik.errors.title}
                    </label>
                  )}
                  <Field
                    type='text'
                    name='title'
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
                  {formik.touched.author && formik.errors.author && (
                    <label className='float-right font-bold italic text-red-500'>
                      {formik.errors.author}
                    </label>
                  )}
                  <Field
                    name='author'
                    type='text'
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
                  {formik.touched.isbn && formik.errors.isbn && (
                    <label className='float-right font-bold italic text-red-500'>
                      {formik.errors.isbn}
                    </label>
                  )}
                  <Field
                    name='isbn'
                    type='text'
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
                  {formik.touched.publisher && formik.errors.publisher && (
                    <label className='float-right font-bold italic text-red-500'>
                      {formik.errors.publisher}
                    </label>
                  )}
                  <Field
                    name='publisher'
                    type='text'
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
                  {formik.touched.numberOfPages &&
                    formik.errors.numberOfPages && (
                      <label className='float-right font-bold italic text-red-500'>
                        {formik.errors.numberOfPages}
                      </label>
                    )}
                  <Field
                    name='numberOfPages'
                    type='number'
                    min={0}
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
                  {formik.touched.description && formik.errors.description && (
                    <label className='float-right font-bold italic text-red-500'>
                      {formik.errors.description}
                    </label>
                  )}
                  <Field
                    as='textarea'
                    name='description'
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
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting && (
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
            </Form>
          )}
        </Formik>
      </main>
    </>
  );
};

export default Update;
