import MembershipItemMobile from './mobile/MembershipItemMobile';
import _MembershipItem from './pc/MembershipItem';

type MembershipItemP = typeof _MembershipItem;

interface MembershipItemType extends MembershipItemP {
  Mobile: typeof MembershipItemMobile;
}

const MembershipItem = _MembershipItem as MembershipItemType;

MembershipItem.Mobile = MembershipItemMobile;

export default MembershipItem;
