import { axiosInstance } from './axios';

export const deleteBook = async (id: number): Promise<{ success: boolean }> => {
  const result = await axiosInstance.delete(`/books/${id}`);

  if (result.status === 200) {
    return {
      success: true,
    };
  }
  return {
    success: false,
  };
};
