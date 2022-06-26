import Swal from 'sweetalert2';

import { axiosInstance } from './axios';

export const deleteBook = async (
  id: number,
  title: string,
  mutate: () => void
) => {
  const result = await Swal.fire({
    title: `Are you sure want to delete "${title}"?`,
    icon: 'warning',
    text: "Any changes can't be reverted",
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  });

  if (result.isConfirmed) {
    const result = await axiosInstance.delete(`/books/${id}`);

    if (result.status === 200) {
      mutate();
      Swal.fire({
        title: `"${title}" deleted successfully!`,
        icon: 'success',
      });
      return {
        success: true,
      };
    } else {
      Swal.fire({
        title: `Failed to delete "${title}"!`,
        icon: 'error',
      });
    }
  }
  return {
    success: false,
  };
};
