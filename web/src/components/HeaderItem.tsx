import {
  ActionIcon,
  Button,
  Group,
  MediaQuery,
  useMantineColorScheme,
} from '@mantine/core';
import Link from 'next/link';

import { IMenuItem } from '@/types/IMenuItem';

import GitHubIcon from './Icons/GitHub';
import MoonIcon from './Icons/Moon';
import PersonIcon from './Icons/Person';
import SunIcon from './Icons/Sun';

export const headerItems: IMenuItem[] = [
  {
    title: 'Source Code',
    link: 'https://github.com/tfkhdyt/bookstore',
    icon: <GitHubIcon />,
  },
  {
    title: 'About Me',
    link: 'https://www.tfkhdyt.my.id',
    icon: <PersonIcon />,
  },
];

export function HeaderItem() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';

  return (
    <>
      <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
        <Group position='right' spacing='xs'>
          {headerItems.map((item, index) => (
            <Link href={item.link} key={index} passHref>
              <Button
                component='a'
                target='_blank'
                variant='subtle'
                size='md'
                leftIcon={item.icon}
                sx={(theme) => ({
                  paddingLeft: 10,
                  paddingRight: 10,
                  color:
                    theme.colorScheme === 'dark'
                      ? theme.colors.dark[2]
                      : theme.colors.dark[3],
                  '&:hover': {
                    backgroundColor:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[5]
                        : theme.colors.gray[2],
                  },
                })}
              >
                {item.title}
              </Button>
            </Link>
          ))}
        </Group>
      </MediaQuery>
      <ActionIcon
        variant='default'
        color={dark ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title='Toggle color scheme'
        size='lg'
        ml={16}
        mr={8}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </ActionIcon>
    </>
  );
}
