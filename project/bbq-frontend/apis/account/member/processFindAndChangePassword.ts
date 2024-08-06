import axios from '@/axios';

type Params = {
  token: string;
  newPassword: string;
};

type Response = {
  username: string;
};

export const processFindAndChangePassword = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/find/password/process`, {
    ...params,
  });

  return data;
};
