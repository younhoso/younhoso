import AddCartButtonMobile from './mobile/AddCartButtonMobile';
import _AddCartButton from './pc/AddCartButton';

type AddCartButtonP = typeof _AddCartButton;

interface AddCartButtonType extends AddCartButtonP {
  Mobile: typeof AddCartButtonMobile;
}

const AddCartButton = _AddCartButton as AddCartButtonType;

AddCartButton.Mobile = AddCartButtonMobile;

export default AddCartButton;
