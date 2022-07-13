import { showNotification, updateNotification } from '@mantine/notifications';
import { ReactNode } from 'react';

export const showCreateNotif = () => {
  showNotification({
    id: 'create-book',
    loading: true,
    title: 'Loading...',
    message: 'Add book is in progress',
    autoClose: false,
    disallowClose: true,
  });
};

interface UpdateCreateNotifParams {
  color: string;
  title: string;
  message: string;
  icon: ReactNode;
}

export const updateCreateNotif = ({
  color,
  title,
  message,
  icon,
}: UpdateCreateNotifParams) => {
  updateNotification({
    id: 'create-book',
    color,
    title,
    message,
    icon,
    autoClose: 5000,
  });
};
