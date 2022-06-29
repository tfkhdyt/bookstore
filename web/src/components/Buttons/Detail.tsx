import Link from 'next/link';

interface DetailButtonProps {
  bookID: number;
}

const DetailButton = ({ bookID }: DetailButtonProps) => {
  return (
    <Link href={`/books/${bookID}`} scroll={false}>
      <a className='mx-auto flex w-full items-center justify-center space-x-1 rounded bg-blue-500 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-blue-600 active:bg-blue-700'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4'
        >
          <path d='M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z' />
        </svg>
        <text>Detail</text>
      </a>
    </Link>
  );
};

export default DetailButton;
