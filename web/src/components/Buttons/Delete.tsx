/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useRouter } from 'next/router';

import { axiosInstance } from '@/lib/axios';

import TrashCanIcon from '../Icons/TrashCan';

interface DeleteButtonProps {
  id: number;
  title: string;
  // mutate: () => void;
}

const DeleteButton = ({ id, title }: DeleteButtonProps) => {
  const modals = useModals();
  const router = useRouter();

  const handleOnConfirm = async () => {
    showNotification({
      id: 'delete-data',
      loading: true,
      title: 'Deleting',
      message: 'Delete is in progress...',
      autoClose: false,
      disallowClose: true,
    });

    try {
      await axiosInstance.delete(`/books/${id}`);
      // mutate();
      updateNotification({
        id: 'delete-data',
        color: 'green',
        title: `Delete book success!`,
        message: `${title} deleted successfully`,
        autoClose: 2000,
      });
      router.push('/books');
    } catch (err) {
      updateNotification({
        id: 'delete-data',
        color: 'red',
        title: `Delete book failed!`,
        message: `${title} failed to delete`,
        autoClose: 2000,
      });
    }
  };

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: `Delete ${title}`,
      centered: true,
      children: (
        <Text size='sm'>
          Are you sure you want to delete <b>{title}</b>? This action is
          destructive and you can't restore your data.
        </Text>
      ),
      labels: { confirm: 'Delete book', cancel: "No, don't delete it" },
      confirmProps: { color: 'red' },
      // onCancel: () => console.log('Cancel'),
      onConfirm: handleOnConfirm,
    });

  const handleDelete = async () => {
    openDeleteModal();
  };

  return (
    <Button
      onClick={handleDelete}
      color='red'
      leftIcon={<TrashCanIcon />}
      variant='subtle'
    >
      Delete
    </Button>
    // <button
    //   type='button'
    //   className='mx-auto flex w-full items-center justify-center space-x-1 rounded bg-red-400 px-3 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-red-500 active:bg-red-600'
    //   onClick={async () => {
    //     await deleteBook(id, title, mutate);
    //   }}
    // >
    //   <svg
    //     width='24'
    //     height='24'
    //     xmlns='http://www.w3.org/2000/svg'
    //     viewBox='0 0 24 24'
    //     className='h-4 w-4'
    //     fill='currentColor'
    //   >
    //     <path d='M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z' />
    //   </svg>
    //   <span>Delete</span>
    // </button>
  );
};

export default DeleteButton;
