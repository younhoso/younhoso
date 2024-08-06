import LoadingMobile from './mobile/LoadingMobile';
import _Loading from './pc/Loading';

type LoadingP = typeof _Loading;

interface LoadingType extends LoadingP {
  Mobile: typeof LoadingMobile;
}

const Loading = _Loading as LoadingType;

Loading.Mobile = LoadingMobile;

export default Loading;
