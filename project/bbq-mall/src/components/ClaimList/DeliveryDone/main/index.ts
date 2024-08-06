import DeliveryDoneMobile from './mobile/DeliveryDoneMobile';
import _DeliveryDone from './pc/DeliveryDone';

type DeliveryDoneP = typeof _DeliveryDone;

interface DeliveryDoneType extends DeliveryDoneP {
  Mobile: typeof DeliveryDoneMobile;
}

const DeliveryDone = _DeliveryDone as DeliveryDoneType;

DeliveryDone.Mobile = DeliveryDoneMobile;

export default DeliveryDone;
