import MethodAccountMobile from './mobile/MethodAccountMobile';
import _MethodAccount from './pc/MethodAccount';

type MethodAccountP = typeof _MethodAccount;

interface MethodAccountType extends MethodAccountP {
  Mobile: typeof MethodAccountMobile;
}

const MethodAccount = _MethodAccount as MethodAccountType;

MethodAccount.Mobile = MethodAccountMobile;

export default MethodAccount;
