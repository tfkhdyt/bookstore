import { Button } from '@mantine/core';
import Link from 'next/link';

import PencilIcon from '../Icons/Pencil';

interface UpdateButtonProps {
  id: number;
}

const UpdateButton = ({ id }: UpdateButtonProps) => {
  return (
    <Link href={`/books/${id}/update`} scroll={false}>
      <Button
        color='green'
        component='a'
        leftIcon={<PencilIcon />}
        variant='subtle'
      >
        Edit
      </Button>
    </Link>
  );
};

export default UpdateButton;
