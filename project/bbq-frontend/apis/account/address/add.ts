import axios from '@/axios';
import { Address } from '@/types';

type Params = {
  deliveryName: string;
  fullAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
};

type Response = Address;

export const add = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/address`, {
    ...params,
  });

  return data;
};
