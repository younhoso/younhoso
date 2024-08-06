import { MenuCategoryAPI } from './category';
import { get } from './get';
import { getList } from './getList';
import { MenuOptionAPI } from './option';
import { MenuRecommendAPI } from './recommend';

export const MenuAPI = {
  get,
  getList,
  Category: MenuCategoryAPI,
  Option: MenuOptionAPI,
  Recommend: MenuRecommendAPI,
};
