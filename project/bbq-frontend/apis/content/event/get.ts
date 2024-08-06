import axios from '@/axios';
import { Event } from '@/types';

type Params = { id: number };

type Response = Event;

export const get = async ({ id }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/event/${id}`);

  return data;
};
