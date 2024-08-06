import axios from '@/axios';
import { MenuSubOption } from '@/types';
import { objectToQueryString } from '@/utils';

export const getList = async ({
  menuId,
  branchId,
}: {
  menuId: number;
  branchId?: string;
}): Promise<MenuSubOption[]> => {
  const { data } = await axios.get(
    `/api/delivery/menu/sub-option/${menuId}${objectToQueryString({
      branchId,
    })}`,
  );

  return data;
};
