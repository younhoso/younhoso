import { addMenu } from './addMenu';
import { deleteAllMenu } from './deleteAllMenu';
import { deleteMenu } from './deleteMenu';
import { get } from './get';
import { getCount } from './getCount';
import { modifyMenuQuantity } from './modifyMenuQuantity';

export const CartAPI = {
  get,
  getCount,
  addMenu,
  modifyMenuQuantity,
  deleteMenu,
  deleteAllMenu,
};
