import axios from '@/axios';
import { Order } from '@/types/Order';
import { objectToQueryString } from '@/utils';

export type GetOrderListAPIResponseData = {
  content: Order[];
  pageable: {
    sort: string[];
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: false;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: string[];
  first: boolean;
  number: number;
  size: number;
  numberOfElements: number;
  empty: boolean;
};

export const getList = async (params: {
  page?: number;
  size?: number;
}): Promise<GetOrderListAPIResponseData> => {
  const { data } = await axios.get(`/api/delivery/order/history${objectToQueryString(params)}`);

  return data;
};
