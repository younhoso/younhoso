import axios from '@/axios';
import { Branch } from '@/types';
import { objectToQueryString } from '@/utils';

type Params = {
  name: string;
  page?: number;
  size?: number;
};

type Response = {
  content: Branch[];
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

export const search = async ({ name, page, size }: Params): Promise<Response> => {
  const { data } = await axios.get(
    `/api/delivery/family/search/by-name/${name}${objectToQueryString({
      page,
      size,
    })}`,
  );

  return data;
};
