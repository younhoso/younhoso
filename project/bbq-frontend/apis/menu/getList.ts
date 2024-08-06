import axios from '@/axios';
import { Menu } from '@/types';
import { objectToQueryString } from '@/utils';

export const getList = async ({
  categoryId,
  branchId,
}: {
  categoryId: number;
  branchId?: string;
}): Promise<Menu[]> => {
  const { data } = await axios.get(
    `/api/delivery/menu/${categoryId}${objectToQueryString({ branchId })}`,
  );

  return data;
};
