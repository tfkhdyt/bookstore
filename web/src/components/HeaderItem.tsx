import { Button, Group, MediaQuery } from '@mantine/core';
import { GitHubLogoIcon, PersonIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

import { IMenuItem } from '../types/IMenuItem';

export const headerItems: IMenuItem[] = [
  {
    title: 'Source Code',
    link: 'https://github.com/tfkhdyt/bookstore',
    icon: <GitHubLogoIcon />,
  },
  {
    title: 'About Me',
    link: 'https://www.tfkhdyt.my.id',
    icon: <PersonIcon />,
  },
];

export function HeaderItem() {
  return (
    <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
      <Group position='right' spacing='xs'>
        {headerItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <Button
              component='a'
              target='_blank'
              variant='subtle'
              size='md'
              leftIcon={item.icon}
              sx={(theme) => ({
                paddingLeft: 10,
                paddingRight: 10,
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
      </Group>
    </MediaQuery>
  );
}
