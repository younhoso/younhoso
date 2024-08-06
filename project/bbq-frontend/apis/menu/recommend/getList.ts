import axios from '@/axios';
import { GetMenuRecommendListAPIParams, GetMenuRecommendListAPIResponse } from '@/types';
import { objectToQueryString } from '@/utils';

export const getList = async ({
  type,
}: GetMenuRecommendListAPIParams): Promise<GetMenuRecommendListAPIResponse> => {
  const { data } = await axios.get(
    `/api/delivery/menu/recommend${objectToQueryString({
      searchCategoryList: type,
    })}`,
  );

  return data;
};
