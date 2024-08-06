import { BranchDeliveryAPI } from './delivery';
import { BranchDistrictAPI } from './district';
import { get } from './get';
import { search } from './search';

export const BranchAPI = {
  get,
  search,
  Delivery: BranchDeliveryAPI,
  District: BranchDistrictAPI,
};
