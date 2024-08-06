import ClaimModalMobile from './mobile/ClaimModalMobile';
import _ClaimModal from './pc/ClaimModal';

type ClaimModalP = typeof _ClaimModal;

interface ClaimModalType extends ClaimModalP {
  Mobile: typeof ClaimModalMobile;
}

const ClaimModal = _ClaimModal as ClaimModalType;

ClaimModal.Mobile = ClaimModalMobile;

export default ClaimModal;
