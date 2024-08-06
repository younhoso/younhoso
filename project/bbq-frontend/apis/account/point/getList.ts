import axios from '@/axios';
import { Point } from '@/types';
import { objectToQueryString } from '@/utils';

type Params = {
  page?: number;
  size?: number;
};

type Response = {
  content: Point[];
  pageable: {
    sort: string[];
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: string[];
  numberOfElements: number;
  empty: boolean;
};

export const getList = async (params: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/account/point${objectToQueryString(params)}`);

  return data;
};
