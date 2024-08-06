import MainBannerMobile from './mobile/MainBannerMobile';
import _MainBanner from './pc/MainBanner';

type MainBannerP = typeof _MainBanner;

interface MainBannerType extends MainBannerP {
  Mobile: typeof MainBannerMobile;
}

const MainBanner = _MainBanner as MainBannerType;

MainBanner.Mobile = MainBannerMobile;

export default MainBanner;
