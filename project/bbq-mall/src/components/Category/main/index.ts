import CategoryMobile from './mobile/CategoryMobile';
import _Category from './pc/Category';

type CategoryP = typeof _Category;

interface CategoryType extends CategoryP {
  Mobile: typeof CategoryMobile;
}

const Category = _Category as CategoryType;

Category.Mobile = CategoryMobile;

export default Category;
