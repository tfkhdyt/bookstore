import { Button } from '@mantine/core';
import Link from 'next/link';
import { InfoCircle } from 'tabler-icons-react';

interface DetailButtonProps {
  id: number;
}

const DetailButton = ({ id }: DetailButtonProps) => {
  return (
    <Link href={`/books/${id}`} scroll={false}>
      <Button component='a' leftIcon={<InfoCircle />} variant='subtle'>
        Detail
      </Button>
    </Link>
  );
};

export default DetailButton;
