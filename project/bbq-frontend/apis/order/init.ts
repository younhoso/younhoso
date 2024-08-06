import axios from '@/axios';
import { InitOrderAPIParams, InitOrderAPIResponse } from '@/types';

export const MOBILEWEB = 'MOBILEWEB';
export const DESKTOPWEB = 'DESKTOPWEB';
export const VISUALARS = 'VISUALARS';

export type OrderAgent = typeof MOBILEWEB | typeof DESKTOPWEB | typeof VISUALARS;

export const init = async (
  body: InitOrderAPIParams,
  orderAgent: OrderAgent,
): Promise<InitOrderAPIResponse> => {
  const { data } = await axios.post(
    `/api/delivery/order/init`,
    {
      ...body,
    },
    {
      headers: {
        customAgent: orderAgent,
      },
    },
  );

  return data;
};
