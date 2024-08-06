// 자동으로 생성된 파일입니다. 수정하지 마세요.
import MembershiProgressBar from './MembershipProgressBar';
import _MembershipProgress from './main';

type MembershipProgressP = typeof _MembershipProgress;

interface MembershipProgressType extends MembershipProgressP {
  MembershiProgressBar: typeof MembershiProgressBar;
}

const MembershipProgress = _MembershipProgress as MembershipProgressType;

MembershipProgress.MembershiProgressBar = MembershiProgressBar;

export default MembershipProgress;
