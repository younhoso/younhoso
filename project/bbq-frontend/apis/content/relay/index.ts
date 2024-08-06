import { create } from './create';
import { delete_ } from './delete';
import { get } from './get';
import { getList } from './getList';
import { modify } from './modify';

export const ContentRelayAPI = {
  get,
  getList: getList,
  create: create,
  delete: delete_,
  modify,
};
