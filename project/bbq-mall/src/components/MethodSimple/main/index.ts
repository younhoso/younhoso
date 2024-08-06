import MethodSimpleMobile from './mobile/MethodSimpleMobile';
import _MethodSimple from './pc/MethodSimple';

type MethodSimpleP = typeof _MethodSimple;

interface MethodSimpleType extends MethodSimpleP {
  Mobile: typeof MethodSimpleMobile;
}

const MethodSimple = _MethodSimple as MethodSimpleType;

MethodSimple.Mobile = MethodSimpleMobile;

export default MethodSimple;
