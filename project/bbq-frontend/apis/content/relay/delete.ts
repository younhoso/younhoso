import axios from '@/axios';

type Params = {
  id: number;
};

type Response = void;

export const delete_ = async ({ id }: Params): Promise<Response> => {
  const { data } = await axios.delete(`/api/delivery/content/relay/${id}`);

  return data;
};
