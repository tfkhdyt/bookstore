import { Center, Pagination, Text } from '@mantine/core';

import { usePaginationStore } from '@/store/pagination';

interface PaginationProps {
  totalData: number;
  numberOfCurrentPageData: number;
}

const MyPagination = ({ totalData }: PaginationProps) => {
  const limit = usePaginationStore((state) => state.limit);
  const activePage = usePaginationStore((state) => state.activePage);
  const setActivePage = usePaginationStore((state) => state.setActivePage);

  const pages = Math.ceil(totalData / limit);

  if (totalData === 0) {
    return (
      <Center sx={{ width: '100%' }}>
        <Text weight={600} color='dimmed'>
          No data, please add some!
        </Text>
      </Center>
    );
  }

  return (
    <Pagination
      total={pages}
      withEdges
      size='lg'
      page={activePage}
      onChange={setActivePage}
    />
  );
};

export default MyPagination;
