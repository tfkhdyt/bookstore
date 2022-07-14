import { Group, MantineTheme, Text, useMantineTheme } from '@mantine/core';
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { showNotification } from '@mantine/notifications';
import { Icon as TablerIcon, Photo, Upload, X } from 'tabler-icons-react';

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]
    : status.rejected
    ? // temporary until @mantine/dropzone update to the new version
      theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]
    : theme.colorScheme === 'dark'
    ? theme.colors.dark[0]
    : theme.colors.gray[7];
}

function ImageUploadIcon({
  status,
  ...props
}: React.ComponentProps<TablerIcon> & { status: DropzoneStatus }) {
  if (status.accepted) {
    return <Upload {...props} />;
  }

  if (status.rejected) {
    return <X {...props} />;
  }

  return <Photo {...props} />;
}

export const dropzoneChildren = (
  status: DropzoneStatus,
  theme: MantineTheme
) => (
  <Group
    position='center'
    spacing='xl'
    style={{ minHeight: 183, pointerEvents: 'none' }}
  >
    <ImageUploadIcon
      status={status}
      style={{ color: getIconColor(status, theme) }}
      size={80}
    />

    <div>
      <Text size='xl' inline>
        Drag image here or click to select file
      </Text>
      <Text size='sm' color='dimmed' inline mt={7}>
        Image should not exceed 3 MiB
      </Text>
    </div>
  </Group>
);

interface MyDropzoneProps {
  setCoverImage: (coverImage: File) => void;
}

export default function MyDropzone({ setCoverImage }: MyDropzoneProps) {
  const theme = useMantineTheme();
  return (
    <Dropzone
      multiple={false}
      onDrop={(files) => setCoverImage(files[0])}
      onReject={(files) => {
        console.error(files[0]);
        files[0].errors.forEach((error, index) => {
          let errorType = error.code.replaceAll('-', ' ');
          errorType = errorType[0].toUpperCase() + errorType.slice(1);
          showNotification({
            id: `image-rejection-${index}`,
            title: errorType,
            message: error.message,
            color: 'red',
            icon: <X />,
            autoClose: 5000,
          });
        });
      }}
      maxSize={3 * 1024 ** 2}
      accept={IMAGE_MIME_TYPE}
    >
      {(status) => dropzoneChildren(status, theme)}
    </Dropzone>
  );
}
