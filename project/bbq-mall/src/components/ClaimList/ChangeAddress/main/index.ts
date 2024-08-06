import ChangeAddressMobile from './mobile/ChangeAddressMobile';
import _ChangeAddress from './pc/ChangeAddress';

type ChangeAddressP = typeof _ChangeAddress;

interface ChangeAddressType extends ChangeAddressP {
  Mobile: typeof ChangeAddressMobile;
}

const ChangeAddress = _ChangeAddress as ChangeAddressType;

ChangeAddress.Mobile = ChangeAddressMobile;

export default ChangeAddress;
