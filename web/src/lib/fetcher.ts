import { axiosInstance } from './axios';

export const fetcher = async (url: string) => {
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (err) {
    return err;
  }
};
