import { axiosInstance } from './axios';

export const fetcher = async (url: string) => {
  const { data } = await axiosInstance.get(url).catch((err) => {
    return err.message;
  });
  return data;
};
