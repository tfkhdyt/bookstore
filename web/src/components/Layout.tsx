import { AppShell, Container, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

import MyHeader from './Header';
import MyNavbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint='sm'
      asideOffsetBreakpoint='sm'
      fixed
      header={<MyHeader />}
      navbar={<MyNavbar />}
    >
      <Container size='xl'>{children}</Container>
    </AppShell>
  );
}
