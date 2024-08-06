import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import Pagination from 'react-js-pagination';

export default function CustomPagination({
  activePage,
  handlePageChange,
  perPage,
  totalItemsCount,
}: {
  activePage: number;
  handlePageChange: (page: number) => void;
  perPage: number;
  totalItemsCount?: number;
}) {
  return (
    <Pagination
      activePage={activePage}
      itemsCountPerPage={perPage}
      totalItemsCount={totalItemsCount ? totalItemsCount : 0}
      pageRangeDisplayed={5}
      onChange={handlePageChange}
      firstPageText={<ChevronDoubleLeftIcon width={15} />}
      prevPageText={<ChevronLeftIcon width={15} />}
      nextPageText={<ChevronRightIcon width={15} />}
      lastPageText={<ChevronDoubleRightIcon width={15} />}
    />
  );
}
