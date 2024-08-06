import HelpCategoriesMobile from './mobile/HelpCategoriesMobile';
import _HelpCategories from './pc/HelpCategories';

type HelpCategoriesP = typeof _HelpCategories;

interface HelpCategoriesType extends HelpCategoriesP {
  Mobile: typeof HelpCategoriesMobile;
}

const HelpCategories = _HelpCategories as HelpCategoriesType;

HelpCategories.Mobile = HelpCategoriesMobile;

export default HelpCategories;
