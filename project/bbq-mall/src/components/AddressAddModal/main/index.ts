import AddressAddModalMobile from './mobile/AddressAddModalMobile';
import _AddressAddModal from './pc/AddressAddModal';

type AddressAddModalP = typeof _AddressAddModal;

interface AddressAddModalType extends AddressAddModalP {
  Mobile: typeof AddressAddModalMobile;
}

const AddressAddModal = _AddressAddModal as AddressAddModalType;

AddressAddModal.Mobile = AddressAddModalMobile;

export default AddressAddModal;
