import { OrderAdultAPI } from './adult';
import { calculate } from './calculate';
import { cancel } from './cancel';
import { complete } from './complete';
import { get } from './get';
import { getList } from './getList';
import { init } from './init';
import { process } from './process';
import { OrderQuickOrderAPI } from './quickorder';

export const OrderAPI = {
  get: get,
  getList: getList,
  init: init,
  process: process,
  calculate: calculate,
  cancel: cancel,
  complete: complete,
  QuickOrder: OrderQuickOrderAPI,
  Adult: OrderAdultAPI,
};
