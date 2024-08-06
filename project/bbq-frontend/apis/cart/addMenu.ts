import axios from '@/axios';
import { CartItem } from '@/types';

type Params = {
  mainMenuId: number;
  quantity: number;
  subOptionItemIdSet: number[];
};

type Response = CartItem;

export const addMenu = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/delivery/cart`, {
    ...params,
  });

  return data;
};
