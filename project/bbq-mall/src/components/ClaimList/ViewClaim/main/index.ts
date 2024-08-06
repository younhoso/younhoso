import ViewClaimMobile from './mobile/ViewClaimMobile';
import _ViewClaim from './pc/ViewClaim';

type ViewClaimP = typeof _ViewClaim;

interface ViewClaimType extends ViewClaimP {
  Mobile: typeof ViewClaimMobile;
}

const ViewClaim = _ViewClaim as ViewClaimType;

ViewClaim.Mobile = ViewClaimMobile;

export default ViewClaim;
