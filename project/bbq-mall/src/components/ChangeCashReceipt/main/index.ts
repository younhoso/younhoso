import ChangeCashReceiptMobile from './mobile/ChangeCashReceiptMobile';
import _ChangeCashReceipt from './pc/ChangeCashReceipt';

type ChangeCashReceiptP = typeof _ChangeCashReceipt;

interface ChangeCashReceiptType extends ChangeCashReceiptP {
  Mobile: typeof ChangeCashReceiptMobile;
}

const ChangeCashReceipt = _ChangeCashReceipt as ChangeCashReceiptType;

ChangeCashReceipt.Mobile = ChangeCashReceiptMobile;

export default ChangeCashReceipt;
