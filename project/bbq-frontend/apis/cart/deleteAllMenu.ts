import axios from '@/axios';

type Response = void;

export const deleteAllMenu = async (): Promise<Response> => {
  await axios.delete(`/api/delivery/cart`);
};
