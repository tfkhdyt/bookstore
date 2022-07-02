import { Button } from '@mantine/core';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface DetailButtonProps {
  id: number;
}

const DetailButton = ({ id }: DetailButtonProps) => {
  return (
    <Link href={`/books/${id}`} scroll={false}>
      <Button component='a' leftIcon={<InfoCircledIcon />} variant='subtle'>
        Detail
      </Button>
    </Link>
  );
};

export default DetailButton;
