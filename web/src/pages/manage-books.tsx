import type { NextPage } from 'next';
import Head from 'next/head';

import Table from '../components/Table';

const ManageBooks: NextPage = () => {
  // if (!data) {
  //   return (
  //     <div className='grid min-h-full min-w-full place-items-center'>
  //       <Loading />
  //     </div>
  //   );
  // }

  // console.log(data);

  return (
    <>
      <Head>
        <title>Manage Books | Bookstore</title>
      </Head>
      <Table />
    </>
  );
};

export default ManageBooks;
