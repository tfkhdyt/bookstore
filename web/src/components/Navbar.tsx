import { Button, Divider, MediaQuery, Navbar, Stack } from '@mantine/core';
import { DashboardIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { useNavbarSidebarStore } from '../store/navbar-sidebar';
import { IMenuItem } from '../types/IMenuItem';
import { headerItems } from './HeaderItem';

const navbarItem: IMenuItem[] = [
  {
    title: 'Manage Books',
    link: '/manage-books',
    icon: <DashboardIcon />,
  },
  {
    title: 'Add Book',
    link: '/add-book',
    icon: <PlusCircledIcon />,
  },
];

export default function MyNavbar() {
  const { opened, toggleOpened } = useNavbarSidebarStore((state) => state);

  return (
    <Navbar
      p='md'
      hiddenBreakpoint='sm'
      hidden={!opened}
      width={{ sm: 200, lg: 250 }}
    >
      <Stack align='stretch' justify='flex-start' spacing='xs'>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <div>
            {headerItems.map((item, index) => (
              <Link href={item.link} key={index}>
                <Button
                  component='a'
                  variant='subtle'
                  size='md'
                  leftIcon={item.icon}
                  sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'start',
                    color: theme.colors.dark[3],
                    '&:hover': {
                      backgroundColor: theme.colors.gray[2],
                    },
                  })}
                >
                  {item.title}
                </Button>
              </Link>
            ))}
          </div>
        </MediaQuery>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Divider my='xs' label='Menu' labelPosition='center' />
        </MediaQuery>
        {navbarItem.map((item, index) => (
          <Link href={item.link} key={index}>
            <Button
              component='a'
              variant='subtle'
              size='md'
              leftIcon={item.icon}
              onClick={toggleOpened}
              sx={(theme) => ({
                display: 'flex',
                justifyContent: 'start',
                color: theme.colors.dark[3],
                '&:hover': {
                  backgroundColor: theme.colors.gray[2],
                },
              })}
            >
              {item.title}
            </Button>
          </Link>
        ))}
      </Stack>
    </Navbar>
  );
}
