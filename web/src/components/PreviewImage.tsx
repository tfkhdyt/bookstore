import Image from 'next/image';
import { useMemo } from 'react';

interface PreviewImageProps {
  coverImage: string;
  title: string | undefined;
}
// eslint-disable-next-line react/display-name
export const PreviewImage = ({ coverImage, title }: PreviewImageProps) => {
  const image = useMemo(() => coverImage, [coverImage]);
  return (
    <Image
      src={image}
      alt='cover image'
      layout='fill'
      objectFit='contain'
      title={title}
    />
  );
};
