import InputMobile from './mobile/InputMobile';
import _Input from './pc/Input';

type InputP = typeof _Input;

interface InputType extends InputP {
  Mobile: typeof InputMobile;
}

const Input = _Input as InputType;

Input.Mobile = InputMobile;

export default Input;
