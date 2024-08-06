import axios from '@/axios';
import { Relay } from '@/types';
import { objectToQueryString } from '@/utils';

type Request = {
  page?: number;
  size?: number;
};

type Response = {
  content: Relay[];
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
  const { data } = await axios.get(`/api/delivery/content/relay${objectToQueryString(params)}`);

  return data;
};
