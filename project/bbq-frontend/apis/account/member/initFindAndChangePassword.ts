import axios from '@/axios';

type Params = {
  username: string;
  name: string;
  phoneNumber: string;
  authCode: string;
};

type Response = {
  username: string;
  token: string;
  isAlreadyIntegratedMember: string;
};

export const initFindAndChangePassword = async (params: Params): Promise<Response> => {
  const { data } = await axios.post(`/api/account/member/find/password/init`, {
    ...params,
  });

  return data;
};
