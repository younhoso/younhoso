import AddressEditMobile from './mobile/AddressEditMobile';
import _AddressEdit from './pc/AddressEdit';

type AddressEditP = typeof _AddressEdit;

interface AddressEditType extends AddressEditP {
  Mobile: typeof AddressEditMobile;
}

const AddressEdit = _AddressEdit as AddressEditType;

AddressEdit.Mobile = AddressEditMobile;

export default AddressEdit;
