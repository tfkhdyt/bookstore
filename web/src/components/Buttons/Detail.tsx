import { Button } from '@mantine/core';
import Link from 'next/link';

import InfoIcon from '../Icons/Info';

interface DetailButtonProps {
  id: number;
}

const DetailButton = ({ id }: DetailButtonProps) => {
  return (
    <Link href={`/books/${id}`} scroll={false}>
      <Button component='a' leftIcon={<InfoIcon />} variant='subtle'>
        Detail
      </Button>
    </Link>
  );
};

export default DetailButton;
