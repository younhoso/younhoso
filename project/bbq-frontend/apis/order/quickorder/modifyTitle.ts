import axios from '@/axios';

export type ModifyQuickOrderTitleAPIResponseData = any; // TODO: 스웨거에 안보여서 안넣어놓음.

export const modifyTitle = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}): Promise<ModifyQuickOrderTitleAPIResponseData> => {
  const { data } = await axios.patch(`/api/delivery/order/quick-order/${id}`, {
    quickOrderTitle: title,
  });

  return data;
};
