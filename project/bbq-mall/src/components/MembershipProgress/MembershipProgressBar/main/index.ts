import MembershiProgressBarMobile from './mobile/MembershipProgressBarMobile';
import _MembershipProgressBar from './pc/MembershipProgressBar';

type MembershiProgressBarP = typeof _MembershipProgressBar;

interface MembershiProgressBarType extends MembershiProgressBarP {
  Mobile: typeof MembershiProgressBarMobile;
}

const MembershiProgressBar = _MembershipProgressBar as MembershiProgressBarType;

MembershiProgressBar.Mobile = MembershiProgressBarMobile;

export default MembershiProgressBar;
