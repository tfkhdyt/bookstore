import React from 'react';

const Navbar = () => {
  return (
    <nav className='bg-white shadow dark:bg-gray-800'>
      <div className='container mx-auto px-6 py-4 md:flex md:items-center md:justify-between'>
        <div className='flex items-center justify-between'>
          <div>
            <a
              className='transform text-2xl font-bold text-gray-800 transition-colors duration-200 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 lg:text-3xl'
              href='#'
            >
              Bookstore
            </a>
          </div>

          {/* <!-- Mobile menu button --> */}
          <div className='flex md:hidden'>
            <button
              type='button'
              className='text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400'
              aria-label='toggle menu'
            >
              <svg viewBox='0 0 24 24' className='h-6 w-6 fill-current'>
                <path
                  fillRule='evenodd'
                  d='M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z'
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div className='items-center md:flex'>
          <div className='flex flex-col md:mx-6 md:flex-row'>
            <a
              className='my-1 transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 md:mx-4 md:my-0'
              href='#'
            >
              Source Code
            </a>
            <a
              className='my-1 transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400 md:mx-4 md:my-0'
              href='#'
            >
              About Me
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
