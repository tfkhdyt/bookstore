import { Button } from '@mantine/core';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface UpdateButtonProps {
  id: number;
}

const UpdateButton = ({ id }: UpdateButtonProps) => {
  return (
    <Link href={`/books/${id}/update`} scroll={false}>
      <Button
        color='green'
        component='a'
        leftIcon={<Pencil2Icon />}
        variant='subtle'
      >
        Edit
      </Button>
    </Link>
  );
};

export default UpdateButton;
