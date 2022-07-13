import { showNotification, updateNotification } from '@mantine/notifications';
import { ReactNode } from 'react';

export const showUpdateNotif = () => {
  showNotification({
    id: 'update-book',
    loading: true,
    title: 'Loading...',
    message: 'Update book is in progress',
    autoClose: false,
    disallowClose: true,
  });
};

interface mutateUpdateNotifParams {
  color: string;
  title: string;
  message: string;
  icon: ReactNode;
}

export const mutateUpdateNotif = ({
  color,
  title,
  message,
  icon,
}: mutateUpdateNotifParams) => {
  updateNotification({
    id: 'update-book',
    color,
    title,
    message,
    icon,
    autoClose: 5000,
  });
};
