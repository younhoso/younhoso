import WrapperMobile from './mobile/WrapperMobile';
import _Wrapper from './pc/Wrapper';

type WrapperP = typeof _Wrapper;

interface WrapperType extends WrapperP {
  Mobile: typeof WrapperMobile;
}

const Wrapper = _Wrapper as WrapperType;

Wrapper.Mobile = WrapperMobile;

export default Wrapper;
