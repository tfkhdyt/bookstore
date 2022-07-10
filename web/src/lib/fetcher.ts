import { axiosInstance } from './axios';
import { FetchError } from './error/FetchError';

export const fetcher = async (url: string) => {
  const { data, status } = await axiosInstance.get(url);

  if (status < 200 && status > 299) {
    const error = new FetchError<typeof data>(
      'An error occurred while fetching the data.'
    );
    error.info = data;
    error.status = status;
    throw error;
  }

  return data;
};
