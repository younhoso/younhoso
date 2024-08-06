import axios from '@/axios';
import { Relay } from '@/types';

type Params = { id: number };

type Response = Relay;

export const get = async ({ id }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/relay/${id}`);

  return data;
};
