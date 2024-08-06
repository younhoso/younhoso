import axios from '@/axios';
import { Notice } from '@/types';

type Params = { id: number };

type Response = Notice;

export const get = async ({ id }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/notice/${id}`);

  return data;
};
