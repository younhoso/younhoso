import BannerMobile from './mobile/BannerMobile';
import _Banner from './pc/Banner';

type BannerP = typeof _Banner;

interface BannerType extends BannerP {
  Mobile: typeof BannerMobile;
}

const Banner = _Banner as BannerType;

Banner.Mobile = BannerMobile;

export default Banner;
