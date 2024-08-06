import axios from '@/axios';

type Params = {
  id: number;
};

type Response = void;

export const deleteMenu = async (params: Params): Promise<Response> => {
  await axios.delete(`/api/delivery/cart/${params.id}`);
};
