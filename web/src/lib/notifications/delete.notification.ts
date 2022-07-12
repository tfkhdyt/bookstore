import { showNotification, updateNotification } from '@mantine/notifications';

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
}

export const updateDeleteNotif = ({
  color,
  title,
  message,
}: UpdateDeleteNotifParams) => {
  updateNotification({
    id: 'delete-data',
    color,
    title,
    message,
    autoClose: 5000,
  });
};
