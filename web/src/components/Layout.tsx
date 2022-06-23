import React, { ReactNode } from 'react';

import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex flex-1 p-6 pt-24'>
          <div className='container mx-auto ml-64 w-full rounded-md p-2 sm:p-4'>
            {children}
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
