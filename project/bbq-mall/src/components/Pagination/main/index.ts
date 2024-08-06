import PaginationMobile from './mobile/PaginationMobile';
import _Pagination from './pc/Pagination';

type PaginationP = typeof _Pagination;

interface PaginationType extends PaginationP {
  Mobile: typeof PaginationMobile;
}

const Pagination = _Pagination as PaginationType;

Pagination.Mobile = PaginationMobile;

export default Pagination;
