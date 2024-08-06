import ImageUploadMobile from './mobile/ImageUploadMobile';
import _ImageUpload from './pc/ImageUpload';

type ImageUploadP = typeof _ImageUpload;

interface ImageUploadType extends ImageUploadP {
  Mobile: typeof ImageUploadMobile;
}

const ImageUpload = _ImageUpload as ImageUploadType;

ImageUpload.Mobile = ImageUploadMobile;

export default ImageUpload;
