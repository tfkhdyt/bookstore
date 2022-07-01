import {
  Box,
  Burger,
  Header,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { useNavbarSidebarStore } from '../store/navbar-sidebar';
import { HeaderItem } from './HeaderItem';

function MyHeader() {
  const theme = useMantineTheme();
  const { opened, toggleOpened } = useNavbarSidebarStore((state) => state);

  return (
    <Header height={70} p='md'>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={toggleOpened}
            size='sm'
            color={theme.colors.gray[6]}
            mr='xl'
          />
        </MediaQuery>

        <Box sx={{ flexGrow: 1 }}>
          <Text
            component='span'
            // align='center'
            variant='gradient'
            gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
            size='xl'
            weight={700}
            style={{
              fontFamily: 'Greycliff CF, sans-serif',
              fontSize: '1.5em',
            }}
          >
            Bookstore
          </Text>
        </Box>
        <HeaderItem />
      </div>
    </Header>
  );
}

export default MyHeader;
