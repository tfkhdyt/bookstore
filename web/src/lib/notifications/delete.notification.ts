import { showNotification, updateNotification } from '@mantine/notifications';
import { ReactNode } from 'react';

export const showDeleteNotif = () => {
  showNotification({
    id: 'delete-data',
    loading: true,
    title: 'Loading...',
    message: 'Delete is in progress',
    autoClose: false,
    disallowClose: true,
  });
};

interface UpdateDeleteNotifParams {
  color: string;
  title: string;
  message: string;
  icon: ReactNode;
}

export const updateDeleteNotif = ({
  color,
  title,
  message,
  icon,
}: UpdateDeleteNotifParams) => {
  updateNotification({
    id: 'delete-data',
    color,
    title,
    message,
    icon,
    autoClose: 5000,
  });
};
