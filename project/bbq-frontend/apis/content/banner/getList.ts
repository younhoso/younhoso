import axios from '@/axios';
import { EventBanner } from '@/types';

type Response = EventBanner[];

export const getList = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/event-banner`);

  return data;
};
