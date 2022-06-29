import Swal from 'sweetalert2';

export const loadingAlert = async () => {
  await Swal.fire({
    title: 'Loading...',
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};
