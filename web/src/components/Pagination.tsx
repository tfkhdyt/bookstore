import { usePaginationStore } from '../store/pagination';

interface PaginationProps {
  totalData: number;
  numberOfCurrentPageData: number;
}

interface PageButtonProps {
  pageNumber: number;
}

const PageButton = ({ pageNumber }: PageButtonProps) => {
  const { activePage, setPage, setActivePage } = usePaginationStore(
    (state) => state
  );

  const handleChangePage = (newPage: number) => {
    // alert(`Go to page ${page}`);
    setPage(newPage);
    setActivePage(newPage);
    // console.log(`Current page is ${page}`);
  };

  return (
    <button
      title={pageNumber !== activePage ? `Go to page ${pageNumber}` : undefined}
      className={`mx-2 inline-flex transform items-center justify-center rounded-lg  px-4 py-2 text-gray-700 transition-colors duration-200 dark:bg-gray-700 dark:text-white ${
        activePage === pageNumber && 'bg-gray-200'
      }`}
      onClick={() => handleChangePage(pageNumber)}
    >
      {pageNumber}
    </button>
  );
};

const Pagination = ({
  totalData,
  numberOfCurrentPageData,
}: PaginationProps) => {
  const { limit, page } = usePaginationStore((state) => state);
  const pages = Math.ceil(totalData / limit);
  const firstRecord = limit * (page - 1) + 1;
  const lastRecord = limit * (page - 1) + numberOfCurrentPageData;

  return (
    <tfoot>
      <tr>
        <td colSpan={8}>
          <div className='w-full bg-white dark:bg-gray-800'>
            <div className='container mx-auto flex flex-col items-center space-y-6 px-6 py-5 sm:flex-row sm:justify-between sm:space-y-0 '>
              <div className='-mx-2'>
                {[...Array(pages)].map((_, index) => {
                  return <PageButton pageNumber={index + 1} key={index} />;
                })}
              </div>

              <div className='text-gray-500 dark:text-gray-400'>
                {totalData > 0 && (
                  <>
                    <span className='font-medium text-gray-700 dark:text-gray-100'>
                      {firstRecord} - {lastRecord}
                    </span>{' '}
                    of
                  </>
                )}{' '}
                {totalData} records
              </div>
            </div>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default Pagination;
