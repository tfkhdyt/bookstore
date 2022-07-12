import Image from 'next/image';
import { memo } from 'react';

interface PreviewImageProps {
  coverImage: File;
}
// eslint-disable-next-line react/display-name
export const PreviewImage = memo(({ coverImage }: PreviewImageProps) => {
  return (
    <Image
      src={URL.createObjectURL(coverImage)}
      alt='cover image'
      layout='fill'
      objectFit='contain'
      title={coverImage?.name}
    />
  );
});
