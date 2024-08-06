import ContentBoxMobile from './mobile/ContentBoxMobile';
import _ContentBox from './pc/ContentBox';

type ContentBoxP = typeof _ContentBox;

interface ContentBoxType extends ContentBoxP {
  Mobile: typeof ContentBoxMobile;
}

const ContentBox = _ContentBox as ContentBoxType;

ContentBox.Mobile = ContentBoxMobile;

export default ContentBox;
