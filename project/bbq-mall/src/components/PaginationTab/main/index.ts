import PaginationTabMobile from './mobile/PaginationTabMobile';
import _PaginationTab from './pc/PaginationTab';

type PaginationTabP = typeof _PaginationTab;

interface PaginationTabType extends PaginationTabP {
  Mobile: typeof PaginationTabMobile;
}

const PaginationTab = _PaginationTab as PaginationTabType;

PaginationTab.Mobile = PaginationTabMobile;

export default PaginationTab;
