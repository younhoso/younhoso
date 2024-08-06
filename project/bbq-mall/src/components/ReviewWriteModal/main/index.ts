import ReviewWriteModalMobile from './mobile/ReviewWriteModalMobile';
import _ReviewWriteModal from './pc/ReviewWriteModal';

type ReviewWriteModalP = typeof _ReviewWriteModal;

interface ReviewWriteModalType extends ReviewWriteModalP {
  Mobile: typeof ReviewWriteModalMobile;
}

const ReviewWriteModal = _ReviewWriteModal as ReviewWriteModalType;

ReviewWriteModal.Mobile = ReviewWriteModalMobile;

export default ReviewWriteModal;
