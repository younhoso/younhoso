import PageTitleMobile from './mobile/PageTitleMobile';
import _PageTitle from './pc/PageTitle';

type PageTitleP = typeof _PageTitle;

interface PageTitleType extends PageTitleP {
  Mobile: typeof PageTitleMobile;
}

const PageTitle = _PageTitle as PageTitleType;

PageTitle.Mobile = PageTitleMobile;

export default PageTitle;
