import MyCategoryMobile from './mobile/MyCategoryMobile';
import _MyCategory from './pc/MyCategory';

type MyCategoryP = typeof _MyCategory;

interface MyCategoryType extends MyCategoryP {
  Mobile: typeof MyCategoryMobile;
}

const MyCategory = _MyCategory as MyCategoryType;

MyCategory.Mobile = MyCategoryMobile;

export default MyCategory;
