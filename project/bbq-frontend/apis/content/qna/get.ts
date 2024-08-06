import axios from '@/axios';
import { QNA } from '@/types';

type Params = { id: number };

type Response = QNA;

export const get = async ({ id }: Params): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/content/qna/${id}`);

  return data;
};
