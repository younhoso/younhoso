import axios from '@/axios';
import { District } from '@/types';

type Params = {
  leftTopLatitude?: number;
  leftTopLongitude?: number;
  rightBottomLatitude?: number;
  rightBottomLongitude?: number;
  latitude?: number;
  longitude?: number;
  searchType: string;
  cartRequestList: {
    mainMenuId: number;
    quantity: number;
    subOptionItemIdSet: number[];
  }[];
};

type Response = {
  familyInfoForDistrictInfoList: District[];
};

export const getTakeoutList = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/district/takeout`, {
    ...params,
  });

  return data;
};
