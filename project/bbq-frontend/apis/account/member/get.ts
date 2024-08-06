import axios from '@/axios';
import { GetAccountMemberAPIResponse } from '@/types';

type Response = GetAccountMemberAPIResponse;

export const get = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/account/member/info`);

  return data;
};
