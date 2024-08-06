import axios from '@/axios';
import { Address } from '@/types';

type Response = Address | undefined | null;

export const get = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/account/address/default`);

  return data;
};
