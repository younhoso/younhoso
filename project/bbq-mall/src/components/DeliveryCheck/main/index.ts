import DeliveryCheckMobile from './mobile/DeliveryCheckMobile';
import _DeliveryCheck from './pc/DeliveryCheck';

type DeliveryCheckP = typeof _DeliveryCheck;

interface DeliveryCheckType extends DeliveryCheckP {
  Mobile: typeof DeliveryCheckMobile;
}

const DeliveryCheck = _DeliveryCheck as DeliveryCheckType;

DeliveryCheck.Mobile = DeliveryCheckMobile;

export default DeliveryCheck;
