import axios from '@/axios';
import { District } from '@/types';

type Params = {
  address?: string;
  latitude?: number;
  longitude?: number;
  searchType?: string;
  cartRequestList: {
    mainMenuId: number;
    quantity: number;
    subOptionItemIdSet: number[];
  }[];
};

type Response = {
  familyInfoForDistrictInfoList: District[];
};

export const getDeliveryList = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/district/delivery`, {
    ...params,
  });

  return data;
};
