import Head from 'next/head';

const AddBook = () => {
  return (
    <>
      <Head>
        <title>Add Book | Bookstore</title>
      </Head>
      <section className='container w-full rounded-md p-2 sm:p-4'>
        <h2 className='mb-3 text-2xl font-semibold leading-tight'>Add Book</h2>
        <form>
          <div className='mt-4 grid grid-cols-2 gap-6'>
            <div>
              <label
                className='text-gray-700 dark:text-gray-200'
                htmlFor='title'
              >
                Title
              </label>
              <input
                id='title'
                type='text'
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
              <input
                id='author'
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
              <input
                id='isbn'
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
              <input
                id='publisher'
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
              <input
                id='numberOfPages'
                type='number'
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
              <textarea
                id='description'
                className='mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300'
              />
            </div>
          </div>

          <div className='mt-6 flex justify-end'>
            <button className='transform rounded-md bg-gray-700 px-6 py-2 leading-5 text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddBook;
