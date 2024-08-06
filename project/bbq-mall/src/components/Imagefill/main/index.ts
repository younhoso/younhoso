import ImagefillMobile from './mobile/ImagefillMobile';
import _Imagefill from './pc/Imagefill';

type ImagefillP = typeof _Imagefill;

interface ImagefillType extends ImagefillP {
  Mobile: typeof ImagefillMobile;
}

const Imagefill = _Imagefill as ImagefillType;

Imagefill.Mobile = ImagefillMobile;

export default Imagefill;
