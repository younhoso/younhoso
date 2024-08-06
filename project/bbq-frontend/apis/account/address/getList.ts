import axios from '@/axios';
import { Address } from '@/types';

export const getList = async (): Promise<Address[]> => {
  const { data } = await axios.get(`/api/account/address`);

  return data;
};
