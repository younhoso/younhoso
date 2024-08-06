import AddressItemMobile from './mobile/AddressItemMobile';
import _AddressItem from './pc/AddressItem';

type AddressItemP = typeof _AddressItem;

interface AddressItemType extends AddressItemP {
  Mobile: typeof AddressItemMobile;
}

const AddressItem = _AddressItem as AddressItemType;

AddressItem.Mobile = AddressItemMobile;

export default AddressItem;
