import axios from '@/axios';

type Params = {
  ciToken: string;
};

type Response = {};

export const set = async (params: Params): Promise<Response> => {
  const { data } = await axios.patch(`/api/account/member/info/ci`, {
    ...params,
  });

  return data;
};
