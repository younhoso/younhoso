import AddressListMobile from './mobile/AddressListMobile';
import _AddressList from './pc/AddressListModal';

type AddressListP = typeof _AddressList;

interface AddressListType extends AddressListP {
  Mobile: typeof AddressListMobile;
}

const AddressList = _AddressList as AddressListType;

AddressList.Mobile = AddressListMobile;

export default AddressList;
