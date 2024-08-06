import axios from '@/axios';
import { Notice } from '@/types';
import { objectToQueryString } from '@/utils';

type Params = {
  page?: number;
  size?: number;
};

type Response = {
  content: Notice[];
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

export const getList = async (params: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/notice${objectToQueryString(params)}`);

  return data;
};
