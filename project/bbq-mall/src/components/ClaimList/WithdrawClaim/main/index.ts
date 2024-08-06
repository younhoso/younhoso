import WithdrawClaimMobile from './mobile/WithdrawClaimMobile';
import _WithdrawClaim from './pc/WithdrawClaim';

type WithdrawClaimP = typeof _WithdrawClaim;

interface WithdrawClaimType extends WithdrawClaimP {
  Mobile: typeof WithdrawClaimMobile;
}

const WithdrawClaim = _WithdrawClaim as WithdrawClaimType;

WithdrawClaim.Mobile = WithdrawClaimMobile;

export default WithdrawClaim;
