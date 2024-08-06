import { AccountPointHPCAPI } from './HPC';
import { getList } from './getList';
import { getStatus } from './getStatus';

export const AccountPointAPI = {
  HPC: AccountPointHPCAPI,
  getList,
  getStatus,
};
