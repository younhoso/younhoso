import axios from '@/axios';
import { Branch } from '@/types';

type Params = {
  branchId: string;
};

type Response = Branch;

export const get = async ({ branchId }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/family/${branchId}`);

  return data;
};
