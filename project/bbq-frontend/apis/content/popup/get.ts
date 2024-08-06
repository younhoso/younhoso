import axios from '@/axios';
import { PopupBanner } from '@/types';

export const get = async (): Promise<PopupBanner[]> => {
  const { data } = await axios.get(`/api/delivery/content/popup/all`);

  return data;
};
