import Link from 'next/link';

interface UpdateButtonProps {
  bookID: number;
}

const UpdateButton = ({ bookID }: UpdateButtonProps) => {
  return (
    <Link href={`/books/${bookID}/update`} scroll={false}>
      <a className='mx-auto flex w-full items-center justify-center space-x-1 rounded bg-yellow-500 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-yellow-600 active:bg-yellow-700'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'
        >
          <path d='M1.438 16.875l5.688 5.689-7.126 1.436 1.438-7.125zm22.562-11.186l-15.46 15.46-5.688-5.689 15.459-15.46 5.689 5.689zm-4.839-2.017l-.849-.849-12.614 12.599.85.849 12.613-12.599z' />
        </svg>
        <span>Update</span>
      </a>
    </Link>
  );
};

export default UpdateButton;
