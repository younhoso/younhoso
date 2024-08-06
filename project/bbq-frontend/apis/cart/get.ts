import axios from '@/axios';
import { GetCartAPIParams, GetCartAPIResponse } from '@/types';

export const get = async (body: GetCartAPIParams): Promise<GetCartAPIResponse> => {
  const { data } = await axios.post(`/api/delivery/cart/list`, {
    ...body,
  });

  // TODO: 테스트를 위해 2개 이상일시에 첫번째 제품을 품절 처리
  /*let { data } = await axios.post(`/api/delivery/cart/list`, {
    ...body,
  });
  if (data.responseList.length >= 2) {
    data.responseList[0].isSoldOut = true;
  }*/

  return data;
};
