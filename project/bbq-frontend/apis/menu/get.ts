import axios from '@/axios';
import { Menu } from '@/types';

export const get = async ({ id }: { id: number }): Promise<Menu> => {
  const { data } = await axios.get(`/api/delivery/menu/detail/${id}`);

  return data;
};
