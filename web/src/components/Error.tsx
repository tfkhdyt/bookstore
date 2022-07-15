import { Box, Button, Center, Text, useMantineTheme } from '@mantine/core';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { AlertTriangle, ArrowNarrowLeft } from 'tabler-icons-react';

interface ErrorProps {
  message?: string;
  status?: number;
}

const Error = ({ message, status }: ErrorProps) => {
  const theme = useMantineTheme();

  return (
    <Center
      sx={{
        width: '100%',
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {message && status ? (
        <>
          <Head>
            <title>
              {status}: {message}
            </title>
          </Head>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <AlertTriangle
              color={theme.colors.red[5]}
              size={80}
              style={{ marginBottom: '.4rem' }}
            />
            <Text color='red' weight='bold' size='lg'>
              {message}
            </Text>
            <Text color='gray' weight={500}>
              Error code: {status}
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Head>
            <title>Failed to fetch data!</title>
          </Head>
          <Text color='red' weight='bold'>
            Failed to fetch data!
          </Text>
        </>
      )}
      <Link href='/books'>
        <Button variant='outline' mt='lg' leftIcon={<ArrowNarrowLeft />}>
          Back to dashboard
        </Button>
      </Link>
    </Center>
  );
};

export default Error;
