import { useMediaQuery } from '@mantine/hooks';

export default function useBreakpoint() {
  const isXs = useMediaQuery('(min-width: 576px)');
  const isMd = useMediaQuery('(min-width: 992px)');

  return { isXs, isMd };
}
