import axios from 'axios';

export const uploadImage = async (image: File) => {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'tfkhdyt');
  data.append('cloud_name', 'tfkhdyt');
  // fetch('https://api.cloudinary.com/v1_1/tfkhdyt/image/upload', {
  //   method: 'post',
  //   body: data,
  // });

  const result = await axios
    .post('https://api.cloudinary.com/v1_1/tfkhdyt/image/upload', data)
    .catch((err) => {
      console.error(err);
    });

  if (result?.data) return result.data;
};
