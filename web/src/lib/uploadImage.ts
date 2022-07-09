import axios, { AxiosResponse } from 'axios';

interface UploadImageResult {
  secure_url: string;
}

export const uploadImage = async (image: File) => {
  const UPLOAD_PRESET = process.env
    .NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string;
  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string;

  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', UPLOAD_PRESET);
  data.append('cloud_name', CLOUD_NAME);

  let result: AxiosResponse;

  try {
    result = await axios.post(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      data
    );
  } catch (err) {
    console.error(err);
  }

  return new Promise<UploadImageResult>((resolve, reject) => {
    if (result.status === 200) {
      console.log(result.data);
      resolve(result.data);
    } else {
      reject('Upload image failed');
    }
  });
};
