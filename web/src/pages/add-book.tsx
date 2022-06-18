import { useFormik } from 'formik';
import Head from 'next/head';
import * as Yup from 'yup';

import { axiosInstance } from '../lib/axios';

const AddBook = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      isbn: '',
      description: '',
      publisher: '',
      number_of_pages: 0,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Required'),
      author: Yup.string().required('Required'),
      isbn: Yup.string().required('Required'),
      description: Yup.string().required('Required'),
      publisher: Yup.string().required('Required'),
      number_of_pages: Yup.number()
        .required('Required')
        .min(1, 'Must be more than 0'),
    }),
    onSubmit: async (values) => {
      console.log(values);
      const result = await axiosInstance.post('/books', values).catch((err) => {
        console.error(err);
      });

      if (result?.data) {
        alert(`${values.title} added successfully!`);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Add Book | Bookstore</title>
      </Head>
      <section className='container w-full rounded-md p-2 sm:p-4'>
        <h2 className='mb-3 text-2xl font-semibold leading-tight'>Add Book</h2>
        <form onSubmit={formik.handleSubmit}>
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
              <input
                id='title'
                type='text'
                {...formik.getFieldProps('title')}
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
              <input
                id='author'
                type='text'
                {...formik.getFieldProps('author')}
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
              <input
                id='isbn'
                type='text'
                {...formik.getFieldProps('isbn')}
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
              <input
                id='publisher'
                type='text'
                {...formik.getFieldProps('publisher')}
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
              {formik.touched.number_of_pages &&
                formik.errors.number_of_pages && (
                  <label className='float-right font-bold italic text-red-500'>
                    {formik.errors.number_of_pages}
                  </label>
                )}
              <input
                id='number_of_pages'
                type='number'
                min={0}
                {...formik.getFieldProps('number_of_pages')}
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
              <textarea
                id='description'
                {...formik.getFieldProps('description')}
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <button
              className='transform rounded-md bg-gray-700 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'
              type='submit'
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBook;
