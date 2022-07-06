import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';

import PlusIcon from '../Icons/Plus';

function AddButton() {
  return (
    <Link href='/books/add' passHref>
      <Button leftIcon={<PlusIcon />}>Add Book</Button>
    </Link>
  );
}

export default AddButton;
