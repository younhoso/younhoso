import axios from '@/axios';
import { District } from '@/types';

type Params = {
  leftTopLatitude?: number;
  leftTopLongitude?: number;
  rightBottomLatitude?: number;
  rightBottomLongitude?: number;
  latitude?: number;
  longitude?: number;
  searchType: 'NEARBY' | 'MAP';
};

type Response = {
  familyInfoForDistrictInfoList: District[];
};

export const getList = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/district/search-family`, {
    ...params,
  });

  return data;
};
