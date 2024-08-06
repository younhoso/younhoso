import axios from '@/axios';
import { FAQ } from '@/types';
import { objectToQueryString } from '@/utils';

type Request = {
  category?: string; // ORDER (주문 문의), DELIVER (주문 문의), TAKEOUT (포장 문의), BULK (대량 구매 문의), ETC (기타 문의)
  search?: string;
  page?: number;
  size?: number;
};

type Response = {
  content: FAQ[];
  pageable: {
    sort: string[];
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  sort: string[];
  first: boolean;
  empty: boolean;
};

export const getList = async (params: Request): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/faq${objectToQueryString(params)}`);

  return data;
};
