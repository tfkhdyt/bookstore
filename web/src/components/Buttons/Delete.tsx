import { deleteBook } from '../../lib/deleteBook';

interface DeleteButtonProps {
  id: number;
  title: string;
  mutate: () => void;
}

const DeleteButton = ({ id, title, mutate }: DeleteButtonProps) => {
  return (
    <button
      type='button'
      className='mx-auto flex w-full items-center justify-center space-x-1 rounded bg-red-400 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 active:bg-red-600'
      onClick={async () => {
        await deleteBook(id, title, mutate);
      }}
    >
      <svg
        width='24'
        height='24'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 24 24'
        className='h-4 w-4'
        fill='currentColor'
      >
        <path d='M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z' />
      </svg>
      <text>Delete</text>
    </button>
  );
};

export default DeleteButton;
