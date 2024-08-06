import { add } from './add';
import { delete_ } from './delete';
import { deleteDetail } from './deleteDetail';
import { get } from './get';
import { getList } from './getList';
import { modifyTitle } from './modifyTitle';

export const OrderQuickOrderAPI = {
  add: add,
  get: get,
  getList: getList,
  delete: delete_,
  deleteDetail: deleteDetail,
  modifyTitle: modifyTitle,
};
