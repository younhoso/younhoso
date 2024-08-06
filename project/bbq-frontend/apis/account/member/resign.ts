import axios from '@/axios';

type Response = void;

export const resign = async (): Promise<Response> => {
  await axios.delete(`/api/account/member/info`);
};
