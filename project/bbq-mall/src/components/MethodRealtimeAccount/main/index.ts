import MethodRealtimeAccountMobile from './mobile/MethodRealtimeAccountMobile';
import _MethodRealtimeAccount from './pc/MethodRealtimeAccount';

type MethodRealtimeAccountP = typeof _MethodRealtimeAccount;

interface MethodRealtimeAccountType extends MethodRealtimeAccountP {
  Mobile: typeof MethodRealtimeAccountMobile;
}

const MethodRealtimeAccount = _MethodRealtimeAccount as MethodRealtimeAccountType;

MethodRealtimeAccount.Mobile = MethodRealtimeAccountMobile;

export default MethodRealtimeAccount;
