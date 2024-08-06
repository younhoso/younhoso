import ContentTitleMobile from './mobile/ContentTitleMobile';
import _ContentTitle from './pc/ContentTitle';

type ContentTitleP = typeof _ContentTitle;

interface ContentTitleType extends ContentTitleP {
  Mobile: typeof ContentTitleMobile;
}

const ContentTitle = _ContentTitle as ContentTitleType;

ContentTitle.Mobile = ContentTitleMobile;

export default ContentTitle;
