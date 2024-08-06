import axios from '@/axios';
import { Grade } from '@/types';

type Response = Grade[];

export const getList = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/account/membership/grade`);

  return data;
};
