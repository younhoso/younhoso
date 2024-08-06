import AddressModifyModalMobile from './mobile/AddressModifyModalMobile';
import _AddressModifyModal from './pc/AddressModifyModal';

type AddressModifyModalP = typeof _AddressModifyModal;

interface AddressModifyModalType extends AddressModifyModalP {
  Mobile: typeof AddressModifyModalMobile;
}

const AddressModifyModal = _AddressModifyModal as AddressModifyModalType;

AddressModifyModal.Mobile = AddressModifyModalMobile;

export default AddressModifyModal;
