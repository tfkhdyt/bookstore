import { Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { Plus } from 'tabler-icons-react';

function AddButton() {
  return (
    <Link href='/books/add' passHref>
      <Button leftIcon={<Plus />}>Add Book</Button>
    </Link>
  );
}

export default AddButton;
