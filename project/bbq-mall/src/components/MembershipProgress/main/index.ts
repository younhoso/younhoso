import MembershipProgressMobile from './mobile/MembershipProgressMobile';
import _MembershipProgress from './pc/MembershipProgress';

type MembershipProgressP = typeof _MembershipProgress;

interface MembershipProgressType extends MembershipProgressP {
  Mobile: typeof MembershipProgressMobile;
}

const MembershipProgress = _MembershipProgress as MembershipProgressType;

MembershipProgress.Mobile = MembershipProgressMobile;

export default MembershipProgress;
