/* eslint-disable react/no-unescaped-entities */
import { Button, Text } from '@mantine/core';
import { useModals } from '@mantine/modals';
import axios from 'axios';
import { useRouter } from 'next/router';

import { axiosInstance } from '@/lib/axios';
import {
  showDeleteNotif,
  updateDeleteNotif,
} from '@/lib/notifications/delete.notification';

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
    showDeleteNotif();

    try {
      await axiosInstance.delete(`/books/${id}`);
      // mutate();
      updateDeleteNotif({
        color: 'green',
        title: 'Success',
        message: `${title} deleted successfully`,
      });

      router.push('/books');
    } catch (err) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        type ErrorData = {
          message: string;
        };
        const message = err.response?.data as ErrorData;
        updateDeleteNotif({
          color: 'red',
          title: 'Failed',
          message: `${message} | Error Code: ${err.response?.status}`,
        });
      } else {
        updateDeleteNotif({
          color: 'red',
          title: 'Failed to delete book',
          message: `${title} failed to delete`,
        });
      }
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
  );
};

export default DeleteButton;
