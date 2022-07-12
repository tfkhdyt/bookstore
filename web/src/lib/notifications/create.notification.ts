import { showNotification, updateNotification } from '@mantine/notifications';

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
}

export const updateCreateNotif = ({
  color,
  title,
  message,
}: UpdateCreateNotifParams) => {
  updateNotification({
    id: 'create-book',
    color,
    title,
    message,
    autoClose: 2000,
  });
};
