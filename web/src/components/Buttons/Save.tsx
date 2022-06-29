interface SaveButtonProps {
  isSubmitting: boolean;
}

const SaveButton = ({ isSubmitting }: SaveButtonProps) => {
  return (
    <button
      className='flex items-center justify-center space-x-1 rounded bg-gray-700 px-5 py-2 text-center font-semibold text-white transition-colors duration-300 ease-in-out hover:bg-gray-800 active:bg-gray-900'
      type='submit'
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='h-4 w-4 animate-spin'
        >
          <path d='M20.944 12.979c-.489 4.509-4.306 8.021-8.944 8.021-2.698 0-5.112-1.194-6.763-3.075l1.245-1.633c1.283 1.645 3.276 2.708 5.518 2.708 3.526 0 6.444-2.624 6.923-6.021h-2.923l4-5.25 4 5.25h-3.056zm-15.864-1.979c.487-3.387 3.4-6 6.92-6 2.237 0 4.228 1.059 5.51 2.698l1.244-1.632c-1.65-1.876-4.061-3.066-6.754-3.066-4.632 0-8.443 3.501-8.941 8h-3.059l4 5.25 4-5.25h-2.92z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          className='h-4 w-4'
          fill='currentColor'
        >
          <path d='M14 3h2.997v5h-2.997v-5zm9 1v20h-22v-24h17.997l4.003 4zm-17 5h12v-7h-12v7zm14 4h-16v9h16v-9z' />
        </svg>
      )}
      <span>Save</span>
    </button>
  );
};

export default SaveButton;
