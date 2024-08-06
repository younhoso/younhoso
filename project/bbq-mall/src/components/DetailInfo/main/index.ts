import DetailInfoMobile from './mobile/DetailInfoMobile';
import _DetailInfo from './pc/DetailInfo';

type DetailInfoP = typeof _DetailInfo;

interface DetailInfoType extends DetailInfoP {
  Mobile: typeof DetailInfoMobile;
}

const DetailInfo = _DetailInfo as DetailInfoType;

DetailInfo.Mobile = DetailInfoMobile;

export default DetailInfo;
