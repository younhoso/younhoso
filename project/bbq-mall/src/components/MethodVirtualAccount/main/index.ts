import MethodVirtualAccountMobile from './mobile/MethodVirtualAccountMobile';
import _MethodVirtualAccount from './pc/MethodVirtualAccount';

type MethodVirtualAccountP = typeof _MethodVirtualAccount;

interface MethodVirtualAccountType extends MethodVirtualAccountP {
  Mobile: typeof MethodVirtualAccountMobile;
}

const MethodVirtualAccount = _MethodVirtualAccount as MethodVirtualAccountType;

MethodVirtualAccount.Mobile = MethodVirtualAccountMobile;

export default MethodVirtualAccount;
