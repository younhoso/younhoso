import axios from '@/axios';
import { MenuCategory } from '@/types';

type Params = {
  menuId?: number;
};

type Response = MenuCategory[];

export const getList = async ({ menuId }: Params = {}): Promise<Response> => {
  if (menuId) {
    const { data } = await axios.get(`/api/delivery/menu/category/${menuId}`);
    return data;
  } else {
    const { data } = await axios.get(`/api/delivery/menu/category`);
    return data;
  }
};
