import Link from 'next/link';
import React from 'react';

interface SideBarMenu {
  title: string;
  link: string;
}

const sideBarMenus: SideBarMenu[] = [
  {
    title: 'Manage Books',
    link: '/',
  },
  {
    title: 'Add Book',
    link: '/add-book',
  },
];

const Sidebar = () => {
  return (
    <div className='flex h-screen w-64 flex-col border-r bg-white dark:border-gray-600 dark:bg-gray-800'>
      <div className='flex flex-1 flex-col justify-between'>
        <nav>
          {sideBarMenus.map((menu) => (
            <Link key={menu.title} href={menu.link}>
              <a className='flex transform items-center px-8 py-5 text-gray-600 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200'>
                <svg
                  className='h-5 w-5'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>

                <span className='mx-4 font-medium'>{menu.title}</span>
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
