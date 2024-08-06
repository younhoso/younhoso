import axios from '@/axios';

type Params = {
  id: number;
  quantity: number;
};

type Response = void;

export const modifyMenuQuantity = async ({ id, quantity }: Params): Promise<Response> => {
  const { data } = await axios.patch(`/api/delivery/cart/${id}`, {
    quantity: quantity,
  });

  return data;
};
