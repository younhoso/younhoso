import MembershipListMobile from './mobile/MembershipListMobile';
import _MembershipList from './pc/MembershipList';

type MembershipListP = typeof _MembershipList;

interface MembershipListType extends MembershipListP {
  Mobile: typeof MembershipListMobile;
}

const MembershipList = _MembershipList as MembershipListType;

MembershipList.Mobile = MembershipListMobile;

export default MembershipList;
