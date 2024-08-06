import axios from '@/axios';

type Params = {
  username: string;
  ciToken: string;
};

type Response = {
  username: string;
  token: string;
  isAlreadyIntegratedMember: boolean;
};

export const initFindAndChangePasswordWithCI = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/find/password/init-ci`, {
    ...params,
  });

  return data;
};
