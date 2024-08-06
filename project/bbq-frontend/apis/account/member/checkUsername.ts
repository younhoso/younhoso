import axios from '@/axios';

type Params = {
  username: string;
};

type Response = {
  message: string;
};

export const checkUsername = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/register/check-username`, {
    ...params,
  });

  return data;
};
