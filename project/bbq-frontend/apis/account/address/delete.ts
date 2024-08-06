import axios from '@/axios';

type Params = {
  id: number;
};

type Response = true;

export const delete_ = async ({ id }: Params): Promise<Response> => {
  await axios.delete(`/api/account/address/${id}`);

  return true;
};
