import ClaimListMobile from './mobile/ClaimListMobile';
import _ClaimList from './pc/ClaimList';

type ClaimListP = typeof _ClaimList;

interface ClaimListType extends ClaimListP {
  Mobile: typeof ClaimListMobile;
}

const ClaimList = _ClaimList as ClaimListType;

ClaimList.Mobile = ClaimListMobile;

export default ClaimList;
