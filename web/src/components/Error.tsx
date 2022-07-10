import { Center, Text } from '@mantine/core';
import React from 'react';

interface ErrorProps {
  message?: string;
  status?: number;
}

const Error = ({ message, status }: ErrorProps) => {
  return (
    <Center sx={{ width: '100%', height: '75vh' }}>
      {message && status ? (
        <>
          <Text color='red' weight='bold'>
            {message}
          </Text>
          <Text>Error code: {status}</Text>
        </>
      ) : (
        <Text color='red' weight='bold'>
          Failed to fetch data!
        </Text>
      )}
    </Center>
  );
};

export default Error;
