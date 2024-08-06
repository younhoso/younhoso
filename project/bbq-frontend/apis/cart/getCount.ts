import axios from '@/axios';

type Response = {
  cartCount: number;
};

export const getCount = async (): Promise<Response> => {
  const { data } = await axios.get(`/api/delivery/cart/count`);

  return data;
};
