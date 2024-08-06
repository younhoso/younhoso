// 자동으로 생성된 파일입니다. 수정하지 마세요.
import CancelOrder from './CancelOrder';
import ChangeAddress from './ChangeAddress';
import ConfirmOrder from './ConfirmOrder';
import DeliveryDone from './DeliveryDone';
import Exchange from './Exchange';
import RefundInfo from './RefundInfo';
import Return from './Return';
import ViewClaim from './ViewClaim';
import WithdrawClaim from './WithdrawClaim';
import WriteReview from './WriteReview';
import _ClaimList from './main';

type ClaimListP = typeof _ClaimList;

interface ClaimListType extends ClaimListP {
  CancelOrder: typeof CancelOrder;
  ChangeAddress: typeof ChangeAddress;
  ConfirmOrder: typeof ConfirmOrder;
  DeliveryDone: typeof DeliveryDone;
  Exchange: typeof Exchange;
  RefundInfo: typeof RefundInfo;
  Return: typeof Return;
  ViewClaim: typeof ViewClaim;
  WithdrawClaim: typeof WithdrawClaim;
  WriteReview: typeof WriteReview;
}

const ClaimList = _ClaimList as ClaimListType;

ClaimList.CancelOrder = CancelOrder;
ClaimList.ChangeAddress = ChangeAddress;
ClaimList.ConfirmOrder = ConfirmOrder;
ClaimList.DeliveryDone = DeliveryDone;
ClaimList.Exchange = Exchange;
ClaimList.RefundInfo = RefundInfo;
ClaimList.Return = Return;
ClaimList.ViewClaim = ViewClaim;
ClaimList.WithdrawClaim = WithdrawClaim;
ClaimList.WriteReview = WriteReview;

export default ClaimList;
