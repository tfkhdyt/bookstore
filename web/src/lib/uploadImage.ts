import axios from 'axios';

export const uploadImage = async (image: File) => {
  const UPLOAD_PRESET = process.env
    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', UPLOAD_PRESET);
  data.append('cloud_name', CLOUD_NAME);

  const result = await axios
    .post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data)
    .catch((err) => {
      console.error(err);
    });

  if (result?.data) {
    console.log(result.data);

    return result.data;
  }
};
